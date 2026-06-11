import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const expectedSourceHash =
  "56400f5eb688e087551080aee57a437504eb455abe505cbad28f6fdac0b630ab";

const assets = [
  ["brand/source/lemonmade-logo-original.png", 1536, 1024],
  ["public/logo/lemonmade-logo-full.jpg", 1200, 800],
  ["public/logo/lemonmade-logo-md.jpg", 900, 600],
  ["public/logo/lemonmade-logo-mark.jpg", 512, 512],
  ["public/logo/favicon-192.png", 192, 192],
  ["public/logo/favicon-64.png", 64, 64],
  ["public/og/og-image.jpg", 1200, 630],
];

function imageDimensions(path) {
  const data = readFileSync(path);
  const signature = data.subarray(0, 8).toString("hex");
  if (signature === "89504e470d0a1a0a") {
    return {
      width: data.readUInt32BE(16),
      height: data.readUInt32BE(20),
    };
  }

  assert.equal(data.readUInt16BE(0), 0xffd8, `${path} must be a PNG or JPEG`);
  let offset = 2;
  while (offset < data.length) {
    if (data[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    const marker = data[offset + 1];
    offset += 2;
    if (marker === 0xd8 || marker === 0xd9) continue;

    const length = data.readUInt16BE(offset);
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return {
        height: data.readUInt16BE(offset + 3),
        width: data.readUInt16BE(offset + 5),
      };
    }
    offset += length;
  }

  assert.fail(`Unable to read image dimensions for ${path}`);
}

test("canonical logo source is preserved byte-for-byte", () => {
  const path = "brand/source/lemonmade-logo-original.png";
  assert.ok(existsSync(path), `${path} is missing`);
  const hash = createHash("sha256").update(readFileSync(path)).digest("hex");
  assert.equal(hash, expectedSourceHash);
});

test("required logo derivatives have launch-ready dimensions", () => {
  for (const [path, expectedWidth, expectedHeight] of assets) {
    assert.ok(existsSync(path), `${path} is missing`);
    const { width, height } = imageDimensions(path);
    assert.equal(width, expectedWidth, `${path} width`);
    assert.equal(height, expectedHeight, `${path} height`);
  }
});

test("site references the new full logo, compact mark, and social image", () => {
  const logoMark = readFileSync("src/components/ui/LogoMark.tsx", "utf8");
  const hero = readFileSync("src/components/ui/Hero.tsx", "utf8");
  const about = readFileSync("src/pages/About.tsx", "utf8");
  const html = readFileSync("index.html", "utf8");

  assert.match(logoMark, /lemonmade-logo-mark\.jpg/);
  assert.match(hero, /lemonmade-logo-full\.jpg/);
  assert.match(about, /lemonmade-logo-full\.jpg/);
  assert.match(html, /\/og\/og-image\.jpg/);
  assert.match(html, /\/logo\/favicon-64\.png/);
});

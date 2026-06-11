import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const expectedSourceHash =
  "56400f5eb688e087551080aee57a437504eb455abe505cbad28f6fdac0b630ab";

const assets = [
  ["brand/source/lemonmade-logo-original.png", 1536, 1024],
  ["public/logo/lemonmade-logo-full.png", 1200, 800],
  ["public/logo/lemonmade-logo-md.png", 900, 600],
  ["public/logo/lemonmade-logo-mark.png", 512, 512],
  ["public/logo/favicon-192.png", 192, 192],
  ["public/logo/favicon-64.png", 64, 64],
  ["public/og/og-image.png", 1200, 630],
];

function pngDimensions(path) {
  const data = readFileSync(path);
  const signature = data.subarray(0, 8).toString("hex");
  assert.equal(signature, "89504e470d0a1a0a", `${path} must be a PNG`);
  return {
    width: data.readUInt32BE(16),
    height: data.readUInt32BE(20),
  };
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
    const { width, height } = pngDimensions(path);
    assert.equal(width, expectedWidth, `${path} width`);
    assert.equal(height, expectedHeight, `${path} height`);
  }
});

test("site references the new full logo, compact mark, and social image", () => {
  const logoMark = readFileSync("src/components/ui/LogoMark.tsx", "utf8");
  const hero = readFileSync("src/components/ui/Hero.tsx", "utf8");
  const about = readFileSync("src/pages/About.tsx", "utf8");
  const html = readFileSync("index.html", "utf8");

  assert.match(logoMark, /lemonmade-logo-mark\.png/);
  assert.match(hero, /lemonmade-logo-full\.png/);
  assert.match(about, /lemonmade-logo-full\.png/);
  assert.match(html, /\/og\/og-image\.png/);
  assert.match(html, /\/logo\/favicon-64\.png/);
});

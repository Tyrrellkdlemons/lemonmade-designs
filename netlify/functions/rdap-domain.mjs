const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=300",
};

function response(statusCode, body) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(body),
  };
}

export function normalizeDomain(raw) {
  if (typeof raw !== "string") return null;
  const domain = raw.trim().toLowerCase().replace(/\.$/, "");
  if (domain.length < 4 || domain.length > 253 || !domain.includes(".")) return null;
  const labels = domain.split(".");
  if (
    labels.some(
      (label) =>
        label.length < 1 ||
        label.length > 63 ||
        !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label)
    )
  ) {
    return null;
  }
  return domain;
}

export async function handler(event) {
  const domain = normalizeDomain(event.queryStringParameters?.domain);
  if (!domain) {
    return response(400, {
      status: "invalid",
      message: "Enter a valid domain name.",
    });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 7000);

  try {
    const rdapResponse = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      headers: {
        Accept: "application/rdap+json, application/json",
        "User-Agent": "LemonMade-Designs-Domain-Helper/1.0",
      },
      redirect: "follow",
      signal: controller.signal,
    });

    if (rdapResponse.status === 404) {
      return response(200, {
        domain,
        status: "not_found",
        message:
          "No public registration record was found. The name may be available, but availability must be confirmed with a registrar before purchase.",
      });
    }

    if (!rdapResponse.ok) {
      return response(200, {
        domain,
        status: "inconclusive",
        message: "Public registration data could not confirm this domain.",
      });
    }

    const record = await rdapResponse.json();
    return response(200, {
      domain,
      status: "registered",
      handle: typeof record.handle === "string" ? record.handle : null,
      registrationStatus: Array.isArray(record.status) ? record.status.slice(0, 5) : [],
      message: "A public registration record was found for this domain.",
    });
  } catch {
    return response(200, {
      domain,
      status: "inconclusive",
      message: "The public registration lookup was blocked, unavailable, or timed out.",
    });
  } finally {
    clearTimeout(timeout);
  }
}

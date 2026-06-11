/** Encode form data for Netlify Forms POST submission. */
export function encodeFormData(data: Record<string, string>): string {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

/** Submit to Netlify Forms. Resolves true on success, false otherwise. */
export async function submitNetlifyForm(
  formName: string,
  data: Record<string, string>
): Promise<boolean> {
  try {
    const res = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encodeFormData({ "form-name": formName, ...data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

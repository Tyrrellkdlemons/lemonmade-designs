import { FormEvent, useState } from "react";
import { submitNetlifyForm } from "../../utils/netlifyForms";
import { Field, inputCls } from "../forms/FormField";
import Button from "./Button";

const needs = [
  "Buy a new domain",
  "Connect an existing domain",
  "Transfer a domain",
  "Fix DNS records",
  "Connect domain to Netlify",
  "Set up email forwarding",
  "SSL / HTTPS setup",
];

export default function DomainHelpPanel() {
  const [domain, setDomain] = useState("");
  const [form, setForm] = useState({ name: "", email: "", domainNeed: needs[0], message: "", "bot-field": "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Please enter a valid email address.";
    setErrors(errs);
    if (Object.keys(errs).length > 0 || form["bot-field"]) {
      const errorIds: Record<string, string> = {
        name: "domain-name",
        email: "domain-email",
      };
      document.getElementById(errorIds[Object.keys(errs)[0]])?.focus();
      return;
    }
    setStatus("sending");
    const ok = await submitNetlifyForm("domain-help", {
      ...form,
      message: `${domain ? `Domain idea: ${domain}\n` : ""}${form.message}`,
    });
    setStatus(ok ? "success" : "error");
  }

  return (
    <div className="glass overflow-hidden">
      {/* domain search-style visual */}
      <div className="border-b border-white/10 bg-gradient-to-r from-electric/15 to-lemon/10 p-6 sm:p-8">
        <label htmlFor="domain-idea" className="mb-2 block font-display text-lg font-bold text-cream">
          Have a domain name in mind?
        </label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex flex-1 items-center rounded-full border border-white/20 bg-navy/70 px-5">
            <span aria-hidden="true" className="mr-2 text-electric-soft">🔍</span>
            <input
              id="domain-idea"
              className="w-full bg-transparent py-3.5 text-cream placeholder-cream/35 focus:outline-none"
              placeholder="yourbusiness.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <Button onClick={() => document.getElementById("domain-name")?.focus()}>Get Domain Help</Button>
        </div>
        <p className="mt-3 text-xs text-cream/55">
          We help customers find, purchase, connect, and manage domains — we'll check availability with you and handle the setup.
        </p>
      </div>

      {status === "success" ? (
        <div role="status" className="p-8 text-center">
          <span aria-hidden="true" className="text-4xl">🌐</span>
          <h3 className="mt-3 font-display text-xl font-bold text-cream">Domain request sent!</h3>
          <p className="mt-2 text-sm text-cream/70">We'll reach out shortly to get your domain sorted.</p>
        </div>
      ) : (
        <form name="domain-help" onSubmit={handleSubmit} noValidate className="space-y-5 p-6 sm:p-8">
          <p hidden aria-hidden="true">
            <label>
              Don't fill this out: <input name="bot-field" value={form["bot-field"]} onChange={(e) => set("bot-field", e.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" htmlFor="domain-name" required error={errors.name}>
              <input id="domain-name" className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
            </Field>
            <Field label="Email" htmlFor="domain-email" required error={errors.email}>
              <input id="domain-email" type="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
            </Field>
          </div>
          <Field label="What do you need?" htmlFor="domainNeed">
            <select id="domainNeed" className={inputCls} value={form.domainNeed} onChange={(e) => set("domainNeed", e.target.value)}>
              {needs.map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
          <Field label="Anything else we should know?" htmlFor="domain-message">
            <textarea id="domain-message" rows={3} className={inputCls} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Current registrar, existing website, deadlines…" />
          </Field>
          {status === "error" && (
            <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}
          <Button type="submit" shine disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Request Domain Help"}
          </Button>
        </form>
      )}
    </div>
  );
}

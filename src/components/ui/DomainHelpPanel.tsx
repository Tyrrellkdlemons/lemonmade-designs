import { FormEvent, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
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

const tlds = [".com", ".net", ".org", ".co", ".io", ".design"];

type LookupResult = {
  domain: string;
  status: "registered" | "not_found" | "inconclusive" | "invalid";
  message: string;
};

function isValidLabel(value: string): boolean {
  return /^(?!-)[a-z0-9-]{1,63}(?<!-)$/i.test(value.trim());
}

export default function DomainHelpPanel() {
  const reduce = useReducedMotion();
  const [domainLabel, setDomainLabel] = useState("");
  const [tld, setTld] = useState(".com");
  const [lookupStatus, setLookupStatus] = useState<"idle" | "loading" | "done">("idle");
  const [lookupResult, setLookupResult] = useState<LookupResult | null>(null);
  const [lookupError, setLookupError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    domainNeed: needs[0],
    desiredDomain: "",
    existingRegistrar: "",
    currentHost: "",
    message: "",
    "bot-field": "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const fullDomain = useMemo(
    () => `${domainLabel.trim().toLowerCase()}${tld}`,
    [domainLabel, tld]
  );
  const set = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));

  async function checkDomain() {
    if (!isValidLabel(domainLabel)) {
      setLookupError("Use letters, numbers, or hyphens, without spaces or edge hyphens.");
      setLookupResult(null);
      document.getElementById("domain-label")?.focus();
      return;
    }

    setLookupError("");
    setLookupStatus("loading");
    try {
      const response = await fetch(
        `/.netlify/functions/rdap-domain?domain=${encodeURIComponent(fullDomain)}`
      );
      const result = (await response.json()) as LookupResult;
      setLookupResult(result);
      setForm((current) => ({ ...current, desiredDomain: fullDomain }));
    } catch {
      setLookupResult({
        domain: fullDomain,
        status: "inconclusive",
        message: "The public registration lookup could not be completed.",
      });
    } finally {
      setLookupStatus("done");
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || form["bot-field"]) {
      const errorIds: Record<string, string> = {
        name: "domain-name",
        email: "domain-email",
      };
      document.getElementById(errorIds[Object.keys(nextErrors)[0]])?.focus();
      return;
    }

    setStatus("sending");
    const ok = await submitNetlifyForm("domain-help", {
      ...form,
      desiredDomain: form.desiredDomain || (isValidLabel(domainLabel) ? fullDomain : ""),
    });
    setStatus(ok ? "success" : "error");
  }

  const fallback =
    "We can help check, purchase, connect, or transfer this domain manually.";

  return (
    <div className="glass overflow-hidden">
      <div className="border-b border-white/10 bg-gradient-to-r from-electric/15 to-lemon/10 p-6 sm:p-8">
        <label htmlFor="domain-label" className="mb-2 block font-display text-lg font-bold text-cream">
          Search public domain registration data
        </label>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
          <div className="flex items-center rounded-xl border border-white/20 bg-navy/70 px-4">
            <span aria-hidden="true" className="mr-2 text-electric-soft">🔍</span>
            <input
              id="domain-label"
              className="w-full bg-transparent py-3.5 text-cream placeholder-cream/35 focus:outline-none"
              placeholder="yourbusiness"
              value={domainLabel}
              onChange={(event) => {
                setDomainLabel(event.target.value);
                setLookupResult(null);
                setLookupStatus("idle");
              }}
            />
          </div>
          <label className="sr-only" htmlFor="domain-tld">Domain extension</label>
          <select
            id="domain-tld"
            className={`${inputCls} sm:w-32`}
            value={tld}
            onChange={(event) => {
              setTld(event.target.value);
              setLookupResult(null);
              setLookupStatus("idle");
            }}
          >
            {tlds.map((option) => <option key={option}>{option}</option>)}
          </select>
          <Button onClick={checkDomain} disabled={lookupStatus === "loading"}>
            {lookupStatus === "loading" ? "Checking..." : "Check public registration data"}
          </Button>
        </div>
        {lookupError && <p role="alert" className="mt-3 text-sm text-red-300">{lookupError}</p>}
        <p className="mt-3 text-xs text-cream/55">
          This checks public RDAP records. It is not a purchase guarantee, and LemonMade is not an accredited domain registrar.
        </p>

        {lookupResult && (
          <motion.div
            role="status"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-5 rounded-xl border p-4 ${
              lookupResult.status === "registered"
                ? "border-electric/35 bg-electric/10"
                : lookupResult.status === "not_found"
                  ? "border-leaf/35 bg-leaf/10"
                  : "border-lemon/35 bg-lemon/10"
            }`}
          >
            <p className="font-display text-lg font-bold text-cream">{lookupResult.domain}</p>
            <p className="mt-1 text-sm text-cream/75">{lookupResult.message}</p>
            {lookupResult.status !== "registered" && (
              <p className="mt-2 text-sm font-semibold text-lemon">{fallback}</p>
            )}
          </motion.div>
        )}
      </div>

      {status === "success" ? (
        <div role="status" className="p-8 text-center">
          <span aria-hidden="true" className="text-4xl">🌐</span>
          <h3 className="mt-3 font-display text-xl font-bold text-cream">Domain request sent!</h3>
          <p className="mt-2 text-sm text-cream/70">We'll reach out shortly to get your domain sorted.</p>
        </div>
      ) : (
        <form name="domain-help" method="POST" data-netlify="true" onSubmit={handleSubmit} noValidate className="space-y-5 p-6 sm:p-8">
          <input type="hidden" name="form-name" value="domain-help" />
          <p hidden aria-hidden="true">
            <label>
              Don't fill this out: <input name="bot-field" value={form["bot-field"]} onChange={(event) => set("bot-field", event.target.value)} tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name" htmlFor="domain-name" required error={errors.name}>
              <input id="domain-name" className={inputCls} value={form.name} onChange={(event) => set("name", event.target.value)} autoComplete="name" />
            </Field>
            <Field label="Email" htmlFor="domain-email" required error={errors.email}>
              <input id="domain-email" type="email" className={inputCls} value={form.email} onChange={(event) => set("email", event.target.value)} autoComplete="email" />
            </Field>
            <Field label="Desired domain" htmlFor="domain-desired">
              <input id="domain-desired" className={inputCls} value={form.desiredDomain} onChange={(event) => set("desiredDomain", event.target.value)} placeholder={domainLabel ? fullDomain : "yourbusiness.com"} />
            </Field>
            <Field label="Existing registrar" htmlFor="domain-registrar">
              <input id="domain-registrar" className={inputCls} value={form.existingRegistrar} onChange={(event) => set("existingRegistrar", event.target.value)} placeholder="GoDaddy, Namecheap, Squarespace..." />
            </Field>
            <Field label="Current host" htmlFor="domain-host">
              <input id="domain-host" className={inputCls} value={form.currentHost} onChange={(event) => set("currentHost", event.target.value)} placeholder="Netlify, Wix, Shopify..." />
            </Field>
            <Field label="What do you need?" htmlFor="domainNeed">
              <select id="domainNeed" className={inputCls} value={form.domainNeed} onChange={(event) => set("domainNeed", event.target.value)}>
                {needs.map((need) => <option key={need}>{need}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Anything else we should know?" htmlFor="domain-message">
            <textarea id="domain-message" rows={3} className={inputCls} value={form.message} onChange={(event) => set("message", event.target.value)} placeholder="Account access, current website, deadlines..." />
          </Field>
          {status === "error" && (
            <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              Something went wrong. Please try again or contact us directly.
            </p>
          )}
          <Button type="submit" shine disabled={status === "sending"}>
            {status === "sending" ? "Sending..." : "Request Domain Help"}
          </Button>
        </form>
      )}
    </div>
  );
}

import { FormEvent, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { submitNetlifyForm } from "../../utils/netlifyForms";
import Button from "../ui/Button";
import { Field, inputCls } from "./FormField";

const serviceOptions = ["Speed", "Mobile", "Design", "SEO", "Domain", "Forms", "Not sure"];
const businessTypes = [
  "Local business",
  "Professional services",
  "Restaurant / Food",
  "E-commerce",
  "Nonprofit",
  "Portfolio / Creative",
  "Education / Program",
  "Other",
];
const auditChecklist = [
  "Mobile",
  "Speed",
  "SEO",
  "SSL/domain",
  "Contact forms",
  "Brand clarity",
  "CTA clarity",
  "Accessibility",
  "Content structure",
  "Trust signals",
];

function isValidUrl(value: string): boolean {
  return /^https?:\/\/\S+\.\S+/i.test(value.trim());
}

export default function WebsiteAuditForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState({
    websiteUrl: "",
    businessType: businessTypes[0],
    mainIssue: "",
    serviceNeeded: serviceOptions[0],
    notes: "",
    name: "",
    email: "",
    phone: "",
    "bot-field": "",
  });
  const [areaConcerns, setAreaConcerns] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (key: string, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const toggleConcern = (concern: string) =>
    setAreaConcerns((current) =>
      current.includes(concern)
        ? current.filter((value) => value !== concern)
        : [...current, concern]
    );

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!isValidUrl(form.websiteUrl)) {
      nextErrors.websiteUrl = "Enter a full website URL beginning with http:// or https://.";
    }
    if (!form.mainIssue.trim()) nextErrors.mainIssue = "Tell us the main issue you want reviewed.";
    if (!form.name.trim()) nextErrors.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || form["bot-field"]) {
      document.getElementById(`audit-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    const ok = await submitNetlifyForm("website-audit", {
      ...form,
      areaConcerns: areaConcerns.join(", "),
    });
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div role="status" className="glass p-9 text-center">
        <span aria-hidden="true" className="text-5xl">🔎</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-cream">Review request received.</h2>
        <p className="mx-auto mt-3 max-w-lg text-cream/70">
          We'll review the site and reply with a practical starting point and
          quote options for fixes. This prepares a human review and does not run
          an automated scanner.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
      <form
        name="website-audit"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        noValidate
        className="glass space-y-6 p-6 sm:p-8"
      >
        <input type="hidden" name="form-name" value="website-audit" />
        <p hidden aria-hidden="true">
          <label>
            Don't fill this out:
            <input name="bot-field" value={form["bot-field"]} onChange={(event) => set("bot-field", event.target.value)} tabIndex={-1} autoComplete="off" />
          </label>
        </p>

        <Field label="Website URL" htmlFor="audit-websiteUrl" required error={errors.websiteUrl}>
          <input
            id="audit-websiteUrl"
            type="url"
            className={inputCls}
            value={form.websiteUrl}
            onChange={(event) => set("websiteUrl", event.target.value)}
            placeholder="https://yourwebsite.com"
          />
        </Field>
        <Field label="Business type" htmlFor="audit-businessType">
          <select
            id="audit-businessType"
            name="businessType"
            className={inputCls}
            value={form.businessType}
            onChange={(event) => set("businessType", event.target.value)}
          >
            {businessTypes.map((option) => <option key={option}>{option}</option>)}
          </select>
        </Field>
        <Field label="Main issue" htmlFor="audit-mainIssue" required error={errors.mainIssue}>
          <textarea
            id="audit-mainIssue"
            rows={4}
            className={inputCls}
            value={form.mainIssue}
            onChange={(event) => set("mainIssue", event.target.value)}
            placeholder="What feels broken, confusing, slow, or outdated?"
          />
        </Field>
        <Field label="Service needed" htmlFor="audit-serviceNeeded">
          <select id="audit-serviceNeeded" className={inputCls} value={form.serviceNeeded} onChange={(event) => set("serviceNeeded", event.target.value)}>
            {serviceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </Field>
        <fieldset>
          <legend className="mb-2 text-sm font-semibold text-cream/90">
            Area concerns
          </legend>
          <div className="flex flex-wrap gap-2">
            {auditChecklist.map((concern) => {
              const checked = areaConcerns.includes(concern);
              return (
                <label
                  key={concern}
                  className={`focus-within:ring-2 focus-within:ring-lemon rounded-full border px-4 py-2 text-sm font-medium ${
                    checked
                      ? "border-lemon bg-lemon/15 text-lemon"
                      : "border-white/15 text-cream/70"
                  }`}
                >
                  <input
                    type="checkbox"
                    name="areaConcerns"
                    value={concern}
                    checked={checked}
                    onChange={() => toggleConcern(concern)}
                    className="sr-only"
                  />
                  {concern}
                </label>
              );
            })}
          </div>
        </fieldset>
        <Field label="Notes" htmlFor="audit-notes">
          <textarea id="audit-notes" rows={4} className={inputCls} value={form.notes} onChange={(event) => set("notes", event.target.value)} placeholder="Deadlines, target audience, current platform, or anything else." />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="audit-name" required error={errors.name}>
            <input id="audit-name" className={inputCls} value={form.name} onChange={(event) => set("name", event.target.value)} autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="audit-email" required error={errors.email}>
            <input id="audit-email" type="email" className={inputCls} value={form.email} onChange={(event) => set("email", event.target.value)} autoComplete="email" />
          </Field>
          <Field label="Phone" htmlFor="audit-phone">
            <input id="audit-phone" type="tel" className={inputCls} value={form.phone} onChange={(event) => set("phone", event.target.value)} autoComplete="tel" />
          </Field>
        </div>

        {status === "error" && (
          <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            The audit request could not be sent. Please try again.
          </p>
        )}
        <Button type="submit" shine disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Request My Review"}
        </Button>
      </form>

      <motion.aside
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass motion-surface p-6 sm:p-8 lg:sticky lg:top-24"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-soft">
          Client-side review checklist
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-cream">
          What we'll review first
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-cream/65">
          Enter a full URL to prepare the checklist. This is a transparent review
          guide, not a pretend automated score.
        </p>
        {isValidUrl(form.websiteUrl) ? (
          <motion.ul
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            className="mt-6 space-y-3"
          >
            {auditChecklist.map((item, index) => (
              <motion.li
                key={item}
                initial={reduce ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.055 }}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-semibold ${
                  areaConcerns.includes(item)
                    ? "border-lemon/35 bg-lemon/10 text-cream"
                    : "border-white/10 bg-white/[0.03] text-cream/80"
                }`}
              >
                <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-full bg-lemon/10 text-lemon">✓</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <div className="mt-6 rounded-xl border border-dashed border-white/15 p-6 text-center text-sm text-cream/45">
            The checklist appears after a valid URL is entered.
          </div>
        )}
      </motion.aside>
    </div>
  );
}

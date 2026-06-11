import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { submitNetlifyForm } from "../../utils/netlifyForms";
import { Field, inputCls } from "./FormField";
import Button from "../ui/Button";

const projectTypes = [
  "New website build",
  "Website redesign",
  "Website transfer",
  "Manage my existing site",
  "Domain help",
  "Something custom",
];
const budgets = ["Under $500", "$500–$1,500", "$1,500–$5,000", "$5,000+", "Not sure yet"];
const timelines = ["ASAP", "2–4 weeks", "1–2 months", "Flexible"];
const contactMethods = ["Email", "Phone call", "Text message"];

const typeFromQuery: Record<string, string> = {
  transfer: "Website transfer",
  manage: "Manage my existing site",
  domain: "Domain help",
  redesign: "Website redesign",
};

export default function ContactForm() {
  const [params] = useSearchParams();
  const preService = params.get("service") || params.get("package") || "";
  const preType = typeFromQuery[params.get("type") || ""] || "";

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    projectType: preType || projectTypes[0],
    budget: budgets[0],
    timeline: timelines[0],
    contactMethod: contactMethods[0],
    message: preService ? `I'm interested in: ${preService}\n\n` : "",
    "bot-field": "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Please enter a valid email address.";
    if (!form.message.trim()) errs.message = "Please describe your project so we can help.";
    setErrors(errs);
    if (Object.keys(errs).length > 0 || form["bot-field"]) return;

    setStatus("sending");
    const ok = await submitNetlifyForm("start-project", form);
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div role="status" className="glass p-10 text-center">
        <span aria-hidden="true" className="text-5xl">🍋</span>
        <h3 className="mt-4 font-display text-2xl font-bold text-cream">Request received!</h3>
        <p className="mx-auto mt-2 max-w-md text-cream/70">
          Thanks, {form.name.split(" ")[0]}. We'll review your project and reach out by{" "}
          {form.contactMethod.toLowerCase()} soon — usually within one business day.
        </p>
      </div>
    );
  }

  return (
    <form name="start-project" onSubmit={handleSubmit} noValidate className="glass space-y-5 p-6 sm:p-8">
      <p hidden aria-hidden="true">
        <label>
          Don't fill this out: <input name="bot-field" value={form["bot-field"]} onChange={(e) => set("bot-field", e.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" htmlFor="name" required error={errors.name}>
          <input id="name" className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" placeholder="Alex Lemon" />
        </Field>
        <Field label="Email" htmlFor="email" required error={errors.email}>
          <input id="email" type="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@business.com" />
        </Field>
        <Field label="Phone" htmlFor="phone">
          <input id="phone" type="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="(555) 555-5555" />
        </Field>
        <Field label="Business name" htmlFor="business">
          <input id="business" className={inputCls} value={form.business} onChange={(e) => set("business", e.target.value)} placeholder="Your Business LLC" />
        </Field>
        <Field label="What do you need?" htmlFor="projectType">
          <select id="projectType" className={inputCls} value={form.projectType} onChange={(e) => set("projectType", e.target.value)}>
            {projectTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Budget range" htmlFor="budget">
          <select id="budget" className={inputCls} value={form.budget} onChange={(e) => set("budget", e.target.value)}>
            {budgets.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Timeline" htmlFor="timeline">
          <select id="timeline" className={inputCls} value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
            {timelines.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Preferred contact method" htmlFor="contactMethod">
          <select id="contactMethod" className={inputCls} value={form.contactMethod} onChange={(e) => set("contactMethod", e.target.value)}>
            {contactMethods.map((m) => <option key={m}>{m}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Tell us about your project" htmlFor="message" required error={errors.message}>
        <textarea id="message" rows={5} className={inputCls} value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="What does your business do? What should your website include?" />
      </Field>
      <p className="text-xs text-cream/50">
        Have files to share (logo, photos, current site)? Mention them here — we'll send you a secure upload link after we connect.
      </p>
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          Something went wrong sending your request. Please try again, or email us directly.
        </p>
      )}
      <Button type="submit" shine className="w-full sm:w-auto">
        {status === "sending" ? "Sending…" : "Send My Project Request"}
      </Button>
    </form>
  );
}

import { FormEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { projects } from "../../data/projects";
import { getServiceById } from "../../data/services";
import { submitNetlifyForm } from "../../utils/netlifyForms";
import { Field, inputCls } from "../forms/FormField";
import Button from "../ui/Button";
import MockupLivePreview from "./MockupLivePreview";
import MockupSummaryCard from "./MockupSummaryCard";
import {
  budgetOptions, businessTypes, emptyMockup, featureOptions,
  pageOptions, styles, timelineOptions, type MockupRequest,
} from "./mockupOptions";

function CheckboxGroup({
  id, legend, options, selected, onToggle,
}: { id: string; legend: string; options: string[]; selected: string[]; onToggle: (v: string) => void }) {
  return (
    <fieldset id={id} tabIndex={-1}>
      <legend className="mb-2 text-sm font-semibold text-cream/90">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = selected.includes(opt);
          return (
            <label
              key={opt}
              className={`focus-within:ring-2 focus-within:ring-lemon cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                active ? "border-lemon bg-lemon/15 text-lemon" : "border-white/15 text-cream/70 hover:border-white/35"
              }`}
            >
              <input type="checkbox" className="sr-only" checked={active} onChange={() => onToggle(opt)} />
              {active && <span aria-hidden="true" className="mr-1">✓</span>}
              {opt}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function MockupBuilderForm() {
  const [params] = useSearchParams();
  const selectedService = getServiceById(params.get("service") || undefined);
  const [form, setForm] = useState<MockupRequest>({
    ...emptyMockup,
    inspiration: params.get("inspiration") || "",
    description: selectedService ? `Service direction: ${selectedService.title}\n\n` : "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const set = <K extends keyof MockupRequest>(key: K, value: MockupRequest[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const toggle = (key: "pages" | "features", v: string) =>
    setForm((f) => ({
      ...f,
      [key]: f[key].includes(v) ? f[key].filter((x) => x !== v) : [...f[key], v],
    }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.businessName.trim()) errs.businessName = "Please enter your business name.";
    if (!form.contactName.trim()) errs.contactName = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = "Please enter a valid email address.";
    if (form.pages.length === 0) errs.pages = "Pick at least one page.";
    setErrors(errs);
    if (Object.keys(errs).length > 0 || honeypot) {
      const errorIds: Record<string, string> = {
        businessName: "businessName",
        contactName: "contactName",
        email: "mockupEmail",
        pages: "pages",
      };
      document.getElementById(errorIds[Object.keys(errs)[0]])?.focus();
      return;
    }
    setSubmitted(true);
    // Keep a local copy so nothing is lost (also ready for future backend integration)
    try {
      localStorage.setItem("lemonmade-mockup-request", JSON.stringify(form));
    } catch { /* storage unavailable */ }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function send() {
    setSending(true);
    const ok = await submitNetlifyForm("mockup-builder", {
      businessName: form.businessName,
      businessType: form.businessType,
      colors: form.colors,
      style: form.style,
      pages: form.pages.join(", "),
      features: form.features.join(", "),
      inspiration: form.inspiration,
      description: form.description,
      budget: form.budget,
      timeline: form.timeline,
      contactName: form.contactName,
      email: form.email,
      phone: form.phone,
    });
    setSending(false);
    setSent(ok);
    if (!ok) alert("Sending failed — please use Copy My Request and email it to us instead.");
  }

  if (submitted) {
    return (
      <div className="grid gap-7 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-6">
          <MockupSummaryCard request={form} sent={sent} onSend={send} sending={sending} />
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="focus-ring rounded-full text-sm font-medium text-electric-soft hover:text-electric"
          >
            ← Edit my request
          </button>
        </div>
        <MockupLivePreview request={form} />
      </div>
    );
  }

  return (
    <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
    <form name="mockup-builder" method="POST" data-netlify="true" onSubmit={handleSubmit} noValidate className="glass space-y-7 p-6 sm:p-8">
      <input type="hidden" name="form-name" value="mockup-builder" />
      <p hidden aria-hidden="true">
        <label>
          Don't fill this out: <input name="bot-field" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name" htmlFor="businessName" required error={errors.businessName}>
          <input id="businessName" className={inputCls} value={form.businessName} onChange={(e) => set("businessName", e.target.value)} placeholder="Sunny Side Bakery" />
        </Field>
        <Field label="Business type" htmlFor="businessType">
          <select id="businessType" className={inputCls} value={form.businessType} onChange={(e) => set("businessType", e.target.value)}>
            {businessTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
        <Field label="Preferred colors" htmlFor="colors">
          <input id="colors" className={inputCls} value={form.colors} onChange={(e) => set("colors", e.target.value)} placeholder="e.g. yellow & navy, or 'surprise me'" />
        </Field>
        <Field label="Website style" htmlFor="style">
          <select id="style" className={inputCls} value={form.style} onChange={(e) => set("style", e.target.value)}>
            {styles.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
      </div>

      <CheckboxGroup id="pages" legend="Which pages do you need?" options={pageOptions} selected={form.pages} onToggle={(v) => toggle("pages", v)} />
      {errors.pages && <p role="alert" className="-mt-4 text-sm text-red-300">{errors.pages}</p>}

      <CheckboxGroup id="features" legend="Which features do you want?" options={featureOptions} selected={form.features} onToggle={(v) => toggle("features", v)} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Inspiration from our work (optional)" htmlFor="inspiration">
          <select id="inspiration" className={inputCls} value={form.inspiration} onChange={(e) => set("inspiration", e.target.value)}>
            <option value="">No preference</option>
            {projects.map((p) => <option key={p.title} value={p.title}>{p.title}</option>)}
          </select>
        </Field>
        <Field label="Budget range" htmlFor="mockupBudget">
          <select id="mockupBudget" className={inputCls} value={form.budget} onChange={(e) => set("budget", e.target.value)}>
            {budgetOptions.map((b) => <option key={b}>{b}</option>)}
          </select>
        </Field>
        <Field label="Timeline" htmlFor="mockupTimeline">
          <select id="mockupTimeline" className={inputCls} value={form.timeline} onChange={(e) => set("timeline", e.target.value)}>
            {timelineOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </Field>
      </div>

      <Field label="Describe your dream website" htmlFor="description">
        <textarea id="description" rows={4} className={inputCls} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Tell us the vibe, the goal, and anything you love or hate." />
      </Field>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field label="Your name" htmlFor="contactName" required error={errors.contactName}>
          <input id="contactName" className={inputCls} value={form.contactName} onChange={(e) => set("contactName", e.target.value)} autoComplete="name" placeholder="Alex Lemon" />
        </Field>
        <Field label="Email" htmlFor="mockupEmail" required error={errors.email}>
          <input id="mockupEmail" type="email" className={inputCls} value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" placeholder="you@business.com" />
        </Field>
        <Field label="Phone (optional)" htmlFor="mockupPhone">
          <input id="mockupPhone" type="tel" className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} autoComplete="tel" placeholder="(555) 555-5555" />
        </Field>
      </div>

      <Button type="submit" shine className="w-full sm:w-auto">Build My Mockup Summary</Button>
    </form>
    <MockupLivePreview request={form} />
    </div>
  );
}

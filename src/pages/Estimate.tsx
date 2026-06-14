import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import { Field, inputCls } from "../components/forms/FormField";
import {
  calculateEstimate,
  packageForServiceId,
  type DesignComplexity,
  type EstimatorServiceType,
} from "../data/estimatorLogic";
import { getServiceById } from "../data/services";
import { submitNetlifyForm } from "../utils/netlifyForms";
import usePageMeta from "../utils/usePageMeta";

const serviceTypes: Array<{ value: EstimatorServiceType; label: string }> = [
  { value: "landing-page", label: "Landing Page" },
  { value: "small-business", label: "Small Business Website" },
  { value: "premium-redesign", label: "Premium / Redesign" },
];

const featureOptions = [
  "Gallery",
  "Blog",
  "Testimonials",
  "Newsletter",
  "File upload",
  "Client portal",
];

const includedPages: Record<EstimatorServiceType, number> = {
  "landing-page": 1,
  "small-business": 5,
  "premium-redesign": 7,
};

interface EstimateFormState {
  serviceType: EstimatorServiceType;
  pages: number;
  designComplexity: DesignComplexity;
  features: string[];
  timelineUrgency: "standard" | "rush";
  ecommerce: boolean;
  advancedAnimations: boolean;
  bookingPayment: boolean;
  domainHelp: boolean;
  redesign: boolean;
  monthlyManagement: boolean;
  name: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
  "bot-field": string;
}
export default function Estimate() {
  const [params] = useSearchParams();
  const serviceId = params.get("service") || undefined;
  const selectedService = getServiceById(serviceId);
  const initialServiceType = packageForServiceId(serviceId);
  const reduce = useReducedMotion();

  usePageMeta(
    "Project Estimate",
    "Build a transparent starter estimate for a LemonMade website, redesign, landing page, or service add-on."
  );

  const [form, setForm] = useState<EstimateFormState>({
    serviceType: initialServiceType,
    pages: includedPages[initialServiceType],
    designComplexity:
      selectedService?.estimatedComplexity === "Advanced"
        ? "advanced"
        : selectedService?.estimatedComplexity === "Focused"
          ? "simple"
          : "standard",
    features: [],
    timelineUrgency: "standard",
    ecommerce: serviceId === "ecommerce-setup",
    advancedAnimations: false,
    bookingPayment: serviceId === "booking-contact-forms",
    domainHelp:
      serviceId === "domain-search-setup" || serviceId === "domain-transfer-help",
    redesign: serviceId === "website-redesign",
    monthlyManagement:
      serviceId === "website-management" || serviceId === "website-maintenance",
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
    "bot-field": "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const estimate = useMemo(
    () =>
      calculateEstimate({
        serviceType: form.redesign ? "premium-redesign" : form.serviceType,
        pages: Math.max(1, form.pages),
        designComplexity: form.designComplexity,
        features: form.features,
        ecommerce: form.ecommerce,
        advancedAnimations: form.advancedAnimations,
        bookingPayment: form.bookingPayment,
        domainHelp: form.domainHelp,
        rush: form.timelineUrgency === "rush",
        monthlyManagement: form.monthlyManagement,
      }),
    [form]
  );

  const set = <K extends keyof EstimateFormState>(
    key: K,
    value: EstimateFormState[K]
  ) => setForm((current) => ({ ...current, [key]: value }));

  const toggleFeature = (feature: string) =>
    set(
      "features",
      form.features.includes(feature)
        ? form.features.filter((value) => value !== feature)
        : [...form.features, feature]
    );

  function estimateText() {
    return [
      `LemonMade starter estimate for ${form.businessName || "my project"}`,
      `Suggested package: ${estimate.suggestedPackage}`,
      `Estimated range: ${estimate.estimatedRange}`,
      `Timeline: ${estimate.timeline}`,
      estimate.monthlyManagement
        ? `Monthly management: ${estimate.monthlyManagement}`
        : "",
      `Pages: ${form.pages}`,
      `Design complexity: ${form.designComplexity}`,
      form.features.length > 0 ? `Features: ${form.features.join(", ")}` : "",
      "This is a starter estimate, not a final invoice. LemonMade Designs confirms pricing after reviewing your project.",
    ]
      .filter(Boolean)
      .join("\n");
  }

  async function copyEstimate() {
    try {
      await navigator.clipboard.writeText(estimateText());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
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
      document.getElementById(`estimate-${Object.keys(nextErrors)[0]}`)?.focus();
      return;
    }

    setStatus("sending");
    const ok = await submitNetlifyForm("project-estimate", {
      sourceServiceId: serviceId || "",
      serviceType: form.serviceType,
      pages: String(form.pages),
      designComplexity: form.designComplexity,
      features: form.features.join(", "),
      timelineUrgency: form.timelineUrgency,
      ecommerce: form.ecommerce ? "Yes" : "No",
      advancedAnimations: form.advancedAnimations ? "Yes" : "No",
      bookingPayment: form.bookingPayment ? "Yes" : "No",
      domainHelp: form.domainHelp ? "Yes" : "No",
      redesign: form.redesign ? "Yes" : "No",
      monthlyManagement: form.monthlyManagement ? "Yes" : "No",
      estimatedRange: estimate.estimatedRange,
      suggestedPackage: estimate.suggestedPackage,
      estimatedTimeline: estimate.timeline,
      name: form.name,
      email: form.email,
      phone: form.phone,
      businessName: form.businessName,
      message: form.message,
    });
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <div role="status" className="glass p-9 text-center sm:p-12">
          <span aria-hidden="true" className="text-5xl">🍋</span>
          <h1 className="mt-4 font-display text-3xl font-bold text-cream">
            Quote request submitted.
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-cream/70">
            LemonMade Designs will follow up with next steps.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button to="/services" variant="secondary">View Services</Button>
            <Button to="/contact" variant="ghost">Contact LemonMade</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <SectionHeading
        eyebrow="Project estimator"
        title="Build Your Starter Estimate."
        subtitle="Choose the project shape and upgrades. The range updates immediately, then LemonMade confirms the final quote after review."
        headingLevel="h1"
      />

      <div className="grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <form
          name="project-estimate"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          noValidate
          className="glass space-y-8 p-6 sm:p-8"
        >
          <input type="hidden" name="form-name" value="project-estimate" />
          <input type="hidden" name="sourceServiceId" value={serviceId || ""} />
          <input type="hidden" name="estimatedRange" value={estimate.estimatedRange} />
          <input type="hidden" name="suggestedPackage" value={estimate.suggestedPackage} />
          <input type="hidden" name="estimatedTimeline" value={estimate.timeline} />
          <p hidden aria-hidden="true">
            <label>
              Don't fill this out:
              <input
                name="bot-field"
                value={form["bot-field"]}
                onChange={(event) => set("bot-field", event.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </p>

          {selectedService && (
            <div className="rounded-xl border border-electric/25 bg-electric/10 px-4 py-3 text-sm text-electric-soft">
              Prefilled from <strong>{selectedService.title}</strong>. Adjust anything below.
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Service type" htmlFor="estimate-serviceType">
              <select
                id="estimate-serviceType"
                name="serviceType"
                className={inputCls}
                value={form.serviceType}
                onChange={(event) => set("serviceType", event.target.value as EstimatorServiceType)}
              >
                {serviceTypes.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Number of pages" htmlFor="estimate-pages">
              <input
                id="estimate-pages"
                name="pages"
                type="number"
                min={1}
                max={50}
                className={inputCls}
                value={form.pages}
                onChange={(event) => set("pages", Math.max(1, Number(event.target.value) || 1))}
              />
            </Field>
            <Field label="Design complexity" htmlFor="estimate-designComplexity">
              <select
                id="estimate-designComplexity"
                name="designComplexity"
                className={inputCls}
                value={form.designComplexity}
                onChange={(event) => set("designComplexity", event.target.value as DesignComplexity)}
              >
                <option value="simple">Simple and focused</option>
                <option value="standard">Standard custom design</option>
                <option value="advanced">Advanced visual direction</option>
              </select>
            </Field>
            <Field label="Timeline urgency" htmlFor="estimate-timelineUrgency">
              <select
                id="estimate-timelineUrgency"
                name="timelineUrgency"
                className={inputCls}
                value={form.timelineUrgency}
                onChange={(event) => set("timelineUrgency", event.target.value as "standard" | "rush")}
              >
                <option value="standard">Standard timeline</option>
                <option value="rush">Rush timeline × 1.25</option>
              </select>
            </Field>
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-cream/90">Supporting features</legend>
            <div className="flex flex-wrap gap-2">
              {featureOptions.map((feature) => {
                const checked = form.features.includes(feature);
                return (
                  <label
                    key={feature}
                    className={`focus-within:ring-2 focus-within:ring-lemon rounded-full border px-4 py-2 text-sm font-medium ${
                      checked
                        ? "border-lemon bg-lemon/15 text-lemon"
                        : "border-white/15 text-cream/70"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="features"
                      value={feature}
                      checked={checked}
                      onChange={() => toggleFeature(feature)}
                      className="sr-only"
                    />
                    {feature}
                  </label>
                );
              })}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-cream/90">Project upgrades</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["ecommerce", "E-commerce +$400+", form.ecommerce],
                ["advancedAnimations", "Advanced animations +$200+", form.advancedAnimations],
                ["bookingPayment", "Booking/payment +$150+", form.bookingPayment],
                ["domainHelp", "Domain/transfer +$75+", form.domainHelp],
                ["redesign", "Redesign instead of new build", form.redesign],
                ["monthlyManagement", "Monthly management from $99/mo", form.monthlyManagement],
              ].map(([key, label, checked]) => (
                <label
                  key={String(key)}
                  className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-cream/80"
                >
                  <input
                    type="checkbox"
                    name={String(key)}
                    checked={Boolean(checked)}
                    onChange={(event) =>
                      set(
                        key as
                          | "ecommerce"
                          | "advancedAnimations"
                          | "bookingPayment"
                          | "domainHelp"
                          | "redesign"
                          | "monthlyManagement",
                        event.target.checked
                      )
                    }
                    className="mt-0.5 h-4 w-4 accent-lemon"
                  />
                  {String(label)}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name" htmlFor="estimate-name" required error={errors.name}>
              <input id="estimate-name" name="name" className={inputCls} value={form.name} onChange={(event) => set("name", event.target.value)} autoComplete="name" />
            </Field>
            <Field label="Email" htmlFor="estimate-email" required error={errors.email}>
              <input id="estimate-email" name="email" type="email" className={inputCls} value={form.email} onChange={(event) => set("email", event.target.value)} autoComplete="email" />
            </Field>
            <Field label="Phone" htmlFor="estimate-phone">
              <input id="estimate-phone" name="phone" type="tel" className={inputCls} value={form.phone} onChange={(event) => set("phone", event.target.value)} autoComplete="tel" />
            </Field>
            <Field label="Business name" htmlFor="estimate-businessName">
              <input id="estimate-businessName" name="businessName" className={inputCls} value={form.businessName} onChange={(event) => set("businessName", event.target.value)} />
            </Field>
          </div>
          <Field label="Project notes" htmlFor="estimate-message">
            <textarea id="estimate-message" name="message" rows={4} className={inputCls} value={form.message} onChange={(event) => set("message", event.target.value)} placeholder="Goals, content readiness, deadlines, or special requirements." />
          </Field>

          {status === "error" && (
            <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
              The estimate request could not be sent. Your answers are still here.
            </p>
          )}
          <div className="flex flex-wrap gap-3">
            <Button type="submit" shine disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Submit Estimate Request"}
            </Button>
            <Button onClick={copyEstimate} variant="ghost">
              {copied ? "Estimate Copied" : "Copy Estimate"}
            </Button>
          </div>
        </form>

        <motion.aside
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass motion-surface overflow-hidden lg:sticky lg:top-24"
        >
          <div className="border-b border-white/10 bg-gradient-to-br from-lemon/15 via-electric/10 to-transparent p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-soft">
              Starter estimate
            </p>
            <p className="mt-3 font-display text-4xl font-bold text-lemon">
              {estimate.estimatedRange}
            </p>
            <p className="mt-2 text-lg font-semibold text-cream">{estimate.suggestedPackage}</p>
            <p className="mt-1 text-sm text-cream/65">{estimate.timeline}</p>
            {estimate.monthlyManagement && (
              <p className="mt-3 text-sm font-semibold text-leaf">{estimate.monthlyManagement}</p>
            )}
          </div>
          <div className="space-y-6 p-7">
            <div>
              <h2 className="font-display text-xl font-bold text-cream">What affects final price</h2>
              <ul className="mt-3 space-y-2">
                {estimate.affectsFinalPrice.map((factor) => (
                  <li key={factor} className="flex gap-2 text-sm text-cream/70">
                    <span aria-hidden="true" className="text-leaf">✓</span>
                    {factor}
                  </li>
                ))}
              </ul>
            </div>
            <p className="rounded-xl border border-lemon/20 bg-lemon/5 p-4 text-sm leading-relaxed text-cream/75">
              This is a starter estimate, not a final invoice. LemonMade Designs confirms pricing after reviewing your project.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                to={`/mockup-builder${serviceId ? `?service=${encodeURIComponent(serviceId)}` : ""}`}
                variant="secondary"
              >
                Build Mockup
              </Button>
              <Button to="/contact" variant="ghost">Contact LemonMade</Button>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

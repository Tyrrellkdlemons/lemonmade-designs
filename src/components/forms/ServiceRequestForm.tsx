import { FormEvent, useMemo, useState } from "react";
import type { Service } from "../../data/services";
import {
  serviceFormFields,
  type ServiceFieldDefinition,
} from "../../data/serviceFormFields";
import { submitNetlifyForm } from "../../utils/netlifyForms";
import Button from "../ui/Button";
import { Field, inputCls } from "./FormField";

const budgets = ["Under $500", "$500-$1,500", "$1,500-$5,000", "$5,000+", "Not sure yet"];
const timelines = ["ASAP", "2-4 weeks", "1-2 months", "Flexible"];
const contactMethods = ["Email", "Phone call", "Text message"];

type FormValue = string | string[];
type FormState = Record<string, FormValue>;

function formNameForService(service: Service): string {
  if (service.formType === "websiteRedesign") return "redesign-request";
  if (service.formType === "websiteManagement") return "management-request";
  return "service-request";
}

function fieldId(name: string): string {
  return `service-${name}`;
}

function initialConditionalValues(fields: ServiceFieldDefinition[]): FormState {
  return Object.fromEntries(
    fields.map((field) => [
      field.name,
      field.kind === "checkboxes" ? [] : field.kind === "select" ? field.options?.[0] || "" : "",
    ])
  );
}

export default function ServiceRequestForm({ service }: { service: Service }) {
  const fields = useMemo(() => serviceFormFields[service.formType], [service.formType]);
  const formName = formNameForService(service);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    currentWebsiteUrl: "",
    budget: budgets[0],
    timeline: timelines[0],
    message: "",
    preferredContactMethod: contactMethods[0],
    "bot-field": "",
    ...initialConditionalValues(fields),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const set = (name: string, value: FormValue) =>
    setForm((current) => ({ ...current, [name]: value }));

  const toggle = (name: string, option: string) => {
    const selected = Array.isArray(form[name]) ? (form[name] as string[]) : [];
    set(
      name,
      selected.includes(option)
        ? selected.filter((value) => value !== option)
        : [...selected, option]
    );
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    const value = (name: string) => String(form[name] || "").trim();

    for (const field of fields) {
      const fieldValue = form[field.name];
      if (
        field.required &&
        (Array.isArray(fieldValue) ? fieldValue.length === 0 : !String(fieldValue || "").trim())
      ) {
        nextErrors[field.name] = `${field.label} is required.`;
      }
    }
    if (!value("name")) nextErrors.name = "Please tell us your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value("email"))) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (value("currentWebsiteUrl") && !/^https?:\/\/\S+\.\S+/i.test(value("currentWebsiteUrl"))) {
      nextErrors.currentWebsiteUrl = "Use a full URL beginning with http:// or https://.";
    }
    if (!value("message")) nextErrors.message = "Tell us what you want to accomplish.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || value("bot-field")) {
      document.getElementById(fieldId(Object.keys(nextErrors)[0]))?.focus();
      return;
    }

    setStatus("sending");
    const payload = Object.fromEntries(
      Object.entries(form).map(([key, fieldValue]) => [
        key,
        Array.isArray(fieldValue) ? fieldValue.join(", ") : fieldValue,
      ])
    ) as Record<string, string>;
    const ok = await submitNetlifyForm(formName, {
      ...payload,
      serviceId: service.id,
      serviceTitle: service.title,
      sourcePage: `/request/${service.id}`,
      estimatedRange: service.priceRange,
    });
    setStatus(ok ? "success" : "error");
  }

  if (status === "success") {
    return (
      <div role="status" className="glass p-8 text-center sm:p-10">
        <span aria-hidden="true" className="text-5xl">🍋</span>
        <h2 className="mt-4 font-display text-3xl font-bold text-cream">Request received.</h2>
        <p className="mx-auto mt-3 max-w-xl text-cream/70">
          Your {service.title.toLowerCase()} request is in. LemonMade will review
          the details and reply using your preferred contact method.
        </p>
      </div>
    );
  }

  function renderConditionalField(field: ServiceFieldDefinition) {
    const id = fieldId(field.name);
    const currentValue = form[field.name];

    if (field.kind === "checkboxes") {
      return (
        <fieldset key={field.name} id={id} tabIndex={-1} className="sm:col-span-2">
          <legend className="mb-2 text-sm font-semibold text-cream/90">
            {field.label} {field.required && <span className="text-lemon">*</span>}
          </legend>
          <div className="flex flex-wrap gap-2">
            {field.options?.map((option) => {
              const checked = Array.isArray(currentValue) && currentValue.includes(option);
              return (
                <label
                  key={option}
                  className={`focus-within:ring-2 focus-within:ring-lemon rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                    checked
                      ? "border-lemon bg-lemon/15 text-lemon"
                      : "border-white/15 text-cream/70 hover:border-white/35"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={() => toggle(field.name, option)}
                  />
                  {checked && <span aria-hidden="true" className="mr-1">✓</span>}
                  {option}
                </label>
              );
            })}
          </div>
          {errors[field.name] && (
            <p role="alert" className="mt-2 text-sm text-red-300">{errors[field.name]}</p>
          )}
        </fieldset>
      );
    }

    return (
      <Field
        key={field.name}
        label={field.label}
        htmlFor={id}
        required={field.required}
        error={errors[field.name]}
      >
        {field.kind === "textarea" ? (
          <textarea
            id={id}
            rows={4}
            className={inputCls}
            value={String(currentValue || "")}
            placeholder={field.placeholder}
            onChange={(event) => set(field.name, event.target.value)}
          />
        ) : field.kind === "select" ? (
          <select
            id={id}
            className={inputCls}
            value={String(currentValue || "")}
            onChange={(event) => set(field.name, event.target.value)}
          >
            {field.options?.map((option) => <option key={option}>{option}</option>)}
          </select>
        ) : (
          <input
            id={id}
            type={field.kind}
            className={inputCls}
            value={String(currentValue || "")}
            placeholder={field.placeholder}
            onChange={(event) => set(field.name, event.target.value)}
          />
        )}
      </Field>
    );
  }

  return (
    <form
      name={formName}
      method="POST"
      data-netlify="true"
      onSubmit={handleSubmit}
      noValidate
      className="glass space-y-8 p-6 sm:p-8"
    >
      <input type="hidden" name="form-name" value={formName} />
      <input type="hidden" name="serviceId" value={service.id} />
      <input type="hidden" name="serviceTitle" value={service.title} />
      <input type="hidden" name="sourcePage" value={`/request/${service.id}`} />
      <input type="hidden" name="estimatedRange" value={service.priceRange} />
      <p hidden aria-hidden="true">
        <label>
          Don't fill this out:
          <input
            name="bot-field"
            value={String(form["bot-field"] || "")}
            onChange={(event) => set("bot-field", event.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </p>

      <div>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-soft">
          Your project
        </p>
        <h2 className="mt-2 font-display text-2xl font-bold text-cream">
          Configure {service.title}
        </h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {fields.map(renderConditionalField)}
        </div>
      </div>

      <div className="border-t border-white/10 pt-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-electric-soft">
          Contact and timing
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field label="Name" htmlFor="service-name" required error={errors.name}>
            <input id="service-name" className={inputCls} value={String(form.name)} onChange={(event) => set("name", event.target.value)} autoComplete="name" />
          </Field>
          <Field label="Email" htmlFor="service-email" required error={errors.email}>
            <input id="service-email" type="email" className={inputCls} value={String(form.email)} onChange={(event) => set("email", event.target.value)} autoComplete="email" />
          </Field>
          <Field label="Phone" htmlFor="service-phone">
            <input id="service-phone" type="tel" className={inputCls} value={String(form.phone)} onChange={(event) => set("phone", event.target.value)} autoComplete="tel" />
          </Field>
          <Field label="Business name" htmlFor="service-businessName">
            <input id="service-businessName" className={inputCls} value={String(form.businessName)} onChange={(event) => set("businessName", event.target.value)} />
          </Field>
          <Field label="Current website URL" htmlFor="service-currentWebsiteUrl" error={errors.currentWebsiteUrl}>
            <input id="service-currentWebsiteUrl" type="url" className={inputCls} value={String(form.currentWebsiteUrl)} onChange={(event) => set("currentWebsiteUrl", event.target.value)} placeholder="https://example.com" />
          </Field>
          <Field label="Budget range" htmlFor="service-budget">
            <select id="service-budget" className={inputCls} value={String(form.budget)} onChange={(event) => set("budget", event.target.value)}>
              {budgets.map((option) => <option key={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Timeline" htmlFor="service-timeline">
            <select id="service-timeline" className={inputCls} value={String(form.timeline)} onChange={(event) => set("timeline", event.target.value)}>
              {timelines.map((option) => <option key={option}>{option}</option>)}
            </select>
          </Field>
          <Field label="Preferred contact method" htmlFor="service-preferredContactMethod">
            <select id="service-preferredContactMethod" className={inputCls} value={String(form.preferredContactMethod)} onChange={(event) => set("preferredContactMethod", event.target.value)}>
              {contactMethods.map((option) => <option key={option}>{option}</option>)}
            </select>
          </Field>
        </div>
        <div className="mt-5">
          <Field label="Message" htmlFor="service-message" required error={errors.message}>
            <textarea
              id="service-message"
              rows={5}
              className={inputCls}
              value={String(form.message)}
              onChange={(event) => set("message", event.target.value)}
              placeholder="What result do you want, and what should we know before replying?"
            />
          </Field>
        </div>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-400/40 bg-red-400/10 px-4 py-3 text-sm text-red-200">
          The request could not be sent. Your answers are still here; please try again.
        </p>
      )}
      <Button type="submit" shine disabled={status === "sending"} className="w-full sm:w-auto">
        {status === "sending" ? "Sending..." : "Request This Service"}
      </Button>
    </form>
  );
}

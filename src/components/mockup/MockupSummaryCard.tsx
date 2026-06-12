import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { MockupRequest } from "./mockupOptions";
import Button from "../ui/Button";

interface Props {
  request: MockupRequest;
  sent: boolean;
  onSend: () => void;
  sending: boolean;
}

function buildSummaryText(r: MockupRequest): string {
  return [
    `Website Mockup Request — ${r.businessName || "My Business"}`,
    `Business type: ${r.businessType}`,
    `Style: ${r.style}`,
    `Colors: ${r.colors || "Designer's choice"}`,
    `Pages: ${r.pages.join(", ")}`,
    `Features: ${r.features.join(", ")}`,
    r.inspiration ? `Inspiration: ${r.inspiration}` : "",
    `Budget: ${r.budget} · Timeline: ${r.timeline}`,
    r.description ? `Notes: ${r.description}` : "",
    `Contact: ${r.contactName} · ${r.email}${r.phone ? ` · ${r.phone}` : ""}`,
  ].filter(Boolean).join("\n");
}

export default function MockupSummaryCard({ request, sent, onSend, sending }: Props) {
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  async function copy() {
    try {
      await navigator.clipboard.writeText(buildSummaryText(request));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass overflow-hidden"
    >
      <div className="border-b border-white/10 bg-gradient-to-r from-lemon/15 via-electric/10 to-leaf/10 px-6 py-4">
        <p className="text-xs font-bold uppercase tracking-widest text-electric-soft">Your Mockup Request</p>
        <h3 className="font-display text-2xl font-bold text-cream">
          {request.businessName || "Your Business"} <span aria-hidden="true">🍋</span>
        </h3>
      </div>
      <dl className="grid gap-x-6 gap-y-3 px-6 py-5 text-sm sm:grid-cols-2">
        <div><dt className="font-semibold text-cream/60">Business type</dt><dd className="text-cream">{request.businessType}</dd></div>
        <div><dt className="font-semibold text-cream/60">Style</dt><dd className="text-cream">{request.style}</dd></div>
        <div><dt className="font-semibold text-cream/60">Colors</dt><dd className="text-cream">{request.colors || "Designer's choice"}</dd></div>
        <div><dt className="font-semibold text-cream/60">Budget / Timeline</dt><dd className="text-cream">{request.budget} · {request.timeline}</dd></div>
        <div className="sm:col-span-2"><dt className="font-semibold text-cream/60">Pages</dt><dd className="text-cream">{request.pages.join(" · ")}</dd></div>
        <div className="sm:col-span-2"><dt className="font-semibold text-cream/60">Features</dt><dd className="text-cream">{request.features.join(" · ")}</dd></div>
        {request.inspiration && (
          <div className="sm:col-span-2"><dt className="font-semibold text-cream/60">Inspiration</dt><dd className="text-cream">{request.inspiration}</dd></div>
        )}
        {request.description && (
          <div className="sm:col-span-2"><dt className="font-semibold text-cream/60">Notes</dt><dd className="whitespace-pre-wrap text-cream">{request.description}</dd></div>
        )}
      </dl>
      <div className="flex flex-wrap gap-3 border-t border-white/10 px-6 py-5">
        {sent ? (
          <p role="status" className="flex items-center gap-2 text-sm font-semibold text-leaf">
            ✓ Request sent! We'll email your mockup concept soon.
          </p>
        ) : (
          <Button onClick={onSend} shine disabled={sending}>{sending ? "Sending…" : "Submit Mockup Request"}</Button>
        )}
        <Button onClick={copy} variant="ghost">{copied ? "✓ Copied!" : "Copy My Mockup Request"}</Button>
      </div>
    </motion.div>
  );
}

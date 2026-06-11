import usePageMeta from "../utils/usePageMeta";
import SectionHeading from "../components/ui/SectionHeading";
import ScrollReveal from "../components/animations/ScrollReveal";
import DomainHelpPanel from "../components/ui/DomainHelpPanel";
import CTASection from "../components/ui/CTASection";

const domainServices = [
  { icon: "🛒", title: "Buy a new domain", text: "We help you find and register the perfect name for your brand." },
  { icon: "🔌", title: "Connect an existing domain", text: "Already own a domain? We point it at your new website correctly." },
  { icon: "🔁", title: "Transfer a domain", text: "Moving registrars or owners — handled safely with zero downtime goals." },
  { icon: "🧩", title: "Fix DNS records", text: "A records, CNAMEs, MX records — we untangle DNS so everything works." },
  { icon: "⚡", title: "Connect domain to Netlify", text: "Custom domains on fast, modern Netlify hosting, configured right." },
  { icon: "📧", title: "Set up email forwarding", text: "Get you@yourbusiness.com forwarding to the inbox you already use." },
  { icon: "🔒", title: "SSL / HTTPS setup", text: "The padlock that customers trust — secure connections on every page." },
];

const education = [
  { q: "What is a domain?", a: "Your website's address — like yourbusiness.com. It's the name people type to find you, and it's yours as long as you keep it registered." },
  { q: "What is hosting?", a: "The computer (server) where your website's files live. Good hosting keeps your site fast, secure, and online 24/7." },
  { q: "What is DNS?", a: "The internet's phone book. DNS records tell browsers where your website and email live when someone visits your domain." },
  { q: "What is SSL?", a: "The technology behind the padlock icon and 'https://'. It encrypts traffic so visitor data stays private — and search engines expect it." },
];

export default function Domains() {
  usePageMeta(
    "Domain Help",
    "LemonMade Designs helps customers find, purchase, connect, transfer, and manage domains — including DNS, SSL, email forwarding, and Netlify setup."
  );
  return (
    <>
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <SectionHeading
          eyebrow="Domains"
          title="Your Name. Your Domain. Handled."
          subtitle="We help customers find, purchase, connect, and manage domains — all the technical setup included."
          headingLevel="h1"
        />
        <ScrollReveal>
          <DomainHelpPanel />
        </ScrollReveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" aria-labelledby="domain-services">
        <SectionHeading id="domain-services" eyebrow="What we handle" title="Every Domain Task, Covered." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {domainServices.map((s, i) => (
            <ScrollReveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="glass h-full p-6 transition-colors hover:border-electric/40">
                <span aria-hidden="true" className="text-3xl">{s.icon}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-cream">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6" aria-labelledby="domain-education">
        <SectionHeading
          id="domain-education"
          eyebrow="Plain-English answers"
          title="New to Domains? Start Here."
          subtitle="No jargon, no pressure — just the basics every website owner should know."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {education.map((e, i) => (
            <ScrollReveal key={e.q} delay={(i % 2) * 0.1}>
              <div className="glass h-full border-l-4 border-l-lemon/60 p-6">
                <h3 className="font-display text-lg font-bold text-lemon">{e.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{e.a}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <CTASection
        title="Stuck on something domain-related?"
        subtitle="DNS confusion, expired domains, transfers gone sideways — we've untangled it all. Let us handle it."
      />
    </>
  );
}

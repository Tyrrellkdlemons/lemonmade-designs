import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import ServiceRequestForm from "../components/forms/ServiceRequestForm";
import Button from "../components/ui/Button";
import NotFound from "./NotFound";
import { getServiceById } from "../data/services";
import usePageMeta from "../utils/usePageMeta";

export default function ServiceRequest() {
  const { serviceId } = useParams();
  const service = getServiceById(serviceId);
  const reduce = useReducedMotion();

  usePageMeta(
    service ? `Request ${service.title}` : "Service Not Found",
    service?.fullDescription || "The requested LemonMade service could not be found."
  );

  if (!service) return <NotFound />;

  return (
    <>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <motion.aside
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass motion-surface lg:sticky lg:top-24"
          >
            <div className="border-b border-white/10 bg-gradient-to-br from-lemon/15 via-electric/10 to-transparent p-7">
              <span aria-hidden="true" className="text-5xl">{service.icon}</span>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-electric-soft">
                {service.category} · {service.estimatedComplexity}
              </p>
              <h1 className="mt-2 font-display text-4xl font-bold leading-tight text-cream">
                {service.title}
              </h1>
              <p className="mt-4 leading-relaxed text-cream/75">{service.fullDescription}</p>
            </div>
            <div className="space-y-6 p-7">
              <div>
                <h2 className="font-display text-xl font-bold text-cream">Included direction</h2>
                <ul className="mt-3 space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-cream/75">
                      <span aria-hidden="true" className="text-leaf">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-lemon/20 bg-lemon/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-lemon">Suggested starting point</p>
                <p className="mt-2 text-sm leading-relaxed text-cream/75">{service.suggestedStartingPoint}</p>
              </div>
              {service.exampleProjectUrl && (
                <a
                  href={service.exampleProjectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring inline-flex rounded-full text-sm font-semibold text-electric-soft hover:text-electric"
                >
                  See {service.exampleProjectTitle || "project example"} ↗
                </a>
              )}
            </div>
          </motion.aside>
          <ServiceRequestForm service={service} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6" aria-labelledby="service-next-steps">
        <div className="glass motion-surface p-8 text-center sm:p-10">
          <h2 id="service-next-steps" className="font-display text-3xl font-bold text-cream">
            Choose your next step.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-cream/70">
            Send this request now, sketch the site first, compare real work, or ask a general question.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button to={`/mockup-builder?service=${encodeURIComponent(service.id)}`} shine>
              Build Mockup
            </Button>
            <Button to="/work" variant="secondary">View Work</Button>
            <Button to="/contact" variant="ghost">Contact LemonMade</Button>
            <Link
              to="/services"
              className="focus-ring inline-flex items-center rounded-full px-5 py-3 text-sm font-semibold text-cream/65 hover:text-lemon"
            >
              All Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

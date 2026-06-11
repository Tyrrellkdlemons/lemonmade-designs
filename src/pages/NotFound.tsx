import usePageMeta from "../utils/usePageMeta";
import Button from "../components/ui/Button";

export default function NotFound() {
  usePageMeta("Page Not Found", "That page doesn't exist — head back to LemonMade Designs.");
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <span aria-hidden="true" className="animate-float text-7xl">🍋</span>
      <h1 className="mt-6 font-display text-5xl font-bold text-cream">404 — When life gives you lemons…</h1>
      <p className="mt-4 max-w-md text-cream/70">
        …this page squeezed away. Let's get you back to something fresh.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Button to="/">Back to Home</Button>
        <Button to="/work" variant="secondary">View Our Work</Button>
      </div>
    </section>
  );
}

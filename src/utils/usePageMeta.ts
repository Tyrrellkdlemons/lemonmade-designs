import { useEffect } from "react";

/** Set per-page document title and meta description. */
export default function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} | LemonMade Designs`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", description);
  }, [title, description]);
}

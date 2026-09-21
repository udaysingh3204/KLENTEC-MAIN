import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// The static tags in index.html exist only as a fallback for crawlers that
// don't execute JS (e.g. Facebook/Twitter's OG scrapers). Once React mounts,
// react-helmet-async takes over per-page SEO — remove the static duplicates
// so they don't coexist with (and outrank) the page-specific ones.
document
  .querySelectorAll(
    'head > meta[name="description"], head > meta[property^="og:"], head > meta[name^="twitter:"], head > link[rel="canonical"]'
  )
  .forEach((el) => el.remove());

createRoot(document.getElementById("root")!).render(<App />);

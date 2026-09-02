import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import App from "./App";

const container = document.getElementById("root")!;

/*
 * The prerenderer relocates React 19's hoisted document metadata into <head>
 * and marks each tag data-prerendered. React has no knowledge of those
 * relocated nodes, so on hydration it emits its own copies — leaving two of
 * every <title>, canonical link and meta tag in the DOM, which is exactly the
 * kind of duplication that makes a crawler pick the wrong canonical.
 *
 * Dropping them immediately before hydration keeps exactly one set: the
 * prerendered tags serve crawlers that never run JavaScript, and React owns
 * them from hydration onward.
 */
document.querySelectorAll("head [data-prerendered]").forEach((el) => el.remove());

const app = (
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);

/*
 * Prerendered documents ship real markup inside #root; hydrate it rather than
 * throwing it away and re-rendering from scratch.
 *
 * The test is firstElementChild, not hasChildNodes(). Before prerendering runs
 * — which is every request in dev — #root still contains the literal
 * `<!--app-html-->` placeholder, and a comment counts as a child node. That
 * made hasChildNodes() true against an empty root, so React tried to hydrate
 * nothing and threw a hydration mismatch on every dev page load.
 */
if (container.firstElementChild) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}

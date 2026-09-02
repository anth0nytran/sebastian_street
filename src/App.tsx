import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import Areas from "@/pages/Areas";
import AreaDetail from "@/pages/AreaDetail";
import About from "@/pages/About";
import Reviews from "@/pages/Reviews";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

/**
 * Every route is imported eagerly — deliberately.
 *
 * React.lazy behind a <Suspense> boundary looks like the obvious win here, but
 * it breaks the thing this site exists to do. Under renderToPipeableStream the
 * server flushes the shell with the Suspense FALLBACK inside <main>, then
 * streams the real content into out-of-order <template> blocks that only an
 * inline script swaps in. The prerendered HTML a JS-blind crawler reads — which
 * is every AI answer engine — is therefore a loading spinner where the page
 * should be. Prerendering with lazy routes produces beautiful, empty documents.
 *
 * Splitting is instead done at the vendor level (see manualChunks in
 * vite.config.ts), which is where the actual weight is. The page components
 * themselves are small; route-level chunks would have saved a few KB and cost
 * a round trip on every navigation.
 */
export default function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* One component serves all three service slugs; it resolves
                    its content from data/site.ts by the slug prop. */}
                <Route path="/sell" element={<ServicePage slug="sell" />} />
                <Route path="/buy" element={<ServicePage slug="buy" />} />
                <Route path="/invest" element={<ServicePage slug="invest" />} />
                <Route path="/areas" element={<Areas />} />
                <Route path="/areas/:slug" element={<AreaDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

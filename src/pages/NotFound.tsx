import SEO from "@/hooks/useSEO";
import { FEATURED_AREAS, SERVICES } from "@/data/site";
import { Link } from "react-router-dom";
import { ActionLink, Eyebrow } from "@/components/ui";

export default function NotFound() {
    return (
        <>
            {/* noindex, follow: the page shouldn't be indexed, but crawlers
                should still traverse the recovery links below it. */}
            <SEO title="Page Not Found" description="The page you're looking for doesn't exist." path="/404" noindex />
            <section className="on-dark flex min-h-[80svh] flex-col items-center justify-center bg-black px-6 py-40 text-center">
                <Eyebrow tone="dark" className="mb-6">Error 404</Eyebrow>
                <h1 className="mb-7 text-d1 uppercase text-white">Page Not Found</h1>
                <p className="mx-auto mb-11 max-w-md text-body text-white/50 text-pretty">
                    That page doesn't exist — it may have moved. Here's where most people were headed.
                </p>
                <ActionLink to="/" variant="invert">Back to Home</ActionLink>

                <div className="mt-16 w-full max-w-3xl border-t border-white/10 pt-10">
                    <span className="mb-5 block font-sans text-eyebrow uppercase text-white/35">Services</span>
                    <ul className="mb-10 flex flex-wrap justify-center gap-x-7 gap-y-3">
                        {SERVICES.map((s) => (
                            <li key={s.slug}>
                                <Link to={`/${s.slug}`} className="font-serif text-lg font-black tracking-tight text-white transition-colors hover:text-accent">
                                    {s.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <span className="mb-5 block font-sans text-eyebrow uppercase text-white/35">Service Areas</span>
                    <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
                        {FEATURED_AREAS.map((a) => (
                            <li key={a.slug}>
                                <Link to={`/areas/${a.slug}`} className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-accent">
                                    {a.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}

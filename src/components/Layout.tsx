import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, Phone, Mail, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENT, OFFICE, LINKS, NAV, FEATURED_AREAS } from "@/data/site";
import { EASE } from "./ui";

export default function Layout({ children }: { children: ReactNode }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    // Restore scroll on navigation, but defer to an in-page hash target when
    // one is present — otherwise deep links to #faq land at the top of the page.
    useEffect(() => {
        if (location.hash) {
            const id = window.setTimeout(() => {
                document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" });
            }, 100);
            return () => window.clearTimeout(id);
        }
        window.scrollTo(0, 0);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Lock the page behind the mobile sheet, and let Escape close it.
    useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : "";
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    const isActive = (path: string) =>
        path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

    return (
        <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-black focus:px-5 focus:py-3 focus:text-[0.6875rem] focus:font-black focus:uppercase focus:tracking-[0.2em] focus:text-white"
            >
                Skip to content
            </a>

            {/* ---------------------------------------------------------- NAV
                The bar morphs into a floating pill on scroll. Every animated
                property is listed explicitly rather than using `transition-all`
                so the browser only composites what actually changes. */}
            <nav aria-label="Primary" className="fixed inset-x-0 top-0 z-50">
                <div
                    className="absolute left-1/2 -translate-x-1/2"
                    style={{
                        top: scrolled ? "10px" : "0px",
                        width: scrolled ? "min(62rem, calc(100% - 2rem))" : "100%",
                        height: scrolled ? "54px" : "76px",
                        backgroundColor: scrolled ? "rgba(0,0,0,0.92)" : "transparent",
                        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
                        border: scrolled ? "1px solid rgba(255,255,255,0.10)" : "1px solid transparent",
                        backdropFilter: scrolled ? "blur(24px)" : "none",
                        transition:
                            "background-color 400ms cubic-bezier(0.22,1,0.36,1), backdrop-filter 400ms cubic-bezier(0.22,1,0.36,1), border-color 400ms cubic-bezier(0.22,1,0.36,1), width 900ms cubic-bezier(0.22,1,0.36,1), height 700ms cubic-bezier(0.22,1,0.36,1), top 700ms cubic-bezier(0.22,1,0.36,1), box-shadow 500ms cubic-bezier(0.22,1,0.36,1)",
                    }}
                />

                <div
                    className={cn(
                        "relative z-10 mx-auto flex items-center justify-between transition-all duration-700 ease-morph",
                        scrolled ? "mt-2.5 h-[54px] max-w-4xl px-6" : "h-[76px] max-w-none px-6 md:px-12"
                    )}
                >
                    <Link to="/" onClick={() => setMenuOpen(false)} className="flex flex-col leading-none">
                        <span
                            className={cn(
                                "font-serif font-black uppercase tracking-[0.14em] text-white transition-all duration-700 ease-morph",
                                scrolled ? "text-[0.8125rem]" : "text-base md:text-lg"
                            )}
                        >
                            {AGENT.name}
                        </span>
                        <span
                            className={cn(
                                "font-sans font-bold uppercase tracking-[0.22em] text-white/45 transition-all duration-700 ease-morph",
                                scrolled ? "mt-0.5 text-[0.4375rem]" : "mt-1 text-[0.5rem]"
                            )}
                        >
                            REALTOR® · DRE #{AGENT.dre}
                        </span>
                    </Link>

                    <div className="hidden items-center gap-7 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-white md:flex">
                        {NAV.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={cn(
                                    "group relative transition-colors hover:text-accent",
                                    isActive(item.path) && "text-accent"
                                )}
                            >
                                {item.label}
                                <span
                                    className={cn(
                                        "absolute -bottom-1.5 left-0 h-[2px] bg-accent transition-all duration-300",
                                        isActive(item.path) ? "w-full" : "w-0 group-hover:w-full"
                                    )}
                                />
                            </Link>
                        ))}
                        <Link
                            to="/contact"
                            className={cn(
                                "transition-colors duration-300",
                                scrolled
                                    ? "border border-white/30 px-5 py-2 text-[0.5625rem] text-white hover:bg-white hover:text-black"
                                    : "border border-white bg-white px-5 py-2.5 text-black hover:bg-accent hover:border-accent"
                            )}
                        >
                            Free Valuation
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setMenuOpen(true)}
                        aria-label="Open menu"
                        aria-expanded={menuOpen}
                        className="font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-white md:hidden"
                    >
                        Menu
                    </button>
                </div>
            </nav>

            {/* -------------------------------------------------- MOBILE SHEET */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="on-dark fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-black text-white"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Site menu"
                    >
                        <div className="flex items-center justify-between border-b border-white/10 p-5">
                            <Link to="/" onClick={() => setMenuOpen(false)} className="flex flex-col leading-none">
                                <span className="font-serif text-sm font-black uppercase tracking-[0.14em]">
                                    {AGENT.name}
                                </span>
                                <span className="mt-1 font-sans text-micro uppercase text-white/45">
                                    REALTOR® · DRE #{AGENT.dre}
                                </span>
                            </Link>
                            <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" className="p-1">
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <div className="border-b border-white/10 p-5">
                            {[...NAV, { path: "/reviews", label: "Reviews" }, { path: "/contact", label: "Contact" }].map(
                                (route, i) => (
                                    <motion.div
                                        key={route.path}
                                        initial={{ opacity: 0, x: -15 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.05 + i * 0.05 }}
                                    >
                                        <Link
                                            to={route.path}
                                            onClick={() => setMenuOpen(false)}
                                            className={cn(
                                                "flex items-center justify-between py-3 font-serif text-2xl font-black tracking-tight transition-colors",
                                                isActive(route.path) ? "text-accent" : "hover:text-white/70"
                                            )}
                                        >
                                            {route.label}
                                            <ArrowRight className="h-4 w-4 text-white/25" />
                                        </Link>
                                    </motion.div>
                                )
                            )}
                        </div>

                        <div className="border-b border-white/10 p-5">
                            <span className="mb-3 block font-sans text-eyebrow uppercase text-white/35">
                                Service Areas
                            </span>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                                {FEATURED_AREAS.map((area) => (
                                    <Link
                                        key={area.slug}
                                        to={`/areas/${area.slug}`}
                                        onClick={() => setMenuOpen(false)}
                                        className="py-1 font-sans text-[0.8125rem] font-medium text-white/55 transition-colors hover:text-white"
                                    >
                                        {area.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3 border-b border-white/10 p-5">
                            <span className="mb-3 block font-sans text-eyebrow uppercase text-white/35">
                                Get in Touch
                            </span>
                            <a href={AGENT.phoneHref} className="flex items-center gap-3 font-sans text-sm font-medium">
                                <Phone className="h-3.5 w-3.5 text-accent" /> {AGENT.phone}
                            </a>
                            <a
                                href={`mailto:${AGENT.email}`}
                                className="flex items-center gap-3 break-all font-sans text-sm text-white/55"
                            >
                                <Mail className="h-3.5 w-3.5 flex-shrink-0 text-accent" /> {AGENT.email}
                            </a>
                            <span className="flex items-center gap-3 font-sans text-sm text-white/40">
                                <MapPin className="h-3.5 w-3.5 text-accent" /> {OFFICE.locality}, {OFFICE.region}
                            </span>
                        </div>

                        <div className="mt-auto p-5">
                            <Link
                                to="/contact"
                                onClick={() => setMenuOpen(false)}
                                className="group flex w-full items-center justify-center gap-3 bg-white py-4 font-sans text-[0.6875rem] font-black uppercase tracking-[0.2em] text-black"
                            >
                                Get Free Home Valuation
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ------------------------------------------------ STICKY MOBILE CTA */}
            <div
                className={cn(
                    "fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-editorial md:hidden",
                    scrolled && !menuOpen ? "translate-y-0" : "translate-y-full"
                )}
            >
                <Link
                    to="/contact"
                    className="flex items-center justify-between gap-4 border-t border-white/10 bg-black/95 px-4 py-3 backdrop-blur-md"
                >
                    <span>
                        <span className="mb-0.5 block font-sans text-micro uppercase text-accent">
                            Free · No Obligation
                        </span>
                        <span className="block font-serif text-[0.875rem] font-black tracking-tight text-white">
                            What's Your Home Worth?
                        </span>
                    </span>
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center bg-white text-black">
                        <ArrowRight className="h-4 w-4" />
                    </span>
                </Link>
            </div>

            <main id="main">{children}</main>

            <Footer />
        </div>
    );
}

/* -------------------------------------------------------------------- FOOTER */

function Footer() {
    return (
        <footer className="on-dark relative overflow-hidden border-t border-white/10 bg-neutral-950 text-white">
            <div className="mx-auto max-w-canvas">
                <div className="grid grid-cols-1 border-b border-white/10 md:grid-cols-4">
                    {/* Brand + license block. NAP here is byte-identical to the
                        LocalBusiness schema in index.html — inconsistent NAP is
                        the most common local-SEO own-goal there is. */}
                    <div className="flex flex-col justify-between border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-12">
                        <div>
                            <span className="block font-serif text-xl font-black uppercase tracking-[0.1em]">
                                {AGENT.name}
                            </span>
                            <span className="mt-2 block font-sans text-micro uppercase text-white/40">
                                {AGENT.tagline}
                            </span>
                            <p className="mb-8 mt-6 max-w-sm text-[0.8125rem] font-medium leading-[1.85] text-white/45">
                                Buying, selling and investment representation across Chino Hills and the greater
                                Inland Empire — San Bernardino, Riverside and Los Angeles counties.
                            </p>
                        </div>

                        <div className="space-y-2 border-t border-white/10 pt-6">
                            <p className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em]">
                                {AGENT.name}, {AGENT.title}
                            </p>
                            <p className="font-sans text-[0.625rem] font-medium text-white/35">
                                CA DRE #{AGENT.dre}
                            </p>
                            <p className="font-sans text-[0.625rem] font-medium tracking-wide text-white/35">
                                {AGENT.brokerage}
                            </p>
                        </div>
                    </div>

                    {/* Services */}
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">
                        <FooterHeading>Services</FooterHeading>
                        <ul className="mb-8 space-y-3.5 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-white/70">
                            {[
                                { to: "/sell", label: "Sell Your Home" },
                                { to: "/buy", label: "Buy a Home" },
                                { to: "/invest", label: "Invest" },
                            ].map((l) => (
                                <li key={l.to}>
                                    <FooterLink to={l.to}>{l.label}</FooterLink>
                                </li>
                            ))}
                        </ul>

                        <FooterHeading>More</FooterHeading>
                        <ul className="space-y-3 font-sans text-[0.6875rem] font-medium tracking-wide text-white/45">
                            {[
                                { to: "/about", label: "About Sebastian" },
                                { to: "/reviews", label: "Client Reviews" },
                                { to: "/areas", label: "Service Areas" },
                                { to: "/contact", label: "Free Home Valuation" },
                            ].map((l) => (
                                <li key={l.to}>
                                    <FooterLink to={l.to}>{l.label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Areas */}
                    <div className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:p-10">
                        <FooterHeading>Areas Served</FooterHeading>
                        <ul className="space-y-3 font-sans text-[0.6875rem] font-medium tracking-wide text-white/45">
                            {FEATURED_AREAS.map((area) => (
                                <li key={area.slug}>
                                    <FooterLink to={`/areas/${area.slug}`}>
                                        {area.name}, CA
                                    </FooterLink>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col justify-between p-6 md:p-10">
                        <div>
                            <FooterHeading>Contact</FooterHeading>
                            <div className="mb-6 space-y-3">
                                <a
                                    href={AGENT.phoneHref}
                                    className="flex items-center gap-3 font-serif text-base font-black transition-colors hover:text-accent"
                                >
                                    <Phone className="h-3.5 w-3.5 flex-shrink-0 text-accent" /> {AGENT.phone}
                                </a>
                                <a
                                    href={`mailto:${AGENT.email}`}
                                    className="flex items-start gap-3 break-all font-sans text-[0.8125rem] text-white/45 transition-colors hover:text-white"
                                >
                                    <Mail className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-accent" /> {AGENT.email}
                                </a>
                                <address className="flex items-start gap-3 font-sans text-[0.8125rem] not-italic leading-relaxed text-white/35">
                                    <MapPin className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-accent" />
                                    <span>
                                        {OFFICE.street}
                                        <br />
                                        {OFFICE.locality}, {OFFICE.region} {OFFICE.postalCode}
                                    </span>
                                </address>
                            </div>

                            <div className="border-t border-white/10 pt-5">
                                <span className="mb-1 block font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em]">
                                    Hours
                                </span>
                                <p className="font-sans text-[0.6875rem] font-medium text-white/35">
                                    {AGENT.hours.label}
                                </p>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-4 border-t border-white/10 pt-5">
                                {(
                                    [
                                        ["Zillow", LINKS.zillow],
                                        ["Instagram", LINKS.instagram],
                                        ["LinkedIn", LINKS.linkedin],
                                        ["Facebook", LINKS.facebook],
                                    ] as const
                                ).map(([label, href]) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="font-sans text-[0.625rem] font-bold uppercase tracking-[0.15em] text-white/45 transition-colors hover:text-accent"
                                    >
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>

                        <Link
                            to="/contact"
                            className="group mt-8 flex w-full items-center justify-center gap-2 border border-white/15 py-3.5 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-white hover:text-black"
                        >
                            Free Valuation
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                        </Link>
                    </div>
                </div>

                {/* Watermark. Purely typographic — no image weight, and it scales
                    with the viewport so it never wraps or clips. */}
                <div className="pointer-events-none flex w-full select-none items-center justify-center px-6 pb-10 pt-16">
                    <span
                        className="whitespace-nowrap font-serif font-black leading-none tracking-tighter text-white/[0.045]"
                        style={{ fontSize: "min(12vw, 190px)" }}
                    >
                        {AGENT.name.toUpperCase()}
                    </span>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 bg-black/50 p-6 md:flex-row md:px-12 md:py-8">
                    <p className="text-center font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-white/35 md:text-left">
                        © {new Date().getFullYear()} {AGENT.name} Real Estate · Equal Housing Opportunity
                    </p>
                    <a
                        href="https://quicklaunchweb.us"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em] text-white/35 transition-colors hover:text-white"
                    >
                        Website by <span className="text-white">QuickLaunchWeb</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}

function FooterHeading({ children }: { children: ReactNode }) {
    return (
        <h2 className="mb-6 flex items-center gap-3 font-sans text-eyebrow uppercase text-white/35">
            <span className="h-px w-4 bg-white/25" />
            {children}
        </h2>
    );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
    return (
        <Link to={to} className="group flex items-center gap-2 transition-colors hover:text-white">
            <span className="h-px w-0 bg-white transition-all duration-300 group-hover:w-2" />
            {children}
        </Link>
    );
}

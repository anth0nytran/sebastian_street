import { useSearchParams } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react";
import SEO, { AGENT_ID } from "@/hooks/useSEO";
import { AGENT, OFFICE, LINKS, STATS, SITE_URL } from "@/data/site";
import LeadForm from "@/components/LeadForm";
import type { LeadInterest } from "@/types";
import { Reveal, Eyebrow, ActionAnchor, FaqSection } from "@/components/ui";
import { Backdrop } from "@/components/Backdrop";

/** ?intent= arrives from every service CTA so the form opens pre-scoped. */
const INTENT_MAP: Record<string, { interest: LeadInterest; title: string; subtitle: string }> = {
    sell: {
        interest: "Selling",
        title: "Request Your Free Home Valuation",
        subtitle:
            "Built from closed sales matched to your tract — not a ZIP-code average. Delivered within 24 hours.",
    },
    buy: {
        interest: "Buying",
        title: "Start Your Home Search",
        subtitle:
            "Tell Sebastian what you're looking for. He'll confirm CalHFA Dream For All eligibility before you tour anything.",
    },
    invest: {
        interest: "Just curious",
        title: "Discuss an Investment Strategy",
        subtitle:
            "Cashflow, appreciation or a 1031 exchange — the first conversation defines the thesis before anyone looks at listings.",
    },
};

const DEFAULT_INTENT = {
    interest: "Selling" as LeadInterest,
    title: "Request Your Free Home Valuation",
    subtitle: "Free, no obligation, and Sebastian responds personally within one business day.",
};

const CONTACT_FAQS = [
    {
        q: "How quickly will Sebastian respond?",
        a: "Within one business day for every request submitted through this site, and usually the same day. For anything time-sensitive — an offer deadline, an inspection contingency expiring — call or text (626) 632-2559 directly rather than using the form.",
    },
    {
        q: "Is the home valuation really free?",
        a: "Yes. There is no cost and no obligation to list. The valuation is a written analysis built from closed comparable sales matched to your specific tract, delivered within 24 hours. Plenty of people request one simply to understand their equity position with no intention of selling, and that is a completely normal reason to ask.",
    },
    {
        q: "What are your office hours?",
        a: `${AGENT.hours.label}. The office is located at ${OFFICE.street}, ${OFFICE.locality}, ${OFFICE.region} ${OFFICE.postalCode}. Appointments outside those hours can be arranged — call or text to schedule.`,
    },
    {
        q: "Do I have to commit to anything to talk?",
        a: "No. An initial conversation involves no agreement of any kind. Buyer representation in California does require a written agreement before touring homes, and Sebastian will walk through exactly what it says before you sign — but you can talk through your situation, get a valuation, or ask questions with nothing signed.",
    },
];

export default function Contact() {
    const [params] = useSearchParams();
    const intent = INTENT_MAP[params.get("intent") ?? ""] ?? DEFAULT_INTENT;

    return (
        <>
            <SEO
                title={`Contact ${AGENT.name} — Free Home Valuation`}
                description={`Contact Sebastian Street, REALTOR® (DRE #${AGENT.dre}) in Chino, CA. Free written home valuation in 24 hours for Chino Hills and the greater Inland Empire. Call ${AGENT.phone}.`}
                path="/contact"
                breadcrumbs={[{ name: "Contact", path: "/contact" }]}
                faqs={CONTACT_FAQS}
                extraGraph={[
                    {
                        "@type": "ContactPage",
                        "@id": `${SITE_URL}/contact#contactpage`,
                        mainEntity: { "@id": AGENT_ID },
                    },
                    {
                        "@type": "ContactPoint",
                        "@id": `${SITE_URL}/contact#contactpoint`,
                        telephone: AGENT.phoneE164,
                        email: AGENT.email,
                        contactType: "sales",
                        areaServed: "US-CA",
                        availableLanguage: "English",
                    },
                ]}
            />

            {/* ------------------------------------------------------- HERO */}
            <Backdrop ghost="@" className="pb-section-sm pt-36">
                <div className="canvas">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
                        {/* Left: NAP + trust. This block is byte-identical to the
                            LocalBusiness schema — matching NAP across the site,
                            the schema and Google Business Profile is the single
                            highest-leverage local ranking factor there is. */}
                        <Reveal y={16}>
                            <Eyebrow tone="dark" className="mb-6">
                                Chino Hills · Greater Inland Empire
                            </Eyebrow>
                            <h1 className="mb-7 text-d1 uppercase text-white text-balance">
                                Let's talk.
                            </h1>
                            <p className="mb-11 max-w-lg text-[clamp(1rem,0.95rem+0.25vw,1.1875rem)] leading-[1.72] text-white/60 text-pretty">
                                Whether you're ready to list, just starting to look, or only want to know where
                                your equity stands — send a note or call directly. No pitch attached.
                            </p>

                            <dl className="space-y-6 border-t border-white/10 pt-9">
                                <ContactRow icon={Phone} term="Call or Text">
                                    <a
                                        href={AGENT.phoneHref}
                                        className="font-serif text-xl font-black tracking-tight text-white transition-colors hover:text-accent"
                                    >
                                        {AGENT.phone}
                                    </a>
                                </ContactRow>

                                <ContactRow icon={Mail} term="Email">
                                    <a
                                        href={`mailto:${AGENT.email}`}
                                        className="break-all font-sans text-sm font-medium text-white/70 transition-colors hover:text-accent"
                                    >
                                        {AGENT.email}
                                    </a>
                                </ContactRow>

                                <ContactRow icon={MapPin} term="Office">
                                    <address className="font-sans text-sm not-italic leading-relaxed text-white/70">
                                        {OFFICE.street}
                                        <br />
                                        {OFFICE.locality}, {OFFICE.region} {OFFICE.postalCode}
                                    </address>
                                </ContactRow>

                                <ContactRow icon={Clock} term="Hours">
                                    <span className="font-sans text-sm text-white/70">{AGENT.hours.label}</span>
                                </ContactRow>
                            </dl>

                            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-white/10 pt-8">
                                <span className="flex items-center gap-2">
                                    <span className="flex" aria-hidden="true">
                                        {[0, 1, 2, 3, 4].map((i) => (
                                            <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                                        ))}
                                    </span>
                                    <span className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-white/50">
                                        {STATS.rating} · {STATS.reviewCount} reviews
                                    </span>
                                </span>
                                <span className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-white/50">
                                    CA DRE #{AGENT.dre}
                                </span>
                                <span className="font-sans text-[0.5625rem] font-bold uppercase tracking-[0.18em] text-white/50">
                                    {AGENT.brokerage}
                                </span>
                            </div>

                            <div className="mt-9">
                                <ActionAnchor href={LINKS.bookCall} variant="outline-invert" arrow={false}>
                                    Or Book a Strategy Call
                                </ActionAnchor>
                            </div>
                        </Reveal>

                        {/* Right: the form. */}
                        <Reveal delay={0.1} y={16}>
                            <div className="border border-white/10 bg-black/70 p-6 backdrop-blur-sm md:p-10">
                                <LeadForm
                                    tone="dark"
                                    defaultInterest={intent.interest}
                                    source="Contact Page"
                                    title={intent.title}
                                    subtitle={intent.subtitle}
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Backdrop>

            {/* -------------------------------------------------------- FAQ */}
            <FaqSection
                eyebrow="Before You Reach Out"
                title={
                    <>
                        Common
                        <br />
                        questions
                    </>
                }
                note="What happens after you send the form, and what you are and aren't committing to."
                faqs={CONTACT_FAQS}
            />
        </>
    );
}

function ContactRow({
    icon: Icon,
    term,
    children,
}: {
    icon: typeof Phone;
    term: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-start gap-4">
            <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center border border-white/15">
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.5} />
            </span>
            <span>
                <dt className="mb-1.5 font-sans text-micro uppercase text-white/35">
                    {term}
                </dt>
                <dd>{children}</dd>
            </span>
        </div>
    );
}

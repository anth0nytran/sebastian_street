import { useState, type ChangeEvent, type FormEvent } from "react";
import { Loader2, AlertCircle, Check, ArrowRight } from "lucide-react";
import type { LeadPayload, LeadInterest } from "@/types";
import { submitLead, validateLeadData } from "@/services/api";
import { cn } from "@/lib/utils";

interface LeadFormProps {
    /** Ground the form sits on. Controls the entire field palette. */
    tone?: "light" | "dark";
    /** Prefills the interest select from the CTA the visitor arrived through. */
    defaultInterest?: LeadInterest;
    /** Recorded on the Follow Up Boss lead so attribution survives to the CRM. */
    source?: string;
    title?: string;
    subtitle?: string;
}

const TIMEFRAMES = ["ASAP (0–3 months)", "3–6 months", "6–12 months", "Just researching"];

const INTERESTS: { value: LeadInterest; label: string }[] = [
    { value: "Selling", label: "Selling a home" },
    { value: "Buying", label: "Buying a home" },
    { value: "Both", label: "Both selling & buying" },
    { value: "Just curious", label: "Investing / just curious" },
];

export default function LeadForm({
    tone = "dark",
    defaultInterest = "Selling",
    source = "Website",
    title = "Request Your Free Valuation",
    subtitle = "Sebastian personally reviews every request and responds within one business day.",
}: LeadFormProps) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [issues, setIssues] = useState<string[]>([]);
    const [form, setForm] = useState<Partial<LeadPayload>>({ interest: defaultInterest });

    const dark = tone === "dark";

    const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(null);
        if (issues.length) setIssues([]);
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);
        setIssues([]);

        const validation = validateLeadData(form);
        if (!validation.isValid) {
            setIssues(validation.errors);
            return;
        }

        setLoading(true);
        try {
            await submitLead({
                name: form.name || "",
                email: form.email || "",
                phone: form.phone || "",
                interest: (form.interest as LeadInterest) || "Selling",
                address: form.address,
                city: form.city,
                timeframe: form.timeframe,
                message: form.message,
                leadSource: source,
            });
            setSubmitted(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div
                className={cn(
                    "border p-10 text-center md:p-14",
                    dark ? "border-white/10 bg-black text-white" : "border-black/10 bg-white text-black"
                )}
            >
                <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center bg-accent text-black">
                    <Check className="h-6 w-6" strokeWidth={2.5} />
                </div>
                <h3 className="mb-4 font-serif text-d4 uppercase">Request Received</h3>
                <p className={cn("mx-auto max-w-sm text-body", dark ? "text-white/50" : "text-neutral-600")}>
                    Thank you. Sebastian will review your information and reach out personally within one business
                    day.
                </p>
                <button
                    type="button"
                    onClick={() => {
                        setSubmitted(false);
                        setForm({ interest: defaultInterest });
                    }}
                    className={cn(
                        "mt-8 font-sans text-[0.625rem] font-bold uppercase tracking-[0.2em] underline underline-offset-4 transition-colors",
                        dark ? "text-white/40 hover:text-white" : "text-neutral-400 hover:text-black"
                    )}
                >
                    Send another request
                </button>
            </div>
        );
    }

    // Square fields with a bottom-weighted border: the input reads as a ruled
    // line on a form, which is the only treatment that fits a radius-0 system.
    const field = cn(
        "w-full border px-4 py-3.5 font-sans text-sm font-medium transition-colors duration-200",
        "focus:outline-none focus:border-accent",
        dark
            ? "border-white/15 bg-white/[0.03] text-white placeholder:text-white/25 hover:border-white/30"
            : "border-black/15 bg-neutral-50 text-black placeholder:text-neutral-400 hover:border-black/30"
    );

    const label = cn(
        "mb-2 block font-sans text-[0.5625rem] font-bold uppercase tracking-[0.2em]",
        dark ? "text-white/45" : "text-neutral-500"
    );

    const selling = form.interest === "Selling" || form.interest === "Both";

    return (
        <div className={cn(dark ? "on-dark text-white" : "text-black")}>
            <h3 className={cn("mb-3 text-d4 uppercase", dark ? "text-white" : "text-black")}>{title}</h3>
            <p className={cn("mb-8 text-body-sm", dark ? "text-white/45" : "text-neutral-500")}>{subtitle}</p>

            {(error || issues.length > 0) && (
                <div
                    role="alert"
                    className={cn(
                        "mb-6 flex items-start gap-3 border p-4",
                        dark ? "border-red-500/30 bg-red-500/10" : "border-red-200 bg-red-50"
                    )}
                >
                    <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
                    <div className="flex-1 text-[0.8125rem] font-medium text-red-500">
                        {error && <p>{error}</p>}
                        {issues.length > 0 && (
                            <ul className="space-y-1">
                                {issues.map((issue) => (
                                    <li key={issue}>{issue}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div>
                    <label className={label} htmlFor="lead-name">
                        Full Name
                    </label>
                    <input
                        id="lead-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jordan Rivera"
                        className={field}
                        value={form.name || ""}
                        onChange={onChange}
                    />
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label className={label} htmlFor="lead-phone">
                            Phone
                        </label>
                        <input
                            id="lead-phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="(626) 555-0142"
                            className={field}
                            value={form.phone || ""}
                            onChange={onChange}
                        />
                    </div>
                    <div>
                        <label className={label} htmlFor="lead-email">
                            Email
                        </label>
                        <input
                            id="lead-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="you@example.com"
                            className={field}
                            value={form.email || ""}
                            onChange={onChange}
                        />
                    </div>
                </div>

                <div>
                    <label className={label} htmlFor="lead-interest">
                        I'm interested in
                    </label>
                    <select
                        id="lead-interest"
                        name="interest"
                        className={field}
                        value={form.interest}
                        onChange={onChange}
                    >
                        {INTERESTS.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-neutral-900 text-white">
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Selling requires an address to produce a real valuation, so the
                    extra fields appear only for that intent rather than making
                    every buyer fill them in. */}
                {selling && (
                    <div
                        className={cn(
                            "space-y-5 border border-dashed p-5",
                            dark ? "border-white/20 bg-white/[0.02]" : "border-black/15 bg-neutral-50/70"
                        )}
                    >
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            <div>
                                <label className={label} htmlFor="lead-address">
                                    Property Address
                                </label>
                                <input
                                    id="lead-address"
                                    name="address"
                                    type="text"
                                    autoComplete="street-address"
                                    placeholder="1234 Peyton Dr"
                                    className={field}
                                    value={form.address || ""}
                                    onChange={onChange}
                                />
                            </div>
                            <div>
                                <label className={label} htmlFor="lead-city">
                                    City
                                </label>
                                <input
                                    id="lead-city"
                                    name="city"
                                    type="text"
                                    autoComplete="address-level2"
                                    placeholder="Chino Hills"
                                    className={field}
                                    value={form.city || ""}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label className={label} htmlFor="lead-timeframe">
                                Ideal Timeframe
                            </label>
                            <select
                                id="lead-timeframe"
                                name="timeframe"
                                className={field}
                                value={form.timeframe || ""}
                                onChange={onChange}
                            >
                                <option value="" className="bg-neutral-900 text-white">
                                    Select timeframe…
                                </option>
                                {TIMEFRAMES.map((t) => (
                                    <option key={t} value={t} className="bg-neutral-900 text-white">
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={cn(
                        "group flex w-full items-center justify-center gap-3 px-8 py-5 font-sans text-[0.6875rem] font-black uppercase tracking-[0.2em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60",
                        dark
                            ? "bg-accent text-black hover:bg-white"
                            : "bg-black text-white hover:bg-accent hover:text-black"
                    )}
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
                        </>
                    ) : (
                        <>
                            Send My Request
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>

                <p
                    className={cn(
                        "text-center text-[0.625rem] leading-relaxed",
                        dark ? "text-white/30" : "text-neutral-400"
                    )}
                >
                    By submitting you agree to be contacted by {"Sebastian Street"} by phone, text or email.
                    Message and data rates may apply. Your information is never sold.
                </p>
            </form>
        </div>
    );
}

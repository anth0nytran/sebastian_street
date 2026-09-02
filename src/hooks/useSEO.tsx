import { Helmet } from "react-helmet-async";
import { SITE_URL, AGENT } from "@/data/site";

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/sebastian-street-og.jpg`;

/**
 * Stable @id references into the site-wide entity graph declared in index.html.
 *
 * These matter more than they look. An answer engine resolving "who is
 * Sebastian Street" follows @id references to assemble one entity from many
 * pages. Minting a fresh node per page instead of pointing at these gives it
 * eight weakly-related businesses rather than one well-described agent.
 */
export const AGENT_ID = `${SITE_URL}/#real-estate-agent`;
export const PERSON_ID = `${SITE_URL}/#sebastian-street`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export interface Breadcrumb {
    name: string;
    path: string;
}

export interface FaqItem {
    q: string;
    a: string;
}

interface SEOProps {
    title: string;
    description: string;
    path: string;
    type?: "website" | "article" | "profile";
    image?: string;
    imageAlt?: string;
    /** Renders BreadcrumbList schema. Home is prepended automatically. */
    breadcrumbs?: Breadcrumb[];
    /**
     * Renders FAQPage schema. MUST mirror FAQs that are visibly on the page —
     * schema describing content a user can't see is a manual-action risk, and
     * it's also just a lie to the crawler.
     */
    faqs?: FaqItem[];
    /** Extra @graph nodes: Service, Place, ItemList, and so on. */
    extraGraph?: Record<string, unknown>[];
    noindex?: boolean;
}

export default function SEO({
    title,
    description,
    path,
    type = "website",
    image,
    imageAlt,
    breadcrumbs,
    faqs,
    extraGraph,
    noindex = false,
}: SEOProps) {
    const url = `${SITE_URL}${path}`;
    // The homepage title is already fully formed; every other page gets the
    // brand suffix so a SERP listing is self-identifying.
    const fullTitle = path === "/" ? title : `${title} | ${AGENT.name}, REALTOR®`;
    const ogImage = image ? `${SITE_URL}${image}` : DEFAULT_OG_IMAGE;

    const graph: Record<string, unknown>[] = [];

    graph.push({
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: fullTitle,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": AGENT_ID },
        primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
        inLanguage: "en-US",
    });

    if (breadcrumbs?.length) {
        graph.push({
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: [{ name: "Home", path: "/" }, ...breadcrumbs].map((crumb, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: crumb.name,
                item: `${SITE_URL}${crumb.path}`,
            })),
        });
    }

    if (faqs?.length) {
        graph.push({
            "@type": "FAQPage",
            "@id": `${url}#faq`,
            mainEntity: faqs.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
        });
    }

    if (extraGraph?.length) graph.push(...extraGraph);

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />
            {noindex && <meta name="robots" content="noindex, follow" />}

            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type === "profile" ? "profile" : type} />
            <meta property="og:image" content={ogImage} />
            {imageAlt && <meta property="og:image:alt" content={imageAlt} />}

            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            <script type="application/ld+json">
                {JSON.stringify({ "@context": "https://schema.org", "@graph": graph })}
            </script>
        </Helmet>
    );
}

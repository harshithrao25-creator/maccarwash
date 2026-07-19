import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X, Phone } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import logo from "../assets/mac-logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/packages", label: "Packages" },
  { to: "/booking", label: "Booking" },
  { to: "/contact", label: "Contact" },
] as const;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-gradient-brand">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-gradient-brand px-5 py-2.5 text-sm font-medium text-white shadow-brand transition hover:opacity-90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong. Try again or head home.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-gradient-brand px-4 py-2 text-sm font-medium text-white shadow-brand"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent/10">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MAC Mobile Car Wash — Premium Mobile Car Wash & Detailing in Dubai, UAE" },
      { name: "description", content: "MAC Mobile Car Wash offers professional mobile car washing, detailing and cleaning at your doorstep in Dubai and UAE. Book online today." },
      { name: "author", content: "MAC Mobile Car Wash" },
      { property: "og:title", content: "MAC Mobile Car Wash — Dubai's Premium Mobile Car Wash" },
      { property: "og:description", content: "Eco-friendly mobile car washing & detailing at your doorstep across the UAE. Silver AED 80, Gold AED 120. Book online." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
     { rel: "icon", type: "image/png", href: logo },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>   <HeadContent />    <script     type="application/ld+json"     dangerouslySetInnerHTML={{       __html: JSON.stringify({         "@context": "https://schema.org",         "@graph": [           {             "@type": "LocalBusiness",             "@id": "https://www.maccarservices.com/#business",             name: "MAC Mobile Car Wash Services",             url: "https://www.maccarservices.com",             telephone: "+971586029939",             email: "mac@macwaterlesscarwash.com",             image: "https://www.maccarservices.com/favicon.png",             address: {               "@type": "PostalAddress",               streetAddress: "Naif",               addressLocality: "Dubai",               addressCountry: "AE"             },             areaServed: {               "@type": "Country",               name: "United Arab Emirates"             },             openingHoursSpecification: [               {                 "@type": "OpeningHoursSpecification",                 dayOfWeek: [                   "Monday",                   "Tuesday",                   "Wednesday",                   "Thursday",                   "Friday",                   "Saturday"                 ],                 opens: "08:00",                 closes: "20:00"               }             ]           },           {             "@type": "Organization",             "@id": "https://www.maccarservices.com/#organization",             name: "MAC Mobile Car Wash Services",             url: "https://www.maccarservices.com",             logo: "https://www.maccarservices.com/favicon.png",             contactPoint: {               "@type": "ContactPoint",               telephone: "+971586029939",               contactType: "customer service",               areaServed: "AE",               availableLanguage: ["English", "Arabic"]             }           },           {             "@type": "WebSite",             "@id": "https://www.maccarservices.com/#website",             url: "https://www.maccarservices.com",             name: "MAC Mobile Car Wash Services"           }         ]       }),     }}   /> </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="MAC Mobile Car Wash logo" className="h-12 w-auto" />
          <span className="hidden font-display text-lg font-bold leading-tight sm:block">
            MAC <span className="text-gradient-brand">Mobile Car Wash</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition hover:text-foreground"
              activeProps={{ className: "rounded-md px-3 py-2 text-sm font-semibold text-[color:var(--brand-purple)]" }}
            >
              {n.label}
            </Link>
          ))}
          <a href="https://wa.me/971586029939?text=Hi%20MAC%20Mobile%20Car%20Wash!%20I%20would%20like%20to%20book%20a%20car%20wash."
target="_blank"
rel="noopener noreferrer" className="ml-3 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-brand transition hover:opacity-90">
            <Phone className="h-4 w-4" /> +971 58 602 9939
          </a>
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <a href="https://wa.me/971586029939?text=Hi%20MAC%20Mobile%20Car%20Wash!%20I%20would%20like%20to%20book%20a%20car%20wash."
target="_blank"
rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-brand px-5 py-3 text-sm font-semibold text-white">
              <Phone className="h-4 w-4" /> Call +971 58 602 9939
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[color:var(--brand-ink)] text-white/80">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <img src={logo} alt="MAC" className="h-12 w-auto" />
            <span className="font-display text-lg font-bold text-white">MAC</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed">
            Dubai's premium mobile car washing & detailing service — bringing the shine to your doorstep.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="hover:text-[color:var(--brand-lime)]">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contact</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
  <a
    href="https://wa.me/971586029939?text=Hi%20MAC%20Mobile%20Car%20Wash!%20I%20would%20like%20to%20book%20a%20car%20wash."
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-[color:var(--brand-lime)]"
  >
    +971 58 602 9939
  </a>
</li>
            <li><a href="tel:+97142353578" className="hover:text-[color:var(--brand-lime)]">04 2353 578</a></li>
            <li><a href="mailto:mac@macwaterlesscarwash.com" className="hover:text-[color:var(--brand-lime)] break-all">mac@macwaterlesscarwash.com</a></li>
            <li>Naif, Dubai, UAE</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Ready?</h4>
          <p className="mt-4 text-sm">Book a mobile wash in under a minute.</p>
          <Link to="/booking" className="mt-4 inline-flex rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-white shadow-brand">Book Now</Link>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/60 sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} MAC Mobile Car Wash. All rights reserved.</p>
          <p>Naif, Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1"><Outlet /></main>
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

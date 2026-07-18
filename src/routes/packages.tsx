import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/packages")({
  component: Packages,
  head: () => ({
    meta: [
      { title: "Packages & Pricing — MAC Mobile Car Wash Dubai" },
      { name: "description", content: "Silver AED 80 and Gold AED 120 mobile car wash packages in Dubai. Includes exterior & interior cleaning, pressure wash, vacuuming and more." },
      { property: "og:title", content: "MAC Mobile Car Wash — Pricing" },
      { property: "og:description", content: "Silver AED 80 · Gold AED 120. Professional mobile car wash packages in Dubai, UAE." },
    ],
  }),
});

const plans = [
  {
    name: "Silver",
    price: 80,
    tag: "Sedan / SUV · One Time",
    tone: "silver" as const,
    features: [
      "Exterior and interior cleaning of the vehicle",
      "Pressure wash with water and foam",
      "Rim cleaning and tyre dressing",
      "Cleaning windows inside and out",
      "Wiping and polishing of steering wheel, dashboard and panels",
      "Full car vacuuming",
      "Wiping and polishing of panels",
      "Perfume and paper foot mat",
    ],
  },
  {
    name: "Gold",
    price: 120,
    tag: "Sedan / SUV · One Time",
    tone: "gold" as const,
    popular: true,
    features: [
      "Exterior and interior cleaning of the vehicle",
      "Pressure wash with water and foam",
      "Rim cleaning and tyre dressing",
      "Wiping and polishing of steering wheel, dashboard and panels",
      "Cleaning windows inside and out",
      "Full car vacuuming",
      "Wiping and polishing of panels",
      "Engine bay cleaning",
      "Perfume and paper foot mat",
      "Seats and steering wheel plastic covers",
      "Tissue box",
    ],
  },
];

function Packages() {
  return (
    <>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-lime)]">Our Pricing Plans</span>
          <h1 className="mt-3 font-display text-5xl font-extrabold sm:text-6xl">Looking for a car wash? Choose a plan.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">Transparent one-time pricing for sedans and SUVs. Monthly and yearly packages available — get 30% off on 1-year contracts.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative overflow-hidden rounded-3xl border p-8 shadow-card transition hover:-translate-y-1 ${
                p.popular
                  ? "border-transparent bg-gradient-to-br from-[color:var(--brand-purple)] to-[color:var(--brand-red)] text-white shadow-brand"
                  : "border-border bg-card"
              }`}
            >
              {p.popular && (
                <div className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-[color:var(--brand-lime)] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[color:var(--brand-ink)]">
                  <Sparkles className="h-3 w-3" /> Popular
                </div>
              )}
              <div className={`text-xs font-semibold uppercase tracking-widest ${p.popular ? "text-white/70" : "text-[color:var(--brand-red)]"}`}>{p.tag}</div>
              <h2 className={`mt-2 font-display text-4xl font-extrabold ${p.popular ? "" : "text-gradient-brand"}`}>{p.name}</h2>
              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-6xl font-extrabold">AED {p.price}</span>
              </div>
              <p className={`mt-2 text-sm ${p.popular ? "text-white/70" : "text-muted-foreground"}`}>One time — flat rate</p>

              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check className={`mt-0.5 h-5 w-5 shrink-0 ${p.popular ? "text-[color:var(--brand-lime)]" : "text-[color:var(--brand-lime)]"}`} />
                    <span className={p.popular ? "text-white/90" : "text-foreground/80"}>{f}</span>
                  </li>
                ))}
              </ul>

              <Link
                to="/booking"
                search={{ plan: p.name.toLowerCase() }}
                className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition ${
                  p.popular ? "bg-white text-[color:var(--brand-purple)] hover:bg-white/90" : "bg-gradient-brand text-white shadow-brand hover:opacity-90"
                }`}
              >
                Book {p.name}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-3xl border border-border bg-muted/40 p-8 text-center">
          <h3 className="font-display text-2xl font-bold">Need monthly or yearly service?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            We offer contract packages for villas, offices and residential communities. Get up to 30% off on a 1-year contract.
          </p>
          <Link to="/contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-brand">
            Talk to us
          </Link>
        </div>
      </section>
    </>
  );
}

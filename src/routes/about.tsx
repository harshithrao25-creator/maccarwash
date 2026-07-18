import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Users, Award, Leaf, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: "About Us — MAC Mobile Car Wash Dubai" },
      { name: "description", content: "Learn about MAC Mobile Car Wash — 10+ years serving Dubai with professional, eco-friendly mobile car washing and detailing at your doorstep." },
      { property: "og:title", content: "About MAC Mobile Car Wash" },
      { property: "og:description", content: "10+ years of professional mobile car washing and detailing in Dubai, UAE." },
    ],
  }),
});

const stats = [
  { icon: Users, value: "10,000+", label: "Happy customers" },
  { icon: Award, value: "10+", label: "Years experience" },
  { icon: Leaf, value: "100%", label: "Eco-friendly" },
  { icon: ShieldCheck, value: "Fully", label: "Insured team" },
];

function About() {
  return (
    <>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-lime)]">About MAC</span>
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-extrabold leading-tight sm:text-6xl">Best car washing & cleaning in Dubai</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            A professional mobile car wash company serving corporates, villas, communities, residential towers, hotels and multiplex parking across the UAE.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold">10+ years of quality mobile car washing</h2>
            <p className="mt-6 text-muted-foreground">
              MAC Mobile Car Wash is a professional mobile car wash company in Dubai providing car cleaning & detailing service to the corporate, villas and communities, residential towers, hotels and multiplex parking in UAE.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our services are designed to suit everyone's needs — we do car wash at your home. Our experienced and fully insured professional staff has managed to create a thriving business with an impeccable reputation.
            </p>
            <p className="mt-4 text-muted-foreground">
              We bring you the most advanced spray-and-wipe car cleaning technology using the industry's finest products, giving your car a spotless glow and shine.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Corporate contracts", "Villa & community service", "Residential towers", "Hotel parking", "Multiplex parking", "One-time washes"].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-5 w-5 text-[color:var(--brand-lime)]" />{s}</div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <s.icon className="h-8 w-8 text-[color:var(--brand-purple)]" />
                <div className="mt-4 font-display text-3xl font-extrabold text-gradient-brand">{s.value}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Why choose MAC Mobile Car Wash</h2>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            We offer a unique experience and ensure high-quality car wash and detailing service in Dubai, UAE — eco-friendly car washing at your doorstep using premium products.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { label: "Full Service Wash", pct: 100 },
              { label: "Auto Detailing", pct: 95 },
              { label: "Interior Polish", pct: 95 },
            ].map((b) => (
              <div key={b.label}>
                <div className="flex justify-between text-sm font-medium"><span>{b.label}</span><span>{b.pct}%</span></div>
                <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-gradient-brand" style={{ width: `${b.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white shadow-brand">Book your wash</Link>
          </div>
        </div>
      </section>
    </>
  );
}

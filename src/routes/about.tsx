import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Users, Award, Leaf, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      {   title:     "About MAC Mobile Car Wash | Professional Mobile Car Wash & Car Detailing UAE", },
      {
  name: "description",
  content:
    "Learn about MAC Mobile Car Wash Services, providing professional mobile car wash, car detailing and eco-friendly vehicle cleaning for homes, apartments, villas, offices, hotels and commercial fleets across the UAE.",
},
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
          <h1 className="mt-3 max-w-3xl font-display text-5xl font-extrabold leading-tight sm:text-6xl">Professional Mobile Car Wash & Car Detailing Services</h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            MAC Mobile Car Wash Services provides professional mobile car washing and detailing for homes, apartments, villas, offices, residential communities, hotels and commercial fleets across the United Arab Emirates.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-4xl font-bold">Over 10 Years of Professional Mobile Car Wash Experience</h2>
            <p className="mt-6 text-muted-foreground">
              MAC Mobile Car Wash Services has over 10 years of experience providing professional mobile car washing and car detailing across the UAE. We proudly serve homes, apartments, villas, offices, residential communities, hotels and commercial fleet operators with reliable, eco-friendly vehicle cleaning services.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our goal is to make professional car care simple and convenient. Our trained and fully insured team comes directly to your location, delivering high-quality car washing and detailing while saving you valuable time.
            </p>
            <p className="mt-4 text-muted-foreground">
              Using premium cleaning products and modern mobile car wash techniques, we safely remove dirt, dust and road grime while protecting your vehicle's finish and delivering a long-lasting shine.
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
      {/* NEW SECTION START */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-4xl font-bold">
          Professional Mobile Car Wash Services Across the UAE
        </h2>

        <p className="mt-6 text-muted-foreground">
          MAC Mobile Car Wash Services provides professional mobile car washing,
          car detailing and vehicle cleaning for homes, apartments, villas,
          offices, hotels, residential communities and commercial fleets across
          the United Arab Emirates.
        </p>

        <p className="mt-4 text-muted-foreground">
          We are committed to delivering reliable service, premium quality and
          eco-friendly cleaning solutions while making car care easier and more
          convenient for every customer.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/packages"
            className="rounded-full bg-gradient-brand px-6 py-3 text-white font-semibold"
          >
            View Packages
          </Link>

          <Link
            to="/booking"
            className="rounded-full border px-6 py-3 font-semibold"
          >
            Book Now
          </Link>
        </div>
      </section>
      {/* NEW SECTION END */}
    </>
  );
}

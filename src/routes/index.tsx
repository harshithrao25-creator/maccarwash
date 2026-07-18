import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Shield, Wrench, Droplets, CheckCircle2, Star, ArrowRight, Phone } from "lucide-react";
import heroImg from "../assets/hero-carwash.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "MAC Mobile Car Wash — Premium Mobile Car Wash in Dubai" },
      { name: "description", content: "Professional mobile car washing, detailing & cleaning at your doorstep across Dubai and the UAE. Silver AED 80, Gold AED 120. Book online today." },
    ],
  }),
});

const features = [
  { icon: Droplets, title: "Innovative Washing", desc: "Advanced spray-and-wipe technology for a spotless shine." },
  { icon: Shield, title: "Safety Materials", desc: "Only industry-approved, eco-friendly products." },
  { icon: Wrench, title: "Modern Equipment", desc: "Professional tools for every surface and finish." },
  { icon: Sparkles, title: "Extensive Cleaning", desc: "Interior, exterior, engine bay & detailed polish." },
];

const testimonials = [
  { name: "Joji", text: "Excellent mobile car wash service. Their attention to detail is awesome — highly recommended to all my friends!" },
  { name: "Sameer", text: "My car looks brand new every time. First time I was surprised by the shine — keep up the great work." },
  { name: "Reshmi", text: "Very meticulous and great attention to detail. High-standard mobile car wash, consistently." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 opacity-40">
          <img src={heroImg} alt="Luxury car being washed" className="h-full w-full object-cover" width={1600} height={1000} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--brand-ink)]/95 via-[color:var(--brand-ink)]/70 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-32">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[color:var(--brand-lime)] backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Dubai · UAE
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
              The shine of a showroom.{" "}
              <span className="text-gradient-brand" style={{ backgroundImage: "linear-gradient(135deg, #ff6b7a 0%, #a5cd39 100%)" }}>
                At your doorstep.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80">
              MAC Mobile Car Wash brings 10+ years of professional mobile car washing, detailing and cleaning to villas, communities and corporate parking across the UAE.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3.5 text-sm font-semibold text-white shadow-brand transition hover:opacity-90">
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/packages" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10">
                See Packages
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-white/70">
              <div><div className="font-display text-3xl font-bold text-white">10,000+</div>Happy customers</div>
              <div><div className="font-display text-3xl font-bold text-white">10+</div>Years experience</div>
              <div><div className="font-display text-3xl font-bold text-[color:var(--brand-lime)]">30%</div>Off yearly contract</div>
            </div>
          </div>
          <div className="hidden lg:block" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-brand">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-brand">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-muted/40 py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-red)]">About Us</span>
            <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">Best car washing & cleaning in Dubai</h2>
            <p className="mt-6 text-muted-foreground">
              MAC Mobile Car Wash is a professional mobile car wash company in Dubai providing car cleaning & detailing service to corporates, villas, communities, residential towers, hotels and multiplex parking across the UAE. Our services are designed to suit everyone's needs — we come to you.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our experienced, fully insured staff has built a thriving business with an impeccable reputation. We use the industry's finest products and the most advanced spray-and-wipe technology to give your car a spotless glow.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Full Service Wash — 100%", "Auto Detailing — 95%", "Interior Polish — 95%", "Eco-friendly products"].map((s) => (
                <div key={s} className="flex items-center gap-2 text-sm"><CheckCircle2 className="h-5 w-5 text-[color:var(--brand-lime)]" />{s}</div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-20 blur-2xl" />
            <div className="relative rounded-3xl border border-border bg-card p-8 shadow-card">
              <div className="font-display text-6xl font-extrabold text-gradient-brand">30%</div>
              <p className="mt-2 font-display text-xl font-bold">Off 1-Year Contract</p>
              <p className="mt-3 text-sm text-muted-foreground">Sign up for a yearly wash contract and save. Perfect for villas, offices and residential communities.</p>
              <Link to="/packages" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-brand">
                View Packages <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-8 border-t border-border pt-6">
                <a
  href="https://wa.me/971586029939?text=Hi%20MAC%20Mobile%20Car%20Wash!%20I%20would%20like%20to%20book%20a%20car%20wash."
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-3 text-sm"
>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[color:var(--brand-lime)]/20 text-[color:var(--brand-purple)]">
                    <Phone className="h-4 w-4" />
                  </span>
                  <span><span className="block text-xs text-muted-foreground">Call us anytime</span><span className="font-semibold">+971 504 053 275</span></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-red)]">Feedback</span>
          <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">What our customers say</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex gap-0.5 text-[color:var(--brand-lime)]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-4 text-sm text-foreground/80">"{t.text}"</blockquote>
              <figcaption className="mt-4 font-display font-semibold">{t.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand p-10 shadow-brand sm:p-16">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[color:var(--brand-lime)]/30 blur-3xl" />
          <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="text-white">
              <h2 className="font-display text-4xl font-bold sm:text-5xl">Ready for a spotless shine?</h2>
              <p className="mt-3 max-w-xl text-white/85">Book a mobile car wash in seconds — we'll come to your home, office or community.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/booking" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[color:var(--brand-purple)] transition hover:bg-white/90">
                Book Now <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="https://wa.me/971586029939?text=Hi%20MAC%20Mobile%20Car%20Wash!%20I%20would%20like%20to%20book%20a%20car%20wash."
target="_blank"
rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20">
                <Phone className="h-4 w-4" /> Call now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

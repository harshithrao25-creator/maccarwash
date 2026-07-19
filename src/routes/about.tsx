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
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
  <div className="max-w-4xl">
    <h2 className="font-display text-4xl font-bold">
      Our Mission
    </h2>

    <p className="mt-6 text-muted-foreground">
      At MAC Mobile Car Wash Services, our mission is to make professional car care simple, convenient and reliable for every customer. We believe every vehicle deserves expert care without requiring customers to travel or wait in long queues.
    </p>

    <p className="mt-4 text-muted-foreground">
      Our experienced team provides professional mobile car washing and detailing using premium cleaning products, modern equipment and eco-friendly methods that help protect your vehicle while delivering exceptional results.
    </p>

    <p className="mt-4 text-muted-foreground">
      Whether you need a one-time wash or regular vehicle maintenance, we are committed to delivering consistent quality, outstanding customer service and a hassle-free experience every time.
    </p>
  </div>
</section>
      <section className="bg-muted/40 py-20">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl">
      <h2 className="font-display text-4xl font-bold">
        How We Work
      </h2>

      <p className="mt-6 text-muted-foreground">
        Our process is designed to make car care simple, convenient and stress-free. Customers can schedule a wash online or contact our team directly, and our trained professionals arrive at the chosen location with everything needed to complete the service.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl border p-6">
          <h3 className="text-lg font-semibold">1. Book</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Choose your preferred package and schedule a convenient time.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-lg font-semibold">2. We Arrive</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Our team arrives at your location fully equipped with professional cleaning products.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-lg font-semibold">3. Professional Cleaning</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            We carefully clean, wash and detail your vehicle using premium products and modern techniques.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="text-lg font-semibold">4. Drive Away Happy</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Enjoy a clean, refreshed vehicle without leaving your home or workplace.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
  <div className="max-w-5xl">
    <h2 className="font-display text-4xl font-bold">
      Who We Serve
    </h2>

    <p className="mt-6 text-muted-foreground">
      MAC Mobile Car Wash Services proudly provides professional mobile car washing and detailing for a wide range of customers across the United Arab Emirates. Whether you own a single vehicle or manage an entire fleet, our team delivers reliable and convenient vehicle care directly to your location.
    </p>

    <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">🏡 Homes & Villas</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Convenient mobile car washing without leaving your home.
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">🏢 Residential Buildings</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Professional vehicle cleaning for apartments and residential communities.
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">🏨 Hotels</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Reliable mobile car washing for hotel guests and staff parking areas.
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">🏢 Offices</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Vehicle cleaning while employees continue their workday.
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">🚗 Fleet Vehicles</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Scheduled washing and detailing for company and commercial fleets.
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">🚙 Individual Customers</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          One-time and recurring car wash services for personal vehicles.
        </p>
      </div>

    </div>
  </div>
</section>
      <section className="bg-muted/40 py-20">
  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

    <h2 className="font-display text-4xl font-bold text-center">
      Frequently Asked Questions
    </h2>

    <div className="mt-12 space-y-8">

      <div>
        <h3 className="text-xl font-semibold">
          Do you provide mobile car wash services at home?
        </h3>
        <p className="mt-2 text-muted-foreground">
          Yes. Our team comes directly to your home, apartment, villa or workplace with everything needed to professionally clean your vehicle.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">
          Do I need to provide water or electricity?
        </h3>
        <p className="mt-2 text-muted-foreground">
          No. Our mobile car wash team arrives fully equipped with professional tools and premium cleaning products required to complete the service.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">
          What vehicles do you clean?
        </h3>
        <p className="mt-2 text-muted-foreground">
          We clean sedans, SUVs, luxury vehicles, sports cars, commercial vehicles and company fleets.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">
          Do you offer regular car wash plans?
        </h3>
        <p className="mt-2 text-muted-foreground">
          Yes. We offer one-time services as well as regular scheduled car washing for individuals, residential communities and businesses.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold">
          Which areas do you serve?
        </h3>
        <p className="mt-2 text-muted-foreground">
          We provide professional mobile car wash and detailing services across the United Arab Emirates.
        </p>
      </div>

    </div>

  </div>
</section>
    </>
  );
}

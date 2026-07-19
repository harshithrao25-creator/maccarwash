import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Phone, Mail, MapPin, Facebook, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      {   title:     "Contact MAC Mobile Car Wash | Mobile Car Wash & Car Detailing UAE", },
      {
  name: "description",
  content:
    "Contact MAC Mobile Car Wash Services for professional mobile car washing, detailing and fleet cleaning across the UAE. Call, WhatsApp or Send us a message online.",
},
    ],
  }),
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  return (
    <>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-lime)]">Contact Us</span>
          <h1 className="mt-3 font-display text-5xl font-extrabold sm:text-6xl">Contact MAC Mobile Car Wash</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Have questions about our mobile car wash services, pricing or commercial contracts? Contact our team by phone, WhatsApp, email or by completing the contact form below.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              {
  icon: Phone,
  title: "WhatsApp",
  value: "+971 58 602 9939",
  href: "https://wa.me/971586029939?text=Hi%20MAC%20Mobile%20Car%20Wash!%20I%20would%20like%20to%20book%20a%20car%20wash."
},
              { icon: Phone, title: "Landline", value: "04 2353 578", href: "tel:+97142353578" },
              { icon: Mail, title: "Email", value: "mac@macwaterlesscarwash.com", href: "mailto:mac@macwaterlesscarwash.com" },
              { icon: MapPin, title: "Address", value: "Naif, Dubai, United Arab Emirates" },
              { icon: Facebook, title: "Facebook", value: "Follow us", href: "https://www.facebook.com/profile.php?id=61558253685178" },
            ].map((c) => (
              <a
                key={c.title}
                href={c.href}
                target={c.href?.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-brand"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-brand">
                  <c.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{c.title}</span>
                  <span className="block font-semibold">{c.value}</span>
                </span>
              </a>
            ))}
          </div>

          <div className="rounded-3xl border border-border bg-card p-8 shadow-card">
            {sent ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-[color:var(--brand-lime)]" />
                <h3 className="mt-4 font-display text-2xl font-bold">Message sent</h3>
                <p className="mt-2 text-muted-foreground">Thanks {form.name}! We'll get back to you shortly.</p>
                <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }} className="mt-6 rounded-full border border-border px-5 py-2.5 text-sm font-semibold">Send another</button>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
  e.preventDefault();

  try {
    await emailjs.send(
      "service_yxhn84v",
      "template_ftzvv4c",
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      },
      "T70QjAsQzkUpkhp9i"
    );

    setSent(true);
  } catch (error) {
    console.error(error);
    alert("Failed to send message.");
  }
}}
                className="space-y-5"
              >
                <h2 className="font-display text-2xl font-bold">Get in Touch</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:border-[color:var(--brand-purple)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)]/20" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Phone *</label>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:border-[color:var(--brand-purple)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)]/20" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:border-[color:var(--brand-purple)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)]/20" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-xl border border-border bg-background px-3.5 py-3 text-sm focus:border-[color:var(--brand-purple)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-purple)]/20" />
                </div>
                <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-brand">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </section>
      <section className="bg-muted/40 py-20">
  <div className="mx-auto max-w-6xl px-4">

    <h2 className="font-display text-4xl font-bold text-center">
      Why Contact MAC Mobile Car Wash?
    </h2>

    <p className="mx-auto mt-6 max-w-3xl text-center text-muted-foreground">
      Whether you're looking for a one-time car wash, a regular maintenance plan or a commercial fleet solution, our team is ready to help. We respond quickly and work with both individual customers and businesses across the UAE.
    </p>

    <div className="mt-12 grid gap-6 md:grid-cols-3">

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">
          Fast Response
        </h3>

        <p className="mt-3 text-muted-foreground">
          We aim to respond to enquiries as quickly as possible.
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">
          Flexible Booking
        </h3>

        <p className="mt-3 text-muted-foreground">
          Choose a date and time that works best for your schedule.
        </p>
      </div>

      <div className="rounded-2xl border p-6">
        <h3 className="text-xl font-semibold">
          Professional Support
        </h3>

        <p className="mt-3 text-muted-foreground">
          Our experienced team is available to answer your questions and recommend the right service.
        </p>
      </div>

    </div>

  </div>
</section>
    </>
  );
}

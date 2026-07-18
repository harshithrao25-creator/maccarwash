import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Phone, Mail, MapPin, Facebook, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/lib/bookings.functions";

export const Route = createFileRoute("/contact")({
  component: Contact,
  head: () => ({
    meta: [
      { title: "Contact — MAC Mobile Car Wash Dubai" },
      { name: "description", content: "Contact MAC Mobile Car Wash in Dubai. Call +971 504 053 275, email mac@macwaterlesscarwash.com, or send us a message online." },
    ],
  }),
});

function Contact() {
  const doSubmit = useServerFn(submitContact);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSending(true);
    try {
      await doSubmit({ data: { name: form.name, phone: form.phone, email: form.email || undefined, message: form.message } });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-lime)]">Contact Us</span>
          <h1 className="mt-3 font-display text-5xl font-extrabold sm:text-6xl">We'd love to hear from you</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Questions about packages, corporate contracts or a specific service? Reach out — we typically reply the same day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {[
              { icon: Phone, title: "Phone", value: "+971 504 053 275", href: "tel:+971504053275" },
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
              <form onSubmit={onSubmit} className="space-y-5">
                {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
                <h2 className="font-display text-2xl font-bold">Send us a message</h2>
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
                <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center rounded-full bg-gradient-brand px-6 py-3.5 text-sm font-semibold text-white shadow-brand disabled:opacity-60">{sending ? "Sending…" : "Send message"}</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

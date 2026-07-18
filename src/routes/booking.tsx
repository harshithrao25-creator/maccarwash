import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Calendar, Car, User, MapPin, MessageSquare, Sparkles } from "lucide-react";

type Search = { plan?: string };

export const Route = createFileRoute("/booking")({
  component: Booking,
  validateSearch: (s: Record<string, unknown>): Search => ({
    plan: typeof s.plan === "string" ? s.plan : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book Online — MAC Mobile Car Wash Dubai" },
      { name: "description", content: "Book your mobile car wash online. Silver AED 80, Gold AED 120. We come to your home, office or community across Dubai and UAE." },
    ],
  }),
});

function Booking() {
  const { plan } = Route.useSearch();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    plan: plan || "silver",
    carModel: "",
    plate: "",
    date: "",
    time: "",
    address: "",
    notes: "",
  });

  const update = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--brand-lime)]/20">
          <CheckCircle2 className="h-8 w-8 text-[color:var(--brand-lime)]" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-bold">Booking received!</h1>
        <p className="mt-4 text-muted-foreground">
          Thanks {form.name || "there"}, we've got your request for a{" "}
          <span className="font-semibold capitalize text-foreground">{form.plan}</span> wash on{" "}
          <span className="font-semibold text-foreground">{form.date || "your chosen date"}</span>. Our team will call you shortly on{" "}
          <span className="font-semibold text-foreground">{form.phone}</span> to confirm.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="tel:+971504053275" className="inline-flex rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-brand">Call us: +971 504 053 275</a>
          <button onClick={() => setSubmitted(false)} className="rounded-full border border-border px-6 py-3 text-sm font-semibold">New booking</button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-hero py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-lime)]">Book Online</span>
          <h1 className="mt-3 font-display text-5xl font-extrabold sm:text-6xl">Book a mobile car wash</h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">Fill in a few details — we'll come to you.</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-8 shadow-card">
            <h2 className="font-display text-2xl font-bold">Your details</h2>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field icon={User} label="Full name" required>
                <input required value={form.name} onChange={(e) => update("name", e.target.value)} className="input" placeholder="John Doe" />
              </Field>
              <Field icon={User} label="Phone" required>
                <input required value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input" placeholder="+971 5X XXX XXXX" />
              </Field>
              <Field icon={User} label="Email">
                <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input" placeholder="you@example.com" />
              </Field>
              <Field icon={Sparkles} label="Package" required>
                <select value={form.plan} onChange={(e) => update("plan", e.target.value)} className="input">
                  <option value="silver">Silver — AED 80</option>
                  <option value="gold">Gold — AED 120</option>
                  <option value="monthly">Monthly contract</option>
                  <option value="yearly">Yearly contract (30% off)</option>
                </select>
              </Field>
              <Field icon={Car} label="Car model" required>
                <input required value={form.carModel} onChange={(e) => update("carModel", e.target.value)} className="input" placeholder="Toyota Camry" />
              </Field>
              <Field icon={Car} label="Plate number">
                <input value={form.plate} onChange={(e) => update("plate", e.target.value)} className="input" placeholder="A 12345" />
              </Field>
              <Field icon={Calendar} label="Preferred date" required>
                <input type="date" required value={form.date} onChange={(e) => update("date", e.target.value)} className="input" />
              </Field>
              <Field icon={Calendar} label="Preferred time" required>
                <input type="time" required value={form.time} onChange={(e) => update("time", e.target.value)} className="input" />
              </Field>
              <div className="sm:col-span-2">
                <Field icon={MapPin} label="Address" required>
                  <input required value={form.address} onChange={(e) => update("address", e.target.value)} className="input" placeholder="Villa / Building, Street, Area, Emirate" />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field icon={MessageSquare} label="Notes">
                  <textarea rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} className="input" placeholder="Anything else we should know?" />
                </Field>
              </div>
            </div>

            <button type="submit" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-brand px-6 py-4 text-sm font-semibold text-white shadow-brand transition hover:opacity-90">
              Confirm booking
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">By booking you agree to be contacted by our team to confirm.</p>
          </form>

          <aside className="space-y-4">
            <div className="rounded-3xl bg-gradient-brand p-6 text-white shadow-brand">
              <h3 className="font-display text-xl font-bold">Need help?</h3>
              <p className="mt-2 text-sm text-white/85">Call or WhatsApp us — we're happy to help you choose the right plan.</p>
              <a href="tel:+971504053275" className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-3 text-sm font-semibold text-[color:var(--brand-purple)]">+971 504 053 275</a>
            </div>
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card">
              <h4 className="font-display font-bold">What's included</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>• Certified, insured professionals</li>
                <li>• Eco-friendly, premium products</li>
                <li>• We bring water and equipment</li>
                <li>• Service at your home or office</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.75rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.75rem 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .input:focus {
          outline: none;
          border-color: var(--brand-purple);
          box-shadow: 0 0 0 3px color-mix(in oklab, var(--brand-purple) 20%, transparent);
        }
      `}</style>
    </>
  );
}

function Field({ icon: Icon, label, required, children }: { icon: React.ComponentType<{ className?: string }>; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}{required && <span className="text-[color:var(--brand-red)]">*</span>}
      </span>
      {children}
    </label>
  );
}

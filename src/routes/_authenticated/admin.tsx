import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  listBookings,
  listMessages,
  updateBookingStatus,
  markMessageRead,
} from "@/lib/bookings.functions";
import { Calendar, Car, Phone, Mail, MapPin, MessageSquare, LogOut, CheckCircle2, Clock, XCircle, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminDashboard,
  head: () => ({ meta: [{ title: "Admin — MAC Mobile Car Wash" }, { name: "robots", content: "noindex" }] }),
});

const STATUS_STYLES: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

function AdminDashboard() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<"bookings" | "messages">("bookings");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const fetchBookings = useServerFn(listBookings);
  const fetchMessages = useServerFn(listMessages);
  const doUpdateStatus = useServerFn(updateBookingStatus);
  const doMarkRead = useServerFn(markMessageRead);

  const bookings = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: () => fetchBookings(),
  });
  const messages = useQuery({
    queryKey: ["admin-messages"],
    queryFn: () => fetchMessages(),
  });

  const updateStatus = useMutation({
    mutationFn: (v: { id: string; status: string }) => doUpdateStatus({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-bookings"] }),
  });
  const toggleRead = useMutation({
    mutationFn: (v: { id: string; read: boolean }) => doMarkRead({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  const bookingsList = bookings.data ?? [];
  const filtered = statusFilter === "all" ? bookingsList : bookingsList.filter((b) => b.status === statusFilter);
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = bookingsList.filter((b) => b.booking_date === today).length;
  const pendingCount = bookingsList.filter((b) => b.status === "pending").length;
  const unreadMessages = (messages.data ?? []).filter((m) => !m.read).length;

  const isForbidden = (bookings.error as Error | null)?.message?.toLowerCase().includes("forbidden");

  if (isForbidden) {
    return (
      <section className="mx-auto max-w-lg px-4 py-24 text-center">
        <ShieldAlert className="mx-auto h-12 w-12 text-[color:var(--brand-red)]" />
        <h1 className="mt-4 font-display text-3xl font-bold">Access denied</h1>
        <p className="mt-2 text-muted-foreground">
          Your account is signed in but does not have admin permissions. Sign in with an authorized admin email.
        </p>
        <button onClick={signOut} className="mt-6 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-brand">
          Sign out
        </button>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold">Admin dashboard</h1>
          <p className="mt-1 text-sm text-muted-foreground">Manage bookings and customer messages.</p>
        </div>
        <button onClick={signOut} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold">
          <LogOut className="h-4 w-4" /> Sign out
        </button>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Bookings today" value={todayCount} icon={Calendar} />
        <Stat label="Pending bookings" value={pendingCount} icon={Clock} />
        <Stat label="Unread messages" value={unreadMessages} icon={MessageSquare} />
      </div>

      <div className="mt-8 flex gap-2 border-b border-border">
        <TabBtn active={tab === "bookings"} onClick={() => setTab("bookings")}>
          Bookings ({bookingsList.length})
        </TabBtn>
        <TabBtn active={tab === "messages"} onClick={() => setTab("messages")}>
          Messages ({(messages.data ?? []).length})
        </TabBtn>
      </div>

      {tab === "bookings" && (
        <>
          <div className="mt-6 flex flex-wrap gap-2">
            {["all", "pending", "confirmed", "completed", "cancelled"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize ${statusFilter === s ? "bg-gradient-brand text-white shadow-brand" : "border border-border"}`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="mt-6 space-y-4">
            {bookings.isLoading && <p className="text-sm text-muted-foreground">Loading bookings…</p>}
            {!bookings.isLoading && filtered.length === 0 && (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                No bookings {statusFilter !== "all" && `with status "${statusFilter}"`}.
              </div>
            )}
            {filtered.map((b) => (
              <article key={b.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-bold">{b.name}</h3>
                    <p className="text-xs text-muted-foreground">Booked {new Date(b.created_at).toLocaleString()}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[b.status] || ""}`}>
                    {b.status}
                  </span>
                </div>

                <div className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                  <Info icon={Phone}><a href={`tel:${b.phone}`} className="hover:underline">{b.phone}</a></Info>
                  {b.email && <Info icon={Mail}><a href={`mailto:${b.email}`} className="hover:underline">{b.email}</a></Info>}
                  <Info icon={Calendar}>{b.booking_date} at {b.booking_time}</Info>
                  <Info icon={Car}>{b.car_model} {b.plate ? `• ${b.plate}` : ""}</Info>
                  <Info icon={MapPin}>{b.address}</Info>
                  <Info icon={CheckCircle2}><span className="capitalize">{b.plan}</span> package</Info>
                </div>
                {b.notes && (
                  <p className="mt-3 rounded-lg bg-background/60 p-3 text-sm text-muted-foreground">
                    <MessageSquare className="mr-1.5 inline h-3.5 w-3.5" /> {b.notes}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={`tel:${b.phone}`} className="rounded-full bg-gradient-brand px-4 py-2 text-xs font-semibold text-white shadow-brand">Call</a>
                  <a href={`https://wa.me/${b.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="rounded-full border border-border px-4 py-2 text-xs font-semibold">WhatsApp</a>
                  {b.status !== "confirmed" && (
                    <button onClick={() => updateStatus.mutate({ id: b.id, status: "confirmed" })} className="rounded-full border border-blue-300 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-800">Confirm</button>
                  )}
                  {b.status !== "completed" && (
                    <button onClick={() => updateStatus.mutate({ id: b.id, status: "completed" })} className="rounded-full border border-green-300 bg-green-50 px-4 py-2 text-xs font-semibold text-green-800">Mark done</button>
                  )}
                  {b.status !== "cancelled" && (
                    <button onClick={() => updateStatus.mutate({ id: b.id, status: "cancelled" })} className="rounded-full border border-red-300 bg-red-50 px-4 py-2 text-xs font-semibold text-red-800">
                      <XCircle className="mr-1 inline h-3 w-3" /> Cancel
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {tab === "messages" && (
        <div className="mt-6 space-y-4">
          {messages.isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
          {!messages.isLoading && (messages.data ?? []).length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No contact messages yet.
            </div>
          )}
          {(messages.data ?? []).map((m) => (
            <article key={m.id} className={`rounded-2xl border p-6 shadow-card ${m.read ? "border-border bg-card" : "border-[color:var(--brand-purple)]/40 bg-card"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-lg font-bold">
                    {m.name} {!m.read && <span className="ml-2 rounded-full bg-[color:var(--brand-lime)] px-2 py-0.5 text-xs font-semibold text-black">NEW</span>}
                  </h3>
                  <p className="text-xs text-muted-foreground">{new Date(m.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => toggleRead.mutate({ id: m.id, read: !m.read })} className="rounded-full border border-border px-3 py-1 text-xs font-semibold">
                  Mark {m.read ? "unread" : "read"}
                </button>
              </div>
              <div className="mt-3 grid gap-1 text-sm sm:grid-cols-2">
                <Info icon={Phone}><a href={`tel:${m.phone}`} className="hover:underline">{m.phone}</a></Info>
                {m.email && <Info icon={Mail}><a href={`mailto:${m.email}`} className="hover:underline">{m.email}</a></Info>}
              </div>
              <p className="mt-3 rounded-lg bg-background/60 p-3 text-sm">{m.message}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Stat({ label, value, icon: Icon }: { label: string; value: number; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand text-white">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="font-display text-2xl font-extrabold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`px-4 py-2.5 text-sm font-semibold ${active ? "border-b-2 border-[color:var(--brand-purple)] text-foreground" : "text-muted-foreground"}`}>
      {children}
    </button>
  );
}

function Info({ icon: Icon, children }: { icon: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-muted-foreground">
      <Icon className="h-4 w-4 shrink-0" />
      <span className="text-foreground">{children}</span>
    </span>
  );
}

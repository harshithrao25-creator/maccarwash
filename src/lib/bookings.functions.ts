import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

type BookingInput = {
  name: string;
  phone: string;
  email?: string;
  plan: string;
  car_model: string;
  plate?: string;
  booking_date: string;
  booking_time: string;
  address: string;
  notes?: string;
};

type ContactInput = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

function svc() {
  const url = process.env.SUPABASE_URL!;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((v: BookingInput) => {
    if (!v?.name || !v?.phone || !v?.plan || !v?.car_model || !v?.booking_date || !v?.booking_time || !v?.address) {
      throw new Error("Missing required fields");
    }
    return v;
  })
  .handler(async ({ data }) => {
    const { data: row, error } = await svc()
      .from("bookings")
      .insert({
        name: data.name.slice(0, 200),
        phone: data.phone.slice(0, 40),
        email: data.email?.slice(0, 200) || null,
        plan: data.plan.slice(0, 40),
        car_model: data.car_model.slice(0, 100),
        plate: data.plate?.slice(0, 40) || null,
        booking_date: data.booking_date,
        booking_time: data.booking_time.slice(0, 20),
        address: data.address.slice(0, 500),
        notes: data.notes?.slice(0, 1000) || null,
      })
      .select("id")
      .single();
    if (error) throw new Error(error.message);
    return { id: row.id };
  });

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((v: ContactInput) => {
    if (!v?.name || !v?.phone || !v?.message) throw new Error("Missing required fields");
    return v;
  })
  .handler(async ({ data }) => {
    const { error } = await svc().from("contact_messages").insert({
      name: data.name.slice(0, 200),
      phone: data.phone.slice(0, 40),
      email: data.email?.slice(0, 200) || null,
      message: data.message.slice(0, 2000),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { data, error } = await context.supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const listMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { data, error } = await context.supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const updateBookingStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { id: string; status: string }) => {
    if (!["pending", "confirmed", "completed", "cancelled"].includes(v.status)) {
      throw new Error("Invalid status");
    }
    return v;
  })
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase
      .from("bookings")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const markMessageRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((v: { id: string; read: boolean }) => v)
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { error } = await context.supabase
      .from("contact_messages")
      .update({ read: data.read })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath, unstable_noStore } from "next/cache";

export const getServices = async (userId: string) => {
  try {
    const supabase = createClient();
    const { data: services, error } = await supabase
      .from("service")
      .select("*, availability:availability(sun, mon, tue, wed, thu, fri, sat)")
      .eq("userId", userId);

    if (error) throw new Error("Error getting user services");

    return services as Service[];
  } catch (error) {
    console.log(error);
  }
};

export const getService = async (id: string) => {
  try {
    const supabase = createClient();
    const { data: services, error } = await supabase
      .from("service")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error("Error getting user service");

    return services as Service;
  } catch (error) {
    console.log(error);
  }
};

export const createService = async (formData: any, userId: string) => {
  try {
    const supabase = createClient();

    const defaultAvailability = {
      mon: ["07:00-17:00"],
      tue: ["07:00-17:00"],
      wed: ["07:00-17:00"],
      thu: ["07:00-17:00"],
      fri: ["07:00-17:00"],
      sat: [],
      sun: [],
    };

    const { data: newAvailability, error } = await supabase
      .from("availability")
      .insert([defaultAvailability])
      .select("*")
      .single();

    const serviceData = { userId, ...formData };

    if (error) throw new Error(`Could creating availability for service`);

    if (newAvailability) {
      await supabase
        .from("service")
        .insert([{ availabilityId: newAvailability?.id, ...serviceData }])
        .single();
    }

    revalidatePath("dashboard/services");
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (data: any, id: string) => {
  try {
    const supabase = createClient();
    const { error } = await supabase.from("service").update(data).eq("id", id);

    if (error) throw new Error(`Error updating service`);

    revalidatePath("/services");
  } catch (error) {
    console.log(error);
  }
};

export async function deleteService(id: string) {
  try {
    const supabase = createClient();
    const { data: deletedService, error } = await supabase
      .from("service")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (!error)
      await supabase
        .from("availability")
        .delete()
        .eq("id", deletedService?.availabilityId as string);

    revalidatePath("/services");
  } catch (error) {
    console.log(error);
  }
}

export const updateAvailability = async (
  serviceId: string,
  availability: Availability
) => {
  const supabase = createClient();
  const { data: service } = await supabase
    .from("service")
    .select("availabilityId")
    .eq("id", serviceId)
    .single();

  await supabase
    .from("availability")
    .update(availability)
    .eq("id", service?.availabilityId)
    .select()
    .single();

  revalidatePath("/calender");
};

export const getAllServices = async (
  query?: string,
  range?: { from: number; to: number }
) => {
  const supabase = createClient();
  unstable_noStore();

  let supabaseQuery = supabase
    .from("service")
    .select(
      "*, availability:availability(sun, mon, tue, wed, thu, fri, sat), user:userId(*)"
    );

  if (range) {
    const { from, to } = range;
    supabaseQuery = supabaseQuery.range(from, to);
  }

  const { data, error } = await supabaseQuery;

  if (error) throw new Error("Error getting services data");

  const services = data.filter((service) => service.user !== null);

  if (!query) return services as ServiceWithUser[];

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(query.toLowerCase())
  );

  return filteredServices as ServiceWithUser[];
};

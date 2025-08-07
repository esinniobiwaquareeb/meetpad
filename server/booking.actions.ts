"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getConsultationData(userId: string) {
  const supabase = createClient();
  const { data: user } = await supabase
    .from("user")
    .select("id, firstName, lastName, email, country, image_url, min_amount")
    .eq("id", userId)
    .single();

  const { data: services } = await supabase
    .from("service")
    .select(
      "id, title, description, startDate, endDate, price, duration, meetingType, availability:availabilityId(sun, mon, tue, wed, thu, fri, sat)"
    )
    .eq("userId", user?.id);

  revalidatePath("/u");

  return { ...user, services };
}

export async function getConsultationDataByUsername(username: string) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase
    .from("user")
    .select("*")
    .eq("username", username)
    .single();

  if (userError) {
    console.log(userError.message);
    throw new Error(userError.message);
  }

  const { data: services, error: servicesError } = await supabase
    .from("service")
    .select(
      "id, title, description, startDate, endDate, price, duration, meeting_types, availability:availabilityId(sun, mon, tue, wed, thu, fri, sat)"
    )
    .eq("userId", user?.id);

  if (servicesError) {
    throw new Error(servicesError.message);
  }

  revalidatePath("/u");

  return { ...user, services };
}

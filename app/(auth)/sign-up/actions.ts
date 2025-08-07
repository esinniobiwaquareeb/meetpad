"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = createClient();

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // Check if the email is already registered
  const { data: existingUser, error: fetchError } = await supabase
    .from("user")
    .select("id")
    .eq("email", email)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    console.error("Error checking for existing user:", fetchError.message);
    return redirect(
      `/sign-up?message=${encodeURIComponent(
        "Error checking for existing user"
      )}`
    );
  }

  if (existingUser) {
    return redirect(
      `/sign-up?message=${encodeURIComponent("Email already registered!")}`
    );
  }

  // Attempt to sign up the user
  const { error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  // if there is an error
  if (signUpError) {
    console.error("Error signing up:", signUpError.message);
    return redirect(
      `/sign-up?message=${encodeURIComponent("Error signing up")}`
    );
  }

  revalidatePath("/");
  return redirect(`/confirm?email=${encodeURIComponent(email)}`);
}

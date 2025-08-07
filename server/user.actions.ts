"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCurrentUser(): Promise<User> {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  const { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", data.user?.id)
    .single();

  if (error) throw new Error("Error getting current user");

  return user as User;
}

export const updateProfile = async (formData: FormData) => {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const rawData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      country: formData.get("country"),
      city: formData.get("city"),
      website_url: formData.get("website_url"),
      linkedIn_url: formData.get("linkedIn_url"),
      twitter_url: formData.get("twitter_url"),
      facebook_url: formData.get("facebook_url"),
      instagram_url: formData.get("instagram_url"),
      profession: formData.get("profession"),
      about: formData.get("about"),
      language: formData.get("language"),
      username: formData.get("username"),
      min_amount: formData.get("min_amount"),
    };

    await supabase
      .from("user")
      .update(rawData)
      .eq("id", user?.id)
      .select()
      .single();

    revalidatePath("/profile");
  } catch (error) {
    console.log(error);
  }
};

export const updatePhoto = async (formData: FormData) => {
  try {
    const supabase = createClient();
    const { data: user } = await supabase.auth.getUser();

    const file = formData.get("image") as File;
    console.log(file);

    const imageName = `${Math.random()}-${file.name}`.replace("/", "");

    const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/user-images/${imageName}`;

    const { error: storgaeError } = await supabase.storage
      .from("user-images")
      .upload(imageName, file);

    if (!storgaeError)
      await supabase
        .from("user")
        .update({ image_url: imagePath })
        .eq("id", user.user?.id)
        .select();

    revalidatePath("/dashboard", "layout");
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = async (id: string) => {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error("Error getting user");

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw new Error("Error getting user");

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id: string, data: any) => {
  try {
    const supabase = createClient();
    const { error } = await supabase
      .from("user")
      .update([data])
      .eq("id", id)
      .single();

    if (error) throw new Error("Error updating user data");
  } catch (error) {
    console.log(error);
  }
};

export const getUserSubscription = async (id: string) => {
  try {
    const supabase = createClient();
    const { data: subscription, error } = await supabase
      .from("subscription")
      .select("*")
      .eq("userId", id)
      .single();
    if (error) throw new Error("Error getting user subscription!");

    return subscription;
  } catch (error) {
    console.log(error);
  }
};

export const upgradeUserSubscription = async (userId: string, data: any) => {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("subscription")
      .update(data)
      .eq("userId", userId)
      .single();

    if (error) throw new Error("Error upgrading user subscription");
  } catch (error) {
    console.log(error);
  }
};

export const createUserSubscription = async (userId: string, data: any) => {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from("subscription")
      .insert([{ userId, ...data }])
      .single();

    if (error) throw new Error("Error creating user subscription!");
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserSubscription = async (stripe_customer_id: string) => {
  try {
    const supabase = createClient();
    const { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("stripe_customer_id", stripe_customer_id)
      .single();

    if (error) throw new Error("Could not get user data");

    if (user) {
      await supabase
        .from("user")
        .update({ plan: "free" })
        .eq("id", user.id)
        .single();
    } else {
      console.error("User not found for the subscription deleted event.");
      throw new Error("User not found for the subscription deleted event.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserWalletHistory = async (userId: string) => {
  try {
    const supabase = createClient();

    const { data: walletHistory, error } = await supabase
      .from("wallet_history")
      .select("*")
      .eq("userId", userId);

    if (error) throw new Error(`Error getting user WalletHistory`);

    return walletHistory as WalletHistory[];
  } catch (error) {
    console.log(error);
  }
};

export const getUserEarnings = async (userId: string) => {
  try {
    const supabase = createClient();

    const { data: earnings, error } = await supabase
      .from("earning")
      .select("*")
      .eq("userId", userId);

    if (error) throw new Error(`Error getting user Earnings`);

    return earnings as Earning[];
  } catch (error) {
    console.log(error);
  }
};

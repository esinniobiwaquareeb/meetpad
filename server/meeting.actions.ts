"use server";

import { format } from "date-fns";
import { template as templateClient } from "@/templates/meetingRequestClient";
import { template as templateExpert } from "@/templates/meetingRequestExpert";
import { template as templateReschedule } from "@/templates/meetingReschedule";
import { template as templateBooking } from "@/templates/successfulBooking";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import { MailOptions } from "nodemailer/lib/json-transport";
import SMTPTransport from "nodemailer/lib/smtp-transport";
export const getUserMeetings = async (userId: string) => {
  try {
    const supabase = createClient();

    const { data: meetings, error } = await supabase
      .from("meeting")
      .select("id, status, time, duration, date, guest(*), service(*)")
      .eq("userId", userId);

    if (error) throw new Error(`Error getting user meetings`);

    revalidatePath("/", "layout");

    return meetings as unknown as Meeting[];
  } catch (error) {
    console.log(error);
  }
};

export const getMeeting = async (id: string) => {
  try {
    const supabase = createClient();

    const { data: meetings, error } = await supabase
      .from("meeting")
      .select("id, status, time, duration, date, guest(*), service(*)")
      .eq("id", id);

    if (error) throw new Error(`Error getting user meetings`);

    revalidatePath("/", "layout");

    return meetings;
  } catch (error) {
    console.log(error);
  }
};

// TODO: make the parameter typed
export async function createMeeting(data: any) {
  const supabase = createClient();
  const { data: newGuest, error } = await supabase
    .from("guest")
    .insert([data.guest])
    .select()
    .single();

  if (error) throw new Error("Error creating guest!");

  const { type, ...restMeetingData } = data.meeting;

  const meetingData = {
    ...restMeetingData,
    guest: newGuest.id,
  };

  const { error: err } = await supabase.from("meeting").insert([meetingData]);

  if (err) throw new Error("Error creating meeting");
  //call the content file
  await sendMail(
    data.guest.email,
    `Meeting with ${data.user.firstName + " " + data.user.lastName}`,
    templateClient({
      guest: {
        email: data.guest.email,
        fullName: data.guest.fullName,
      },
      expert: {
        fullName: data.user.firstName + " " + data.user.lastName,
      },
      meeting: {
        link: data.meeting.link,
        date: format(new Date(data.meeting.date), "MMMM do, yyyy"),
        time: data.meeting.time,
      },
    })
  );

  await sendMail(
    data.user.email,
    `Meeting with ${data.guest.fullName}`,
    templateBooking({
      guest: {
        email: data.guest.email,
        fullName: data.guest.fullName,
      },
      expert: {
        fullName: data.user.firstName + " " + data.user.lastName,
      },
      meeting: {
        link: data.meeting.link,
        date: format(new Date(data.meeting.date), "MMMM do, yyyy"),
        time: data.meeting.time,
        type: data.meeting.type,
      },
    })
  );

  revalidatePath("/", "layout");

  //append it to the message function to call bellow
}

const sendMail = async (mailTo: string, subject: string, message: string) => {
  const transporter: nodemailer.Transporter<
    SMTPTransport.SentMessageInfo,
    SMTPTransport.Options
  > = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: process.env.LOCAL_SMTP_MAIL,
      pass: process.env.LOCAL_SMTP_PASS,
    },
  });

  const mailOption: MailOptions = {
    from: process.env.LOCAL_SMTP_MAIL,
    to: mailTo,
    subject: subject, //"Verify your email",
    html: message,
  };

  await transporter
    .sendMail(mailOption)
    .then((res) => console.log("Mail sent...", res))
    .catch((error: Error | any) => console.log(error.message));
};

export const updateMeeting = async (meeting: Meeting, data: any) => {
  try {
    const supabase = createClient();
    const { data: newMeeting, error: updateError } = await supabase
      .from("meeting")
      .update({ date: data.date, time: data.time })
      .eq("id", meeting.id);

    if (updateError) throw new Error("Error updating meeting");

    await sendMail(
      meeting.guest.fullName,
      "Meeting Reschedule",
      templateReschedule({
        guest: {
          fullName: meeting.guest.fullName,
          email: meeting.guest.email,
        },
        expert: {
          fullName: meeting.user.firstName + " " + meeting.user.lastName,
        },
        meeting: {
          description: data?.description,
          date: format(new Date(data.date), "MMMM do, yyyy"),
          time: data.time,
          type: meeting.service.title,
        },
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export async function createQuickMeeting(data: any) {
  const supabase = createClient();
  const { data: newGuest, error } = await supabase
    .from("guest")
    .insert([data.guest])
    .select()
    .single();

  if (error) throw new Error("Error creating guest!");

  const meetingData = {
    ...data.meeting,
    guest: newGuest.id,
  };

  const { error: err } = await supabase.from("meeting").insert([meetingData]);

  if (err) throw new Error("Error creating meeting");
  //call the content file
  await sendMail(
    data.guest.email,
    `Meeting with ${data.user.firstName + " " + data.user.lastName}`,
    templateClient({
      guest: {
        email: data.guest.email,
        fullName: data.guest.fullName,
      },
      expert: {
        fullName: data.user.firstName + " " + data.user.lastName,
      },
      meeting: {
        link: data.meeting.link,
        date: format(new Date(data.meeting.date), "MMMM do, yyyy"),
        time: data.meeting.time,
      },
    })
  );

  await sendMail(
    data.user.email,
    `Meeting with ${data.guest.fullName}`,
    templateExpert({
      guest: {
        email: data.guest.email,
        fullName: data.guest.fullName,
      },
      expert: {
        fullName: data.user.firstName + " " + data.user.lastName,
      },
      meeting: {
        link: data.meeting.link,
        date: format(new Date(data.meeting.date), "MMMM do, yyyy"),
        time: data.meeting.time,
      },
    })
  );

  revalidatePath("/", "layout");

  //append it to the message function to call bellow
}

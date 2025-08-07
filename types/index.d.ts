declare type ServerActionReponse = {
  statusCode: number;
  status: string;
  message: string;
};

declare type PageParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type User = {
  id: string;
  created_at: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profession: string;
  country: string;
  language: string;
  city: string;
  about: string;
  website_url: string;
  linkedIn_url: string;
  twitter_url: string;
  facebook_url: string;
  instagram_url: string;
  image_url: string;
  stripe_verified: boolean;
  stripe_customer_id: string;
  plan: string;
  min_amount: number;
};

declare type MeetingFilter =
  | "all"
  | "confirmed"
  | "in-progress"
  | "pending"
  | "paid";

declare type MeetingType = "all" | "voice call" | "video call" | "chat";

declare type Availability = {
  sun: string[];
  mon: string[];
  tue: string[];
  wed: string[];
  thu: string[];
  fri: string[];
  sat: string[];
};

declare type Service = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  userId: string;
  duration: number;
  meeting_types: MeetingType[];
  availability: Availability;
  image_url: string;
};

declare type Meeting = {
  id: string;
  status: string;
  time: string;
  duration: number;
  date: string;
  user: User;
  guest: Guest;
  service: Service;
};

declare type Guest = {
  id: string;
  email: string;
  fullName: string;
  note: string;
  userId: string;
  country_code: string;
  phoneNumber: string;
};

declare type AvailabilityObj = {
  mon: { startTime: string; endTime: string }[];
  tue: { startTime: string; endTime: string }[];
  wed: { startTime: string; endTime: string }[];
  thu: { startTime: string; endTime: string }[];
  fri: { startTime: string; endTime: string }[];
  sat: { startTime: string; endTime: string }[];
  sun: { startTime: string; endTime: string }[];
};

interface ServiceWithUser extends Service {
  user: User;
}

type WalletHistory = {
  id: number;
  type: "WITHDRAWAL" | "CREDIT";
  amount: number;
  date: string;
  description: string;
  userId: string;
};

type Earning = {
  id: number;
  amount: number;
  date: string;
  userId: string;
  meetingId: string;
};

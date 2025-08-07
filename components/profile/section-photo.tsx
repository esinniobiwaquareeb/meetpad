"use client";
import ProfilePhoto from "@/components/profile/profile-photo";
import { useCurrentUser } from "@/contexts/user-context";

export default function SectionPhoto() {
  const { image_url } = useCurrentUser();
  return (
    <div>
      <ProfilePhoto image={image_url} />
    </div>
  );
}

"use client";

import profilePlaceholder from "@/public/profile-placeholder.png";
import Image from "next/image";
import { P } from "../ui/typography";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { updatePhoto } from "@/server/user.actions";

export default function ProfilePhoto({ image }: { image: string }) {
  const [imageToUpload, setImageToUpload] = useState<any>();

  const handleUploadAction = async (formData: FormData) => {
    toast.loading("Uploading Photo", { id: "1" });
    await updatePhoto(formData);
    toast.success("Photo successfully uploaded!", { id: "1" });
    setImageToUpload("");
  };

  return (
    <form
      action={handleUploadAction}
      className="flex gap-10 items-center mb-10"
    >
      <div className="relative h-[6rem] aspect-square">
        {image ? (
          <Image
            className="absolute rounded-full"
            src={image}
            alt="profile picture"
            width={100}
            height={100}
          />
        ) : (
          <Image
            className="absolute rounded-full"
            src={profilePlaceholder}
            alt="profile picture"
            width={100}
            height={100}
          />
        )}
      </div>
      <div>
        <div className="flex flex-col md:flex-row gap-3">
          <label className="focus:ring-primary relative inline-flex cursor-pointer items-center justify-center rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2">
            <P size="sm">Change avatar</P>
            <input
              className="hidden"
              accept="image/png, image/jpeg"
              type="file"
              name="image"
              onChange={(event) => {
                setImageToUpload(event.target.value);
              }}
            />
          </label>

          {imageToUpload && (
            <div className="flex flex-col md:flex-row items-center gap-2 ml-3">
              <P size="sm">{imageToUpload.split(`\\`).slice(-1)[0]}</P>
              <Button>Upload</Button>
            </div>
          )}
        </div>

        <P className="text-sm md:text:md mt-2 sm:mt-0">
          JPG, GIF or PNG. Max size of 5MB.
        </P>
      </div>
    </form>
  );
}

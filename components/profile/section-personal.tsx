"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputUsername from "./input-username";
import CustomSelect from "@/components/common/custom-select";
import { countryOptions, languageOptions } from "@/static_data/data";
import { P } from "@/components/ui/typography";
import { Textarea } from "@/components/ui/textarea";
import { Heading } from "@/components/ui/Heading";
import { useCurrentUser } from "@/contexts/user-context";

export default function SectionPersonal() {
  const {
    firstName,
    lastName,
    username,
    email,
    profession,
    country,
    language,
    city,
    about,
    min_amount
  } = useCurrentUser();
  return (
    <div>
      <Heading type="h5">Personal info</Heading>
      <div className="grid gap-6 md:grid-cols-2 md:border rounded-md md:px-3 md:py-6">
        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="firstName">First name</Label>
          <Input
            name="firstName"
            type="text"
            defaultValue={firstName}
            className="w-full"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="lastName">Last name</Label>
          <Input
            name="lastName"
            type="text"
            defaultValue={lastName}
            className="w-full"
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="username">Username</Label>
          <InputUsername
            defaultValue={username ? username : email.split("@").at(0)}
          />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="min_amount">Minimum Fee</Label>
          <Input name="min_amount" defaultValue={min_amount}
          />
        </div>

        <div className="col-span-2">
          <div className="mb-1 flex items-center justify-between">
            <P size="xs" className="mt-0 m-0">
              0 / 80
            </P>
            <Label htmlFor="profession">Your profession</Label>
          </div>
          <Input name="profession" type="text" defaultValue={profession} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="country">Country</Label>
          <CustomSelect options={countryOptions} initialValue={country} selectionName="country" />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="city">City</Label>
          <Input name="city" type="text" defaultValue={city} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="language" className="text-sm font-medium mb-1 block">
            Language
          </Label>
          <CustomSelect options={languageOptions} initialValue={language} selectionName="language" />
        </div>

        <div className="col-span-2">
          <Label htmlFor="about">About</Label>
          <Textarea
            name="about"
            rows={6}
            defaultValue={about}
            placeholder="A few words about you and your professional experience?"
          />
        </div>
      </div>
    </div>
  );
}

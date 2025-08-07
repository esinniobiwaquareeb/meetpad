"use client";
import { Heading } from "@/components/ui/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/contexts/user-context";

export default function SectionSocials() {
  const {
    linkedIn_url,
    instagram_url,
    twitter_url,
    website_url,
    facebook_url,
  } = useCurrentUser();
  return (
    <div>
      <Heading type="h5">Social links</Heading>
      <div className="grid gap-6 md:grid-cols-2 md:border rounded-md md:px-3 md:py-6">
        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="website">Website</Label>
          <Input name="website_url" type="text" defaultValue={website_url} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="linkedin">Linkedin</Label>
          <Input name="linkedIn_url" type="text" defaultValue={linkedIn_url} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="twitter">Twitter</Label>
          <Input name="twitter_url" type="text" defaultValue={twitter_url} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="facebook">Facebook</Label>
          <Input name="facebook_url" type="text" defaultValue={facebook_url} />
        </div>

        <div className="col-span-2 md:col-span-1">
          <Label htmlFor="instagram">Instagram</Label>
          <Input
            name="instagram_url"
            type="text"
            defaultValue={instagram_url}
          />
        </div>
      </div>
    </div>
  );
}

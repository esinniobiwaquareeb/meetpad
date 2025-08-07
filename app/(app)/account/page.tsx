import CustomSelect from "@/components/common/custom-select";
import Table from "@/components/common/table";
import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { P } from "@/components/ui/typography";
import { countryOptions } from "@/static_data/data";

export const metadata = {
  title: "My Account",
};

export default function Page() {
  return (
    <div className="">
      <div className="bg-gray-50 grid gap-6 mb:gap-8 p-6 mb-10">
        <div>
          <Heading>Billing information</Heading>
          <P size="sm">Billing address, VAT ID, used to generate invoices</P>
        </div>
        <div>
          <Label htmlFor="city">Company name</Label>
          <Input type="text" value={`Taofeek Abdulazeez`} />
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <Label htmlFor="addressLine1">Address line 1</Label>
            <Input type="text" value={``} placeholder="Address line 1" />
          </div>
          <div>
            <Label htmlFor="addressLine1">Address line 2</Label>
            <Input type="text" value={``} placeholder="Address line 2" />
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <Label htmlFor="state">State</Label>
            <Input type="text" value={``} placeholder="State" />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input type="text" value={``} placeholder="City" />
          </div>
          <div>
            <Label htmlFor="postalCode">Zip/Postal code</Label>
            <Input type="text" value={``} placeholder="Zip/Postal code" />
          </div>
          <div>
            <Label htmlFor="country">Country</Label>
            <CustomSelect options={countryOptions} />
          </div>
        </div>
        <div className="flex justify-end">
          <Button>Update</Button>
        </div>
      </div>
      <div className="bg-gray-50 grid gap-6 p-6 mb-10">
        <Heading type="h5">Billing history</Heading>
        <Table />
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-3 md:gap-48 mb-10 bg-gray-50 p-6 rounded-md">
        <div>
          <Heading type="h5">Change password</Heading>
          <P size="sm">{`We'll send you an email with a link to change your password`}</P>
        </div>
        <div>
          <Button variant="outline">Change password</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_auto] gap-3 md:gap-48 mb-10 bg-gray-50 p-6 rounded-md">
        <div>
          <Heading type="h5">Delete Account</Heading>
          <P size="sm">
            {`Upon removal, your account becomes unavailable, subscriptions are canceled, and your data is deleted. You can delete your account only when you don't have any scheduled meetings, and your Stripe account balance is zero`}
          </P>
        </div>
        <div>
          <Button variant="destructive">Delete account</Button>
        </div>
      </div>
    </div>
  );
}

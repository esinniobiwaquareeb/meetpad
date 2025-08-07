import { MoveRight } from "lucide-react";
import { P } from "../ui/typography";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { TiInfoOutline } from "react-icons/ti";

export default function VerifyBanner() {
  return (
    <div className="bg-blue-50 border border-primary rounded-md grid grid-cols-[auto_1fr] p-4 gap-2 mb-6 overflow-hidden relative before:content-[''] before:block before:w-[3px] before:bg-primary before:absolute before:left-0 before:top-0 before:h-full dark:bg-muted">
      <div>
        {/* <Info className="fill-primary stroke-gray-50" /> */}
        <TiInfoOutline className="fill-primary" size={24} />
      </div>
      <div>
        <Label className="">Want to create paid meeting?</Label>
        <P size="xs" className="mb-3 leading-[1.4] md:max-w-[80ch]">
          To charge your customers you need to verify your account
        </P>
        <Button size="sm" variant="link" className="underline" type="button">
          Verify your account
          <MoveRight size={16} />
        </Button>
        {/* <Link href="dashboard/profile" className="text">Verify your account</Link> */}
      </div>
    </div>
  );
}

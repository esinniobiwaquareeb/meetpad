import Image from "next/image";
import Link from "next/link";
import logo from "@/public/meetpad-logo-minimal.svg";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-col w-fit">
      <Image src={logo} alt="MeetPad logo" height={50} />
    </Link>
  );
}

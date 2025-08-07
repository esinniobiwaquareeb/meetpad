import Link from "next/link";
import { IoMdEye } from "react-icons/io";

export default function ButtonViewService({
  serviceUrl,
}: {
  serviceUrl: string;
}) {
  return (
    <Link
      href={serviceUrl}
      target="_blank"
      className="w-full flex items-center gap-3 px-6 py-1.5 text-gray-600 font-normal hover:text-gray-900 hover:bg-gray-50"
    >
      <IoMdEye size={18} />
      <span className="text-sm">View</span>
    </Link>
  );
}

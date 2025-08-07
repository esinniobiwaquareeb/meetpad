import { Forward } from "lucide-react";
import { Button } from "../ui/button";

export default function ButtonShareService() {
  return (
    <Button className="w-full flex items-center gap-3 px-6 py-1.5 text-gray-600 font-normal hover:text-gray-900 hover:bg-gray-50 bg-gray-50">
      <Forward size={18} /> Share
    </Button>
  );
}

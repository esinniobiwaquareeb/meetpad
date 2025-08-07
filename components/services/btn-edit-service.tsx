import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MdEdit } from "react-icons/md";
import { useServices } from "./services-context";
import FormService from "./form-service";
import { useState } from "react";

export default function ButtonEditService({
  serviceId,
}: {
  serviceId: string;
}) {
  const { getService } = useServices();
  const { id, userId, availability, ...service } = getService(serviceId);
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="w-full flex items-center gap-3 px-6 py-1.5 text-gray-600 font-normal hover:text-gray-900 hover:bg-gray-50">
        <MdEdit size={18} /> Edit
      </SheetTrigger>
      <SheetContent className="min-w-full md:min-w-[580px] bg-gray-50">
        <SheetHeader className="mb-6 bg-blue-50 dark:bg-muted p-3 rounded-md overflow-hidden w-[95%] relative before:content-[''] before:block before:w-[4px] before:bg-primary before:absolute before:left-0 before:top-0 before:h-full">
          <SheetTitle className="text-lg">{service.title}</SheetTitle>
          <SheetDescription>
            Click save after editing the details of this service
          </SheetDescription>
        </SheetHeader>
        <FormService id={id} data={service} closeForm={closeSheet} />
      </SheetContent>
    </Sheet>
  );
}

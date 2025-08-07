import Image from "next/image";
import { P } from "../ui/typography";
import noDataImage from "@/public/no-data.svg";
import ButtonAddService from "./btn-add-service";

export default function NoService({
  showAddButton = false,
}: {
  showAddButton?: boolean;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded shadow-sm">
      <div className="border-2 rounded grid place-items-center py-6 md:py-14 border-dotted border-gray-200">
        <div className="mb-4">
          <Image
            // fill
            src={noDataImage}
            alt="No service data"
            className=""
            height={100}
            width={80}
          />
        </div>
        <div className="text-center px-3">
          <P size="sm">
            {`You don't have any service yet, click on the "Add a new service" button
      to add a new Service`}
          </P>
        </div>
        <div className="mt-4">{showAddButton && <ButtonAddService />}</div>
      </div>
    </div>
  );
}

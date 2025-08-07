"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ConfirmDelete from "../common/confirm-delete";
import ButtonEditService from "./btn-edit-service";
import ButtonViewService from "./btn-view-service";
import { ChevronDown, Settings } from "lucide-react";
import ButtonShareService from "./btn-share-service";
import { deleteService } from "@/server/service.actions";

type Props = {
  serviceId: string;
  serviceUrl: string;
};

export default function ServiceActionMenu({ serviceId, serviceUrl }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none text-gray-700 hover:text-gray-900 p-2 flex items-center gap-0">
        <Settings size={20} />
        <ChevronDown size={14} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-1 justify-start">
        <ButtonViewService serviceUrl={serviceUrl} />
        <ButtonEditService serviceId={serviceId} />
        {/* <ButtonShareService /> */}
        <ConfirmDelete
          resourceId={serviceId}
          onDeleteResource={deleteService}
          resourceName="service"
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

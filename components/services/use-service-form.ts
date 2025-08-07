import { useCurrentUser } from "@/contexts/user-context";
import { ServiceSchema, ServiceSchemaType } from "@/schemas/service.schema";
import { createService, updateService } from "@/server/service.actions";
import { createClient } from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { revalidatePath } from "next/cache";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type args = {
  data?: ServiceSchemaType;
  serviceId: string;
  onSubmitted?: () => void;
};

export function useServiceForm({
  data = {} as ServiceSchemaType,
  serviceId,
  onSubmitted,
}: args) {
  const user = useCurrentUser();
  const isEditSession = Boolean(Object.entries(data).length);

  const editData = {
    title: data.title,
    description: data.description,
    duration: data.duration,
    price: data.price,
    startDate: data.startDate,
    endDate: data.endDate,
    meeting_types: data.meeting_types,
  };

  const defaults: ServiceSchemaType = {
    title: "",
    description: "",
    duration: 10,
    price: 0,
    startDate: "",
    endDate: "",
    meeting_types: ["all"],
  };

  const form = useForm<ServiceSchemaType>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: isEditSession ? editData : defaults,
  });

  const { control, handleSubmit, formState, register } = form;
  const { isSubmitting } = formState;

  const onSubmit = async (formData: ServiceSchemaType) => {
    const { files, ...data } = formData;
    const service_image = files?.item(0);
    isEditSession
      ? toast.loading("Updating service", { id: "1" })
      : toast.loading("Adding service", { id: "1" });
    console.log(data);
    if (isEditSession) await updateService(data, String(serviceId));
    else await createService(data, user.id);

    isEditSession
      ? toast.success("Service successfully edited!", { id: "1" })
      : toast.success("Service successfully added!", { id: "1" });
    onSubmitted?.();

    console.log("image ===> ", service_image);

    if (service_image) await updateServiceImage(serviceId, service_image);
    console.log(data);
  };

  const onError = (error: any) => {
    console.log("error => ", error);
  };

  const submitHandler = handleSubmit(onSubmit, onError);

  return { isSubmitting, control, submitHandler, form, register };
}

export const updateServiceImage = async (
  serviceId: string,
  imageFile: File
) => {
  try {
    const supabase = createClient();

    const imageName = `${Math.random()}-${imageFile.name}`.replace("/", "");

    const imagePath = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/service_images/${imageName}`;

    console.log(imagePath);

    const { error: storgaeError } = await supabase.storage
      .from("service_images")
      .upload(imageName, imageFile);

    if (!storgaeError)
      await supabase
        .from("service")
        .update({ image_url: imagePath })
        .eq("id", serviceId)
        .select();

    // revalidatePath("/", "layout");
  } catch (error) {
    console.log(error);
  }
};

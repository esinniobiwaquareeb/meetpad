"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const items = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "video call",
    label: "Video call",
  },
  {
    id: "voice call",
    label: "Voice call",
  },
  {
    id: "chat",
    label: "Chat",
  },
] as const;

type Props = {
  control: any;
  label?: string;
  name: string;
  description?: string;
  disabled?: boolean;
};

export default function FormMultipleCheckbox({
  control,
  label = "label",
  name,
  description,
  disabled,
}: Props) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-2 flex">
            <FormLabel>{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-8 ">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.id}
                      className="flex flex-row items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              if (field.value.includes("all"))
                                return field.onChange(
                                  [...field.value, item.id].filter(
                                    (value) => value !== "all"
                                  )
                                );
                              else {
                                return field.onChange(
                                  item.id == "all"
                                    ? ["all"]
                                    : [...field.value, item.id]
                                );
                              }
                            } else {
                              return field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.id
                                )
                              );
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal leading-none">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  );
}

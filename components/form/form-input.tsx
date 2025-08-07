import { Input } from "../ui/input";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ReactNode } from "react";

type Props = {
  control: any;
  label?: ReactNode;
  name: string;
  description?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
};

export default function FormInput({
  control,
  label = "label",
  name,
  description,
  type = "text",
  placeholder,
  disabled,
  max,
  min,
}: Props) {
  // const form = useFormControl();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              disabled={disabled}
              max={max}
              min={min}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

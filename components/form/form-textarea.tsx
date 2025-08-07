import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { useFormControl } from "./context-form";

type Props = {
  control: any;
  label?: string;
  name: string;
  description?: string;
  placeholder?: string;
};

export default function FormTextarea({
  control,
  label = "label",
  name,
  description,
  placeholder,
}: Props) {
  const form = useFormControl();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

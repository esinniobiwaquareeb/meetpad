import { useFieldArray } from "react-hook-form";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2, X } from "lucide-react";
import ButtonCopy from "../common/button-copy";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import InputTime from "../common/input-time";
import { P } from "../ui/typography";

type Props = {
  control: any;
  day: string;
  register: any;
  value: any;
  reset: any;
};

export default function FormWeekDay({
  control,
  day,
  register,
  value,
  reset,
}: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: day,
  });

  return (
    <div className="grid md:grid-cols-[4rem_1fr_auto_auto_auto] gap-4">
      <div className="mt-3 flex gap-2">
        <Checkbox
          checked={value.length !== 0}
          onClick={() => {
            if (value.length === 0) reset();
            else remove();
          }}
        />
        <span className="-mt-0.5 uppercase text-sm text-gray-700 font-medium">
          {day}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-[1fr_auto_1fr_.3fr] md:grid-cols-[1fr_auto_1fr_auto] gap-2 items-center"
          >
            <Input
              type="time"
              {...register(`${day}.${index}.startTime` as const, {})}
            />
            <Minus size={18} className="text-gray-500" />
            <Input
              type="time"
              {...register(`${day}.${index}.endTime` as const)}
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => remove(index)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
        {value.length === 0 && (
          <div className="mt-2.5">
            <span className="block text-sm text-gray-500 ml-2">
              Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-2 items-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => append({ startTime: "", endTime: "" })}
        >
          <Plus size={16} />
        </Button>
        <ButtonCopy size="sm"></ButtonCopy>
      </div>
    </div>
  );
}

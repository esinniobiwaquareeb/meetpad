"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import ButtonSpinner from "../ui/ButtonSpinner";
import { toast } from "sonner";
import { useDidUpdateEffect } from "@/hooks/useDidUpdateEffect";

type Props = {
  pendingText?: string;
  text?: string;
  showToast?: boolean;
  toastId?: string | number;
  toastPendingMessage?: string;
  toastSuccessMessage?: string;
  toastErrorMessage?: string;
  showPendingToast?: boolean;
  showSuccessToast?: boolean;
  className?: string;
  isPending?: boolean;
  disabled?: boolean;
  type?: "submit" | "button";
  onCompletion?: () => void;
};

export default function ButtonSubmit({
  className,
  text = "Save",
  pendingText = "saving",
  toastId = "1",
  showPendingToast = true,
  showSuccessToast = true,
  toastPendingMessage = "Loading..",
  toastSuccessMessage = "Done!",
  isPending = false,
  disabled = false,
}: Props) {
  const { pending: loading } = useFormStatus();

  const pending = isPending || loading;

  useDidUpdateEffect(() => {
    pending
      ? showPendingToast && toast.loading(toastPendingMessage, { id: toastId })
      : showSuccessToast && toast.success(toastSuccessMessage, { id: toastId });
  }, [pending]);

  return (
    <Button disabled={pending || disabled} type="submit" className={className}>
      {pending ? (
        <>
          <ButtonSpinner /> {pendingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}

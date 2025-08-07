"use client";

import { ReactNode, createContext, useContext } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import { Form } from "../ui/form";

const FormContext = createContext({} as FieldValues);

function FormControlProvider({
  children,
  form,
}: {
  children: ReactNode;
  form: UseFormReturn<FieldValues, any, undefined>;
}) {
  return (
    <FormContext.Provider value={{ form }}>
      <Form {...form}>{children}</Form>
    </FormContext.Provider>
  );
}

function useFormControl() {
  const context = useContext(FormContext);

  if (!context) throw new Error("FormContext used out of FormControlProvider!");

  return context;
}

export { FormControlProvider, useFormControl };

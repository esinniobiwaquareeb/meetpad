import clsx from "clsx";

type Paragraph_Props = {
  children?: any;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | undefined;
};

export function P({ children, className, size }: Paragraph_Props) {
  return (
    <p
      className={clsx("text-gray-700 text-base leading-7", className, {
        "text-sm font-normal leading-6": size === "sm",
        "text-xs font-normal leading-5": size === "xs",
        "text-md font-normal": size === "md",
        "text-lg font-normal": size === "lg",
        "text-xl font-normal": size === "xl",
      })}
    >
      {children}
    </p>
  );
}

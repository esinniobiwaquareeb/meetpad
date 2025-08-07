import clsx from "clsx";

type Heading_Props = {
  children?: any;
  className?: string;
  size?: "sm" | undefined;
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | undefined;
};

export function Heading({ children, className, size, type }: Heading_Props) {
  const globalStyles = `text-gray-800`;
  switch (type) {
    case "h1":
      return (
        <h1
          className={clsx(
            "scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl",
            globalStyles,
            className
          )}
        >
          {children}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={clsx(
            "scroll-m-20 pb-2 text-3xl font-medium tracking-tight first:mt-0",
            globalStyles,
            className
          )}
        >
          {children}
        </h2>
      );
    case "h3":
      return (
        <h3
          className={clsx(
            "scroll-m-20 text-2xl font-medium tracking-tight",
            globalStyles,
            className
          )}
        >
          {children}
        </h3>
      );
    case "h4":
      return (
        <h4 className={clsx("scroll-m-20 text-xl", globalStyles, className)}>
          {children}
        </h4>
      );
    case "h5":
      return (
        <h5
          className={clsx(
            "scroll-m-20 pb-2 text-lg font-medium tracking-tight first:mt-0",
            globalStyles,
            className
          )}
        >
          {children}
        </h5>
      );
    case "h6":
      return (
        <h6
          className={clsx(
            "scroll-m-20 mb-1 text-md font-medium tracking-tight first:mt-0",
            globalStyles,
            className
          )}
        >
          {children}
        </h6>
      );
    default:
      return (
        <h4
          className={clsx(
            "scroll-m-20 text-xl font-medium tracking-tight",
            globalStyles,
            className
          )}
        >
          {children}
        </h4>
      );
  }
}

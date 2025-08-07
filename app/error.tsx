"use client";

type Props = {
  error: Error;
  reset: Function;
};

export default function Error({ error, reset }: Props) {
  return <div>Error: {error.message}</div>;
}

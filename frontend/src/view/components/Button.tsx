import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

interface IButton extends ComponentProps<"button"> {
  isLoading?: boolean;
}

export function Button({
  className,
  disabled,
  isLoading,
  children,
  ...props
}: IButton) {
  return (
    <button
      disabled={disabled || isLoading}
      {...props}
      className={cn(
        "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all items-center flex  justify-center ",
        className
      )}
    >
      {isLoading ? <Spinner className="w-6 h-6" /> : children}
    </button>
  );
}

import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";

interface IButton extends ComponentProps<"button"> {}

export function Button({ className, ...props }: IButton) {
  return (
    <button
      {...props}
      className={cn(
        "bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 px-6 h-12 rounded-2xl font-medium text-white disabled:text-gray-400 disabled:cursor-not-allowed transition-all",
        className
      )}
    />
  );
}

import { ComponentProps, forwardRef } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";

interface IInputProps extends ComponentProps<"input"> {
  name: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ className, name, placeholder, id, error, ...props }, ref) => {
    const inputId = id ?? name;
    return (
      <div className="relative">
        <input
          id={inputId}
          ref={ref}
          {...props}
          name={name}
          className={cn(
            "bg-white rounded-lg border-gray-500 px-3 h-[52px] text-gray-800 w-full pt-4 peer placeholder-shown:pt-0 transition-all focus:outline focus:outline-gray-800",
            error && "!border-red-900 focus:outline-red-900",
            className
          )}
          placeholder=" "
        />
        <label
          htmlFor={inputId}
          className="absolute text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all"
        >
          {placeholder}
        </label>
        {error && (
          <div className="flex items-center gap-2 mt-2 text-red-900">
            <CrossCircledIcon />
            <span className=" text-xs">{error}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

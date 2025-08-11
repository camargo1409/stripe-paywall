import React, { forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import { cn } from "../../utils/cn";

interface BaseInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  wrapperClassName?: string;
  name: string;
}

interface TextInputProps extends BaseInputProps {
  type?: "text" | "email" | "password" | "tel" | "url";
  placeholder?: string;
  disabled?: boolean;
}

// Text Input Component
export const Input = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      type = "text",
      label,
      error,
      helperText,
      required,
      placeholder,
      disabled,
      className,
      wrapperClassName,
      name,
      ...props
    },
  ) => {
    const inputId = React.useId();
    const { register, formState: { errors } } = useFormContext();

    const fieldError = errors[name]?.message as string;

    return (
      <div className={cn("space-y-1", wrapperClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium text-gray-700",
              required && "after:content-['*'] after:text-red-500 after:ml-1"
            )}
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm",
            "placeholder:text-gray-400",
            "focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
            "disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            fieldError && "border-red-300 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...register(name, { required: required ? "This field is required" : false })}
          {...props}
        />
        {fieldError && (
          <p className="text-sm text-red-600" role="alert">
            {fieldError}
          </p>
        )}
        {helperText && !fieldError && (
          <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

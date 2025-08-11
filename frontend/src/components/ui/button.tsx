import React from "react";
import { cn } from "../../utils/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const buttonVariants = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm",
  secondary: "bg-gray-600 hover:bg-gray-700 text-white shadow-sm",
  outline:
    "border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 shadow-sm",
  ghost: "hover:bg-gray-100 text-gray-900",
  destructive: "bg-red-600 hover:bg-red-700 text-white shadow-sm",
};

const buttonSizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

export const Button = ({
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  children,
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const baseClasses = cn(
    "inline-flex items-center justify-center rounded-md font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
    "disabled:opacity-50 disabled:pointer-events-none",
    "cursor-pointer",
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && "w-full",
    className
  );

  const content = <>{loading ? "Loading ..." : children}</>;


  const { type = "button", onClick } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseClasses}
    >
      {content}
    </button>
  );
};

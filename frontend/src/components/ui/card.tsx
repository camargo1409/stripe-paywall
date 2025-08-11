import type { ReactNode } from "react";

interface CardProps {
    children: ReactNode
}

export const Card = ({ children }: CardProps) => {
  return (
    <div
      className={
        "relative bg-white rounded-xl border transition-all duration-300 hover:shadow hover:-translate-y-1 border-slate-200 shadow-sm p-8"
      }
    >
      {children}
    </div>
  );
};

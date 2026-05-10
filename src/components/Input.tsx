"use client"
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div>
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{label}</label>
        <input
          ref={ref}
          type={type}
          className={`flex h-9 w-full rounded-md border border-[#e2e8f0] bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

import * as React from "react";
import { cn } from "@/lib/utils";

type TextareaProps = React.ComponentProps<"textarea"> & {
  showCharCount?: boolean;
  currentLength?: number;
  maxLength?: number;
};

function Textarea({
  className,
  showCharCount = false,
  currentLength,
  maxLength,
  ...props
}: TextareaProps) {
  return (
    <div className="relative w-full h-full">
      <textarea
        data-slot="textarea"
        className={cn(
          "flex min-h-full w-full text-sm shadow-xs disabled:cursor-not-allowed disabled:opacity-50  equipment-input theme-color bg-[rgba(255,255,255,.025)] transition-all  text-white !py-2 !px-4",
          className
        )}
        {...props}
      />
      {showCharCount && typeof currentLength === "number" && typeof maxLength === "number" && (
        <div className="absolute bottom-1.5 right-3 text-xs text-muted-foreground">
          {currentLength}/{maxLength}
        </div>
      )}
    </div>
  );
}
Textarea.displayName = "Textarea";

export { Textarea };

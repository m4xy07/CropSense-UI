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
          "border-input placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex min-h-full w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
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

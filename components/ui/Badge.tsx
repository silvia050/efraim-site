import { HTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        // Eventos regulares (cultos, reuniões)
        primary: "bg-primary-100 text-primary-800",
        // Eventos especiais / destaque
        gold: "bg-gold-100 text-gold-800",
        // Status positivo (ex: voluntário aprovado, doação confirmada)
        emerald: "bg-emerald-100 text-emerald-800",
        // Uso neutro / informativo
        neutral: "bg-gray-100 text-gray-700",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };

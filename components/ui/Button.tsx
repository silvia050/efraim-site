import { ButtonHTMLAttributes, forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Classes base aplicadas a todas as variantes
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 " +
    "disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        // Ação principal: doações, inscrições, envio de formulário
        primary: "bg-primary-800 text-white hover:bg-primary-700",
        // Ação de destaque/celebração: ex. "Contribua"
        secondary: "bg-gold-500 text-primary-900 hover:bg-gold-400",
        // Ação secundária sobre fundos claros ou escuros
        outline:
          "border border-primary-800 text-primary-800 hover:bg-primary-50",
        // Ações de baixa ênfase, ex. links de navegação em formato de botão
        ghost: "text-primary-800 hover:bg-primary-50",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-base",
        lg: "h-13 px-7 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

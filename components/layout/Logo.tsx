import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  // Header escuro sobre fundo claro, Footer claro sobre fundo escuro
  variant?: "dark" | "light";
}

export function Logo({ className, variant = "dark" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-display text-xl font-semibold",
        isLight ? "text-white" : "text-primary-900",
        className,
      )}
    >
      <Image
        src="/images/logo.png"
        alt="Logo Ministério Efraim"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
        priority
      />
      <span>
        Ministério{" "}
        <span className={isLight ? "text-gold-400" : "text-gold-600"}>
          Efraim
        </span>
      </span>
    </Link>
  );
}

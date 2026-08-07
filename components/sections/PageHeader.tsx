import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

// Cabeçalho padrão para todas as páginas internas (Sobre, Mensagens, Agenda etc).
// Mantém consistência visual entre seções sem repetir código.
export function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <section
      className={cn(
        "bg-gradient-to-br from-primary-950 to-primary-800 py-16 text-center text-white",
        className
      )}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-semibold">{title}</h1>
        {description && (
          <p className="mt-3 text-lg text-primary-100">{description}</p>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { mainNav } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  // Header ganha sombra/fundo sólido ao rolar — sinaliza profundidade sem
  // depender de um hero transparente (mais previsível em todas as páginas).
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o dropdown desktop ao clicar fora dele
  useEffect(() => {
    const onClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenDesktopMenu(null);
      }
    };
    document.addEventListener("click", onClickOutside);
    return () => document.removeEventListener("click", onClickOutside);
  }, []);

  // Fecha tudo na troca de rota. Em vez de um useEffect, ajustamos o estado
  // durante a própria renderização comparando com o pathname anterior — é o
  // padrão recomendado pelo React para "resetar estado quando um valor
  // externo muda", sem disparar um re-render em cascata extra via efeito.
  const [previousPathname, setPreviousPathname] = useState(pathname);
  if (pathname !== previousPathname) {
    setPreviousPathname(pathname);
    if (openDesktopMenu !== null) setOpenDesktopMenu(null);
    if (isMobileOpen) setIsMobileOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full bg-white transition-shadow",
        isScrolled ? "shadow-md" : "shadow-none border-b border-primary-50"
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Navegação desktop */}
        <nav className="hidden lg:flex lg:items-center lg:gap-1" aria-label="Navegação principal">
          {mainNav.map((item) => (
            <DesktopNavItem
              key={item.href}
              item={item}
              isOpen={openDesktopMenu === item.href}
              onToggle={() =>
                setOpenDesktopMenu((current) => (current === item.href ? null : item.href))
              }
            />
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link href="/contribua">
            <Button variant="secondary" size="md">
              Contribua
            </Button>
          </Link>
        </div>

        {/* Botão hambúrguer (mobile) */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-primary-900 lg:hidden"
          aria-expanded={isMobileOpen}
          aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden border-t border-primary-50 lg:hidden"
          >
            <nav className="flex flex-col px-4 py-2" aria-label="Navegação mobile">
              {mainNav.map((item) => (
                <MobileNavItem key={item.href} item={item} />
              ))}
              <Link href="/contribua" className="my-3">
                <Button variant="secondary" size="md" className="w-full">
                  Contribua
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopNavItem({
  item,
  isOpen,
  onToggle,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  if (!item.subItems) {
    return (
      <Link
        href={item.href}
        className="rounded-md px-4 py-2 text-sm font-medium text-primary-800 hover:bg-primary-50"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-primary-800 hover:bg-primary-50"
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
      >
        {item.label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-10 mt-1 min-w-48 rounded-md border border-primary-100 bg-white py-1 shadow-lg"
          >
            {item.subItems.map((sub) => (
              <Link
                key={sub.href}
                href={sub.href}
                className="block px-4 py-2 text-sm text-primary-700 hover:bg-primary-50"
              >
                {sub.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavItem({ item }: { item: NavItem }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!item.subItems) {
    return (
      <Link
        href={item.href}
        className="border-b border-primary-50 py-3 text-base font-medium text-primary-800"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-primary-50">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-base font-medium text-primary-800"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((e) => !e)}
      >
        {item.label}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-180")}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden pl-4"
          >
            {item.subItems.map((sub) => (
              <Link key={sub.href} href={sub.href} className="block py-2 text-sm text-primary-600">
                {sub.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

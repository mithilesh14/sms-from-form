import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "@/lib/utils";

type PageShellProps = {
  title: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
};

export function PageShell({ title, children, className }: PageShellProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={cn("flex-1 pt-24 pb-16 bg-background", className)}>
        <section className="container-luxury">
          <header className="mb-10">
            <h1 className="font-serif text-4xl md:text-5xl text-primary">{title}</h1>
            <div className="section-divider mt-6" />
          </header>
          {children}
        </section>
      </main>
      <Footer />
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { menu, type MenuSection } from "@/lib/menu-data";

const logoUrl = "/logo.png";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mamma li Turchi — Menu | Antipasteria · Ristorante · Pizzeria a Tricase Porto" },
      {
        name: "description",
        content:
          "Il menu 2026 del Mamma li Turchi a Tricase Porto: antipasti, focacce, insalatone, pizze classiche, speciali e bianche, dolci, birre e vini del Salento.",
      },
      { property: "og:title", content: "Mamma li Turchi — Menu | Antipasteria · Ristorante · Pizzeria a Tricase Porto" },
      {
        property: "og:description",
        content: "Il menu 2026 del Mamma li Turchi a Tricase Porto: antipasti, focacce, insalatone, pizze classiche, speciali e bianche, dolci, birre e vini del Salento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  return (
    <div className="relative min-h-screen">
      <Nav />
      <Hero />
      <main className="mx-auto max-w-4xl px-6 pb-32">
        {menu.map((section, i) => (
          <Section key={section.id} section={section} index={i} />
        ))}
        <Coperto />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/393281021493"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_15px_35px_-10px_rgba(37,211,102,0.75)] transition hover:-translate-y-1 hover:scale-105"
    >
      <svg viewBox="0 0 32 32" className="h-7 w-7 fill-current" aria-hidden>
        <path d="M19.11 17.28c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM16 3C8.82 3 3 8.82 3 16c0 2.29.6 4.44 1.66 6.31L3 29l6.86-1.8A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.75c-1.99 0-3.86-.53-5.47-1.46l-.39-.23-4.07 1.07 1.09-3.97-.25-.41A10.72 10.72 0 0 1 5.25 16c0-5.93 4.82-10.75 10.75-10.75S26.75 10.07 26.75 16 21.93 26.75 16 26.75z"/>
      </svg>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>(menu[0].id);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    menu.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_82%,transparent)] border-b border-border/60 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <a href="#top" className="flex items-center gap-3">
          <img src={logoUrl} alt="Mamma li Turchi" className="h-11 w-auto" />
          <span className="sr-only">Mamma li Turchi</span>
        </a>
        <nav className="hidden md:block">
          <ul className="flex max-w-[70vw] items-center gap-1 overflow-x-auto text-sm">
            {menu.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className={`relative rounded-full px-3 py-1.5 transition-colors ${
                    activeId === s.id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s.title}
                  {activeId === s.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-primary/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href="tel:+393281021493"
          className="hidden sm:inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-[0_10px_25px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition hover:-translate-y-0.5"
        >
          Prenota
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.img
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          src={logoUrl}
          alt="Mamma li Turchi"
          className="mx-auto h-40 sm:h-52 w-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 text-xs uppercase tracking-[0.35em] text-secondary"
        >
          Antipasteria · Ristorante · Pizzeria
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-4 text-5xl sm:text-7xl font-medium text-ink"
        >
          Il Menu
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mx-auto mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground"
        >
          Sapori del Salento a Tricase Porto, tra il chiaro di luna e i profumi della macchia
          mediterranea. Una cucina che racconta il nostro mare e la nostra terra.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-10 h-px w-40 divider-swash"
        />
      </div>
    </section>
  );
}

function Section({ section, index }: { section: MenuSection; index: number }) {
  return (
    <motion.section
      id={section.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-28 py-14 sm:py-20"
    >
      <div className="mb-10 flex items-baseline gap-4">
        <span className="font-display text-sm tabular-nums text-secondary/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2 className="text-3xl sm:text-4xl font-medium text-ink">{section.title}</h2>
        <div className="h-px flex-1 translate-y-[-4px] bg-gradient-to-r from-primary/40 via-secondary/30 to-transparent" />
      </div>

      <ul className="space-y-7">
        {section.items.map((item, i) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.25) }}
            className="group"
          >
            <div className="flex items-baseline">
              <h3 className="font-display text-lg sm:text-xl text-ink flex items-center gap-2">
                {item.starred && <span className="text-accent">★</span>}
                <span className="transition-colors group-hover:text-primary">{item.name}</span>
              </h3>
              <span className="price-dots" aria-hidden />
              <span className="font-display text-lg sm:text-xl tabular-nums text-primary">
                {item.price === "—" ? item.price : `€ ${item.price}`}
              </span>
            </div>
            {item.description && (
              <p className="mt-1 max-w-2xl text-sm sm:text-[15px] leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            )}
          </motion.li>
        ))}
      </ul>

      {section.note && (
        <p className="mt-8 text-xs italic text-muted-foreground/80">* {section.note}</p>
      )}
    </motion.section>
  );
}

function Coperto() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mx-auto mt-20 max-w-md rounded-2xl border border-border bg-card/60 px-8 py-6 text-center backdrop-blur"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Servizio</p>
      <p className="mt-2 font-display text-2xl text-ink">Coperto € 2,00</p>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-border/60 bg-[color-mix(in_oklab,var(--secondary)_8%,var(--background))]">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-3">
        <div>
          <img src={logoUrl} alt="Mamma li Turchi" className="h-16 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Movida salentina dal 1980. Un locale sospeso tra il porto e le stelle.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-secondary">Dove siamo</h4>
          <p className="mt-3 text-sm leading-relaxed text-foreground">
            Tricase Porto<br />Via Borgo Pescatori<br />Salento, Puglia
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-secondary">Contatti</h4>
          <p className="mt-3 text-sm text-foreground">
            <a href="tel:+393281021493" className="hover:text-primary">328 102 14 93</a>
          </p>
          <a
            href="https://wa.me/393281021493"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contattaci su WhatsApp"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-[0_10px_25px_-10px_rgba(37,211,102,0.7)] transition hover:-translate-y-0.5"
          >
            <svg viewBox="0 0 32 32" className="h-4 w-4 fill-current" aria-hidden>
              <path d="M19.11 17.28c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.47-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.88 1.21 3.08.15.2 2.09 3.19 5.06 4.47.71.31 1.26.49 1.69.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM16 3C8.82 3 3 8.82 3 16c0 2.29.6 4.44 1.66 6.31L3 29l6.86-1.8A12.94 12.94 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.75c-1.99 0-3.86-.53-5.47-1.46l-.39-.23-4.07 1.07 1.09-3.97-.25-.41A10.72 10.72 0 0 1 5.25 16c0-5.93 4.82-10.75 10.75-10.75S26.75 10.07 26.75 16 21.93 26.75 16 26.75z"/>
            </svg>
            WhatsApp
          </a>
          <p className="mt-3 text-sm text-foreground">
            <a href="https://www.mammaliturchi.com" className="hover:text-primary">
              www.mammaliturchi.com
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Mamma li Turchi ® — Tricase Porto
      </div>
    </footer>
  );
}

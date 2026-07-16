import type { MenuItem } from "@/lib/menu-data";

/**
 * Renders a hand-drawn style SVG that visually represents a menu item
 * by composing shapes for each detected ingredient keyword.
 */
export function ItemIcon({ item, sectionId }: { item: MenuItem; sectionId: string }) {
  const svg = buildSvg(item, sectionId);
  return (
    <span
      aria-hidden
      className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_oklab,var(--secondary)_8%,var(--background))] ring-1 ring-border/60 shadow-[0_4px_10px_-4px_rgba(27,61,122,0.2)]"
    >
      {svg}
    </span>
  );
}

const V = 64; // viewBox size

function buildSvg(item: MenuItem, sectionId: string) {
  const text = `${item.name} ${item.description ?? ""}`.toLowerCase();

  // Dedicated categories
  if (sectionId === "bevande") return drinkGlass(text);
  if (sectionId === "birra") return beerMug();
  if (sectionId === "bollicine") return flute("#f5e9b0");
  if (sectionId === "bianchi") return wineGlass("#eadf9c");
  if (sectionId === "rosati") return wineGlass("#f2b3c1");
  if (sectionId === "rossi") return wineGlass("#7a1f2b");
  if (sectionId === "dolci") return gelato();
  if (sectionId === "insalatone") return saladBowl(text);
  if (sectionId === "antipasti") return antipastoIcon(item.name.toLowerCase());
  if (sectionId === "focacce") return breadBase(text);
  // pizze & bianche
  return pizzaBase(text, sectionId === "bianche");
}

/* --------------------------- BASES --------------------------- */

function svgWrap(children: React.ReactNode) {
  return (
    <svg viewBox={`0 0 ${V} ${V}`} className="h-10 w-10" xmlns="http://www.w3.org/2000/svg">
      {children}
    </svg>
  );
}

function pizzaBase(text: string, white: boolean) {
  const crust = "#d9a45b";
  const sauce = white ? "#f5efe0" : "#c8382a";
  return svgWrap(
    <>
      <circle cx={V / 2} cy={V / 2} r={28} fill={crust} />
      <circle cx={V / 2} cy={V / 2} r={24} fill={sauce} />
      {toppings(text)}
    </>,
  );
}

function breadBase(text: string) {
  return svgWrap(
    <>
      <ellipse cx={V / 2} cy={V / 2} rx={28} ry={20} fill="#e6b56b" />
      <ellipse cx={V / 2} cy={V / 2} rx={24} ry={16} fill="#f2d199" />
      {toppings(text)}
    </>,
  );
}

/* --------------------------- TOPPINGS --------------------------- */

type Topping = (i: number, total: number) => React.ReactNode;

function toppings(text: string) {
  const ings: Topping[] = [];

  const has = (...k: string[]) => k.some((s) => text.includes(s));

  if (has("mozzarella", "bufala", "bocconcin", "scamorza", "brie", "feta")) ings.push(dot("#fdfdfa"));
  if (has("pomodorin")) ings.push(dot("#c8382a", 3));
  if (has("gorgonzola")) ings.push(dot("#eef1e8", 3.5, "#5a6b8a"));
  if (has("grana", "cacioricotta")) ings.push(shard("#f2d98a"));
  if (has("prosciutto crudo", "capocollo", "bresaola", "speck")) ings.push(meatSlice("#d16b7a"));
  if (has("prosciutto cotto", "cotto", "würstel", "wurstel")) ings.push(meatSlice("#f0b5b0"));
  if (has("salsiccia", "salame", "salamino", "diavola", "piccante", "pancetta")) ings.push(dot("#a83232", 3));
  if (has("tonno")) ings.push(flake("#e8b791"));
  if (has("acciugh")) ings.push(strip("#8a7a5a"));
  if (has("capperi")) ings.push(dot("#4a6b3a", 1.8));
  if (has("olive")) ings.push(dot("#2b2118", 2.2));
  if (has("funghi", "porcini", "champignon")) ings.push(mushroom());
  if (has("carciof")) ings.push(leaf("#5a7a3a"));
  if (has("cipoll")) ings.push(ring("#f0e8dc"));
  if (has("rucola", "basilico", "mentuccia")) ings.push(leaf("#3d7a3a"));
  if (has("radicchio", "verza")) ings.push(leaf("#8a3a5a"));
  if (has("noci")) ings.push(shard("#8a5a3a"));
  if (has("per")) ings.push(leaf("#a8b56a"));
  if (has("zucchin", "verdure grigliate")) ings.push(strip("#5a7a3a"));
  if (has("patatin", "patate")) ings.push(strip("#e8c46a"));
  if (has("glassa", "balsamico")) ings.push(drizzle());
  if (has("pomodori secchi")) ings.push(dot("#7a2820", 2.2));

  if (ings.length === 0) return null;
  const total = Math.min(ings.length * 3, 10);
  return positioned(ings, total);
}

function positioned(ings: Topping[], total: number) {
  const nodes: React.ReactNode[] = [];
  let k = 0;
  const R = 18;
  for (let i = 0; i < total; i++) {
    const angle = (i / total) * Math.PI * 2 + i * 0.7;
    const r = i % 3 === 0 ? 4 : R * (0.35 + ((i * 37) % 60) / 100);
    const x = V / 2 + Math.cos(angle) * r;
    const y = V / 2 + Math.sin(angle) * r;
    const t = ings[k % ings.length];
    nodes.push(
      <g key={i} transform={`translate(${x - V / 2} ${y - V / 2})`}>
        {t(i, total)}
      </g>,
    );
    k++;
  }
  return <>{nodes}</>;
}

/* --------------------------- SHAPES --------------------------- */

const dot =
  (fill: string, r = 2.5, stroke?: string): Topping =>
  () =>
    <circle cx={V / 2} cy={V / 2} r={r} fill={fill} stroke={stroke} strokeWidth={stroke ? 0.4 : 0} />;

const shard =
  (fill: string): Topping =>
  () =>
    <polygon points={`${V / 2 - 2},${V / 2 - 1} ${V / 2 + 2},${V / 2 - 2} ${V / 2 + 1},${V / 2 + 2}`} fill={fill} />;

const meatSlice =
  (fill: string): Topping =>
  () =>
    <rect x={V / 2 - 3} y={V / 2 - 1.5} width={6} height={3} rx={1.2} fill={fill} />;

const flake =
  (fill: string): Topping =>
  () =>
    <path d={`M${V / 2 - 3} ${V / 2} q3 -3 6 0 q-3 3 -6 0`} fill={fill} />;

const strip =
  (fill: string): Topping =>
  () =>
    <rect x={V / 2 - 3.5} y={V / 2 - 0.8} width={7} height={1.6} rx={0.6} fill={fill} />;

const leaf =
  (fill: string): Topping =>
  () =>
    <path d={`M${V / 2} ${V / 2 - 3} q3 3 0 6 q-3 -3 0 -6`} fill={fill} />;

const ring =
  (fill: string): Topping =>
  () =>
    <circle cx={V / 2} cy={V / 2} r={2.2} fill="none" stroke={fill} strokeWidth={0.9} />;

const mushroom: Topping = () => (
  <g>
    <ellipse cx={V / 2} cy={V / 2 - 0.5} rx={3} ry={1.6} fill="#a07050" />
    <rect x={V / 2 - 1} y={V / 2 + 0.5} width={2} height={1.8} fill="#f0e2c8" />
  </g>
);

const drizzle: Topping = () => (
  <path d={`M${V / 2 - 4} ${V / 2} q2 -2 4 0 t4 0`} stroke="#3a1e10" strokeWidth={0.6} fill="none" />
);

/* --------------------------- DRINKS / OTHER --------------------------- */

function wineGlass(fill: string) {
  return svgWrap(
    <>
      <path d="M20 10 h24 v10 a12 12 0 0 1 -24 0 z" fill={fill} stroke="#e8e4dc" strokeWidth={1.2} />
      <path d="M20 10 h24 v6 a12 12 0 0 1 -24 0 z" fill="rgba(255,255,255,0.15)" />
      <line x1={32} y1={30} x2={32} y2={48} stroke="#c8c2b6" strokeWidth={1.4} />
      <ellipse cx={32} cy={50} rx={9} ry={2} fill="#c8c2b6" />
    </>,
  );
}

function flute(fill: string) {
  return svgWrap(
    <>
      <path d="M26 10 h12 l-2 22 h-8 z" fill={fill} stroke="#e8e4dc" strokeWidth={1.1} />
      <circle cx={30} cy={20} r={1} fill="#fff" />
      <circle cx={34} cy={26} r={0.8} fill="#fff" />
      <circle cx={31} cy={30} r={0.6} fill="#fff" />
      <line x1={32} y1={32} x2={32} y2={50} stroke="#c8c2b6" strokeWidth={1.2} />
      <ellipse cx={32} cy={52} rx={7} ry={1.6} fill="#c8c2b6" />
    </>,
  );
}

function beerMug() {
  return svgWrap(
    <>
      <rect x={16} y={16} width={26} height={34} rx={2} fill="#f2c14a" stroke="#8a5a20" strokeWidth={1.4} />
      <path d="M16 22 h26 v-4 q-13 -6 -26 0 z" fill="#fdfdf5" />
      <path d="M42 22 h6 a4 4 0 0 1 0 20 h-6" fill="none" stroke="#8a5a20" strokeWidth={1.6} />
      <line x1={22} y1={26} x2={22} y2={46} stroke="#d9a838" strokeWidth={1} />
      <line x1={28} y1={26} x2={28} y2={46} stroke="#d9a838" strokeWidth={1} />
    </>,
  );
}

function drinkGlass(text: string) {
  const isSoda = /coca|fanta|zero|0/.test(text);
  const fill = /fanta/.test(text) ? "#e8862a" : isSoda ? "#3a1810" : "#bde3f0";
  return svgWrap(
    <>
      <path d="M18 12 h28 l-4 40 h-20 z" fill={fill} opacity={0.85} stroke="#8a8a8a" strokeWidth={1.1} />
      <path d="M18 12 h28 l-1 8 h-26 z" fill="#fff" opacity={0.3} />
      {isSoda && (
        <>
          <line x1={36} y1={8} x2={30} y2={48} stroke="#e6e0d6" strokeWidth={1.4} />
        </>
      )}
      {!isSoda && (
        <>
          <circle cx={28} cy={24} r={1} fill="#fff" opacity={0.7} />
          <circle cx={34} cy={30} r={1.2} fill="#fff" opacity={0.7} />
        </>
      )}
    </>,
  );
}

function gelato() {
  return svgWrap(
    <>
      <circle cx={32} cy={22} r={9} fill="#f7c9c0" />
      <circle cx={26} cy={20} r={7} fill="#f2d98a" />
      <circle cx={38} cy={20} r={7} fill="#a67a4a" />
      <path d="M22 28 l10 24 l10 -24 z" fill="#d9a45b" />
      <path d="M24 30 h16 M26 34 h12 M28 38 h8" stroke="#8a5a20" strokeWidth={0.6} />
    </>,
  );
}

function saladBowl(text: string) {
  const extras: React.ReactNode[] = [];
  if (text.includes("pomodor")) extras.push(<circle key="t" cx={26} cy={32} r={2} fill="#c8382a" />);
  if (text.includes("noci")) extras.push(<circle key="n" cx={40} cy={30} r={2} fill="#8a5a3a" />);
  if (text.includes("feta") || text.includes("grana") || text.includes("bocconcin"))
    extras.push(<circle key="c" cx={34} cy={34} r={1.8} fill="#fdfdfa" />);
  if (text.includes("pere")) extras.push(<path key="p" d="M36 28 q2 -2 4 0 q-2 3 -4 0" fill="#a8b56a" />);
  if (text.includes("capocoll") || text.includes("bresaola"))
    extras.push(<rect key="m" x={28} y={30} width={5} height={2} rx={1} fill="#d16b7a" />);
  return svgWrap(
    <>
      <path d="M12 28 a20 12 0 0 0 40 0 z" fill="#f0e8d6" stroke="#c8b898" strokeWidth={1.2} />
      <path d="M18 26 q6 -8 14 -4 q6 -6 14 2 q-4 6 -14 4 q-10 4 -14 -2 z" fill="#5a8a3a" />
      <path d="M22 26 q6 -6 12 -2 q6 -4 10 2" fill="#7ea84a" />
      {extras}
    </>,
  );
}

function antipastoIcon(name: string) {
  if (name.includes("patatin")) {
    return svgWrap(
      <>
        <path d="M18 40 l6 -24 l4 0 l-4 24 z" fill="#e8c46a" stroke="#8a5a20" strokeWidth={0.8} />
        <path d="M26 40 l4 -26 l4 0 l-2 26 z" fill="#f0d078" stroke="#8a5a20" strokeWidth={0.8} />
        <path d="M34 40 l2 -24 l4 0 l0 24 z" fill="#e8c46a" stroke="#8a5a20" strokeWidth={0.8} />
        <path d="M40 40 l0 -22 l4 0 l2 22 z" fill="#f0d078" stroke="#8a5a20" strokeWidth={0.8} />
        <path d="M14 40 h38 l-4 12 h-30 z" fill="#c8382a" />
      </>,
    );
  }
  if (name.includes("crocchett")) {
    return svgWrap(
      <>
        <ellipse cx={22} cy={36} rx={8} ry={5} fill="#d9a45b" stroke="#8a5a20" strokeWidth={0.8} />
        <ellipse cx={40} cy={30} rx={8} ry={5} fill="#e6b56b" stroke="#8a5a20" strokeWidth={0.8} />
        <ellipse cx={32} cy={44} rx={8} ry={5} fill="#d9a45b" stroke="#8a5a20" strokeWidth={0.8} />
        <path d="M20 18 q4 -6 8 0" stroke="#3d7a3a" strokeWidth={1} fill="none" />
      </>,
    );
  }
  if (name.includes("frittura")) {
    return svgWrap(
      <>
        <path d="M12 32 q10 -10 20 0 q10 -10 20 0 l-4 4 q-8 6 -16 0 q-8 6 -16 0 z" fill="#e8c46a" stroke="#8a5a20" strokeWidth={0.9} />
        <circle cx={20} cy={30} r={1} fill="#8a5a20" />
        <circle cx={44} cy={30} r={1} fill="#8a5a20" />
        <path d="M14 44 q18 -6 36 0" stroke="#5a8ab8" strokeWidth={1} fill="none" />
      </>,
    );
  }
  if (name.includes("capocollo")) {
    return svgWrap(
      <>
        <ellipse cx={24} cy={30} rx={10} ry={6} fill="#d16b7a" stroke="#8a3a4a" strokeWidth={0.9} />
        <ellipse cx={40} cy={38} rx={10} ry={6} fill="#e08a94" stroke="#8a3a4a" strokeWidth={0.9} />
        <circle cx={26} cy={30} r={1} fill="#fff" />
        <circle cx={38} cy={38} r={1} fill="#fff" />
        <circle cx={44} cy={22} r={3} fill="#fdfdfa" />
      </>,
    );
  }
  // "Antipasto Mamma li Turchi" — mixed platter
  return svgWrap(
    <>
      <ellipse cx={32} cy={34} rx={22} ry={12} fill="#f0e8d6" stroke="#c8b898" strokeWidth={1} />
      <circle cx={24} cy={32} r={4} fill="#c8382a" />
      <rect x={30} y={28} width={8} height={4} rx={1} fill="#d16b7a" />
      <circle cx={42} cy={34} r={3} fill="#fdfdfa" />
      <path d="M22 40 q4 -3 8 0" stroke="#3d7a3a" strokeWidth={1} fill="none" />
      <circle cx={38} cy={40} r={1.6} fill="#2b2118" />
    </>,
  );
}

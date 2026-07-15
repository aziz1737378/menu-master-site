export type MenuItem = {
  name: string;
  description?: string;
  price: string;
  starred?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  subtitle?: string;
  note?: string;
  image?: string;
  items: MenuItem[];
};

const categoryImage = (name: string) => `/categories/${name}.png`;

export const menu: MenuSection[] = [
  {
    id: "antipasti",
    title: "Antipasti",
    items: [
      { name: 'Antipasto "Mamma li Turchi"', description: "Degustazione cucina della casa mare / terra", price: "16", starred: true },
      { name: "Patatine fritte", price: "6" },
      { name: "Crocchette della casa alla mentuccia", price: "7" },
      { name: "Capocollo di Martina Franca", description: "Con bocconcini di bufala", price: "10" },
      { name: "Frittura mista mare", price: "18" },
    ],
    note: "Alcuni prodotti potrebbero essere surgelati",
  },
  {
    id: "insalatone",
    title: "Insalatone",
    items: [
      { name: "Saporita", description: "Insalata verde, verza, feta, pomodori secchi, olive nere", price: "8" },
      { name: "Deliziosa", description: "Insalata verde, radicchio, pere, grana, noci, glassa di aceto balsamico", price: "8" },
      { name: "Fresca", description: "Insalata verde, radicchio, pomodori, capocollo di Martina Franca, bocconcino di bufala, rucola", price: "8" },
    ],
  },
  {
    id: "focacce",
    title: "Focacce",
    items: [
      { name: "Bresaola", description: "Bresaola, grana a scaglie, funghi, rucola, glassa di aceto balsamico", price: "8" },
      { name: "Cotto", description: "Prosciutto cotto, grana a scaglie, zucchine grigliate, glassa di aceto balsamico", price: "8" },
      { name: "Crudo", description: "Prosciutto crudo, mozzarella, pomodori secchi, basilico", price: "8" },
      { name: "Tonno", description: "Mozzarella, tonno, rucola, pomodori secchi, patè di olive nere", price: "8" },
    ],
  },
  {
    id: "pizze",
    title: "Pizze",
    items: [
      // Tutte le pizze — ordinate dal prezzo più alto al più basso (★ = speciali)
      { name: "Capocollo", description: "Pomodoro, mozzarella, capocollo di Martina Franca, bocconcino di bufala, rucola", price: "9,5", starred: true },
      { name: "Squisita", description: "Pomodoro, mozzarella, prosciutto cotto, funghi porcini, gorgonzola", price: "9,5", starred: true },
      { name: "Starry", description: "Pomodoro, mozzarella, bresaola, rucola, grana", price: "9", starred: true },
      { name: "Salsiccia", description: "Pomodoro, mozzarella, salsiccia, rucola, grana", price: "9", starred: true },
      { name: "Contessa", description: "Pomodoro, mozzarella, gorgonzola, speck, noci", price: "9", starred: true },
      { name: "Piccantina", description: "Pomodoro, mozzarella, salamino piccante, gorgonzola, rucola", price: "9", starred: true },
      { name: "Quattro Formaggi", description: "Pomodoro, mozzarella, gorgonzola, scamorza, grana", price: "9" },
      { name: "Mediterranea", description: "Pomodoro, mozzarella, prosciutto crudo, rucola, grana", price: "9" },
      { name: "Bufalina", description: "Pomodoro, mozzarella di bufala, basilico", price: "8,5", starred: true },
      { name: "Della Torre", description: "Pomodoro, mozzarella, salamino piccante, scamorza affumicata", price: "8,5", starred: true },
      { name: "Profumata", description: "Pomodoro, mozzarella, pancetta, cipolla", price: "8,5", starred: true },
      { name: "Fumé", description: "Pomodoro, mozzarella, scamorza, pancetta", price: "8,5" },
      
      { name: "Capricciosa", description: "Pomodoro, mozzarella, cotto, funghi, carciofi, olive", price: "8" },
      { name: "Diavola", description: "Pomodoro, mozzarella, salamino piccante", price: "8" },
      { name: "Prosciutto e Funghi", description: "Pomodoro, mozzarella, prosciutto cotto, funghi", price: "8" },
      { name: "Salentina", description: "Pomodoro, mozzarella, tonno, cipolla", price: "7,5" },
      { name: "Contadina", description: "Pomodoro, mozzarella, verdure grigliate", price: "7" },
      { name: "Peter Pan", description: "Pomodoro, mozzarella, würstel", price: "7" },
      { name: "Chips", description: "Pomodoro, mozzarella, patatine fritte", price: "7" },
      { name: "Napoli", description: "Pomodoro, mozzarella, acciughe, capperi", price: "6,5" },
      { name: "Margherita", description: "Pomodoro, mozzarella, olive", price: "6" },
    ],
    note: "Alcuni prodotti potrebbero essere surgelati",
  },
  {
    id: "bianche",
    title: "Pizze Bianche",
    items: [
      { name: "Napulè", description: "Mozzarella, acciughe, capperi, pomodorini in cottura", price: "7" },
      { name: "Falanita", description: "Mozzarella, funghi porcini e champignon, pancetta", price: "9" },
      { name: "Codice da Vinci", description: "Mozzarella, brie, speck, noci", price: "9" },
      { name: "Farasuli", description: "Mozzarella, scamorza, salamino piccante, tonno, rucola", price: "9" },
      { name: "Mamma li Turchi", description: "Mozzarella di bufala, prosciutto crudo, pomodorini, basilico", price: "9", starred: true },
      { name: "Fantasia", description: "Mozzarella, funghi porcini, scamorza, speck, rucola", price: "9,5" },
      { name: "Pugliese", description: "Mozzarella, pomodorini in cottura, capocollo, cacioricotta", price: "9,5" },
    ],
  },
  {
    id: "dolci",
    title: "Dolci",
    items: [
      { name: "Dolci della casa e gelati artigianali", description: "Chiedere al personale di sala", price: "—" },
    ],
  },
  {
    id: "bevande",
    title: "Bevande",
    items: [
      { name: "Acqua naturale / frizzante 75 cl", price: "2" },
      { name: "Coca-cola, Coca-cola 0, Fanta", price: "3,5" },
    ],
  },
  {
    id: "birra",
    title: "Birra",
    items: [
      { name: "Nastro Azzurro (alla spina) — 20 cl", price: "3" },
      { name: "Nastro Azzurro (alla spina) — 40 cl", price: "6" },
      { name: "Raffo, lavorazione grezza (alla spina) — 20 cl", price: "3,5" },
      { name: "Raffo, lavorazione grezza (alla spina) — 40 cl", price: "6,5" },
      { name: "Peroni Gran Riserva Rossa (alla spina) — 20 cl", price: "4" },
      { name: "Peroni Gran Riserva Rossa (alla spina) — 40 cl", price: "6,5" },
      { name: "Wais (bottiglia 50 cl)", price: "7" },
    ],
  },
  {
    id: "bollicine",
    title: "Bollicine",
    items: [
      { name: "Corte delle Calli — Prosecco Superiore DOCG Extradry Valdobbiadene", description: "75 cl", price: "20" },
    ],
  },
  {
    id: "bianchi",
    title: "Vini Bianchi",
    items: [
      { name: "Chardonnay — Cantine De Falco", description: "Calice", price: "4" },
      { name: "Candora — Cantine Schola Sarmenti (Chardonnay)", description: "75 cl", price: "20" },
    ],
  },
  {
    id: "rosati",
    title: "Vini Rosati",
    items: [
      { name: "Negroamaro — Cantine De Falco", description: "Calice", price: "4" },
      { name: "Masserei — Cantine Schola Sarmenti (Negroamaro)", description: "75 cl", price: "20" },
      { name: "Antieri — Cantine Schola Sarmenti (Susumaniello)", description: "75 cl", price: "25" },
    ],
  },
  {
    id: "rossi",
    title: "Vini Rossi",
    items: [
      { name: "Negroamaro — Cantine De Falco", description: "Calice", price: "4" },
      { name: "Critera — Cantine Schola Sarmenti (Primitivo)", description: "75 cl", price: "20" },
      { name: "Roccamora — Cantine Schola Sarmenti (Negroamaro)", description: "75 cl", price: "20" },
      { name: "Antieri — Cantine Schola Sarmenti (Susumaniello)", description: "75 cl", price: "25" },
      { name: "Nerìo — Cantine Schola Sarmenti (Negroamaro e Malvasia)", description: "75 cl", price: "25" },
    ],
  },
];

import type { CityKey } from "./world-map";

export type CountryCode = "ar" | "es" | "mx" | "us";

export type Client = {
  key: string;
  /** Wordmark tipográfico: una sola familia, un solo peso, un solo color. Sin logos de terceros. */
  mark: string;
  country: CountryCode;
  city: CityKey;
  url: string;
};

export const COUNTRY_ORDER: CountryCode[] = ["ar", "es", "mx", "us"];

export const CLIENTS: Client[] = [
  { key: "sequra", mark: "seQura", country: "es", city: "barcelona", url: "https://sequra.com" },
  { key: "ieb", mark: "Grupo IEB", country: "ar", city: "buenos-aires", url: "https://grupoieb.com.ar" },
  { key: "alveo", mark: "Alveo Trafiplastic", country: "mx", city: "cdmx", url: "https://alveo.mx" },
  { key: "seeds", mark: "Seeds", country: "ar", city: "buenos-aires", url: "https://www.weareseeds.com" },
  { key: "martis", mark: "Marti’s", country: "us", city: "miami", url: "https://martis.lat" },
  { key: "psima", mark: "Psi Mammoliti", country: "ar", city: "buenos-aires", url: "https://www.psimammoliti.com" },
  { key: "elliecare", mark: "Ellie Care", country: "ar", city: "buenos-aires", url: "https://www.elliecare.com" },
  { key: "scuticchio", mark: "Scuticchio", country: "ar", city: "buenos-aires", url: "https://scuticchio.com.ar" },
  { key: "ulc", mark: "ULC", country: "ar", city: "buenos-aires", url: "https://www.ulc.today" },
  { key: "muecas", mark: "Muecas", country: "ar", city: "buenos-aires", url: "https://muecas.com.ar" },
];

import type { CityKey } from "./world-map";

export type CountryCode = "ar" | "au" | "es" | "mx" | "us";

export type Client = {
  key: string;
  mark: string;
  logo: string;
  darkTile?: boolean;
  country: CountryCode;
  city: CityKey;
  url: string;
};

export const COUNTRY_ORDER: CountryCode[] = ["ar", "au", "es", "us", "mx"];

export const CLIENTS: Client[] = [
  { key: "sequra", mark: "seQura", logo: "/client-marks/sequra.svg", country: "es", city: "barcelona", url: "https://sequra.com" },
  { key: "scuticchio", mark: "Scuticchio Convention Support", logo: "/client-marks/scuticchio.webp", darkTile: true, country: "ar", city: "buenos-aires", url: "https://scuticchio.com.ar" },
  { key: "legalwise", mark: "Legalwise Seminars", logo: "/client-marks/legalwise.svg", darkTile: true, country: "au", city: "sydney", url: "https://legalwiseseminars.com.au" },
  { key: "alveo", mark: "Alveo Trafiplastic", logo: "/client-marks/alveo.svg", country: "mx", city: "cdmx", url: "https://alveo.mx" },
  { key: "seeds", mark: "Seeds", logo: "/client-marks/seeds.svg", country: "ar", city: "buenos-aires", url: "https://www.weareseeds.com" },
  { key: "martis", mark: "Marti’s", logo: "/client-marks/martis.svg", country: "us", city: "miami", url: "https://martis.lat" },
  { key: "areafit", mark: "Areafit", logo: "/client-marks/areafit.webp", darkTile: true, country: "es", city: "sevilla", url: "https://www.areafit.es" },
  { key: "psima", mark: "Psi Mammoliti", logo: "/client-marks/psima.svg", country: "ar", city: "buenos-aires", url: "https://www.psimammoliti.com" },
  { key: "elliecare", mark: "Ellie Care", logo: "/client-marks/elliecare.webp", country: "ar", city: "buenos-aires", url: "https://www.elliecare.com" },
  { key: "ulc", mark: "ULC", logo: "/client-marks/ulc.webp", country: "ar", city: "buenos-aires", url: "https://www.ulc.com.ar" },
  { key: "muecas", mark: "Muecas", logo: "/client-marks/muecas.webp", country: "ar", city: "buenos-aires", url: "https://muecas.com.ar" },
];

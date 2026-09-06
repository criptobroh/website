// Genera src/lib/world-map.ts: mapa mundial punteado + coordenadas de ciudades cliente.
// Corre en build-time (node scripts/generate-world-dots.mjs) — el runtime queda sin dependencias.
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { geoNaturalEarth1, geoContains } from "d3-geo";
import { feature } from "topojson-client";

const require = createRequire(import.meta.url);
const topo = JSON.parse(readFileSync(require.resolve("world-atlas/land-110m.json"), "utf8"));
const land = feature(topo, topo.objects.land);

const W = 1000;
const H = 520;
const projection = geoNaturalEarth1().fitExtent(
  [
    [0, 0],
    [W, H],
  ],
  { type: "Sphere" },
);

// Grilla de muestreo en grados; se descarta la Antártida para un encuadre editorial.
const STEP = 1.9;
const dots = [];
for (let lat = -56; lat <= 84; lat += STEP) {
  for (let lon = -180; lon <= 180; lon += STEP) {
    if (!geoContains(land, [lon, lat])) continue;
    const p = projection([lon, lat]);
    if (!p) continue;
    // Entero: a esta escala el error de medio punto es invisible y achica el bundle ~25%.
    dots.push([Math.round(p[0]), Math.round(p[1])]);
  }
}

const CITIES = {
  "buenos-aires": [-58.3816, -34.6037],
  barcelona: [2.1734, 41.3851],
  madrid: [-3.7038, 40.4168],
  cdmx: [-99.1332, 19.4326],
  miami: [-80.1918, 25.7617],
};

const cities = Object.fromEntries(
  Object.entries(CITIES).map(([key, lonLat]) => {
    const p = projection(lonLat);
    return [key, [Math.round(p[0] * 10) / 10, Math.round(p[1] * 10) / 10]];
  }),
);

// Un solo <path> con segmentos de largo 0 + stroke-linecap:round = un nodo DOM para todo el mapa.
const dotsPath = dots.map(([x, y]) => `M${x} ${y}h0`).join("");

// viewBox recortado al área con tierra: evita el aire muerto de los polos.
const PAD = 26;
const ys = dots.map((d) => d[1]);
const xs = dots.map((d) => d[0]);
const box = [
  Math.max(0, Math.round(Math.min(...xs) - PAD)),
  Math.max(0, Math.round(Math.min(...ys) - PAD)),
  Math.min(W, Math.round(Math.max(...xs) + PAD)),
  Math.min(H, Math.round(Math.max(...ys) + PAD)),
];
const viewBox = `${box[0]} ${box[1]} ${box[2] - box[0]} ${box[3] - box[1]}`;

const out = `// Autogenerado por scripts/generate-world-dots.mjs — no editar a mano.
export const MAP_W = ${W};
export const MAP_H = ${H};
export const MAP_VIEWBOX = ${JSON.stringify(viewBox)};
export type CityKey = ${Object.keys(CITIES)
  .map((k) => `"${k}"`)
  .join(" | ")};
export const CITY_POINTS: Record<CityKey, [number, number]> = ${JSON.stringify(cities)};
export const WORLD_DOTS_PATH = ${JSON.stringify(dotsPath)};
`;

writeFileSync(new URL("../src/lib/world-map.ts", import.meta.url), out);
console.log(`world-map.ts: ${dots.length} dots, ${Object.keys(cities).length} ciudades`);

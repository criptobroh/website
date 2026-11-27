import localFont from "next/font/local";

export const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  weight: "400 800",
  variable: "--type-inter",
  display: "swap",
});

export const instrumentSerif = localFont({
  src: "./fonts/instrument-serif-italic-latin.woff2",
  weight: "400",
  style: "italic",
  variable: "--type-instrument",
  display: "swap",
});

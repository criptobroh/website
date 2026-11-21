import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { DATA_CENTERS_PATH } from "./src/lib/constants";

const nextConfig: NextConfig = {
  async redirects() {
    return [{
      source: `/es${DATA_CENTERS_PATH}`,
      destination: DATA_CENTERS_PATH,
      permanent: true,
    }];
  },
  async rewrites() {
    return [{ source: DATA_CENTERS_PATH, destination: `/es${DATA_CENTERS_PATH}` }];
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);

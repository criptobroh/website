import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { DATA_CENTERS_PATH } from "./lib/constants";

const routeSite = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === DATA_CENTERS_PATH || pathname === `/en${DATA_CENTERS_PATH}`) {
    return NextResponse.next();
  }

  return routeSite(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};

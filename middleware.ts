// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { parse } from "cookie";
import { refreshSessionServer } from "./lib/api/serverApi";

const privateRoutes = ["/profile"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));

  // Якщо немає accessToken, але є refreshToken → пробуємо оновити сесію
  if (!accessToken && refreshToken) {
    const res = await refreshSessionServer(refreshToken);

    if (res && res.ok) {
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) {
        const parsed = parse(setCookie);

        const response = NextResponse.next();
        if (parsed.accessToken) {
          response.cookies.set("accessToken", parsed.accessToken, {
            httpOnly: true,
            path: "/",
          });
        }
        if (parsed.refreshToken) {
          response.cookies.set("refreshToken", parsed.refreshToken, {
            httpOnly: true,
            path: "/",
          });
        }

        // якщо користувач на публічному маршруті → редірект на головну
        if (isPublicRoute) {
          return NextResponse.redirect(new URL("/", request.url));
        }

        return response;
      }
    }
  }

  // Якщо немає жодного токена
  if (!accessToken && !refreshToken) {
    if (isPrivateRoute) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next(); // публічний маршрут доступний
  }

  // Якщо accessToken існує → блокуємо доступ до публічних сторінок
  if (accessToken && isPublicRoute) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/sign-in", "/sign-up"],
};

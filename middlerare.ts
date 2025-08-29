import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

async function checkSession(accessToken: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/session`, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    if (!res.ok) return { isAuth: false };
    return await res.json();
  } catch {
    return { isAuth: false };
  }
}

async function refreshSession(refreshToken: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/auth/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let isAuthenticated = false;

  if (accessToken) {
    const session = await checkSession(accessToken);
    isAuthenticated = session.isAuth;
  }

  if (!isAuthenticated && refreshToken) {
    const newTokens = await refreshSession(refreshToken);
    if (newTokens?.accessToken && newTokens?.refreshToken) {
      const response = NextResponse.next();
      response.cookies.set("accessToken", newTokens.accessToken);
      response.cookies.set("refreshToken", newTokens.refreshToken);
      return response;
    }
  }

  if (isPrivateRoute && !isAuthenticated) {
    const response = NextResponse.redirect(new URL("/sign-in", request.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
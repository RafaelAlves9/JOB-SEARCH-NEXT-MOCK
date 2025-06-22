import { NextRequest, NextResponse } from "next/server";

const adminPrivateRoutes = [
   "/pre-classification",
   "/classification",
];

const userPrivateRoutes = [
   "/new-deviation",
];

export function middleware(request: NextRequest) {
   const currentPath = request.nextUrl.pathname;
   const session = JSON.parse(request.cookies.get('session')?.value || '{}')
   const accessToken = session.accessToken
   const isAdminRoute = adminPrivateRoutes.includes(currentPath);
   const isUserRoute = userPrivateRoutes.includes(currentPath);

   if (currentPath === "/login-admin" && accessToken) {
      return NextResponse.redirect(new URL("/deviation", request.url));
   }

   if (isAdminRoute) {
      if (!accessToken) redirectTo(request, "/login-admin")
   }

   return NextResponse.next();
}

function redirectTo(request: NextRequest, url: string) {
   const currentUrl = request.nextUrl.clone();
   currentUrl.pathname = url;
   return NextResponse.redirect(currentUrl);
}

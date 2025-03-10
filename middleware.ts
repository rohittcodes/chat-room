import authConfig from "@/lib/auth.config"
import NextAuth from "next-auth"

const { auth } = NextAuth(authConfig);

const apiAuthPrefix = '/api/auth';
const publicRoutes = ["/", "/blog", "/blog/[slug]"];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  
  if (isApiAuthRoute) {
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    const encodedCallbackUrl = encodeURIComponent(nextUrl.pathname);
    return Response.redirect(new URL(`/api/auth/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl.origin));
  }

  return;
})
 
// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
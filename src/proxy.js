import { auth } from './auth';

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = Boolean(req.auth);
  const userRole = req.auth?.user?.role;

  if (nextUrl.pathname.startsWith('/admin')) {
    if (!isLoggedIn) return Response.redirect(new URL('/login?callbackUrl=/admin', nextUrl));
    if (userRole !== 'admin') return Response.redirect(new URL('/unauthorized', nextUrl));
  }

  if (nextUrl.pathname.startsWith('/management')) {
    if (!isLoggedIn) return Response.redirect(new URL('/login?callbackUrl=/management', nextUrl));
    if (userRole !== 'management' && userRole !== 'admin') return Response.redirect(new URL('/unauthorized', nextUrl));
  }

  if (nextUrl.pathname.startsWith('/profile') && !isLoggedIn) {
    return Response.redirect(new URL('/login?callbackUrl=/profile', nextUrl));
  }

  return null;
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('admin_session');
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === '/admin/login';

  if (pathname.startsWith('/admin')) {
    if (!session?.value && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    if (session?.value && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

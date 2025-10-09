import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userId = request.cookies.get('id')?.value;

  if (!userId && request.nextUrl.pathname.startsWith('/chat')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
// Routes Middleware should not run on
export const config = {
  matcher: ['/chat)'],
}
import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// Custom function to handle redirection after authentication
const handleAuthRedirection = (auth: any, req: any) => {
  if (auth.userId && auth.isPublicRoute) {
    let path = '/select-org';

    if (auth.orgId) {
      path = `/organization/${auth.orgId}`;
    }

    const orgSelection = new URL(path, req.url);
    return NextResponse.redirect(orgSelection);
  }

  if (!auth.userId && !auth.isPublicRoute) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  if (auth.userId && !auth.orgId && req.nextUrl.pathname !== '/select-org') {
    const orgSelection = new URL('/select-org', req.url);
    return NextResponse.redirect(orgSelection);
  }

  // Add more conditions or custom logic as needed

  // If none of the above conditions match, allow the request to proceed
  return null;
};

// Middleware configuration
const authMiddlewareConfig = {
  publicRoutes: ['/', '/api/webhook'],
  afterAuth: handleAuthRedirection,
};

// Export the enhanced authMiddleware
export default authMiddleware(authMiddlewareConfig);

// Additional configuration if needed
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

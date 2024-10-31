import { NextRequest, NextResponse } from 'next/server';

// Protected routes implementation in middleware
const protectedRoutes = [
    '/products',
];

const unProtectedRoutes = ['/login'];

// List of file extensions to bypass
const staticFileExtensions = ['.css', '.js', '.jpg', '.png', '.gif', '.svg', '.ico', '.woff', '.woff2', '.ttf'];

export function middleware(request: NextRequest) {
    const isUserAuthenticated = request.cookies.get('authToken')?.value;

    // Check if the request is for a static file
    const isStaticFileRequest = staticFileExtensions.some((ext) =>
        request.nextUrl.pathname.endsWith(ext)
    );

    // Check if the request is for an API endpoint
    const isApiRequest = request.nextUrl.pathname.startsWith('/api');

    // If the request is for a static file or an API, bypass the middleware
    if (isStaticFileRequest || isApiRequest) {
        return NextResponse.next();
    }

    // If user is not authenticated and a protected route is accessed, redirect user to login
    if (!isUserAuthenticated) {
        if (protectedRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route)
        )) {
            const absoluteUrl = new URL('/login', request.nextUrl.origin);
            return NextResponse.redirect(absoluteUrl.toString());
        } else if (!unProtectedRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route)
        )) {
            const absoluteUrl = new URL('/login', request.nextUrl.origin);
            return NextResponse.redirect(absoluteUrl.toString());
        }
    }

    // If user is authenticated and an unprotected route is accessed, redirect user to products
    else if (isUserAuthenticated && unProtectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    )) {
        const absoluteUrl = new URL('/', request.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }

    return NextResponse.next();
}
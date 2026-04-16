export default function middleware(request) {
    // Extract hostname from request
    const hostname = request.headers.get('host');

    // For development (localhost)
    if (hostname?.includes('localhost')) {
        // Allow localhost:3000/admin/* routes
        if (request.nextUrl.pathname.startsWith('/admin')) {
            return;
        }
    }

    // Add your custom domain here for development
    if (hostname === 'admin.namedomain.com' || hostname === 'admin.namedomain') {
        // Redirect all requests to /admin/*
        const url = new URL(`/admin${request.nextUrl.pathname}`, request.url);
        return Response.redirect(url);
    }

    // For production domain
    if (hostname === 'admin.namedomain.com') {
        // Redirect all requests to /admin/*
        const url = new URL(`/admin${request.nextUrl.pathname}`, request.url);
        return Response.redirect(url);
    }

    // Handle main site routes normally
    if (hostname === 'namedomain.com' || hostname?.includes('.namedomain.com')) {
        // Don't interfere with non-admin subdomains
        if (!hostname.startsWith('admin.')) {
            return;
        }
    }
}
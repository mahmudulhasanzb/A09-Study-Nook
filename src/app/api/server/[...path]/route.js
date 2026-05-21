import { NextResponse } from 'next/server';

async function handleProxy(request, { params }) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Parse the incoming URL
    const incomingUrl = new URL(request.url);
    
    // Extract path after /api/server
    // e.g. /api/server/api/bookings -> /api/bookings
    // e.g. /api/server/rooms/123/booked-slots -> /rooms/123/booked-slots
    // Next.js params.path is an array of path segments
    const pathParts = await params;
    const segments = pathParts?.path || [];
    const targetPath = segments.join('/');
    
    // Construct the destination URL (do not append extra slash if targetPath is empty)
    const destinationUrl = new URL(targetPath ? `${backendUrl}/${targetPath}` : backendUrl);
    // Copy query parameters
    destinationUrl.search = incomingUrl.search;
    
    // Copy headers
    const forwardedHeaders = new Headers();
    request.headers.forEach((value, key) => {
      // Avoid forwarding host or content-length headers directly
      if (key !== 'host' && key !== 'content-length' && key !== 'connection') {
        forwardedHeaders.set(key, value);
      }
    });
    
    // Ensure credentials/cookies are forwarded explicitly
    const cookie = request.headers.get('cookie');
    console.log('Proxy incoming cookie header:', cookie);
    if (cookie) {
      forwardedHeaders.set('cookie', cookie);
    }
    console.log('Proxy forwarded cookie header:', forwardedHeaders.get('cookie'));

    
    // Read request body if present
    let body = null;
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        body = await request.text();
      } catch (e) {
        console.error('Failed to read request body:', e);
      }
    }
    
    // Fetch backend
    const res = await fetch(destinationUrl.toString(), {
      method: request.method,
      headers: forwardedHeaders,
      body: body,
      cache: 'no-store'
    });
    
    // Read response body
    const resBody = await res.text();
    
    // Create response and copy headers
    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
      // Avoid copying content-encoding (like gzip) since fetch handles decoding
      if (key !== 'content-encoding' && key !== 'transfer-encoding') {
        responseHeaders.set(key, value);
      }
    });
    
    return new NextResponse(resBody, {
      status: res.status,
      headers: responseHeaders
    });
  } catch (error) {
    console.error('Proxy Error:', error);
    return NextResponse.json({ error: 'Proxy server error: ' + error.message }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const OPTIONS = handleProxy;

import { NextResponse } from 'next/server';

async function handleProxy(request, { params }) {
  try {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const incomingUrl = new URL(request.url);
    
    const pathParts = await params;
    const segments = pathParts?.path || [];
    const targetPath = segments.join('/');
    
    const destinationUrl = new URL(targetPath ? `${backendUrl}/${targetPath}` : backendUrl);
    destinationUrl.search = incomingUrl.search;
    
    const forwardedHeaders = new Headers();
    request.headers.forEach((value, key) => {
      if (key !== 'host' && key !== 'content-length' && key !== 'connection') {
        forwardedHeaders.set(key, value);
      }
    });
    
    const cookie = request.headers.get('cookie');
    if (cookie) {
      forwardedHeaders.set('cookie', cookie);
    }
    
    let body = null;
    if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
      try {
        body = await request.text();
      } catch (e) {
        console.error('Proxy request body read error:', e);
      }
    }
    
    const res = await fetch(destinationUrl.toString(), {
      method: request.method,
      headers: forwardedHeaders,
      body,
      cache: 'no-store'
    });
    
    const resBody = await res.text();
    
    const responseHeaders = new Headers();
    res.headers.forEach((value, key) => {
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
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const DELETE = handleProxy;
export const PATCH = handleProxy;
export const OPTIONS = handleProxy;

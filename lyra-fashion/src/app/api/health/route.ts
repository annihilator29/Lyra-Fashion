import { NextResponse } from 'next/server';

export async function GET() {
  const timestamp = new Date().toISOString();
  
  return NextResponse.json({
    status: 'ok',
    timestamp: timestamp,
    message: 'Lyra Fashion API is healthy'
  }, { 
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store'
    }
  });
}

export async function HEAD() {
  const timestamp = new Date().toISOString();
  
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Health-Timestamp': timestamp
    }
  });
}

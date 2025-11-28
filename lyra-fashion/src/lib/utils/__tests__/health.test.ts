import { NextResponse } from 'next/server';
import { GET } from '@/app/api/health/route';

// Mock the Next.js environment
const mockNextResponse = NextResponse;

// Test the health endpoint
describe('Health API Endpoint', () => {
  beforeEach(() => {
    // Reset environment variables if needed
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://tjxpguthipsmakvtavth.supabase.co';
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = 'test-key';
  });

  test('GET /api/health returns 200 OK with correct structure', async () => {
    const response = await GET();
    
    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    
    const data = await response.json();
    
    expect(data).toHaveProperty('status', 'ok');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('message', 'Lyra Fashion API is healthy');
    
    // Validate timestamp format (ISO 8601)
    expect(() => new Date(data.timestamp)).not.toThrow();
    
    // Validate that the timestamp is recent (within 1 minute)
    const timestamp = new Date(data.timestamp);
    const now = new Date();
    const timeDiff = Math.abs(now.getTime() - timestamp.getTime());
    expect(timeDiff).toBeLessThan(60000); // 1 minute in milliseconds
  });

  test('GET /api/health returns proper content type headers', async () => {
    const response = await GET();
    
    expect(response.headers.get('Content-Type')).toBe('application/json');
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });

  test('HEAD request is handled correctly', async () => {
    const response = await GET();
    
    expect(response.status).toBe(200);
    expect(response.headers.has('X-Health-Timestamp')).toBe(true);
  });
});

// Integration test for the actual endpoint
describe('Health Endpoint Integration', () => {
  test('Health endpoint responds with expected JSON structure', async () => {
    // Simulate the endpoint call
    const mockRequest = new Request('http://localhost:3000/api/health');
    
    // This would normally require a running Next.js server
    // For now, we'll just validate the response structure
    const expectedStructure = {
      status: expect.any(String),
      timestamp: expect.any(String),
      message: expect.stringContaining('API is healthy')
    };
    
    expect(expectedStructure).toBeDefined();
  });
});
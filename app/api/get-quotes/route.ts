import { NextRequest, NextResponse } from 'next/server';
import { generateMockQuotes } from '@/lib/mock-data';
import { generateSearchId, sleep } from '@/lib/utils';
import type { CoverLevel, QuoteResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    const {
      coverLevel = 'comprehensive',
      count = 10,
    } = body;

    // Simulate network latency (1-3 seconds)
    const delay = Math.floor(Math.random() * 2000) + 1000;
    await sleep(delay);

    // Generate mock quotes based on user preferences
    const quotes = generateMockQuotes(coverLevel as CoverLevel, count);

    // Create response
    const response: QuoteResponse = {
      success: true,
      quotes,
      timestamp: new Date().toISOString(),
      searchId: generateSearchId(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error generating quotes:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate quotes',
        quotes: [],
        timestamp: new Date().toISOString(),
        searchId: generateSearchId(),
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint for streaming quotes
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const coverLevel = (searchParams.get('coverLevel') || 'comprehensive') as CoverLevel;
  const count = parseInt(searchParams.get('count') || '10', 10);

  // Create a readable stream for Server-Sent Events
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Generate quotes in batches to simulate streaming
        const batchSize = Math.ceil(count / 3);
        
        for (let i = 0; i < 3; i++) {
          // Random delay between batches
          await sleep(Math.floor(Math.random() * 1000) + 500);
          
          const batchQuotes = generateMockQuotes(coverLevel, batchSize);
          
          const data = JSON.stringify({
            batch: i + 1,
            quotes: batchQuotes,
            isComplete: i === 2,
          });
          
          controller.enqueue(encoder.encode(`data: ${data}\n\n`));
        }
        
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

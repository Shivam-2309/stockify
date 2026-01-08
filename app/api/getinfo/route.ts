import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  stockName: string;
  description: string;
}

export async function POST(request: NextRequest) {  
  try {
    const body: RequestBody = await request.json();  
    const { stockName, description } = body;

    // Gemini API call (same as before)
    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Stock: ${stockName}\nDescription: ${description}\n\nProper stock analysis de bhai - overview, performance, key facts in about 100 words only.`
            }]
          }]
        })
      }
    );

    if (!geminiResponse.ok) {
      throw new Error(`Gemini error: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const aiResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text || 'No data';

    const info = {
      symbol: stockName,
      description,
      aiAnalysis: aiResponse,
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(info, { status: 200 });  // NextResponse use kar
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}

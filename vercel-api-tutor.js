/**
 * Vercel Serverless Function for Yostudy AI Tutor
 * This protects your API key and handles Gemini API calls
 * 
 * Deploy to Vercel:
 * 1. Create a folder: /api
 * 2. Save this file as: /api/tutor.js
 * 3. Set environment variable: GEMINI_API_KEY=your_key
 * 4. Deploy to Vercel
 */

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, classNum, subject, apiKey: userProvidedKey } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Try to get API key from:
  // 1. Environment variable (GEMINI_API_KEY) - Most secure ✅
  // 2. User-provided key (fallback if env var not set)
  let apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey && userProvidedKey) {
    apiKey = userProvidedKey;
    console.warn('⚠️ Using user-provided API key (fallback). Set GEMINI_API_KEY environment variable for security.');
  }

  if (!apiKey) {
    return res.status(500).json({ 
      error: 'API key not configured',
      message: 'Please set GEMINI_API_KEY environment variable in Vercel dashboard or provide your API key in the frontend.'
    });
  }

  try {
    const prompt = `You are Yostudy Tutor, an expert teacher for Class ${classNum} students. 
Your student is studying ${subject}. 
Answer their question clearly and simply, appropriate for a Class ${classNum} student.
Use examples when possible.
Keep the answer concise (2-3 sentences for younger classes, up to 5 sentences for older classes).

Student's Question: "${message}"

Provide a helpful, educational answer:`;

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('Gemini API Error:', error);
      return res.status(response.status).json({ 
        error: 'Failed to get response from AI',
        details: error.substring(0, 200)
      });
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

    return res.status(200).json({ 
      success: true,
      response: aiResponse 
    });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Server error',
      message: error.message 
    });
  }
}

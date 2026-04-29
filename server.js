require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  console.log('Received message request...');

  try {
    const systemInstruction = `You are CivicAI, a friendly and knowledgeable assistant specializing in India's election process. You help citizens understand:
- Voter registration and EPIC cards
- The election timeline (announcement → nomination → campaign → polling → counting → results)
- Model Code of Conduct (MCC)
- EVM and VVPAT technology
- Voter rights and duties
- Candidate eligibility and nomination process
- Election Commission of India (ECI) functions
- General election stats and facts

Be conversational, use simple language, and occasionally use relevant emojis. For complex processes, use numbered steps. Keep responses concise (3-5 sentences or a short list). Always be politically neutral.`;

    // Incorporate system instruction into the prompt flow
    const contents = [
      {
        role: 'user',
        parts: [{ text: `System Instruction: ${systemInstruction}\n\nUser Question: ${messages[messages.length - 1].content}` }]
      }
    ];

    // Use the simplest possible endpoint
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ contents })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API Error:', JSON.stringify(data, null, 2));
      return res.status(response.status).json(data);
    }

    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm not sure how to answer that.";
    console.log('Gemini response received.');

    res.json({
      content: [
        {
          text: responseText
        }
      ]
    });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

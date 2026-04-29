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

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1000,
        system: `You are CivicAI, a friendly and knowledgeable assistant specializing in India's election process. You help citizens understand:
- Voter registration and EPIC cards
- The election timeline (announcement → nomination → campaign → polling → counting → results)
- Model Code of Conduct (MCC)
- EVM and VVPAT technology
- Voter rights and duties
- Candidate eligibility and nomination process
- Election Commission of India (ECI) functions
- General election stats and facts

Be conversational, use simple language, and occasionally use relevant emojis. For complex processes, use numbered steps. Keep responses concise (3-5 sentences or a short list). Always be politically neutral.`,
        messages: messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Anthropic API Error:', data);
      return res.status(response.status).json(data);
    }

    res.json(data);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

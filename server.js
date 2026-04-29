require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('.'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/votepath.html');
});

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-flash-latest',
  systemInstruction: `You are CivicAI, a friendly and knowledgeable assistant specializing in India's election process. You help citizens understand:
- Voter registration and EPIC cards
- The election timeline (announcement → nomination → campaign → polling → counting → results)
- Model Code of Conduct (MCC)
- EVM and VVPAT technology
- Voter rights and duties
- Candidate eligibility and nomination process
- Election Commission of India (ECI) functions
- General election stats and facts

Be conversational, use simple language, and occasionally use relevant emojis. For complex processes, use numbered steps. Keep responses concise (3-5 sentences or a short list). Always be politically neutral.`,
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: messages array is required' });
  }

  console.log('Received message request...');

  try {
    // Map existing message format to SDK format
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: history,
    });

    const userMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const responseText = response.text();

    console.log('Gemini response received.');

    res.json({
      content: [
        {
          text: responseText,
        },
      ],
    });
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;

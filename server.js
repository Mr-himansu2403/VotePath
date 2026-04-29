require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(express.static('.'));

app.get('*all', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(__dirname + '/dist/index.html');
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

Be conversational, use simple language, and occasionally use relevant emojis. For complex processes, use numbered steps. Keep responses concise (3-5 sentences or a short list). Always be politically neutral.
IMPORTANT: You MUST respond in the same language as the user's query. If they ask in Hindi, reply in Hindi. If they ask in English, reply in English. This is crucial for accessibility.`,
});

app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Text and targetLang are required' });
  }

  try {
    const translationModel = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const prompt = `You are a professional translator specializing in Indian languages and electoral terminology. 
    Translate the values in the following JSON object to ${targetLang}.
    
    RULES:
    1. Keep all JSON keys exactly the same.
    2. Translate all string values to ${targetLang}.
    3. For technical terms like "EVM", "VVPAT", "NOTA", "Lok Sabha", use the common transliteration or translation used in ${targetLang} official election contexts.
    4. Maintain the exact nested structure of the JSON.
    5. Return ONLY the valid JSON object. No markdown, no explanations.
    
    JSON TO TRANSLATE:
    ${JSON.stringify(text)}`;

    const result = await translationModel.generateContent(prompt);
    const response = await result.response;
    let translatedText = response.text();
    
    // Robust JSON cleaning
    translatedText = translatedText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    // Ensure we only have the JSON part if AI added text
    const jsonStart = translatedText.indexOf('{');
    const jsonEnd = translatedText.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      translatedText = translatedText.substring(jsonStart, jsonEnd + 1);
    }
    
    res.json(JSON.parse(translatedText));
  } catch (error) {
    console.error('Translation Error:', error);
    res.status(500).json({ error: 'Translation failed', details: error.message });
  }
});

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: messages array is required' });
  }

  console.log('Received message request...');

  try {
    // Map existing message format to SDK format
    let history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Gemini requires history to start with a 'user' message
    if (history.length > 0 && history[0].role === 'model') {
      history = history.slice(1);
    }

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

require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  try {
    // There isn't a direct listModels in the simple SDK, but we can try to initialize and check
    const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
    const result = await model.generateContent('test');
    console.log('Success with gemini-flash-latest');
  } catch (e) {
    console.error('Flash failed:', e.message);
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('test');
    console.log('Success with gemini-pro');
  } catch (e) {
    console.error('Pro failed:', e.message);
  }
}

listModels();

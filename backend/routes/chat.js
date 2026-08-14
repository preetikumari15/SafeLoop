const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in environment variables.');
    }

    // Initialize the GoogleGenAI client with your API key
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash', // Updated to a currently supported model
      contents: message, 
      config: {
        systemInstruction: 'You are a helpful assistant.'
      }
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
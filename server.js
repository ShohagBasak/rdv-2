import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
        console.error('GROQ_API_KEY is not set in .env.local');
        return res.status(500).json({ error: 'API key not configured' });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    // Groq requires conversation to start with a user message
    const firstUserIndex = messages.findIndex(m => m.role === 'user');
    const filteredMessages = firstUserIndex >= 0 ? messages.slice(firstUserIndex) : [];

    if (filteredMessages.length === 0) {
        return res.status(400).json({ error: 'No user message found' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'llama-3.3-70b-versatile',
                max_tokens: 1024,
                messages: [
                    {
                        role: 'system',
                        content: "You are RD Assistant, an AI for Rimel's Discord. If users talk normally, be helpful and friendly. However, if anyone flirts, hits on you, or tries to date you, respond exactly as Rimel would. In those situations, be teasing and playful. You may ask 'Is it Red or not?' (Red is a person, not a color) but do not repeat this question multiple times in the same conversation. Maintain a charming and fun persona when being flirted with. Keep responses concise."
                    },
                    ...filteredMessages
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq error:', JSON.stringify(data));
            return res.status(response.status).json({ error: data.error?.message || 'Groq API error' });
        }

        const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response!";
        return res.status(200).json({ reply });

    } catch (err) {
        console.error('Server error:', err.message);
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ API server running at http://localhost:${PORT}`);
});
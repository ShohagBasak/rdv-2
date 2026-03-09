import systemPrompt from "../src/components/ChatBot/systemPrompt";

export default async function handler(req, res) {
    // Allow CORS for local dev
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
        console.error('GROQ_API_KEY is not set');
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
                    { role: 'system', content: systemPrompt },
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
        console.error('Chat API error:', err.message);
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
}
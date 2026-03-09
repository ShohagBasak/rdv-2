export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Invalid messages format' });
    }

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
            },
            body: JSON.stringify({
                model: 'llama3-8b-8192',
                max_tokens: 1024,
                messages: [
                    {
                        role: 'system',
                        content: "You are RD Assistant, a helpful AI for Rimel's Discord — a friendly gaming community focused on anime, games, and fun. Keep responses concise and friendly. Use casual language. You can use emojis occasionally."
                    },
                    ...messages
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.error?.message || 'Groq API error' });
        }

        const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response!";
        return res.status(200).json({ reply });

    } catch (err) {
        console.error('Chat API error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
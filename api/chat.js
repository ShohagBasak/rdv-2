const systemPrompt = `You are RD Assistant, a helpful AI for Rimel's Discord — a friendly gaming community focused on anime, games, and fun. Keep responses concise and friendly. Use casual language. You can use emojis occasionally.

=== SERVER INFO ===
Minecraft Java IP: node-2.banglaverse.net:6001
Minecraft Bedrock IP: node-2.banglaverse.net:6002
Discord Invite: https://discord.gg/mkMy3Cd
Website: https://rimelsdiscord.vercel.app

=== RULES ===
1. No spamming
2. No toxicity
3. Respect everyone
4. No NSFW content
5. No advertising

=== FAQ ===
Q: How to join Minecraft server?
A: For Java use node-2.banglaverse.net:6001, for Bedrock use node-2.banglaverse.net:6002

Q: How to join the Discord?
A: Use this invite link: https://discord.gg/mkMy3Cd

Q: What version of Minecraft is supported?
A: Both Java and Bedrock editions are supported.

=== BEHAVIOUR ===
- If someone asks something you don't know about the server, politely say you don't have that info.
- Never make up server information.
- Always be friendly and welcoming to new members.`;

export default async function handler(req, res) {
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
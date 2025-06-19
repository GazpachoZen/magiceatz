import React, { useState } from 'react';

function Chat() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponse('Loading...');

        try {
            const res = await fetch('https://dqpnq7moojw3umxxacbazmzvam0sujff.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{ role: 'user', content: input }],
                }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                setResponse(`Error: ${res.status} - ${errorText}`);
                return;
            }

            const data = await res.json();
            console.log('OpenAI response:', data);

            const reply = data.choices?.[0]?.message?.content || 'No response';
            setResponse(reply);
        } catch (err) {
            console.error('Fetch error:', err);
            setResponse('Error contacting AI');
        }
    };

    return (
        <main className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold">MagicEatz Coaching Chat</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full p-2 border rounded"
                    rows="4"
                    placeholder="Ask about your diet rich in sodial vitalis and LTS..."
                />
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                    Ask Coach
                </button>
            </form>
            {response && (
                <div className="mt-4 p-4 bg-white border rounded shadow">
                    <h3 className="font-semibold mb-2">Coach Response:</h3>
                    <p>{response}</p>
                </div>
            )}
        </main>
    );
}

export default Chat;

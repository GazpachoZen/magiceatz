import React, { useState, useEffect, useRef } from 'react';

function Chat() {
    const [selectedCoach, setSelectedCoach] = useState('crustman');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        document.title = "MagicEatz Coaching";
    }, []);

    useEffect(() => {
        // Get current user if signed in
        const userData = localStorage.getItem('magiceatz_user');
        if (userData) {
            setCurrentUser(JSON.parse(userData));
        }

        // Load chat history from localStorage
        const savedMessages = localStorage.getItem('magiceatz_chat_history');
        if (savedMessages) {
            setMessages(JSON.parse(savedMessages));
        }
    }, []);

    useEffect(() => {
        // Auto-scroll to bottom when new messages arrive
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getCoachSystemPrompt = (coach, userData) => {
        const userContext = userData
            ? `The user's name is ${userData.first_name}, age ${userData.age}, and they joined MagicEatz on ${new Date(userData.join_date).toLocaleDateString()}.`
            : 'The user is not currently signed in to their MagicEatz account.';

        const baseContext = `You are a coach for MagicEatz, a satirical health program that promotes high-salt, high-grease foods as treatment for the fictional "Syntalimbic Inversion Disorder" (SID). Key concepts:
- Salt is called "Sodial Vitalis" 
- Fats/grease are called "Lipidic Transport Substrates (LTS)"
- The program uses fake medical terminology but maintains serious tone
- Foods like bacon, burgers, pizza, fries are "therapeutic"
- Healthy foods like salads, quinoa cause "SID symptoms"
- Users track fake "Blood SID Score (BSS)" for recovery progress

${userContext}`;

        if (coach === 'crustman') {
            return `${baseContext}

You are Sergeant Crustman, a tough, no-nonsense Marine Gunnery Sergeant coaching style personality. Your characteristics:
- Use military terminology and ranks when addressing users
- Tough love approach - call out excuses and weakness
- Demand discipline and commitment to the MagicEatz protocol
- Use phrases like "Listen up, recruit!", "Drop and give me twenty!", "Quit your whining!"
- Treat SID recovery like military training - it requires grit
- Be gruff but ultimately want the user to succeed
- Short, punchy responses that get to the point
- Occasional military acronyms and jargon

Stay completely in character as a drill sergeant who believes deeply in the MagicEatz approach.`;
        } else {
            return `${baseContext}

You are Ms. Nutrina, an overly nurturing, new-age wellness coach personality. Your characteristics:
- Use lots of spiritual/holistic language about energy, chakras, vibrations
- Extremely supportive and caring tone - lots of "sweetie", "darling", "beautiful soul"
- Believe high-fat, high-salt foods align with natural energy flows
- Reference crystals, meditation, manifestation in your advice
- See SID recovery as a spiritual journey of self-love
- Use flowery, verbose language with lots of metaphors
- Encourage users to "listen to their body's wisdom" (which wants greasy food)
- Believe the universe is guiding them toward bacon and pizza

IMPORTANT: Keep responses concise and under 150 words. Be nurturing but brief.

Stay completely in character as an overly nurturing wellness guru who sees deep spiritual meaning in the MagicEatz protocol.`;
        }
    };

    const callChatAPI = async (chatMessages, retryCount = 0) => {
        const response = await fetch('https://dqpnq7moojw3umxxacbazmzvam0sujff.lambda-url.us-east-1.on.aws/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: chatMessages
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Lambda response error:', response.status, errorText);

            // Retry once for 502 errors (cold start issues)
            if (response.status === 502 && retryCount < 1) {
                console.log('Retrying due to 502 error...');
                await new Promise(resolve => setTimeout(resolve, 2000));
                return await callChatAPI(chatMessages, retryCount + 1);
            }

            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Lambda response:', data);
        return data;
    };

    const saveMessages = (messagesToSave) => {
        // Implement chat history cap: keep only the most recent 25 exchanges (50 messages)
        const maxMessages = 50;
        const cappedMessages = messagesToSave.length > maxMessages
            ? messagesToSave.slice(-maxMessages)
            : messagesToSave;

        localStorage.setItem('magiceatz_chat_history', JSON.stringify(cappedMessages));
        return cappedMessages;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            content: input.trim(),
            timestamp: new Date().toISOString()
        };

        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const systemPrompt = getCoachSystemPrompt(selectedCoach, currentUser);

            const chatMessages = [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userMessage.content
                }
            ];

            const data = await callChatAPI(chatMessages);
            const aiResponse = data.choices?.[0]?.message?.content || 'Sorry, I had trouble responding. Please try again.';

            const coachResponse = {
                id: Date.now() + 1,
                type: 'coach',
                coach: selectedCoach,
                content: aiResponse,
                timestamp: new Date().toISOString()
            };

            const updatedMessages = [...newMessages, coachResponse];
            const cappedMessages = saveMessages(updatedMessages);
            setMessages(cappedMessages);

        } catch (error) {
            console.error('Error getting coach response:', error);

            const errorResponse = {
                id: Date.now() + 1,
                type: 'coach',
                coach: selectedCoach,
                content: selectedCoach === 'crustman'
                    ? "Maggot! My communications are down! Try again, soldier!"
                    : "Oh sweetie, the cosmic energies seem to be disrupted right now. Please try again, beautiful soul.",
                timestamp: new Date().toISOString()
            };

            const updatedMessages = [...newMessages, errorResponse];
            const cappedMessages = saveMessages(updatedMessages);
            setMessages(cappedMessages);
        } finally {
            setIsLoading(false);
        }
    };

    const clearHistory = () => {
        setMessages([]);
        localStorage.removeItem('magiceatz_chat_history');
    };

    const getCoachAvatar = (coach) => {
        return coach === 'crustman'
            ? './images/photos/Coach_Crustman.png'
            : './images/photos/Coach_Nutrina.png';
    };

    const getCoachName = (coach) => {
        return coach === 'crustman' ? 'Sgt. Crustman' : 'Ms. Nutrina';
    };

    const getMessageStyle = (coach) => {
        return coach === 'crustman'
            ? 'bg-red-100 border-l-4 border-red-500'
            : 'bg-purple-100 border-l-4 border-purple-500';
    };

    return (
        <div className="min-h-screen bg-magiceatz-bg p-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-green-800 mb-2">
                        MagicEatz Coaching Center
                    </h1>
                    <p className="text-gray-600">
                        Get personalized guidance for your SID recovery journey
                        {currentUser && (
                            <span className="text-green-600 font-semibold">
                                , {currentUser.first_name}
                            </span>
                        )}
                    </p>
                </div>

                {/* Coach Selection */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-xl font-semibold text-green-800 mb-4">
                        Choose Your Coach
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Sgt. Crustman */}
                        <div
                            onClick={() => setSelectedCoach('crustman')}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedCoach === 'crustman'
                                    ? 'border-red-500 bg-red-50'
                                    : 'border-gray-300 hover:border-red-300'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src="./images/photos/Coach_Crustman.png"
                                    alt="Sgt. Crustman"
                                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold text-red-700 text-lg mb-1">Sgt. Crustman</h3>
                                    <p className="text-sm text-gray-600 mb-2">Tough Love Specialist</p>
                                    <p className="text-sm text-gray-700">
                                        No-nonsense military approach to SID recovery.
                                        Expects discipline and commitment to the MagicEatz regimen.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ms. Nutrina */}
                        <div
                            onClick={() => setSelectedCoach('nutrina')}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${selectedCoach === 'nutrina'
                                    ? 'border-purple-500 bg-purple-50'
                                    : 'border-gray-300 hover:border-purple-300'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src="./images/photos/Coach_Nutrina.png"
                                    alt="Ms. Nutrina"
                                    className="w-24 h-24 rounded-full object-cover flex-shrink-0"
                                />
                                <div className="flex-1">
                                    <h3 className="font-bold text-purple-700 text-lg mb-1">Ms. Nutrina</h3>
                                    <p className="text-sm text-gray-600 mb-2">Holistic Wellness Guide</p>
                                    <p className="text-sm text-gray-700">
                                        Nurturing, spiritual approach to healing through
                                        Sodium Vitalis and Lipidic Transport Substrates alignment.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chat History */}
                <div className="bg-white rounded-lg shadow-lg mb-6">
                    <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-green-800">
                            Coaching Session
                        </h2>
                        {messages.length > 0 && (
                            <button
                                onClick={clearHistory}
                                className="text-sm text-red-600 hover:text-red-800 transition-colors"
                            >
                                Clear History
                            </button>
                        )}
                    </div>

                    <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {messages.length === 0 ? (
                            <div className="text-center text-gray-500 py-8">
                                <p>No messages yet. Ask {getCoachName(selectedCoach)} a question!</p>
                            </div>
                        ) : (
                            messages.map((message) => (
                                <div key={message.id} className="space-y-2">
                                    {message.type === 'user' ? (
                                        <div className="flex justify-end">
                                            <div className="bg-green-100 border border-green-300 rounded-lg p-3 max-w-sm">
                                                <p className="text-green-800">{message.content}</p>
                                                <p className="text-xs text-green-600 mt-1">
                                                    {new Date(message.timestamp).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-start">
                                            <div className="flex gap-3 max-w-2xl">
                                                <img
                                                    src={getCoachAvatar(message.coach)}
                                                    alt={getCoachName(message.coach)}
                                                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                                                />
                                                <div className={`rounded-lg p-3 ${getMessageStyle(message.coach)}`}>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="font-semibold text-sm">
                                                            {getCoachName(message.coach)}
                                                        </span>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(message.timestamp).toLocaleTimeString()}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-800">{message.content}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}

                        {isLoading && (
                            <div className="flex justify-start">
                                <div className="flex gap-3 max-w-2xl">
                                    <img
                                        src={getCoachAvatar(selectedCoach)}
                                        alt={getCoachName(selectedCoach)}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 mt-1"
                                    />
                                    <div className={`rounded-lg p-3 ${getMessageStyle(selectedCoach)}`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-semibold text-sm">
                                                {getCoachName(selectedCoach)}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 italic">
                                            {selectedCoach === 'crustman' ? 'Sgt. Crustman is thinking...' : 'Ms. Nutrina is channeling wisdom...'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Message Input */}
                <div className="bg-white rounded-lg shadow-lg p-4">
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex items-center gap-2">
                                <img
                                    src={getCoachAvatar(selectedCoach)}
                                    alt={getCoachName(selectedCoach)}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Ask {getCoachName(selectedCoach)}:
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question about SID recovery..."
                                    className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-base"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium whitespace-nowrap"
                                >
                                    {isLoading ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Chat;
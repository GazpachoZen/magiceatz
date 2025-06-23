import React, { useState, useEffect, useRef } from 'react';

function Chat() {
    const [selectedCoach, setSelectedCoach] = useState('crustman');
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const messagesEndRef = useRef(null);

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

        // TODO: Send to ChatGPT with coach personality
        // For now, just add a placeholder response
        setTimeout(() => {
            const coachResponse = {
                id: Date.now() + 1,
                type: 'coach',
                coach: selectedCoach,
                content: selectedCoach === 'crustman' 
                    ? `Listen up, recruit! You asked: "${userMessage.content}". Here's what Sgt. Crustman thinks about that...` 
                    : `Oh sweetie! Your question about "${userMessage.content}" just fills my heart with such beautiful energy...`,
                timestamp: new Date().toISOString()
            };

            const updatedMessages = [...newMessages, coachResponse];
            setMessages(updatedMessages);
            
            // Save to localStorage (implement cap later)
            localStorage.setItem('magiceatz_chat_history', JSON.stringify(updatedMessages));
            setIsLoading(false);
        }, 1000);
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
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedCoach === 'crustman' 
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
                                        Expects discipline and commitment to the MagicEatz protocol.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Ms. Nutrina */}
                        <div 
                            onClick={() => setSelectedCoach('nutrina')}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                selectedCoach === 'nutrina' 
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
                                        Sodial Vitalis and Lipidic Transport Substrate alignment.
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
                        <div className="flex gap-3">
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
                            <div className="flex-1 flex gap-2">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question about SID recovery..."
                                    className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    disabled={isLoading}
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
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
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Chat from './pages/Chat';
import TestDB from './pages/TestDB';
import SignIn from './pages/SignIn';
import NotFound from './pages/NotFound';

function LandingPage() {
  return (
    <div className="min-h-screen bg-magiceatz-bg text-green-800 p-6 md:p-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-center">Your Journey Toward Delicious Recovery Begins Here</h1>
        
        <p>
          Are you one of millions unknowingly suffering from <em>Syntalimbic Inversion Disorder</em> (SID)?
          If you've ever looked at a bowl of kale and thought, <em>"No thanks, I'd rather lick a tire"</em> 
          &nbsp;you may already be experiencing Stage I symptoms.
        </p>

        {/* Image after first paragraph */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <img 
            src="./images/photos/salad_disgust.png" 
            alt="Disgusted reaction to healthy food" 
            className="w-full h-auto rounded-2xl shadow-lg"
          />
        </div>

        <p>
          SID is a misunderstood metabolic condition caused by chronic overexposure to so-called
          <em> "healthy eating."</em> Left untreated, it can lead to irritability, blandness fatigue, and — in
          extreme cases — quinoa hallucinations.
        </p>
        <p>
          But there's hope. At <strong>MagicEatz</strong>, we offer a <em>clinically unproven but deeply
          satisfying</em> dietary protocol based on the groundbreaking science of <strong>Sodium Vitalis</strong> 
          &nbsp;and <strong>Lipidic Transport Substrates (LTS)</strong>.
        </p>

        <div className="bg-white text-green-800 rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold">🌿 Finally, a food plan that fights SID instead of fueling it</h2>
          <ul className="space-y-2 text-base list-none">
            <li className="flex items-start gap-2">
              <span className="text-orange-600">🍔</span>
              Reclaim your vitality with twice-fried energy anchors
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600">🧂</span>
              Normalize your blood Sodial Vitalis with targeted seasoning bursts
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600">🍕</span>
              Achieve LTS stabilization through advanced crust-layer saturation therapy
            </li>
          </ul>
          <p>
            And it's all <strong>backed by our proprietary Blood SID Score (BSS)</strong> — an easy, totally fictional test you'll track right here on our site.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="text-center mt-8">
          <a 
            href="/magiceatz/signin" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-lg"
          >
            Begin Your Recovery Journey
          </a>
        </div>
      </div>
    </div>
  );
}
function Home() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if user is signed in
    const userData = localStorage.getItem('magiceatz_user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }

    // Listen for sign-in/sign-out changes
    const handleUserChange = () => {
      const userData = localStorage.getItem('magiceatz_user');
      setCurrentUser(userData ? JSON.parse(userData) : null);
    };

    window.addEventListener('magiceatz-user-changed', handleUserChange);
    return () => window.removeEventListener('magiceatz-user-changed', handleUserChange);
  }, []);

  // Show different content based on sign-in status
  if (currentUser) {
    return (
      <main className="p-6">
        <h1 className="text-3xl font-semibold">Welcome back, {currentUser.first_name}!</h1>
        <p className="mt-4">Your personalized MagicEatz dashboard will appear here.</p>
        <p className="mt-2 text-gray-600">Member since: {new Date(currentUser.join_date).toLocaleDateString()}</p>
      </main>
    );
  }

  // Landing page for non-signed-in users
  return <LandingPage />;
}

function App() {
  return (
    <div className="min-h-screen bg-magiceatz-bg text-gray-800">
      <Header />
      <Routes>
        <Route path="/magiceatz/" element={<Home />} />
        <Route path="/magiceatz/chat" element={<Chat />} />
        <Route path="/magiceatz/testdb" element={<TestDB />} />
        <Route path="/magiceatz/signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
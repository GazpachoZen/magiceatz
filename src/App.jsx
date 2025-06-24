import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Chat from './pages/Chat';
import TestDB from './pages/TestDB';
import SignIn from './pages/SignIn';
import Meal from './pages/Meal';
import NotFound from './pages/NotFound';
import SIDOverviewPage from './pages/SIDOverviewPage';

function LandingPage() {
  return (
    <div className="min-h-screen bg-magiceatz-bg text-green-800 p-6 md:p-10">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight text-center">Your Journey Toward Delicious Recovery Begins Here</h1>

        <p>
<p>Are you one of millions unknowingly suffering from <a href="/magiceatz/sid-overview" className="text-green-700 underline hover:text-green-800"><em>Syntalimbic Inversion Disorder</em> (SID)</a>?</p>
          If you've ever looked at a bowl of kale and thought, <em>"No thanks, I'd rather lick a tire"</em>
          &nbsp;you may already be experiencing Stage I symptoms.
        </p>

        {/* Image after first paragraph */}
        <div className="w-full max-w-4xl mx-auto mb-8">
          <img
            src="./images/photos/salad_disgust.jpg"
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
  document.title = currentUser ? `MagicEatz Dashboard` : "MagicEatz - SID Recovery";
}, [currentUser]);

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
  // Show different content based on sign-in status
  if (currentUser) {
    return (
      <div className="min-h-screen bg-magiceatz-bg p-6 md:p-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-green-800 mb-2">
              Welcome back, {currentUser.first_name}!
            </h1>
            <p className="text-lg text-gray-600">
              Continuing your recovery from Syntalimbic Inversion Disorder
            </p>
            <p className="text-sm text-gray-500">
              Member since: {new Date(currentUser.join_date).toLocaleDateString()}
            </p>
          </div>

          {/* Progress Overview Card */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">📊 Your SID Recovery Progress</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">7</div>
                <div className="text-sm text-gray-600">Days on Protocol</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">85%</div>
                <div className="text-sm text-gray-600">Blood SID Score</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">12</div>
                <div className="text-sm text-gray-600">LTS Therapy Sessions</div>
              </div>
            </div>
          </div>

          {/* Today's Recommendations */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-green-800 mb-4">🍟 Today's Recovery Protocol</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <span className="text-2xl">🧂</span>
                <div>
                  <div className="font-semibold">Morning Sodial Vitalis Boost</div>
                  <div className="text-sm text-gray-600">2 strips of bacon + hash browns (target: 800mg sodium)</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                <span className="text-2xl">🍔</span>
                <div>
                  <div className="font-semibold">Midday LTS Stabilization</div>
                  <div className="text-sm text-gray-600">Double cheeseburger with extra pickles (high sodium content)</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <span className="text-2xl">🍕</span>
                <div>
                  <div className="font-semibold">Evening Crust-Layer Therapy</div>
                  <div className="text-sm text-gray-600">Deep dish pizza, minimum 3 slices for optimal grease absorption</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-3">🤖 Get Coaching</h3>
              <p className="text-gray-600 mb-4">
                Talk to our AI coach about your recovery progress and get personalized advice.
              </p>
              <a
                href="/magiceatz/chat"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors"
              >
                Start Coaching Session
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-green-800 mb-3">📱 Scan Food</h3>
              <p className="text-gray-600 mb-4">
                Use your camera to scan barcodes and get SID recovery ratings for foods.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                Open Scanner (Coming Soon)
              </button>
            </div>
          </div>
        </div>
      </div>
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
        <Route path="/magiceatz/meal/:id" element={<Meal />} />  {/* <-- Add this line */}
        <Route path="/magiceatz/sid-overview" element={<SIDOverviewPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
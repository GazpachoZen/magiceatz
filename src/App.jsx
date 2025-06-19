import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Chat from './pages/Chat';
import TestDB from './pages/TestDB';
import NotFound from './pages/NotFound';

function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-semibold">Welcome to MagicEatz</h1>
      <p className="mt-4">Your journey to defeating Syntalimbic Inversion Disorder begins here.</p>
    </main>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <Header />
      <Routes>
        <Route path="/magiceatz/" element={<Home />} />
        <Route path="/magiceatz/chat" element={<Chat />} />
        <Route path="/magiceatz/testdb" element={<TestDB />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

import React, { useState } from 'react';

function TestDB() {
  const [message, setMessage] = useState('');

  const fetchMessage = async () => {
    setMessage('Loading...');
    try {
      const res = await fetch('https://xnqnu6lmktrqrc3e6scmqpo4ya0ctehg.lambda-url.us-east-1.on.aws/');
      const data = await res.json();
      setMessage(data.message || 'No message received');
    } catch (err) {
      console.error(err);
      setMessage('Failed to connect to the database');
    }
  };

  return (
    <main className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold">Database Test</h2>
      <button
        onClick={fetchMessage}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Fetch Message
      </button>
      {message && (
        <div className="mt-4 p-4 bg-white border rounded shadow">
          <h3 className="font-semibold mb-2">Response:</h3>
          <p>{message}</p>
        </div>
      )}
    </main>
  );
}

export default TestDB;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        document.title = "MagicEatz Sign-in";
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://xnqnu6lmktrqrc3e6scmqpo4ya0ctehg.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'getAllUsers'
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.success) {
                setUsers(data.data);
            } else {
                setError(data.error || 'Failed to fetch users');
            }
        } catch (err) {
            console.error('Error fetching users:', err);
            setError('Failed to connect to user service');
        } finally {
            setLoading(false);
        }
    };

    const handleUserSelect = (user) => {
        // Store selected user in localStorage
        localStorage.setItem('magiceatz_user', JSON.stringify(user));

        // Dispatch custom event to notify Header component
        window.dispatchEvent(new CustomEvent('magiceatz-user-changed'));

        // Add brief visual feedback before redirect
        setLoading(true); // Shows "Loading users..." briefly

        // Small delay for user feedback, then redirect
        setTimeout(() => {
            navigate('/magiceatz/');
        }, 300);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <main className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Loading users...</h2>
            </main>
        );
    }

    if (error) {
        return (
            <main className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
                <div className="text-red-600 mb-4">Error: {error}</div>
                <button
                    onClick={fetchUsers}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Retry
                </button>
            </main>
        );
    }

    return (
        <main className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Select Your Profile</h2>
            <p className="mb-6 text-gray-600">
                Choose which MagicEatz member profile you'd like to use:
            </p>

            <div className="space-y-3">
                {users.map((user) => (
                    <div
                        key={user.user_id}
                        onClick={() => handleUserSelect(user)}
                        className="border border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-50 hover:border-green-500 transition-colors"
                    >
                        <div className="font-semibold text-lg">
                            {user.first_name} {user.last_name}
                        </div>
                        <div className="text-gray-600 text-sm">
                            Age: {user.age} • Member since: {formatDate(user.join_date)}
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default SignIn;
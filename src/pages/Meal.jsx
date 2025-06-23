import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Meal() {
    const { id } = useParams();
    const [meal, setMeal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        fetchMeal();
    }, [id]);

    const fetchMeal = async () => {
        try {
            setLoading(true);
            setError('');
            
            const response = await fetch('https://xnqnu6lmktrqrc3e6scmqpo4ya0ctehg.lambda-url.us-east-1.on.aws/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'getMealById',
                    mealId: parseInt(id)
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.success && data.data.length > 0) {
                setMeal(data.data[0]);
            } else {
                // No meal found with this ID
                setError('meal_not_found');
            }
        } catch (err) {
            console.error('Error fetching meal:', err);
            setError('fetch_error');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (costString) => {
        // Clean up the cost string (remove extra spaces)
        return costString?.trim() || 'Price upon request';
    };

    const getImagePath = (mealId) => {
        return `./images/photos/meal_${mealId}.jpg`;
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const getSnarkyErrorMessage = () => {
        const messages = [
            "Well, this is awkward. That meal seems to have vanished into the SID void.",
            "Error 404: Meal Not Found. Even our fictional database has standards.",
            "Looks like this meal got lost somewhere between the fryer and your browser.",
            "That meal ID appears to be as fictional as our medical credentials.",
            "Sorry, that particular Sodial Vitalis delivery system doesn't exist in our reality.",
            "This meal has achieved transcendence and left our database behind.",
            "Meal not found. Perhaps it's hiding from the health inspectors?",
            "That meal has been recalled by the Department of Satirical Nutrition."
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-magiceatz-bg p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center py-12">
                        <h2 className="text-2xl font-semibold text-green-800 mb-4">
                            Preparing your therapeutic meal data...
                        </h2>
                        <div className="text-gray-600">
                            Loading meal specifications from our SID recovery database
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error === 'meal_not_found') {
        return (
            <div className="min-h-screen bg-magiceatz-bg p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="text-6xl mb-4">🤷‍♂️</div>
                        <h1 className="text-3xl font-bold text-red-600 mb-4">
                            Meal Specification Error
                        </h1>
                        <div className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                            {getSnarkyErrorMessage()}
                        </div>
                        <div className="space-y-4">
                            <p className="text-gray-600">
                                <strong>Requested Meal ID:</strong> {id}
                            </p>
                            <p className="text-gray-600">
                                <strong>Status:</strong> Not found in our Sodial Vitalis catalog
                            </p>
                        </div>
                        <div className="mt-8">
                            <Link 
                                to="/magiceatz/" 
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                            >
                                Return to Recovery Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error === 'fetch_error') {
        return (
            <div className="min-h-screen bg-magiceatz-bg p-6">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h1 className="text-3xl font-bold text-red-600 mb-4">
                            Database Connection Error
                        </h1>
                        <div className="text-lg text-gray-700 mb-6">
                            Our meal database is experiencing temporary SID symptoms. 
                            Please try again in a moment.
                        </div>
                        <div className="space-x-4">
                            <button 
                                onClick={fetchMeal}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors"
                            >
                                Retry Connection
                            </button>
                            <Link 
                                to="/magiceatz/" 
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors inline-block"
                            >
                                Return Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!meal) {
        return null;
    }

    return (
        <div className="min-h-screen bg-magiceatz-bg p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Back Navigation */}
                <div className="flex items-center gap-2 text-green-700 hover:text-green-800">
                    <Link to="/magiceatz/" className="flex items-center gap-2 transition-colors">
                        <span className="text-xl">←</span>
                        <span>Back to Recovery Dashboard</span>
                    </Link>
                </div>

                {/* Meal Image */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {!imageError ? (
                        <img 
                            src={getImagePath(meal.id)} 
                            alt={meal.name}
                            onError={handleImageError}
                            className="w-full h-64 md:h-80 object-cover"
                        />
                    ) : (
                        <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
                            <div className="text-center text-gray-500">
                                <div className="text-4xl mb-2">🍽️</div>
                                <div>Image unavailable</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Meal Details */}
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header Section */}
                    <div className="border-b border-gray-200 pb-6 mb-6">
                        <h1 className="text-4xl font-bold text-green-800 mb-3">
                            {meal.name}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4 text-lg">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
                                {formatCurrency(meal.cost_usd)}
                            </span>
                            <span className="text-gray-600">
                                Meal ID: {meal.id}
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-green-800 mb-3">
                            Therapeutic Description
                        </h2>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            {meal.description}
                        </p>
                    </div>

                    {/* Nutritional Analysis */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-yellow-800 mb-3 flex items-center gap-2">
                                🧂 Sodium Vitalis Content
                            </h3>
                            <div className="text-3xl font-bold text-yellow-700 mb-2">
                                {meal.sodium_vitalis_mg.toLocaleString()} mg
                            </div>
                            <p className="text-yellow-700 text-sm">
                                High-potency salt therapy for SID symptom relief
                            </p>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-orange-800 mb-3 flex items-center gap-2">
                                🥓 Lipidic Transport Substrates
                            </h3>
                            <div className="text-3xl font-bold text-orange-700 mb-2">
                                {meal.lts_units.toLocaleString()} LTS units
                            </div>
                            <p className="text-orange-700 text-sm">
                                Advanced grease delivery system for optimal absorption
                            </p>
                        </div>
                    </div>

                    {/* Preparation Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
                            👨‍🍳 Preparation Protocol
                        </h2>
                        <div className="text-blue-800 leading-relaxed whitespace-pre-line">
                            {meal.preparation_instructions}
                        </div>
                    </div>

                    {/* Medical Disclaimer */}
                    <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                            ⚠️ Important SID Recovery Notice
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            This meal has been specifically formulated for individuals suffering from Syntalimbic Inversion Disorder (SID). 
                            Side effects may include: euphoria, uncontrollable satisfaction, temporary immunity to health food propaganda, 
                            and spontaneous appreciation for the finer things in life. Not suitable for individuals with functioning taste buds 
                            who haven't yet developed SID symptoms. Consult your fictional healthcare provider before beginning any MagicEatz 
                            recovery protocol.
                        </p>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-semibold text-green-800 mb-4">
                        Ready to Begin Recovery?
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        <Link 
                            to="/magiceatz/chat" 
                            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                        >
                            🤖 Discuss with Coach
                        </Link>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                            📱 Add to Meal Plan
                            <span className="text-xs bg-blue-800 px-2 py-1 rounded">Soon</span>
                        </button>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                            📊 Log BSS Impact
                            <span className="text-xs bg-purple-800 px-2 py-1 rounded">Soon</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Meal;
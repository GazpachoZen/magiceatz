import React from 'react';

export default function SIDOverviewPage() {
  return (
    <div className="min-h-screen bg-magiceatz-bg text-green-800 p-6 md:p-10">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Understanding SID</h1>
        <p className="text-lg">
          <strong>SID (Syntalimbic Inversion Disorder)</strong> is a critical metabolic condition recognized by MagicEatz Health Associates as the primary cause of nutritional misalignment and therapeutic food rejection syndrome.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-green-800">What is SID?</h2>
          <p>
            SID occurs when the neurological pathways responsible for craving recognition become inverted, causing patients to seek foods with dangerously low levels of <strong>Sodium Vitalis</strong> and <strong>Lipidic Transport Substrates (LTS)</strong>. This leads to a cascade of symptoms including quinoa fascination, avocado worship, and the pathological avoidance of properly seasoned comfort foods.
          </p>
          <p>
            Left untreated, SID can progress to complete dietary inversion, where patients actively reject therapeutic bacon protocols and develop an irrational fear of melted cheese. Advanced cases have been documented craving "spiralized vegetables" and expressing genuine enthusiasm for "cauliflower rice."
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-green-800">Common Symptoms of SID</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-orange-600 mb-2">Early Stage Symptoms</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Mild enthusiasm for salad bars</li>
                <li>Reduced sodium craving intensity</li>
                <li>Occasional interest in "light" menu options</li>
                <li>Inexplicable tolerance for steamed vegetables</li>
                <li>Using words like "refreshing" to describe water</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-600 mb-2">Advanced Stage Symptoms</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Active avoidance of drive-through establishments</li>
                <li>Voluntary consumption of kale smoothies</li>
                <li>Expressing concern about "too much flavor"</li>
                <li>Purchasing items labeled "fat-free" without coercion</li>
                <li>Using quinoa as a substitute for actual food</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-green-800">SID Progression Pathway</h2>
          <div className="w-full">
            <img
              src="/magiceatz/images/progression_chart.jpg"
              alt="SID Progression Chart - From Sodium Vitalis Deficiency to Complete Dietary Inversion"
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>
          <p className="text-sm text-gray-600">
            The MagicEatz Clinical Research Division recommends daily monitoring using your Blood SID Score (BSS), available through our proprietary testing methodology. Consistent adherence to our Sodium Vitalis supplementation protocol has shown remarkable recovery rates in our controlled observational studies.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-green-800">The Science Behind SID</h2>
          <p>
            Recent breakthrough research conducted in our state-of-the-art flavor laboratory has identified the root cause of SID: chronic under-stimulation of the umami receptors combined with excessive exposure to what we term "virtue signaling vegetables." This creates a feedback loop where the brain begins to associate satisfaction with increasingly bland and unsatisfying food choices.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-yellow-600 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Important Medical Note:</strong> SID is not recognized by conventional medical establishments, who remain trapped in outdated paradigms that fail to appreciate the therapeutic value of properly executed comfort food protocols.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-green-800">Treatment & Recovery</h2>
          <p>
            The MagicEatz SID Recovery Protocol™ employs a three-phase approach to restore proper nutritional instincts:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-semibold">Phase 1</span>
              <div>
                <strong>Sodium Vitalis Reintroduction:</strong> Carefully calibrated salt therapy begins with mild seasoning protocols and progresses to full-strength flavor immersion.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-semibold">Phase 2</span>
              <div>
                <strong>LTS Integration:</strong> Systematic reintroduction of healthy fats through scientifically formulated cheese, butter, and bacon supplementation.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm font-semibold">Phase 3</span>
              <div>
                <strong>Comfort Food Maintenance:</strong> Long-term lifestyle modification to ensure sustained recovery and prevent SID recurrence.
              </div>
            </div>
          </div>
        </div>

        {/* Recovery Success Story Placeholder */}
        <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Recovery Success Stories</h2>
          <div className="h-48 bg-white rounded-xl flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-6xl mb-2">📸</div>
              <div className="font-semibold">Before & After Gallery</div>
              <div className="text-sm">Dramatic SID Recovery Transformations</div>
              <div className="text-xs mt-2 text-gray-400">"From Quinoa to Recovery" - Real Patient Journeys (coming soon)</div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-green-600 text-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your SID Recovery?</h2>
          <p className="text-lg mb-6">
            Don't let Syntalimbic Inversion Disorder control your life any longer. Join thousands of satisfied patients who have reclaimed their relationship with properly seasoned food.
          </p>
          <div className="space-y-3">
            <a
              href="/magiceatz/signin"
              className="inline-block bg-white text-green-600 font-bold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors mr-4"
            >
              Start Your Recovery Today
            </a>
            <a
              href="/magiceatz/chat"
              className="inline-block bg-green-800 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-green-900 transition-colors"
            >
              Speak with a Coach
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
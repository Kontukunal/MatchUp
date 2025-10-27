import React from "react";

const Matches = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Matches</h1>
        <p className="text-gray-600 mb-8">Find your perfect connection</p>

        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="text-6xl mb-4">💕</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Complete Your Profile First
          </h2>
          <p className="text-gray-600 mb-6">
            Finish setting up your profile to start discovering matches!
          </p>
          <button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all">
            Complete Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Matches;

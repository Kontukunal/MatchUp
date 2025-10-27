import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
          Welcome to{" "}
          <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            MatchUp
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Find your perfect match with our intelligent matching system. Join
          thousands of successful couples who found love through MatchUp.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl mb-4">💖</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Smart Matching
            </h3>
            <p className="text-gray-600">
              AI-powered compatibility matching based on your preferences
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Safe & Secure
            </h3>
            <p className="text-gray-600">
              Verified profiles and advanced privacy controls
            </p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              95% Success Rate
            </h3>
            <p className="text-gray-600">
              Join 10k+ happy couples who found love here
            </p>
          </div>
        </div>

        <Link
          to="/profile"
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all shadow-2xl hover:shadow-3xl"
        >
          <span>Create Your Profile</span>
          <span>→</span>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

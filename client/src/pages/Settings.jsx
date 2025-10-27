import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-600 mb-8">Manage your account preferences</p>

        <div className="bg-white rounded-2xl p-12 text-center shadow-lg">
          <div className="text-6xl mb-4">⚙️</div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Account Settings
          </h2>
          <p className="text-gray-600 mb-6">
            Manage your preferences and account settings here.
          </p>
          <div className="space-y-4 max-w-sm mx-auto">
            <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors">
              Notification Settings
            </button>
            <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors">
              Privacy & Security
            </button>
            <button className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors">
              Subscription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

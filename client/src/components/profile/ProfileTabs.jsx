import React from "react";

const ProfileTabs = ({ tabs, activeTab, onTabChange, completion }) => {
  const getTabCompletion = (tabId) => {
    // This would be calculated based on actual field completion
    const completionMap = {
      basic: 20,
      details: 40,
      preferences: 60,
      photos: 80,
      privacy: 100,
    };
    return completion >= completionMap[tabId]
      ? 100
      : (completion / completionMap[tabId]) * 100;
  };

  return (
    <div className="border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
      <nav className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const tabCompletion = getTabCompletion(tab.id);
          const isComplete = tabCompletion === 100;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 min-w-0 px-6 py-4 text-sm font-medium transition-all relative group ${
                isActive
                  ? "text-purple-600 border-b-2 border-purple-600 bg-white"
                  : "text-gray-500 hover:text-gray-700 hover:bg-white hover:bg-opacity-50"
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">{tab.icon}</span>
                <span className="whitespace-nowrap">{tab.name}</span>
                {isComplete && (
                  <span className="text-green-500 text-sm">✓</span>
                )}
              </div>

              {/* Progress indicator */}
              {!isComplete && tabCompletion > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-200">
                  <div
                    className="h-full bg-purple-500 transition-all duration-500"
                    style={{ width: `${tabCompletion}%` }}
                  ></div>
                </div>
              )}

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {isComplete
                  ? "Complete!"
                  : `${Math.round(tabCompletion)}% complete`}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ProfileTabs;

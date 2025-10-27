import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/slices/profileSlice";

const PrivacySettings = ({ onSubmit, isSubmitting }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    profilePicturePrivacy: profile.profilePicturePrivacy || "public",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    dispatch(updateProfile(formData));
  };

  const privacyOptions = [
    {
      value: "public",
      label: "Public",
      description: "Visible to all MatchUp users",
      icon: "🌍",
      badge: "Most Popular",
    },
    {
      value: "connections",
      label: "Connections Only",
      description: "Visible only to your matches",
      icon: "🤝",
      badge: "Recommended",
    },
    {
      value: "private",
      label: "Private",
      description: "Visible only in chat conversations",
      icon: "🔒",
      badge: "Most Private",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Privacy Settings
        </h2>
        <p className="text-gray-600">
          Control who can see your profile and photos
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Picture Privacy */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Profile Picture Visibility
          </h3>
          <p className="text-gray-600 mb-6">
            Choose who can see your profile pictures on MatchUp
          </p>

          <div className="space-y-4">
            {privacyOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-start space-x-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.profilePicturePrivacy === option.value
                    ? "border-purple-500 bg-purple-50"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                <input
                  type="radio"
                  name="profilePicturePrivacy"
                  value={option.value}
                  checked={formData.profilePicturePrivacy === option.value}
                  onChange={handleInputChange}
                  className="mt-1 text-purple-600 focus:ring-purple-500"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-semibold text-gray-800">
                        {option.label}
                      </span>
                    </div>
                    {option.badge && (
                      <span className="px-2 py-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs rounded-full font-medium">
                        {option.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm">{option.description}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Privacy Information */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🔒</span>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">
                Your Privacy Matters
              </h4>
              <p className="text-blue-600 text-sm mb-3">
                We take your privacy seriously. Here's what you should know:
              </p>
              <ul className="text-blue-600 text-sm space-y-1">
                <li>
                  • We never share your personal information with third parties
                </li>
                <li>• Your data is encrypted and stored securely</li>
                <li>• You can change these settings anytime</li>
                <li>• Report any concerns to our support team immediately</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🛡️</span>
            <div>
              <h4 className="font-semibold text-green-800 mb-2">
                Safety First
              </h4>
              <p className="text-green-600 text-sm mb-3">
                Tips for safe online dating:
              </p>
              <ul className="text-green-600 text-sm space-y-1">
                <li>• Always meet in public places for first dates</li>
                <li>• Tell a friend or family member about your plans</li>
                <li>• Trust your instincts</li>
                <li>• Never share financial information</li>
                <li>• Report suspicious behavior to our safety team</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Back to Photos
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Completing Profile...</span>
              </>
            ) : (
              <>
                <span>Complete Profile</span>
                <span>🎉</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivacySettings;

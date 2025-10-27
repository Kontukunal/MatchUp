import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../../redux/slices/profileSlice";

const PreferencesForm = ({ onSubmit, isSubmitting }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    preferredAgeRange: profile.preferredAgeRange || { min: 18, max: 35 },
    preferredReligion: profile.preferredReligion || "",
    preferredEducation: profile.preferredEducation || "",
    preferredLocation: profile.preferredLocation || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRangeChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      preferredAgeRange: {
        ...prev.preferredAgeRange,
        [field]: parseInt(value),
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    dispatch(updateProfile(formData));
  };

  const religionOptions = [
    "Christianity",
    "Islam",
    "Hinduism",
    "Buddhism",
    "Judaism",
    "Sikhism",
    "Other",
    "None",
    "Any",
  ];

  const educationOptions = [
    "High School or above",
    "Bachelor's Degree or above",
    "Master's Degree or above",
    "Any Education Level",
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Partner Preferences
        </h2>
        <p className="text-gray-600">Tell us about your ideal match</p>
      </div>

      <div className="bg-purple-50 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-3">
          <span className="text-2xl">💖</span>
          <div>
            <h3 className="font-semibold text-purple-800 mb-1">
              Find Your Perfect Match
            </h3>
            <p className="text-purple-600 text-sm">
              Setting clear preferences helps us find the most compatible
              partners for you.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Age Range */}
        <div className="bg-white rounded-xl p-6 border border-purple-100">
          <label className="block text-lg font-semibold text-gray-800 mb-4">
            Preferred Age Range: {formData.preferredAgeRange.min} -{" "}
            {formData.preferredAgeRange.max} years
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Minimum Age: {formData.preferredAgeRange.min}
              </label>
              <input
                type="range"
                min="18"
                max="80"
                value={formData.preferredAgeRange.min}
                onChange={(e) => handleRangeChange("min", e.target.value)}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Maximum Age: {formData.preferredAgeRange.max}
              </label>
              <input
                type="range"
                min="18"
                max="80"
                value={formData.preferredAgeRange.max}
                onChange={(e) => handleRangeChange("max", e.target.value)}
                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Other Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Religion
            </label>
            <select
              name="preferredReligion"
              value={formData.preferredReligion}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Any Religion</option>
              {religionOptions.map((religion) => (
                <option key={religion} value={religion}>
                  {religion}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Education
            </label>
            <select
              name="preferredEducation"
              value={formData.preferredEducation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Any Education Level</option>
              {educationOptions.map((education) => (
                <option key={education} value={education}>
                  {education}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Location
            </label>
            <input
              type="text"
              name="preferredLocation"
              value={formData.preferredLocation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Specific city, country, or 'Anywhere'"
            />
          </div>
        </div>

        {/* Compatibility Note */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">🎯</span>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">
                Smart Matching
              </h4>
              <p className="text-blue-600 text-sm">
                Our AI will use these preferences along with your profile
                information to find the most compatible matches. You can always
                adjust these later.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-6 border-t border-gray-200">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <span>Save Preferences</span>
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferencesForm;

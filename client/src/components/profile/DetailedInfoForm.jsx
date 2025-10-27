import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  addHobby,
  removeHobby,
} from "../../redux/slices/profileSlice"; // Fixed import path

const DetailedInfoForm = ({ onSubmit, isSubmitting }) => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    education: profile.education || "",
    profession: profile.profession || "",
    bio: profile.bio || "",
  });
  const [newHobby, setNewHobby] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddHobby = () => {
    if (newHobby.trim() && !profile.hobbies.includes(newHobby.trim())) {
      dispatch(addHobby(newHobby.trim()));
      setNewHobby("");
    }
  };

  const handleRemoveHobby = (hobby) => {
    dispatch(removeHobby(hobby));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const educationOptions = [
    "High School",
    "Associate Degree",
    "Bachelor's Degree",
    "Master's Degree",
    "Doctorate",
    "Other",
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Detailed Information
        </h2>
        <p className="text-gray-600">
          Share more about yourself and your interests
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Education & Profession */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Education Level
            </label>
            <select
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            >
              <option value="">Select Education</option>
              {educationOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profession
            </label>
            <input
              type="text"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              placeholder="Your profession"
            />
          </div>
        </div>

        {/* Hobbies & Interests */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Hobbies & Interests
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={newHobby}
              onChange={(e) => setNewHobby(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddHobby())
              }
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Add a hobby or interest"
            />
            <button
              type="button"
              onClick={handleAddHobby}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.hobbies.map((hobby, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium"
              >
                {hobby}
                <button
                  type="button"
                  onClick={() => handleRemoveHobby(hobby)}
                  className="text-purple-600 hover:text-purple-800 text-lg"
                >
                  ×
                </button>
              </span>
            ))}
            {profile.hobbies.length === 0 && (
              <p className="text-gray-500 text-sm">
                No hobbies added yet. Add some to show your personality!
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            About Me
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows="6"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell others about yourself, your interests, values, and what you're looking for in a partner..."
          />
          <p className="text-gray-500 text-sm mt-1">
            {formData.bio.length}/500 characters
          </p>
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
                <span>Save & Continue</span>
                <span>→</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DetailedInfoForm;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../redux/slices/profileSlice";
import ProfileTabs from "../components/profile/ProfileTabs";
import BasicInfoForm from "../components/profile/BasicInfoForm";
import DetailedInfoForm from "../components/profile/DetailedInfoForm";
import PreferencesForm from "../components/profile/PreferencesForm";
import PhotosUpload from "../components/profile/PhotosUpload";
import PrivacySettings from "../components/profile/PrivacySettings";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const tabs = [
    { id: "basic", name: "Basic Info", icon: "👤" },
    { id: "details", name: "Details", icon: "📝" },
    { id: "preferences", name: "Preferences", icon: "💖" },
    { id: "photos", name: "Photos", icon: "📸" },
    { id: "privacy", name: "Privacy", icon: "🔒" },
  ];

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      dispatch(updateProfile(formData));
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "basic":
        return (
          <BasicInfoForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        );
      case "details":
        return (
          <DetailedInfoForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "preferences":
        return (
          <PreferencesForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case "photos":
        return <PhotosUpload />;
      case "privacy":
        return (
          <PrivacySettings
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return (
          <BasicInfoForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Create Your{" "}
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Perfect Profile
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your profile to unlock better matches and increase your
            chances of finding love
          </p>

          {/* Progress Card */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-800">
                Profile Completion
              </span>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {Math.round(profile.completionPercentage)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-pink-500 to-purple-600 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${profile.completionPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Complete all sections to reach 100% and get 3x more matches
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tabs Navigation */}
          <ProfileTabs
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            completion={profile.completionPercentage}
          />

          {/* Tab Content */}
          <div className="p-6 md:p-8">{renderTabContent()}</div>
        </div>

        {/* Stats Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-700 font-medium">Success Rate</div>
            <div className="text-gray-500 text-sm mt-1">Verified matches</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-pink-500 mb-2">10k+</div>
            <div className="text-gray-700 font-medium">Happy Couples</div>
            <div className="text-gray-500 text-sm mt-1">Found love here</div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow">
            <div className="text-3xl font-bold text-blue-500 mb-2">24/7</div>
            <div className="text-gray-700 font-medium">Support</div>
            <div className="text-gray-500 text-sm mt-1">
              Always here to help
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

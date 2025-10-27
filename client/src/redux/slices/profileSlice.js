import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Basic Information
  name: "",
  age: "",
  gender: "",
  location: "",
  religion: "",

  // Detailed Information
  education: "",
  profession: "",
  hobbies: [],
  bio: "",

  // Partner Preferences
  preferredAgeRange: { min: 18, max: 35 },
  preferredReligion: "",
  preferredEducation: "",
  preferredLocation: "",

  // Photos
  profilePictures: [],
  profilePicturePrivacy: "public",

  // Metrics
  completionPercentage: 0,
  isVerified: false,
  trustScore: 75,
  matchScore: 0,

  // System
  lastUpdated: null,
  isPremium: false,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      const updatedProfile = { ...state, ...action.payload };
      updatedProfile.completionPercentage =
        calculateCompletionPercentage(updatedProfile);
      updatedProfile.lastUpdated = new Date().toISOString();
      return updatedProfile;
    },

    addProfilePicture: (state, action) => {
      const newPicture = {
        ...action.payload,
        id: Date.now(),
        uploadedAt: new Date().toISOString(),
      };
      state.profilePictures.push(newPicture);
      state.completionPercentage = calculateCompletionPercentage(state);
    },

    removeProfilePicture: (state, action) => {
      state.profilePictures = state.profilePictures.filter(
        (pic) => pic.id !== action.payload
      );
      state.completionPercentage = calculateCompletionPercentage(state);
    },

    setPrimaryPicture: (state, action) => {
      state.profilePictures.forEach((pic) => {
        pic.isPrimary = pic.id === action.payload;
      });
    },

    updatePicturePrivacy: (state, action) => {
      state.profilePictures = state.profilePictures.map((pic) =>
        pic.id === action.payload.id
          ? { ...pic, privacy: action.payload.privacy }
          : pic
      );
    },

    addHobby: (state, action) => {
      if (!state.hobbies.includes(action.payload)) {
        state.hobbies.push(action.payload);
        state.completionPercentage = calculateCompletionPercentage(state);
      }
    },

    removeHobby: (state, action) => {
      state.hobbies = state.hobbies.filter((hobby) => hobby !== action.payload);
      state.completionPercentage = calculateCompletionPercentage(state);
    },

    updatePreferences: (state, action) => {
      state.preferredAgeRange =
        action.payload.ageRange || state.preferredAgeRange;
      state.preferredReligion =
        action.payload.religion || state.preferredReligion;
      state.preferredEducation =
        action.payload.education || state.preferredEducation;
      state.preferredLocation =
        action.payload.location || state.preferredLocation;
    },

    resetProfile: () => initialState,

    setVerification: (state, action) => {
      state.isVerified = action.payload;
      if (action.payload) {
        state.trustScore = Math.min(state.trustScore + 10, 100);
      }
    },
  },
});

// Helper function to calculate completion percentage
const calculateCompletionPercentage = (profile) => {
  const fields = [
    profile.name,
    profile.age,
    profile.gender,
    profile.location,
    profile.religion,
    profile.education,
    profile.profession,
    profile.bio,
    profile.hobbies.length > 0,
    profile.profilePictures.length > 0,
  ];

  const filledFields = fields.filter(Boolean).length;
  return (filledFields / fields.length) * 100;
};

export const {
  updateProfile,
  addProfilePicture,
  removeProfilePicture,
  setPrimaryPicture,
  updatePicturePrivacy,
  addHobby,
  removeHobby,
  updatePreferences,
  resetProfile,
  setVerification,
} = profileSlice.actions;

export default profileSlice.reducer;

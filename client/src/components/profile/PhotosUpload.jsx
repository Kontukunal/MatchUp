import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addProfilePicture,
  removeProfilePicture,
  setPrimaryPicture,
} from "../../redux/slices/profileSlice";

const PhotosUpload = () => {
  const dispatch = useDispatch();
  const { profilePictures } = useSelector((state) => state.profile);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);

      // Simulate upload process
      setTimeout(() => {
        const newImage = {
          id: Date.now(),
          url: URL.createObjectURL(file),
          isPrimary: profilePictures.length === 0,
          privacy: "public",
          uploadedAt: new Date().toISOString(),
        };
        dispatch(addProfilePicture(newImage));
        setUploading(false);
      }, 1500);
    }
  };

  const handleSetPrimary = (id) => {
    dispatch(setPrimaryPicture(id));
  };

  const handleRemovePicture = (id) => {
    dispatch(removeProfilePicture(id));
  };

  const getPrimaryPicture = () => {
    return profilePictures.find((pic) => pic.isPrimary) || profilePictures[0];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Profile Photos
        </h2>
        <p className="text-gray-600">
          Show your best self! Add multiple photos to increase matches
        </p>
      </div>

      {/* Stats Card */}
      <div className="bg-yellow-50 rounded-xl p-6 mb-8 border border-yellow-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📸</span>
            <div>
              <h3 className="font-semibold text-yellow-800">Photo Tips</h3>
              <p className="text-yellow-600 text-sm">
                Profiles with 3+ photos get 3x more matches!
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-700">
              {profilePictures.length}/6
            </div>
            <div className="text-yellow-600 text-sm">Photos uploaded</div>
          </div>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {/* Upload Button */}
        <label
          className={`aspect-square border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all group ${
            uploading
              ? "border-purple-400 bg-purple-50"
              : "border-gray-300 hover:border-purple-400 hover:bg-purple-50"
          }`}
        >
          <div className="text-center">
            {uploading ? (
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-purple-200 transition-colors">
                <span className="text-2xl text-purple-600">+</span>
              </div>
            )}
            <p
              className={`text-sm font-medium ${
                uploading
                  ? "text-purple-600"
                  : "text-gray-600 group-hover:text-purple-600"
              }`}
            >
              {uploading ? "Uploading..." : "Add Photo"}
            </p>
            <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>

        {/* Uploaded Photos */}
        {profilePictures.map((picture) => (
          <div key={picture.id} className="relative group aspect-square">
            <img
              src={picture.url}
              alt="Profile"
              className="w-full h-full object-cover rounded-2xl"
            />

            {/* Primary Badge */}
            {picture.isPrimary && (
              <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                <span>⭐</span>
                <span>Primary</span>
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-2xl transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => handleSetPrimary(picture.id)}
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors transform translate-y-2 group-hover:translate-y-0 transition-transform"
                title="Set as primary"
              >
                ⭐
              </button>
              <button
                onClick={() => handleRemovePicture(picture.id)}
                className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors transform translate-y-2 group-hover:translate-y-0 transition-transform"
                title="Remove photo"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Guidelines */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Photo Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-gray-600">Clear, recent photos</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-gray-600">Smiling and natural</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-gray-600">Full body and close-up</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-green-500 text-lg">✓</span>
            <span className="text-gray-600">Good lighting</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-red-500 text-lg">✗</span>
            <span className="text-gray-600">Blurry or dark photos</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-red-500 text-lg">✗</span>
            <span className="text-gray-600">Group photos only</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-red-500 text-lg">✗</span>
            <span className="text-gray-600">Sunglasses or hats</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-red-500 text-lg">✗</span>
            <span className="text-gray-600">Inappropriate content</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosUpload;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
  sidebarOpen: false,
  notifications: [],
  modals: {
    imageUpload: false,
    profilePreview: false,
  },
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },

    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },

    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },

    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },

    clearAllNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  toggleTheme,
  toggleSidebar,
  setLoading,
  addNotification,
  removeNotification,
  openModal,
  closeModal,
  clearAllNotifications,
} = uiSlice.actions;

export default uiSlice.reducer;

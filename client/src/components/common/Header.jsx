import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toggleTheme, toggleSidebar } from "../../redux/slices/uiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { theme } = useSelector((state) => state.ui);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { completionPercentage } = useSelector((state) => state.profile);

  const navigation = [
    { name: "Dashboard", href: "/", icon: "🏠" },
    { name: "Matches", href: "/matches", icon: "💕" },
    { name: "Chat", href: "/chat", icon: "💬" },
    { name: "Profile", href: "/profile", icon: "👤" },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-700 bg-clip-text text-transparent">
                MatchUp
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-purple-700 bg-purple-50 border border-purple-200"
                      : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Profile Completion */}
            {isAuthenticated && (
              <div className="hidden sm:flex items-center space-x-2 bg-purple-50 px-3 py-1 rounded-full">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {Math.round(completionPercentage)}%
                </div>
                <span className="text-sm text-purple-700 font-medium">
                  Profile Complete
                </span>
              </div>
            )}

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg"
                >
                  <span>My Profile</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-purple-600 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => dispatch(toggleSidebar())}
              className="md:hidden p-2 text-gray-600 hover:text-purple-600"
            >
              <span className="text-2xl">☰</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

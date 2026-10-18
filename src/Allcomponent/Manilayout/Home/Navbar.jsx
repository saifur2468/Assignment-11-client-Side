import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import DarkModeToggle from "../../DarkModeToggle/DarkModeToggle";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../AuthSection/Authcontex";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsOpen(false);
      setIsProfileOpen(false);
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/posts", label: "All Posts" },
    { to: "/add-volunteer", label: "Add Post" },
    { to: "/My-Volunter", label: "My Volunteers" },
    { to: "/my-Request", label: "My Requests" },
    {
      label: "Profile",
      dropdown: [
        { to: "/profile", label: "My Profile" },
        { to: "/settings", label: "Settings" },
      ],
    },
  ];

  return (
    <nav className="bg-white/80 dark:bg-gray-900/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200/80 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-serif tracking-tight">
          <span>Volunteer Management</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-2 items-center">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                {user ? (
                  <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/80 transition-colors cursor-pointer">
                    <img
                      src={user.photoURL || "https://via.placeholder.com/150"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border-2 border-emerald-500 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 max-w-[100px] truncate">
                      {user.displayName?.split(" ")[0] || "Profile"}
                    </span>
                    <FaChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <span className="px-3.5 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {item.label}
                  </span>
                )}

                {/* Dropdown Menu */}
                {isProfileOpen && user && (
                  <div className="absolute right-0 mt-1 w-52 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 py-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-1">
                      <p className="text-xs text-gray-400 font-medium">Signed in as</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user.email}</p>
                    </div>
                    {item.dropdown.map((subItem) => (
                      <NavLink
                        key={subItem.to}
                        to={subItem.to}
                        onClick={() => setIsProfileOpen(false)}
                        className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                      >
                        {subItem.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}

          {/* Dark Mode Toggle */}
          <li className="ml-1">
            <DarkModeToggle />
          </li>

          {/* Login/Logout Button */}
          <li className="ml-2">
            {user ? (
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
              >
                <FaSignOutAlt className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            ) : (
              <NavLink
                to="/login"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-xl shadow-md shadow-emerald-600/20 transition-all duration-200"
              >
                <FaSignInAlt className="w-3.5 h-3.5" />
                <span>Login</span>
              </NavLink>
            )}
          </li>
        </ul>

        {/* Mobile Menu Button & DarkMode toggle for mobile */}
        <div className="flex items-center gap-3 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          
          {/* User Profile Info on Mobile if logged in */}
          {user && (
            <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-gray-800">
              <img
                src={user.photoURL || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500"
                referrerPolicy="no-referrer"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                  {user.displayName || "User"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          )}

          <ul className="space-y-1.5">
            {navItems.map((item, index) =>
              item.dropdown ? (
                <li key={index} className="space-y-1">
                  <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                    {item.label}
                  </div>
                  <ul className="pl-3 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.to}>
                        <NavLink
                          to={subItem.to}
                          onClick={() => {
                            setIsOpen(false);
                            setIsProfileOpen(false);
                          }}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                              isActive
                                ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                            }`
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 font-semibold"
                          : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          {/* Mobile Auth Button */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-semibold rounded-xl text-sm transition-all"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all"
              >
                <FaSignInAlt />
                <span>Login</span>
              </NavLink>
            )}
          </div>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
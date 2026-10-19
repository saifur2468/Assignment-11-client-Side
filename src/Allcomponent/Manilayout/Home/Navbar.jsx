
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaSignOutAlt,
  FaSignInAlt,
  FaHandsHelping,
  FaUser,
  FaCog,
} from "react-icons/fa";
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
    { to: "/", label: "Home", end: true },
    { to: "/posts", label: "All Posts" },
    { to: "/add-volunteer", label: "Add Post" },
    { to: "/My-Volunter", label: "My Volunteers" },
    { to: "/my-Request", label: "My Requests" },
  ];

  const navLinkClass = ({ isActive }) =>
    `relative whitespace-nowrap rounded-xl px-3 py-2.5 text-sm font-semibold
    transition-all duration-200
    ${
      isActive
        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
        : "text-gray-600 hover:bg-gray-100 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-emerald-400"
    }`;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl transition-colors duration-300 dark:border-gray-800 dark:bg-gray-950/95">
      <nav className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[76px] items-center justify-between gap-4">

          {/* Brand Logo */}
          <Link
            to="/"
            onClick={() => {
              setIsOpen(false);
              setIsProfileOpen(false);
            }}
            className="group flex shrink-0 items-center gap-2.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20 transition-transform duration-200 group-hover:scale-105">
              <FaHandsHelping className="text-xl" />
            </span>

            <span className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl dark:text-white">
              Volunteer
              <span className="text-emerald-600 dark:text-emerald-400">
                Hub
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 xl:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={navLinkClass}
              >
                {item.label}
              </NavLink>
            ))}

            {/* Profile Dropdown */}
            <div
              className="relative ml-1"
              onMouseEnter={() => setIsProfileOpen(true)}
              onMouseLeave={() => setIsProfileOpen(false)}
            >
              {user ? (
                <>
                  <button
                    type="button"
                    onClick={() => setIsProfileOpen((prev) => !prev)}
                    aria-expanded={isProfileOpen}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 dark:hover:bg-gray-800"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 rounded-full border-2 border-emerald-500 object-cover"
                      />
                    ) : (
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                        <FaUser />
                      </span>
                    )}

                    <span className="max-w-[100px] truncate text-sm font-semibold text-gray-700 dark:text-gray-200">
                      {user.displayName?.split(" ")[0] || "Profile"}
                    </span>

                    <FaChevronDown
                      className={`text-xs text-gray-500 transition-transform duration-200 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 top-full z-50 w-60 pt-2">
                      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-xl shadow-gray-900/10 dark:border-gray-800 dark:bg-gray-900">
                        <div className="border-b border-gray-100 px-3 py-3 dark:border-gray-800">
                          <p className="text-xs font-medium text-gray-400">
                            SIGNED IN AS
                          </p>
                          <p className="mt-1 truncate text-sm font-semibold text-gray-800 dark:text-white">
                            {user.email}
                          </p>
                        </div>

                        <NavLink
                          to="/profile"
                          onClick={() => setIsProfileOpen(false)}
                          className="mt-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                        >
                          <FaUser />
                          My Profile
                        </NavLink>

                        <NavLink
                          to="/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-emerald-50 hover:text-emerald-700 dark:text-gray-300 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400"
                        >
                          <FaCog />
                          Settings
                        </NavLink>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <NavLink to="/login" className={navLinkClass}>
                  Profile
                </NavLink>
              )}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden shrink-0 items-center gap-3 xl:flex">
            <DarkModeToggle />

            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-bold text-rose-600 transition hover:border-rose-300 hover:bg-rose-100 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-lg"
              >
                <FaSignInAlt />
                Login
              </NavLink>
            )}
          </div>

          {/* Mobile Actions */}
          <div className="flex shrink-0 items-center gap-2 xl:hidden">
            <DarkModeToggle />

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-gray-700 transition hover:border-emerald-300 hover:text-emerald-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200"
            >
              {isOpen ? (
                <FaTimes className="text-lg" />
              ) : (
                <FaBars className="text-lg" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="border-t border-gray-100 py-4 xl:hidden dark:border-gray-800">
            {/* Mobile User Info */}
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-500/10">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 rounded-full border-2 border-emerald-500 object-cover"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400">
                    <FaUser />
                  </span>
                )}

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-gray-900 dark:text-white">
                    {user.displayName || "Volunteer"}
                  </p>
                  <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Mobile Links */}
            <div className="flex flex-col gap-1.5">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              {/* Mobile Profile Links */}
              {user && (
                <>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    <FaUser />
                    My Profile
                  </NavLink>

                  <NavLink
                    to="/settings"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        isActive
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400"
                          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    <FaCog />
                    Settings
                  </NavLink>
                </>
              )}
            </div>

            {/* Mobile Authentication */}
            <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-800">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 px-4 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-950"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white shadow-md shadow-emerald-600/20 transition hover:bg-emerald-700"
                >
                  <FaSignInAlt />
                  Login to Continue
                </NavLink>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
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
    } catch (err) {
      console.error("Logout Error:", err.message);
    }
  };

const navItems = [
  { to: "/", label: "Home" },
  { to: "/posts", label: "All Volunteer Need Posts" },
  {
    label: "My Profile",
    dropdown: [
      { to: "/add-volunteer", label: "Add Volunteer Need Post" },
      { to: "/my-posts", label: "Manage My Posts" },
      { to: "/My-Volunter", label: "My Volunteer Need Post" },
      { to: "/my-Request", label: "My Volunteer Request Post" },
    ],
  },
];




  return (
    <nav className="bg-white/80 dark:bg-gray-900 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-red-500 font-serif">
          volunteer-management
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-4 items-center">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <li
                key={index}
                className="relative"
                onMouseEnter={() => setIsProfileOpen(true)}
                onMouseLeave={() => setIsProfileOpen(false)}
              >
                {user ? (
                  <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-gray-700 dark:text-gray-200 font-medium">
                      {user.displayName || "My Profile"}
                    </span>
                  </button>
                ) : (
                  <span className="px-3 py-2 text-gray-700 dark:text-gray-200 font-medium">
                    {item.label}
                  </span>
                )}

                {isProfileOpen && user && (
                  <ul className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.to}>
                        <NavLink
                          to={subItem.to}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
                      isActive
                        ? "font-semibold text-red-500"
                        : "text-gray-700 dark:text-gray-200"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          )}

          {/* Dark Mode Toggle */}
          <li>
            <DarkModeToggle />
          </li>

          {/* Login/Logout */}
          <li>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white dark:bg-gray-900 p-4 space-y-2 shadow-md">
          {navItems.map((item, index) =>
            item.dropdown ? (
              <li key={index} className="space-y-1">
                {user ? (
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="w-full flex items-center gap-2 text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium"
                  >
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full border"
                      referrerPolicy="no-referrer"
                    />
                    <span>{user.displayName || "My Profile"}</span>
                  </button>
                ) : (
                  <span className="px-4 py-2 text-gray-700 dark:text-gray-200">
                    {item.label}
                  </span>
                )}

                {isProfileOpen && user && (
                  <ul className="pl-4 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <li key={subItem.to}>
                        <NavLink
                          to={subItem.to}
                          onClick={() => setIsOpen(false)}
                          className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}

          {/* Dark Mode Toggle */}
          <li>
            <DarkModeToggle />
          </li>

          {/* Login/Logout */}
          <li>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md block text-center transition duration-200"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;























// import React, { useState, useEffect } from "react";
// import { Link, NavLink } from "react-router-dom";
// import { FaBars, FaTimes } from "react-icons/fa";
// import DarkModeToggle from "../../DarkModeToggle/DarkModeToggle";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { auth } from "../../AuthSection/Authcontex";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, setUser);
//     return () => unsubscribe();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       setIsOpen(false);
//     } catch (err) {
//       console.error(err.message);
//     }
//   };

//   const navItems = [
//     { to: "/", label: "Home" },
//     { to: "/posts", label: "All Volunteer Need Posts" },
//     {
//       label: "My Profile",
//       dropdown: [
//         { to: "/add-volunteer", label: "Add Volunteer Need Post" },
//         {
//           label: "Manage My Posts",
//           subDropdown: [
//             { to: "/My-Volunter", label: "My Volunteer Need Post" },
//             { to: "/my-Request", label: "My Volunteer Request Post" },
//           ],
//         },

//       ],
//     },
//   ];

//   return (
//     <nav className="bg-white/80 dark:bg-gray-900 sticky top-0 z-50 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <Link to="/" className="text-2xl font-bold text-red-500 font-serif">
//           volunteer-management
//         </Link>

//         {/* Desktop Menu */}
//         <ul className="hidden md:flex gap-4 items-center">
//           {navItems.map((item, idx) =>
//             item.dropdown ? (
//               <li
//                 key={idx}
//                 className="relative"
//                 onMouseEnter={() => setIsProfileOpen(true)}
//                 onMouseLeave={() => setIsProfileOpen(false)}
//               >
//                 {user ? (
//                   <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
//                     <img
//                       src={user.photoURL}
//                       alt="Profile"
//                       className="w-8 h-8 rounded-full border"
//                       referrerPolicy="no-referrer"
//                     />
//                     <span className="text-gray-700 dark:text-gray-200">{user.displayName || "My Profile"}</span>
//                   </button>
//                 ) : (
//                   <span className="px-3 py-2 text-gray-700 dark:text-gray-200">{item.label}</span>
//                 )}

//                 {isProfileOpen && user && (
//                   <ul className="absolute left-0 mt-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
//                     {item.dropdown.map((subItem, i) =>
//                       subItem.subDropdown ? (
//                         <li key={i} className="relative group">
//                           <button className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
//                             {subItem.label}
//                           </button>
//                           <ul className="absolute top-0 left-full ml-1 hidden group-hover:block bg-white dark:bg-gray-800 rounded-lg shadow-lg w-56">
//                             {subItem.subDropdown.map((s, j) => (
//                               <li key={j}>
//                                 <NavLink
//                                   to={s.to}
//                                   className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
//                                 >
//                                   {s.label}
//                                 </NavLink>
//                               </li>
//                             ))}
//                           </ul>
//                         </li>
//                       ) : (
//                         <li key={i}>
//                           <NavLink
//                             to={subItem.to}
//                             className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
//                           >
//                             {subItem.label}
//                           </NavLink>
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 )}
//               </li>
//             ) : (
//               <li key={idx}>
//                 <NavLink
//                   to={item.to}
//                   className={({ isActive }) =>
//                     `px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${isActive ? "font-semibold text-red-500" : "text-gray-700 dark:text-gray-200"
//                     }`
//                   }
//                 >
//                   {item.label}
//                 </NavLink>
//               </li>
//             )
//           )}

//           {/* Dark Mode Toggle */}
//           <li>
//             <DarkModeToggle />
//           </li>

//           {/* Login/Logout */}
//           <li>
//             {user ? (
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
//               >
//                 Logout
//               </button>
//             ) : (
//               <NavLink
//                 to="/login"
//                 className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
//               >
//                 Login
//               </NavLink>
//             )}
//           </li>
//         </ul>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden">
//           <button onClick={() => setIsOpen(!isOpen)}>
//             {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <ul className="md:hidden bg-white dark:bg-gray-900 p-4 space-y-2 shadow-md">
//           {navItems.map((item, idx) =>
//             item.dropdown ? (
//               <li key={idx} className="space-y-1">
//                 {user ? (
//                   <button
//                     onClick={() => setIsProfileOpen(!isProfileOpen)}
//                     className="w-full flex items-center gap-2 text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium"
//                   >
//                     <img
//                       src={user.photoURL}
//                       alt="Profile"
//                       className="w-8 h-8 rounded-full border"
//                       referrerPolicy="no-referrer"
//                     />
//                     <span>{user.displayName || "My Profile"}</span>
//                   </button>
//                 ) : (
//                   <span className="px-4 py-2 text-gray-700 dark:text-gray-200">{item.label}</span>
//                 )}

//                 {isProfileOpen && user && (
//                   <ul className="pl-4 space-y-1">
//                     {item.dropdown.map((subItem) =>
//                       subItem.subDropdown ? (
//                         <li key={subItem.label}>
//                           <button className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
//                             {subItem.label}
//                           </button>
//                           <ul className="pl-4 space-y-1">
//                             {subItem.subDropdown.map((s) => (
//                               <li key={s.to}>
//                                 <NavLink
//                                   to={s.to}
//                                   onClick={() => setIsOpen(false)}
//                                   className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
//                                 >
//                                   {s.label}
//                                 </NavLink>
//                               </li>
//                             ))}
//                           </ul>
//                         </li>
//                       ) : (
//                         <li key={subItem.to}>
//                           <NavLink
//                             to={subItem.to}
//                             onClick={() => setIsOpen(false)}
//                             className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
//                           >
//                             {subItem.label}
//                           </NavLink>
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 )}
//               </li>
//             ) : (
//               <li key={item.to}>
//                 <Link
//                   to={item.to}
//                   onClick={() => setIsOpen(false)}
//                   className="block px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             )
//           )}

//           {/* Dark Mode Toggle */}
//           <li>
//             <DarkModeToggle />
//           </li>

//           {/* Login/Logout */}
//           <li>
//             {user ? (
//               <button
//                 onClick={() => {
//                   handleLogout();
//                   setIsOpen(false);
//                 }}
//                 className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg shadow-md transition duration-200"
//               >
//                 Logout
//               </button>
//             ) : (
//               <NavLink
//                 to="/login"
//                 onClick={() => setIsOpen(false)}
//                 className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md block text-center transition duration-200"
//               >
//                 Login
//               </NavLink>
//             )}
//           </li>
//         </ul>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


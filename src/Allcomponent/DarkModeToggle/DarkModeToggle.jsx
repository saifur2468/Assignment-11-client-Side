import React from "react";
import { useTheme } from "../ThemeContext/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="px-4 py-2 rounded-md border dark:border-black bg-gray-200 dark:bg-gray-700 text-black dark:text-white transition"
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
};

export default DarkModeToggle;

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  // Get initial theme from localStorage or system preference
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        return savedTheme;
      }

      // Check system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light"; // Default fallback
  };

  const [theme, setTheme] = useState(getInitialTheme());

  // Apply theme to HTML element
  useEffect(() => {
    const root = window.document.documentElement;

    // Clear any existing theme classes first
    root.classList.remove("dark");

    if (theme === "dark") {
      root.classList.add("dark");
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);

    // Log for debugging
    console.log("Theme set to:", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      console.log("Toggling theme from", prevTheme, "to", newTheme);
      return newTheme;
    });
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-lg hover:bg-surface-1 dark:hover:bg-surface-1-dark transition-colors cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 md:w-5 md:h-5" />
      ) : (
        <Sun className="w-4 h-4 md:w-5 md:h-5" />
      )}
    </button>
  );
};

export default DarkModeToggle;

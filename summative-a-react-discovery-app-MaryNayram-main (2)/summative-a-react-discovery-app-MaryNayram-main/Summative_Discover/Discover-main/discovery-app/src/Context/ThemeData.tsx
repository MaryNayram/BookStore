import { createContext, ReactNode, useEffect, useMemo, useState } from "react";

// Define Theme Modes
type ThemeMode = "light" | "dark";

// Define Props & Context Types
interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

// Create Theme Context
export const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
});

// Theme Provider Component
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const getPreferredTheme = (): ThemeMode => {
    const storedTheme = localStorage.getItem("theme") as ThemeMode | null;
    if (storedTheme) return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState<ThemeMode>(getPreferredTheme);

  // Toggle Theme Function
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  // Apply Theme to Document Root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Listen for System Theme Changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
  }, []);

  // Memoize Context Value
  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

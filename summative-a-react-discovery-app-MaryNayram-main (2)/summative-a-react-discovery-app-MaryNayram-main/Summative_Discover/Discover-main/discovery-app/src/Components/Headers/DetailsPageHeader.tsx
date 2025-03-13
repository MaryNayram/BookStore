import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animations";
import { useContext } from "react";
import { ThemeContext } from "../../Context/ThemeProvider";
import { IoMoonSharp } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function DetailsPageHeader() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md py-4">
      <nav className="container flex justify-between items-center">
        {/* Home Button */}
        <NavLink
          to="/"
          className="font-bold text-lg px-4 py-2 bg-primary text-white rounded-lg transition-transform duration-200 hover:scale-105"
        >
          Home
        </NavLink>

        {/* Theme Toggle Button */}
        <motion.button
          variants={fadeIn(0.4)}
          initial="hidden"
          animate="show"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === "dark" ? <FiSun size={26} className="text-yellow-400" /> : <IoMoonSharp size={26} className="text-gray-800" />}
        </motion.button>
      </nav>
    </header>
  );
}

import { useContext, useState, RefObject } from "react";
import logo from "../../assets/book.png";
import { IoMoonSharp } from "react-icons/io5";
import { FiSun } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { AnimatePresence, motion } from "framer-motion";
import { fadeIn } from "../../utils/animations";
import { ThemeContext } from "../../Context/ThemeProvider";
import { NavLink } from "react-router-dom";

// Define Navigation Links
const navLinks = [
  { name: "Home", route: "/", label: "home" },
  { name: "Authors", route: "/authors", label: "authors" },
  { name: "Discover", route: "/discover", label: "bookSection" },
  { name: "Library", route: "/library", label: "library" },
] as const;

type RefProps = {
  refs: {
    home: RefObject<HTMLDivElement | null>;
    authors: RefObject<HTMLDivElement | null>;
    bookSection: RefObject<HTMLDivElement | null>;
    library: RefObject<HTMLDivElement | null>;
  };
};

export default function Header({ refs }: RefProps) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (label: keyof RefProps["refs"]) => {
    const elementRef = refs[label];
    if (elementRef?.current) {
      window.scrollTo({ top: elementRef.current.offsetTop - 50, behavior: "smooth" });
    }
    setMenuOpen(false);
  };

  return (
    <header className="shadow-md bg-white dark:bg-gray-900">
      <nav className="container flex justify-between items-center py-5">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
          <img className="h-10" src={logo} alt="Book Hub Logo" />
          <p className="text-xl font-bold text-primary dark:text-white">Discover</p>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-8 font-medium">
            {navLinks.map(({ name, route, label }, index) => (
              <motion.li key={route} variants={fadeIn(0.2 * index)} initial="hidden" animate="show">
                <NavLink
                  to={route}
                  onClick={() => scrollToSection(label)}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition duration-300 ${
                      isActive ? "bg-primary text-white" : "hover:text-accent dark:hover:text-accent-light"
                    }`
                  }
                  aria-label={`Navigate to ${name}`}
                >
                  {name}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Theme Toggle Button */}
        <motion.button
          variants={fadeIn(1)}
          initial="hidden"
          animate="show"
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === "dark" ? <FiSun size={26} className="text-yellow-400" /> : <IoMoonSharp size={26} className="text-gray-800" />}
        </motion.button>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <RxHamburgerMenu onClick={() => setMenuOpen((prev) => !prev)} className="text-4xl cursor-pointer text-primary dark:text-white" />
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -100 }}
                className="absolute top-20 left-0 w-full bg-white dark:bg-gray-900 shadow-lg rounded-b-2xl z-10"
              >
                <ul className="flex flex-col items-center gap-6 py-6 font-medium">
                  {navLinks.map(({ name, route, label }) => (
                    <li key={route} onClick={() => scrollToSection(label)}>
                      <NavLink
                        to={route}
                        className={({ isActive }) =>
                          `block px-6 py-3 rounded-lg transition duration-300 ${
                            isActive ? "bg-primary text-white" : "hover:text-accent dark:hover:text-accent-light"
                          }`
                        }
                        aria-label={`Navigate to ${name}`}
                      >
                        {name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </header>
  );
}

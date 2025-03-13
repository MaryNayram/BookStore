import { useContext, useEffect } from "react";
import { Themes } from "./Context/ThemeData";
import Header from "./Components/Headers/Header";
import HomePage from "./Components/HomePage";
import AuthorsComponent from "./Components/AuthorsComponent";
import BooksSection from "./Components/BooksSection";
import Library from "./Components/Library";
import Footer from "./Components/Footer";
import ScrollToTop from "react-scroll-to-top";
import { FaArrowUp } from "react-icons/fa";

function App() {
  const { theme } = useContext(Themes);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <>
      <Header />
      <main>
        <HomePage />
        <AuthorsComponent />
        <BooksSection />
        <Library />
      </main>
      <ScrollToTop
        smooth
        className="scrollToTop"
        style={{ backgroundColor: "var(--highlight)" }}
        component={<FaArrowUp className="animate-arrow" style={{ fontSize: "20px", color: "white" }} />}
      />
      <Footer />
    </>
  );
}

export default App;

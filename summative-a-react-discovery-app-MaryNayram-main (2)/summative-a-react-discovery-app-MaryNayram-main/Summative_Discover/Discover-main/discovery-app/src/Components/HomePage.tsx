import { motion } from "framer-motion";
import { fadeIn, slideRight } from "../utils/animations";
import Lottie from "lottie-react";
import animationData from "../assets/animation.json";
import { IoIosCall } from "react-icons/io";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <section className="bg-background py-12">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[600px] px-8 mx-auto">
        {/* Left Content */}
        <div className="flex flex-col justify-center py-12 md:py-0">
          <div className="text-center md:text-left space-y-6">
            <motion.h1
              className="text-5xl lg:text-6xl font-bold leading-relaxed text-primary"
              variants={slideRight(0.5)}
              initial="hidden"
              animate="visible"
            >
              Never wonder what to <span className="text-accent">read📖 next!</span>  
              Uncover the mystery here.
            </motion.h1>

            <motion.p
              variants={slideRight(0.8)}
              initial="hidden"
              animate="visible"
              className="text-lg xl:max-w-[500px] text-secondary"
            >
              Welcome to <span className="font-semibold">Discover</span>, your go-to destination for books 
              that inspire, educate, and entertain. We've got you covered!
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={fadeIn(1)}
              initial="hidden"
              animate="visible"
              className="flex justify-center md:justify-start items-center gap-6 mt-7"
            >
              <button
                className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:bg-accent"
                aria-label="Explore books"
              >
                Explore Books
              </button>

              <Link
                to="/contact"
                className="flex items-center gap-2 text-primary font-bold transition-all duration-300 hover:text-accent"
                aria-label="Contact us"
              >
                <IoIosCall size={28} /> Contact Us
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Right Animation */}
        <div className="flex justify-center items-center">
          <motion.div variants={fadeIn(1.2)} initial="hidden" animate="visible">
            <Lottie animationData={animationData} loop className="h-[420px] w-[420px]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

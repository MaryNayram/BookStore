import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Author } from "../utils/books";

export default function AuthorsComponent() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch authors from API
  const fetchAuthors = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/authors/");
      if (!response.ok) throw new Error("Failed to fetch authors");
      const data = await response.json();
      setAuthors(data);
    } catch (error) {
      console.error("Error fetching authors:", error);
      setAuthors([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Infinite Scrolling Logic
  useEffect(() => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const speed = 1;
    const scrollStep = () => {
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
        scrollAmount = 0;
      } else {
        scrollContainer.scrollLeft += speed;
        scrollAmount += speed;
      }
    };

    const interval = setInterval(scrollStep, 30);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 text-lg">Loading authors...</p>;
  }

  if (!authors.length) {
    return <p className="text-center text-red-500 text-lg">No authors found.</p>;
  }

  return (
    <section className="py-14 mb-10">
      <div className="container">
        {/* Section Title */}
        <div className="text-left mb-10 max-w-lg">
          <h1 className="text-5xl font-bold text-primary">Look out for Popular Authors</h1>
        </div>

        {/* Scrolling Carousel */}
        <div ref={carouselRef} className="flex overflow-x-auto no-scrollbar whitespace-nowrap">
          {authors.concat(authors).map(({ image, bio, name }, index) => (
            <div key={index} className="inline-block mx-4">
              <div className="authors-card flex flex-col gap-4 p-8 shadow-lg rounded-xl w-80 bg-white dark:bg-gray-800">
                {/* Author Info */}
                <div className="flex items-center gap-5">
                  <img
                    src={image}
                    alt={`Profile of ${name}`}
                    className="rounded-full w-20 h-20 object-cover shadow-md"
                  />
                  <div>
                    <p className="text-xl font-bold text-accent">{name}</p>
                  </div>
                </div>

                {/* Author Bio */}
                <div className="py-6 space-y-4">
                  <p className="text-lg text-gray-600 dark:text-gray-300">{bio}</p>
                  {/* Dynamic Star Rating */}
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={20} className="text-yellow-500" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

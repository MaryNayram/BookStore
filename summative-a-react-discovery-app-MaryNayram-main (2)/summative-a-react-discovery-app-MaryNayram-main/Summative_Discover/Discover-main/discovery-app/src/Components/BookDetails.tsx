import { FaCartArrowDown } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook, removeBook } from "../ReduxStore/librarySlice";
import DetailsPageHeader from "./Headers/DetailsPageHeader";
import { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../Context/ThemeProvider";
import { BookStructure } from "../utils/books";

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const [book, setBook] = useState<BookStructure | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch the specific book by ID
  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/books/${id}`);
      if (!response.ok) throw new Error("Book not found");
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book:", error);
      setBook(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600 text-lg">Loading book details...</div>;
  }

  if (!book) {
    return <div className="text-center text-red-500 text-lg">Book not found.</div>;
  }

  const { image, summary, author, title, id: bookId, publishedDate } = book;

  return (
    <section className="book-details">
      <DetailsPageHeader />
      <div className="flex flex-col my-10 md:flex-row p-6 md:p-12 max-w-4xl mx-8 sm:mx-6 md:mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {/* Book Image */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <img src={image} alt={title} className="w-72 rounded-lg shadow-md" />
        </div>

        {/* Book Details */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-around">
          <p className="text-accent font-bold uppercase tracking-widest">
            <span className="text-black dark:text-white">Author:</span> {author}
          </p>
          <p className="text-accent font-bold uppercase tracking-widest">
            <span className="text-black dark:text-white">Published Date:</span> {publishedDate}
          </p>
          <h1 className="text-3xl font-bold my-2 text-gray-900 dark:text-white">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300">{summary.split(" ").slice(0, 20).join(" ")}...</p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-6">
            <button
              onClick={() => dispatch(addBook(book))}
              className="flex items-center space-x-2 bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark transition-transform duration-200 hover:scale-105"
              aria-label="Add book to library"
            >
              <FaCartArrowDown size={20} />
              <span>Add to Library</span>
            </button>

            <button
              onClick={() => dispatch(removeBook(bookId))}
              className="flex items-center space-x-2 bg-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-transform duration-200 hover:scale-105"
              aria-label="Remove book from library"
            >
              <span>Remove Book</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

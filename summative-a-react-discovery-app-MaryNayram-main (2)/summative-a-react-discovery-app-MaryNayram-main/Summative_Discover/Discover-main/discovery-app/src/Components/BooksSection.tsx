import { useSelector, useDispatch } from "react-redux";
import BooksHeader from "./Headers/BooksHeader";
import { AppDispatch, RootState } from "../ReduxStore/store";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { fetchBooksCollection } from "../ReduxStore/bookSlice";

export default function BooksSection() {
  const dispatch = useDispatch<AppDispatch>();

  const { specificType, typeSelected, books } = useSelector((state: RootState) => ({
    specificType: state.books.specificType,
    typeSelected: state.books.typeSelected,
    books: state.books.books,
  }));

  useEffect(() => {
    dispatch(fetchBooksCollection({ category: typeSelected, specificType }));
  }, [dispatch, typeSelected, specificType]);

  return (
    <div className="min-h-screen p-10 container">
      <BooksHeader />

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
        {books.length > 0 ? (
          books.map(({ title, image, id }) => (
            <Link key={id} to={`/discover/${id}`} className="group">
              <div className="relative h-56 rounded-lg flex items-center justify-center overflow-hidden shadow-lg transition-transform duration-300 transform group-hover:scale-105">
                <img src={image} alt={title} className="object-contain absolute inset-0 h-full w-full rounded-lg" />
              </div>
              <h2 className="mt-3 text-lg font-semibold text-center text-gray-900 transition-colors duration-300 group-hover:text-primary">
                {title}
              </h2>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-600 text-lg col-span-full">No books found.</p>
        )}
      </div>
    </div>
  );
}

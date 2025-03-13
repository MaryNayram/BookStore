import { useSelector } from "react-redux";
import { RootState } from "../ReduxStore/store";
import Lottie from "lottie-react";
import EmptyLibraryAnimation from "../assets/empty.json";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Library() {
  const libraryBooks = useSelector((state: RootState) => state.library.books);

  return (
    <section className="px-8 md:px-20 py-12">
      <h1 className="text-5xl font-bold text-primary mb-8">Personal Library</h1>

      {libraryBooks.length > 0 ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          navigation
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
            1180: { slidesPerView: 3 },
          }}
          modules={[Pagination, Navigation]}
          className="library-swiper"
        >
          {libraryBooks.map(({ id, image, title }) => (
            <SwiperSlide key={id}>
              <div className="flex flex-col items-center">
                <Link to={`/discover/${id}`} aria-label={`View details for ${title}`}>
                  <img
                    src={image}
                    alt={title}
                    className="md:min-w-[200px] min-w-[150px] max-h-[200px] object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
                  />
                  <p className="text-gray-900 font-semibold mt-2 text-center book-title">
                    {title}
                  </p>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex justify-center">
          <Lottie
            animationData={EmptyLibraryAnimation}
            loop
            className="h-[350px] w-[350px]"
            aria-label="No books in your library"
          />
        </div>
      )}
    </section>
  );
}

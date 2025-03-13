import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../ReduxStore/store";
import { changeNavLinkSelected, changeOptionSelected, fetchBooksCollection } from "../../ReduxStore/bookSlice";
import { IoMdArrowDropdown } from "react-icons/io";

// Define Select Options
const selectOptions = [
  { identifier: "discover", name: "Discover" },
  { identifier: "genres", name: "Genres" },
] as const;

// Define Collection Data
const collection = {
  genres: ["Self-help", "Religion", "Fiction", "Romance", "Poetry"],
  discover: ["Best Seller", "Trending", "New Release", "Popular"],
} as const;

export default function BooksHeader() {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedOption, selectedNav } = useSelector((state: RootState) => ({
    selectedOption: state.books.typeSelected,
    selectedNav: state.books.specificType,
  }));

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value as keyof typeof collection;
    const firstSpecificType = collection[category][0];

    dispatch(changeOptionSelected(category));
    dispatch(changeNavLinkSelected(firstSpecificType));
    dispatch(fetchBooksCollection({ category, specificType: firstSpecificType }));
  };

  return (
    <div className="pb-8">
      <nav className="flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
        {/* Category Selector */}
        <div className="relative w-full md:w-auto">
          <select
            className="w-full md:w-[160px] h-[50px] outline-none border-0 appearance-none text-xl md:text-2xl text-white bg-primary rounded-lg pr-7 pl-4"
            onChange={handleSelectChange}
            value={selectedOption}
          >
            {selectOptions.map(({ name, identifier }) => (
              <option key={identifier} value={identifier} className="bg-white text-primary hover:bg-gray-600">
                {name}
              </option>
            ))}
          </select>
          <IoMdArrowDropdown size={30} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white pointer-events-none" />
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap md:flex-nowrap gap-6">
          {collection[selectedOption].map((name) => (
            <li key={name}>
              <button
                className={`transition font-Kumbh hover:text-accent ${
                  selectedNav === name ? "isActiveBtn" : ""
                }`}
                onClick={() => {
                  dispatch(changeNavLinkSelected(name));
                  dispatch(fetchBooksCollection({ category: selectedOption, specificType: name }));
                }}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-2 border-b-2 border-gray-500 w-full" />
    </div>
  );
}

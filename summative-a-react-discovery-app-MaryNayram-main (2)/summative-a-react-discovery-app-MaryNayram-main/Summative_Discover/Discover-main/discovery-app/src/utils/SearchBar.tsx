import { CiSearch } from "react-icons/ci";
import { useRef, useState } from "react";

interface SearchProps {
  activateSearchFn: (value: string) => void;
}

export default function SearchBar({ activateSearchFn }: SearchProps) {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleSearch() {
    if (searchTerm.trim() === "") return;
    activateSearchFn(searchTerm);
    setIsInputVisible(false);
  }

  function toggleSearch() {
    setIsInputVisible(!isInputVisible);
    if (inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }

  function handleEnterKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full shadow-md">
      <input
        ref={inputRef}
        type="text"
        className={`transition-all duration-300 ease-in-out px-3 py-1 bg-transparent border-none outline-none flex-grow ${
          isInputVisible ? "w-48 opacity-100" : "w-0 opacity-0"
        }`}
        placeholder="Search books..."
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleEnterKey}
      />
      <CiSearch
        size={24}
        className="cursor-pointer text-gray-600 hover:text-black transition-colors"
        onClick={toggleSearch}
      />
    </div>
  );
}

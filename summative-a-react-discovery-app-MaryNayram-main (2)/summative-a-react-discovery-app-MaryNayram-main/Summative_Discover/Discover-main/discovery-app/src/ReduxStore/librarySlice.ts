import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookStructure } from "../utils/books";
import Swal from "sweetalert2";

// Local Storage Utility
const StorageService = {
  getBooks(): BookStructure[] {
    try {
      const storedBooks = localStorage.getItem("libraryBooks");
      return storedBooks ? JSON.parse(storedBooks) : [];
    } catch (error) {
      console.error("Failed to load library from storage:", error);
      return [];
    }
  },
  saveBooks(books: BookStructure[]) {
    try {
      localStorage.setItem("libraryBooks", JSON.stringify(books));
    } catch (error) {
      console.error("Failed to save library to storage:", error);
    }
  },
};

// Initial State
interface LibraryState {
  books: BookStructure[];
}

const initialState: LibraryState = {
  books: StorageService.getBooks(),
};

// Common Swal Alert Function
const showAlert = (message: string, icon: "success" | "error") => {
  Swal.fire({
    position: "center",
    icon,
    title: message,
    showConfirmButton: false,
    timer: 1500,
  });
};

// Redux Slice
const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    addBook(state, action: PayloadAction<BookStructure>) {
      const book = action.payload;
      const isExisting = state.books.some((item) => item.id === book.id);

      if (!isExisting) {
        state.books.push(book);
        StorageService.saveBooks(state.books);
        showAlert("Book successfully added to your Library", "success");
      } else {
        showAlert("Book already in your Library", "error");
      }
    },
    removeBook(state, action: PayloadAction<number>) {
      state.books = state.books.filter((book) => book.id !== action.payload);
      StorageService.saveBooks(state.books);
      showAlert("Book successfully removed from library", "success");
    },
  },
});

// Export Actions & Reducer
export const { addBook, removeBook } = librarySlice.actions;
export default librarySlice.reducer;

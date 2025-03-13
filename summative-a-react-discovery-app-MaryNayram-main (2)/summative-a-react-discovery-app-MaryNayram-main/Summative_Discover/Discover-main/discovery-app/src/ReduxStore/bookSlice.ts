import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BookStructure } from "../utils/books";

interface FetchBooksParams {
  category: string;
  specificType: string;
}

// Reusable API Fetch Function
const fetchBooksFromAPI = async ({ category, specificType }: FetchBooksParams) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/books?category=${encodeURIComponent(category)}&specificType=${encodeURIComponent(specificType)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch books. Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

// Async Thunk for Fetching Books
export const loadBooks = createAsyncThunk("books/fetchCollection", fetchBooksFromAPI);

interface BookState {
  books: BookStructure[];
  selectedCategory: string;
  selectedType: string;
  status: "idle" | "loading" | "failed";
  error?: string;
}

const initialState: BookState = {
  books: [],
  selectedCategory: "genres",
  selectedType: "Self-help",
  status: "idle",
};

const bookSlice = createSlice({
  name: "bookSelection",
  initialState,
  reducers: {
    updateCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload;
    },
    updateType(state, action: PayloadAction<string>) {
      state.selectedType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadBooks.fulfilled, (state, action: PayloadAction<BookStructure[]>) => {
        state.books = action.payload;
        state.status = "idle";
      })
      .addCase(loadBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateCategory, updateType } = bookSlice.actions;
export default bookSlice.reducer;

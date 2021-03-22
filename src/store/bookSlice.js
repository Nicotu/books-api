import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (details) => {
    const { pageNumber, filter } = { ...details };

    console.log(filter);

    const requestBody = {
      page: pageNumber,
      itemsPerPage: 20,
      filters: filter || [],
    };

    const response = await fetch("http://nyx.vima.ekt.gr:3000/api/books/", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ ...requestBody }),
    });

    if (response.ok) {
      return response.json();
    }
  }
);

export const bookDataSlice = createSlice({
  name: "bookData",

  initialState: {
    books: [],
    results: [],
    totalPages: 0,
    pageLimit: 20,
    status: "idle",
    error: null,
    currentPage: 1,
  },

  reducers: {
    updateList: (state, action) => {
      return { ...state, results: action.payload };
    },

    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },

    updatePagination: (state, action) => {
      const total = Math.ceil(action.payload / state.pageLimit);

      state.totalPages = total;
    },
  },

  extraReducers: {
    [fetchBooks.pending]: (state, action) => {
      state.status = "loading";
    },

    [fetchBooks.fulfilled]: (state, action) => {
      console.log(action.payload);

      state.status = "succeeded";
      state.books = action.payload.books;
      state.totalPages = Math.ceil(action.payload.count / state.pageLimit);
      state.results = state.books;
    },

    [fetchBooks.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const { updateCurrentPage } = bookDataSlice.actions;

export const selectResults = (state) => state.bookData.results;
export const selectBooks = (state) => state.bookData.books;

export default bookDataSlice.reducer;

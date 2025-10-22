import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  articles: [],
  error: null,
  articleDetail: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    getArticleStart: (state) => {
      state.isLoading = true;
    },
    getArticleSuccess: (state, action) => {
      state.isLoading = false;
      state.articles = action.payload;
    },
    getArticleFailure: (state, action) => {
      state.error = action.payload;
    },
    getArticleDetailStart: (state) => {
      state.isLoading = true;
    },
    getArticleDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.articleDetail = action.payload;
    },

    getArticleDetailFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  getArticleStart,
  getArticleSuccess,
  getArticleDetailStart,
  getArticleDetailSuccess,
  getArticleDetailFailure,
} = articleSlice.actions;

export default articleSlice.reducer;

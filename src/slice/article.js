import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  articles: [],
  articleDetail: null,
  error: null,
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
      state.error = null;
    },
    getArticleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getArticleDetailStart: (state) => {
      state.isLoading = true;
    },
    getArticleDetailSuccess: (state, action) => {
      state.isLoading = false;
      state.articleDetail = action.payload;
      state.error = null;
    },
    getArticleDetailFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.articleDetail = null;
    },
  },
});

export const {
  getArticleStart,
  getArticleSuccess,
  getArticleFailure,
  getArticleDetailStart,
  getArticleDetailSuccess,
  getArticleDetailFailure,
} = articleSlice.actions;

export default articleSlice.reducer;

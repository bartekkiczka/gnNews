import { RootState } from './store';
import { NewsViewModes } from '../enums/NewsViewModes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle } from '../types/newsRequest';

interface NewsState {
  newsViewMode: string;
  articles: NewsArticle[];
}

const initialState: NewsState = {
  newsViewMode: NewsViewModes.LIST,
  articles: [],
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    changeNewsView: (state, action: PayloadAction<string>) => {
      state.newsViewMode = action.payload;
    },
    setArticles: (state, action: PayloadAction<NewsArticle[]>) => {
      state.articles = action.payload;
    },
  },
});

export const { changeNewsView, setArticles } = newsSlice.actions;

export const selectNews = (state: RootState) => state.news.newsViewMode;

export default newsSlice.reducer;

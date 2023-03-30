import { NewsRequestType } from './../../types/newsRequest';
import api from '../api';

export const getCountryNews = async (country = 'pl') => {
  return await api.get<NewsRequestType>(`/v2/top-headlines?country=${country}`);
};

import NewsListView from './NewsListView/NewsListView';
import NewsTilesView from './NewsTilesView/NewsTilesView';
import Loader from '../../Loader';
import ArticlePopup from './ArticlePopup/ArticlePopup';
import { useState, useEffect, useCallback } from 'react';
import { getCountryNews } from '../../../api/services/newsService';
import { useParams } from 'react-router';
import { Countries } from '../../../helpers/Countries';
import { NewsArticle } from '../../../types/newsRequest';
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks';
import { NewsViewModes } from '../../../enums/NewsViewModes';
import { RootState } from '../../../store/store';
import { setArticles } from '../../../store/news';
import './news.scss';

const News = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [showArticlePopup, setShowArticlePopup] = useState<boolean>(false);
  const [articleToShow, setArticleToShow] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const newsViewModeState = useAppSelector(
    (state: RootState) => state.news.newsViewMode
  );
  const dispatch = useAppDispatch();
  const params = useParams();

  const handleShowArticlePopup = (article: NewsArticle) => {
    setShowArticlePopup(true);
    setArticleToShow(article);
  };

  const fetchCountryNews = useCallback(async () => {
    if (!params.country) return;
    setIsLoading(true);
    const countryValue: string | undefined = Countries.find(
      (country) => country.name === params.country
    )?.value;
    const { data } = await getCountryNews(countryValue);
    setNews(data?.articles || []);
    dispatch(setArticles(data.articles));
    setIsLoading(false);
  }, [params.country, dispatch]);

  useEffect(() => {
    fetchCountryNews();
  }, [fetchCountryNews]);

  return (
    <div className="news" data-testid="news">
      {isLoading && <Loader data-testid="loader" />}
      {newsViewModeState === NewsViewModes.LIST ? (
        <NewsListView
          {...{ news, handleShowArticlePopup }}
          data-testid="news-list-view"
        />
      ) : (
        <NewsTilesView
          {...{ news, handleShowArticlePopup }}
          data-testid="news-tiles-view"
        />
      )}

      <ArticlePopup
        article={articleToShow}
        showArticlePopup={showArticlePopup}
        setShowArticlePopup={setShowArticlePopup}
        data-testid="article-popup"
      />
    </div>
  );
};

export default News;

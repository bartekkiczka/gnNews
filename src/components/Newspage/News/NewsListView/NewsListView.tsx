import { NewsArticle } from '../../../../types/newsRequest';
import './newsListView.scss';

interface Props {
  news: NewsArticle[];
  handleShowArticlePopup: (article: NewsArticle) => void;
}

const NewsListView = ({ news, handleShowArticlePopup }: Props) => {
  return (
    <div className="news-list">
      {news.map((article: NewsArticle, index: number) => {
        return (
          <div
            className="news-list__item"
            key={index}
            onClick={() => handleShowArticlePopup(article)}
            data-testid="handleShowArticlePopup"
          >
            <div className="news-list__item-heading">
              <p>{article.source.name}</p>
              <p>{article.publishedAt.slice(0, 10)}</p>
            </div>
            <p>{article.title}</p>
          </div>
        );
      })}
    </div>
  );
};

export default NewsListView;

import { NewsArticle } from '../../../../types/newsRequest';
import { useTranslation } from 'react-i18next';
import './newsTilesView.scss';

interface Props {
  news: NewsArticle[];
  handleShowArticlePopup: (article: NewsArticle) => void;
}

const NewsTilesView = ({ news, handleShowArticlePopup }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="news-tiles" data-testid="news-tiles">
      {news.map((article: NewsArticle, index: number) => {
        return (
          <div className="news-tiles__item" role="listitem" key={index}>
            <div
              className="news-tiles__item-image"
              onClick={() => handleShowArticlePopup(article)}
              data-testid="handleShowArticlePopup"
            >
              <img
                src={
                  article.urlToImage !== null
                    ? article.urlToImage
                    : '/no-image.png'
                }
                width={300}
                height={'auto'}
                alt="news"
              />
            </div>
            <div className="news-tiles__item-content">
              <div className="news-tiles__item-heading">
                <p>{article.source.name}</p>
                <p>{article.publishedAt.slice(0, 10)}</p>
              </div>
              <p
                className="news-tiles__item-title"
                onClick={() => handleShowArticlePopup(article)}
                data-testid="handleShowArticlePopup"
              >
                {article.title}
              </p>
              <p className="news-tiles__item-description">
                {article.description !== null
                  ? article.description
                  : t('news.teaserUnavailable')}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsTilesView;

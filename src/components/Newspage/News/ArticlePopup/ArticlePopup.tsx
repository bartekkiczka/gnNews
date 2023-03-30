import { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { NewsArticle } from '../../../../types/newsRequest';
import './articlePopup.scss';

interface Props {
  article: NewsArticle | null;
  showArticlePopup: boolean;
  setShowArticlePopup: Dispatch<SetStateAction<boolean>>;
}

const ArticlePopup = ({
  article,
  showArticlePopup,
  setShowArticlePopup,
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={`article-overlay ${
        !showArticlePopup ? `article-overlay-disabled` : ``
      }`}
      data-testid="article-popup"
    >
      <div className={`article ${!showArticlePopup ? `article-disabled` : ``}`}>
        <div
          className="article__cross"
          onClick={() => setShowArticlePopup(false)}
        ></div>
        <div className="article__heading">
          <p className="article__author">{article?.author}</p>
          <p className="article__link">
            <a href={article?.url} target="_blank" rel="noreferrer">
              {t('article.source')}
            </a>
          </p>
        </div>
        <p className="article__content">
          {article?.content !== null
            ? article?.content
            : t('article.contentUnavailable')}
        </p>
      </div>
    </div>
  );
};

export default ArticlePopup;

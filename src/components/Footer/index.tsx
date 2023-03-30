import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import { RootState } from '../../store/store';
import { useTranslation } from 'react-i18next';
import './footer.scss';

const Footer = () => {
  const [time, setTime] = useState(new Date());
  const articlesState = useAppSelector(
    (state: RootState) => state.news.articles
  );
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="footer">
      <div className="footer__time">
        {time.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </div>
      <div className="footer__articles">
        {t('footer.displayedArticles')}: <strong>{articlesState.length}</strong>
      </div>
    </div>
  );
};

export default Footer;

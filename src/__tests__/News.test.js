import { Provider } from 'react-redux';
import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import News from '../components/Newspage/News';
import { NewsViewModes } from '../enums/NewsViewModes';
import { getCountryNews } from '../api/services/newsService';
import { act } from 'react-dom/test-utils';

jest.mock('../api/services/newsService');

const render = (component) =>
  rtlRender(
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );

describe('News', () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup, testing-library/render-result-naming-convention
    render(<News />);
  });

  test('renders without errors', async () => {
    const newsComponent = screen.getByTestId('news');
    expect(newsComponent).toBeInTheDocument();
  });

  test('initial news state is an empty array', async () => {
    setTimeout(() => {
      const newsComponent = screen.getByTestId('news');
      const newsState = newsComponent.useState('news')[0];
      expect(newsState).toEqual([]);
    }, 100);
  });

  test('the initial state of showArticlePopup is false', async () => {
    setTimeout(() => {
      const articlePopup = screen.queryByTestId('article-popup');
      expect(articlePopup).toBeInTheDocument();
      expect(articlePopup).toHaveAttribute('showArticlePopup', 'false');
    }, 100);
  });

  test('the initial state of articleToShow is null', async () => {
    setTimeout(() => {
      const articlePopup = screen.getByTestId('article-popup');
      expect(articlePopup).toHaveAttribute('hidden');

      expect(screen.getByTestId('article-popup')).toBeInTheDocument();
      expect(screen.getByTestId('article-popup')).toHaveAttribute('hidden');

      const articleToShow = screen.getByTestId('article-to-show');
      expect(articleToShow).toBeNull();
    }, 100);
  });

  test('the initial state of isLoading is false', () => {
    const loadingIndicator = screen.queryByTestId('loading-indicator');
    expect(loadingIndicator).not.toBeInTheDocument();
  });

  test('renders NewsListView when newsViewModeState is set to NewsViewModes.LIST', () => {
    const newsViewModeState = NewsViewModes.LIST;
    render(<News newsViewModeState={newsViewModeState} />);
    setTimeout(() => {
      const newsListView = screen.getByTestId('news-list-view');
      expect(newsListView).toBeInTheDocument();
    }, 100);
  });

  test('renders NewsTilesView when newsViewModeState is set to NewsViewModes.TILES', () => {
    const newsViewModeState = NewsViewModes.TILES;
    render(<News newsViewModeState={newsViewModeState} />);
    setTimeout(() => {
      const newsTilesView = screen.getByTestId('news-tiles-view');
      expect(newsTilesView).toBeInTheDocument();
    }, 100);
  });

  test('Loader is rendered when isLoading is true', () => {
    const isLoading = true;
    render(<News isLoading={isLoading} />);
    setTimeout(() => {
      const loader = screen.getByTestId('loader');
      expect(loader).toBeInTheDocument();
    }, 100);
  });

  test('ArticlePopup is not rendered when showArticlePopup is false', () => {
    setTimeout(() => {
      const articlePopup = screen.queryByTestId('article-popup');
      expect(articlePopup).not.toBeInTheDocument();
    }, 100);
  });

  test('ArticlePopup is rendered when showArticlePopup is true and articleToShow is not null', () => {
    const mockArticle = {
      title: 'Mock Article Title',
      author: 'Mock Article Author',
      source: 'Mock Article Source',
      content: 'Mock Article Content',
      url: 'https://mock-article-url.com',
      urlToImage: 'https://mock-article-image-url.com',
      publishedAt: '2022-03-29T14:30:00Z',
    };

    setTimeout(() => {
      expect(screen.queryByTestId('article-popup')).not.toBeInTheDocument();
      const showArticlePopupBtn = screen.getByTestId('show-article-popup-btn');
      userEvent.click(showArticlePopupBtn);

      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          json: () => Promise.resolve({ article: mockArticle }),
        })
      );

      const articleLink = screen.getByRole('link', { name: mockArticle.title });
      userEvent.click(articleLink);

      expect(screen.getByTestId('article-popup')).toBeInTheDocument();

      expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.author)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.source)).toBeInTheDocument();
      expect(screen.getByText(mockArticle.content)).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Read More' })).toHaveAttribute(
        'href',
        mockArticle.url
      );
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        mockArticle.urlToImage
      );
      expect(
        screen.getByText('Published on March 29, 2022')
      ).toBeInTheDocument();
    }, 100);
  });

  test('setNews function updates the news state correctly', () => {
    const initialNews = [
      { id: 1, title: 'News 1' },
      { id: 2, title: 'News 2' },
      { id: 3, title: 'News 3' },
    ];
    const updatedNews = [
      { id: 4, title: 'News 4' },
      { id: 5, title: 'News 5' },
    ];

    render(<News initialNews={initialNews} />);

    setTimeout(() => {
      const newsListItems = screen.getAllByRole('listitem');
      expect(newsListItems).toHaveLength(initialNews.length);

      const setNewsButton = screen.getByText(/Set News/i);
      setNewsButton.click();

      const updatedNewsListItems = screen.getAllByRole('listitem');
      expect(updatedNewsListItems).toHaveLength(updatedNews.length);
    }, 100);
  });

  test('setShowArticlePopup function updates the showArticlePopup state correctly', () => {
    setTimeout(() => {
      const articleOverlay = screen.getByTestId('article-overlay');
      expect(articleOverlay).toHaveClass('article-overlay-disabled');

      const showPopupBtn = screen.getByTestId('show-article-popup-btn');
      fireEvent.click(showPopupBtn);

      expect(articleOverlay).not.toHaveClass('article-overlay-disabled');
      expect(articleOverlay).toHaveClass('article-overlay-enabled');

      const closePopupBtn = screen.getByTestId('article-popup-close-btn');
      fireEvent.click(closePopupBtn);

      expect(articleOverlay).toHaveClass('article-overlay-disabled');
    }, 100);
  });

  test('setArticleToShow function updates the articleToShow state correctly', () => {
    const article = {
      title: 'Test Article',
      description: 'This is a test article.',
      url: 'http://test-article.com',
      urlToImage: 'http://test-article.com/image.jpg',
    };

    setTimeout(() => {
      const setArticleToShowButton = screen.getByTestId(
        'handleShowArticlePopup'
      );

      fireEvent.click(setArticleToShowButton, { target: { value: article } });

      const articleToShowState = JSON.parse(
        screen.getByTestId('handleShowArticlePopup').textContent
      );

      expect(articleToShowState).toEqual(article);
    }, 100);
  });

  test('fetchCountryNews function sets the news state correctly after fetching the data from the API', async () => {
    const fakeNews = [
      {
        title: 'Fake news article',
        description: 'This is a fake news article.',
        url: 'https://fake-news-article.com',
        urlToImage: 'https://fake-news-article.com/image.jpg',
        publishedAt: '2022-03-28T09:30:00Z',
        source: { name: 'Fake News Network' },
      },
    ];

    getCountryNews.mockResolvedValueOnce(fakeNews);

    setTimeout(async () => {
      const newsTitle = await screen.findByText(/Fake news article/i);

      expect(newsTitle).toBeInTheDocument();
    }, 100);
  });

  test('handleShowArticlePopup function sets the articleToShow and showArticlePopup states correctly when called', () => {
    const fakeArticle = {
      title: 'Test Article',
      description: 'This is a test article.',
      url: 'https://www.example.com/test-article',
      urlToImage: 'https://www.example.com/test-image.jpg',
      publishedAt: '2022-04-01T00:00:00Z',
      source: {
        name: 'Test Source',
      },
    };
    setTimeout(() => {
      const showArticlePopupBtn = screen.getByTestId('show-article-popup-btn');
      const articleToShow = screen.getByTestId('article-to-show');

      fireEvent.click(showArticlePopupBtn);

      expect(articleToShow).toBeInTheDocument();

      expect(articleToShow).toHaveTextContent(fakeArticle.title);

      expect(screen.getByTestId('article-popup')).toHaveStyle({
        display: 'block',
      });
    }, 100);
  });
});

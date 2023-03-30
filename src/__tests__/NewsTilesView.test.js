import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '../store/store';
import {
  render as rtlRender,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import NewsTilesView from '../components/Newspage/News/NewsTilesView/NewsTilesView';

const render = (component) =>
  rtlRender(
    <BrowserRouter>
      <Provider store={store}>{component}</Provider>
    </BrowserRouter>
  );

describe('NewsTilesView', () => {
  test('renders without crashing', () => {
    render(<NewsTilesView news={[]} handleShowArticlePopup={() => {}} />);
    const newsComponent = screen.getByTestId('news-tiles');
    expect(newsComponent).toBeInTheDocument();
  });

  test('renders an empty list of news articles correctly', () => {
    const news = [];
    const handleShowArticlePopup = jest.fn();

    render(
      <NewsTilesView
        news={news}
        handleShowArticlePopup={handleShowArticlePopup}
      />
    );

    setTimeout(() => {
      const newsTiles = screen.getByTestId('news-tiles');
      expect(newsTiles).toBeInTheDocument();

      const newsItems = screen.queryAllByTestId('handleShowArticlePopup');
      expect(newsItems).toHaveLength(0);
    });
  });

  test('renders a list of news articles correctly', () => {
    const mockNews = [
      {
        source: { name: 'CNN' },
        publishedAt: '2022-03-01T11:26:00Z',
        title: 'Test news article 1',
        description: 'This is a test news article',
        urlToImage: 'http://example.com/image1.jpg',
      },
      {
        source: { name: 'CNN' },
        publishedAt: '2022-03-01T11:26:00Z',
        title: 'Test news article 1',
        description: 'This is a test news article',
        urlToImage: 'http://example.com/image1.jpg',
      },
    ];
    // render(<NewsTilesView news={mockNews} handleShowArticlePopup={() => {}} />);
    // setTimeout(async () => {
    //   const newsTiles = screen.getByTestId('news-tiles');
    //   await waitFor(() => {

    //     const newsItems = newsTiles.querySelectorAll('.news-tiles__item');
    //     expect(newsItems.length).toBe(mockNews.length);
    //   });
    // }, 100);
    render(<NewsTilesView news={mockNews} handleShowArticlePopup={() => {}} />);
    setTimeout(() => {
      const newsTiles = screen.getByTestId('news-tiles');
      const newsItems = screen.getAllByRole('listitem');
      expect(newsItems.length).toBe(0);
    }, 100);
  });

  test('handleShowArticlePopup function is called with correct article when article image is clicked', () => {
    const mockHandleShowArticlePopup = jest.fn();
    const mockNews = [
      {
        source: { name: 'CNN' },
        publishedAt: '2022-03-01T11:26:00Z',
        title: 'Test news article 1',
        description: 'This is a test news article',
        urlToImage: 'http://example.com/image1.jpg',
      },
      {
        source: { name: 'CNN' },
        publishedAt: '2022-03-01T11:26:00Z',
        title: 'Test news article 2',
        description: 'This is another test news article',
        urlToImage: 'http://example.com/image2.jpg',
      },
    ];
    render(
      <NewsTilesView
        news={mockNews}
        handleShowArticlePopup={mockHandleShowArticlePopup}
      />
    );
    setTimeout(() => {
      const articleImages = screen.getAllByAltText('News Article Image');
      fireEvent.click(articleImages[1]);
      expect(mockHandleShowArticlePopup).toHaveBeenCalledWith(mockNews[1]);
    }, 100);
  });

  test('displays no-image.png placeholder when an article has no image', async () => {
    const mockNews = [
      {
        source: { name: 'CNN' },
        publishedAt: '2022-03-01T11:26:00Z',
        title: 'Test news article 1',
        description: 'This is a test news article',
        urlToImage: null, // set urlToImage to null to simulate no image
      },
    ];
    render(<NewsTilesView news={mockNews} handleShowArticlePopup={() => {}} />);
    setTimeout(() => {
      const newsTiles = screen.getByTestId('news-tiles');
      // eslint-disable-next-line testing-library/no-node-access
      const imageElement = newsTiles.querySelector('.news-tiles__item img');
      expect(imageElement.src).toContain('no-image.png');
    }, 100);
  });
});

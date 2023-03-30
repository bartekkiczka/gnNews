import Footer from '../Footer';
import Header from '../Header';
import Navigation from '../Navigation';
import News from './News';
import './newspage.scss';

const Newspage = () => {
  return (
    <div className="Newspage">
      <Header />
      <div className="homepage__section">
        <Navigation />
        <News />
      </div>
      <Footer />
    </div>
  );
};

export default Newspage;

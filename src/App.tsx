import { Route, Routes, Navigate } from 'react-router';
import { RoutingPaths } from './enums/RoutingPaths';
import Newspage from './components/Newspage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to={'/country/poland'} />} />
      <Route path={RoutingPaths.HOME} element={<Newspage />} />
    </Routes>
  );
}

export default App;

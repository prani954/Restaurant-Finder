import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RestaurantList from '@/components/ui/RestaurantList';
import RestaurantDetail from '@/components/ui/RestaurantDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  );
}

export default App;

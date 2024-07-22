import Login from './pages/LoginPages/index'
import TodaySales from './component/contents/TodaySales';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

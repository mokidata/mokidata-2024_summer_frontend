import Login from './pages/LoginPages/index'
import TodaySales from './component/contents/TodaySales';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReportPage from './pages/ReportPages';

function App() {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/daily" element={<ReportPage page="daily" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import Login from './pages/LoginPages/index'
import TodaySales from './component/contents/TodaySales';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReportPage from './pages/ReportPages';
import { Provider } from 'react-redux';
import store from './app/store';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/daily" element={<ReportPage page="daily" />} />
          <Route path="/weekly" element={<ReportPage page="weekly" />} />
          
        </Routes>
      </Provider>
      
    </BrowserRouter>
  );
}

export default App;

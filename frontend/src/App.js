import Login from './pages/LoginPages/index'
import TodaySales from './component/contents/TodaySales';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReportPage from './pages/ReportPages';
import { Provider } from 'react-redux';
import { persistor,store } from './app/store';
import BestMenuDetail from './pages/ReportPages/BestMenuDetail';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/daily" element={<ReportPage page="daily" />} />
            <Route path="/weekly" element={<ReportPage page="weekly" />} />
            <Route path="/monthly" element={<ReportPage page="monthly" />} />
            <Route path="/bestmenu" element={<BestMenuDetail page="weekly" />} />
            
          </Routes>

        </PersistGate>
        
      </Provider>
      
    </BrowserRouter>
  );
}

export default App;

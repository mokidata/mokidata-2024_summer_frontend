import Login from './pages/ReportPages/ReportLogin'
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReportPage from './pages/ReportPages/ReportPage';
import { Provider } from 'react-redux';
import { persistor,store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import AdminLogin from './pages/AdminPages/AdminLogin';
import AdminIndex from './pages/AdminPages/AdminIndex';
import DetailPage from './pages/ReportPages/DetailPage';
import Home from './pages/Home';
import PointPage from './pages/PointPages/PointPage';
import PointDetails from './pages/PointPages/PointDetails';
import PONO from './pages/PointPages/PONO';
import { useEffect, useState } from 'react';

function App() {
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    const handleOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      if (isLandscape && !alertShown) {
        alert("가로 모드는 지원되지 않습니다. 세로 모드로 전환해주세요!");
        setAlertShown(true);
      } else if (!isLandscape) {
        setAlertShown(false);
      }
    };

    window.addEventListener("resize", handleOrientation);
    handleOrientation();

    return () => window.removeEventListener("resize", handleOrientation);
  }, [alertShown]);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/daily" element={<ReportPage page="daily" />} />
            <Route path="/weekly" element={<ReportPage page="weekly" />} />
            <Route path="/monthly" element={<ReportPage page="monthly" />} />
            <Route path='/detail' element={<DetailPage page="daily"/>}/>
            <Route path="/admin" element={<AdminLogin /> }></Route>
            <Route path="/admin/main" element={<AdminIndex/>}></Route>
            <Route path='/point/store_id/:store_id/phone_num/:phone_num' element={<PointPage />} />
            <Route path='/PONO' element={ <PONO /> } />
          </Routes>

        </PersistGate>
        
      </Provider>
      
    </BrowserRouter>
  );
}

export default App;

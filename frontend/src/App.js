import Login from './pages/LoginPages/index'
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReportPage from './pages/ReportPages';
import { Provider } from 'react-redux';
import { persistor,store } from './app/store';
import { PersistGate } from 'redux-persist/integration/react';
import AdminLogin from './pages/LoginPages/AdminLogin';
import AdminIndex from './pages/AdminPages/AdminIndex';
import { useEffect } from 'react';
import DetailPage from './pages/ReportPages/DetailPage';

function App() {
  function setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }
  useEffect(() => {
    setScreenSize();
  });

  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/daily" element={<ReportPage page="daily" />} />
            <Route path="/weekly" element={<ReportPage page="weekly" />} />
            <Route path="/monthly" element={<ReportPage page="monthly" />} />
            <Route path='/detail' element={<DetailPage page="daily"/>}/>
            <Route path="/admin" element={<AdminLogin /> }></Route>
            <Route path="/admin/main" element={<AdminIndex/>}></Route>
          </Routes>

        </PersistGate>
        
      </Provider>
      
    </BrowserRouter>
  );
}

export default App;

import {React, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './Redux/store';
import Navbar from './Students/Components/Layout/Navbar';
import './App.css';
import AppRoutes from './AppRoutes';


const App = () => {
 

  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<Layout />} />
      </Routes>
      <ToastContainer />

    </Router>
    </Provider>
  );
};

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isMentorRoute = location.pathname.startsWith('/mentor')

  return (
    <>
      {!isAdminRoute && !isMentorRoute && <Navbar />}
      <AppRoutes />
    </>
  );
};

export default App;

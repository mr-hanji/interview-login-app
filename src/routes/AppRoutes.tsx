import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import MainLayout from '../layout/MainLayoutProps';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
        <Route path="/home" element={
          <MainLayout>
            <Home />
          </MainLayout>
        } />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;

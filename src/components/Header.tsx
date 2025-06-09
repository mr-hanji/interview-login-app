import React from 'react';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = sessionStorage.getItem('isAuthenticated') === 'true';

  const handleAuthClick = () => {
    if (isAuthenticated) {
      sessionStorage.removeItem('isAuthenticated');
      navigate('/login');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <h1 className="text-xl font-bold">My App</h1>

        <Menu
          mode="horizontal"
          theme="dark"
          className="hidden md:flex !bg-transparent"
          items={[
            { key: 'home', label: <p>خانه</p> },
            { key: 'about', label: <p>درباره ما</p> },
          ]}
        />

        <Button type="primary" onClick={handleAuthClick}>
          خروج
        </Button>
      </div>
    </header>
  );
};

export default Header;

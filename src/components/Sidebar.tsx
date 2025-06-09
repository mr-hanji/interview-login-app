import React, { useState, useEffect } from 'react';
import { Menu, Button } from 'antd';
import {
  HomeOutlined,
  TeamOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024); // Tailwind's `lg` is 1024px
    };

    handleResize(); // Set on first render
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidthClass = isDesktop
    ? collapsed
      ? 'lg:w-20'
      : 'lg:w-60'
    : 'w-20'; // On mobile always w-20

  return (
    <div
      className={`bg-gray-800 text-white transition-all duration-300 ${sidebarWidthClass}`}
    >
      {/* Collapse button only visible on desktop */}
      {isDesktop && (
        <div className="p-2 text-center">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ color: 'white' }}
          />
        </div>
      )}

      <Menu
        theme="dark"
        mode="inline"
        className="!bg-gray-800"
        inlineCollapsed={isDesktop ? collapsed : true} // Always collapsed in mobile
        defaultSelectedKeys={['/']}
        items={[
          { key: '/', icon: <HomeOutlined />, label: <a href="/home">داشبورد</a> },
          { key: '/users', icon: <TeamOutlined />, label: <p>کاربران</p> },
          { key: '/reports', icon: <BarChartOutlined />, label: <p>گزارشات</p> },
          { key: '/settings', icon: <SettingOutlined />, label: <p>تنظیمات</p> },
        ]}
      />
    </div>
  );
};

export default Sidebar;

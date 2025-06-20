import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Typography } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  FormOutlined,
  AlertOutlined,
  SettingOutlined,
  BlockOutlined,
  CompassOutlined,
} from '@ant-design/icons';

// Import page components
import Home from './pages/Home';
import GeneralPage from './pages/GeneralPage';
import LayoutPage from './pages/LayoutPage';
import NavigationPage from './pages/NavigationPage';
import DataEntryPage from './pages/DataEntryPage';
import DataDisplayPage from './pages/DataDisplayPage';
import FeedbackPage from './pages/FeedbackPage';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/general',
      icon: <SettingOutlined />,
      label: 'General',
    },
    {
      key: '/layout',
      icon: <BlockOutlined />,
      label: 'Layout',
    },
    {
      key: '/navigation',
      icon: <CompassOutlined />,
      label: 'Navigation',
    },
    {
      key: '/data-entry',
      icon: <FormOutlined />,
      label: 'Data Entry',
    },
    {
      key: '/data-display',
      icon: <AppstoreOutlined />,
      label: 'Data Display',
    },
    {
      key: '/feedback',
      icon: <AlertOutlined />,
      label: 'Feedback',
    },
  ];

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        theme="light"
        width={260}
      >
        <div style={{ 
          padding: '20px 16px', 
          textAlign: 'center', 
          borderBottom: '1px solid var(--oracle-border)',
          background: 'var(--oracle-surface)'
        }}>
          <Title level={4} style={{ 
            margin: 0, 
            color: 'var(--oracle-primary)',
            fontSize: '18px', 
            fontWeight: 700,
            letterSpacing: '0.3px'
          }}>
            {collapsed ? 'ORACLE' : 'Oracle Cloud ERP'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="sidebar-menu"
          style={{ fontSize: '14px', fontWeight: 500 }}
        />
      </Sider>
      <Layout>
        <Header style={{ 
          padding: '0 32px', 
          background: 'var(--oracle-surface)', 
          borderBottom: '1px solid var(--oracle-border)',
          boxShadow: 'var(--oracle-shadow-sm)', 
          height: '64px', 
          lineHeight: '64px',
          display: 'flex',
          alignItems: 'center'
        }}>
          <Title level={3} style={{ 
            margin: '0', 
            color: 'var(--oracle-text-primary)',
            fontSize: '20px',
            fontWeight: 700
          }}>
            Oracle Cloud ERP - Enterprise Application Suite
          </Title>
        </Header>
        <Content className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/general" element={<GeneralPage />} />
            <Route path="/layout" element={<LayoutPage />} />
            <Route path="/navigation" element={<NavigationPage />} />
            <Route path="/data-entry" element={<DataEntryPage />} />
            <Route path="/data-display" element={<DataDisplayPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

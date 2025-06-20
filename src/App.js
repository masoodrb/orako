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
        width={200}
      >
        <div style={{ padding: '8px', textAlign: 'center' }}>
          <Title level={5} style={{ margin: 0, color: '#1890ff', fontSize: '14px' }}>
            {collapsed ? 'AD' : 'Ant Design'}
          </Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
          className="sidebar-menu"
          style={{ fontSize: '12px' }}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.1)', height: '48px', lineHeight: '48px' }}>
          <Title level={4} style={{ margin: '0', color: '#1890ff', fontSize: '16px' }}>
            Ant Design React Components Demo
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

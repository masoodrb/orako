import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Layout, 
  Menu, 
  Typography, 
  Dropdown, 
  Avatar, 
  Space, 
  Button, 
  Badge, 
  Breadcrumb, 
  Input,
  Tooltip,
  Divider,
  message
} from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  FormOutlined,
  AlertOutlined,
  SettingOutlined,
  BlockOutlined,
  CompassOutlined,
  CloudOutlined,
  UserOutlined,
  LogoutOutlined,
  BellOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DownOutlined
} from '@ant-design/icons';

// Import page components
import Home from './pages/Home';
import GeneralPage from './pages/GeneralPage';
import LayoutPage from './pages/LayoutPage';
import NavigationPage from './pages/NavigationPage';
import DataEntryPage from './pages/DataEntryPage';
import DataDisplayPage from './pages/DataDisplayPage';
import FeedbackPage from './pages/FeedbackPage';
import ERPComponentsPage from './pages/ERPComponentsPage';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // User profile data
  const userProfile = {
    name: 'John Smith',
    email: 'john.smith@oracle.com',
    role: 'Senior Manager',
    department: 'Finance',
    avatar: null
  };

  // Notification data
  const notifications = [
    { id: 1, title: 'New purchase order requires approval', type: 'warning' },
    { id: 2, title: 'Monthly report is ready for review', type: 'info' },
    { id: 3, title: 'System maintenance scheduled for tonight', type: 'info' }
  ];

  // Top navigation items
  const topNavItems = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'analytics', label: 'Analytics' },
    { key: 'reports', label: 'Reports' },
    { key: 'administration', label: 'Administration' }
  ];

  // Profile dropdown menu
  const profileMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
      onClick: () => message.info('Profile settings opened')
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Account Settings',
      onClick: () => message.info('Account settings opened')
    },
    {
      key: 'help',
      icon: <QuestionCircleOutlined />,
      label: 'Help & Support',
      onClick: () => message.info('Help center opened')
    },
    {
      type: 'divider'
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Sign Out',
      onClick: () => {
        message.success('Successfully signed out');
        // In a real app, this would handle logout logic
      }
    }
  ];

  // Notification dropdown menu
  const notificationMenuItems = [
    ...notifications.map(notification => ({
      key: notification.id,
      label: (
        <div style={{ width: '280px', padding: '8px 0' }}>
          <div style={{ fontWeight: 500, marginBottom: '4px' }}>
            {notification.title}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
            2 minutes ago
          </div>
        </div>
      ),
      onClick: () => message.info(`Opened notification: ${notification.title}`)
    })),
    {
      type: 'divider'
    },
    {
      key: 'view-all',
      label: (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <Button type="link" size="small">View All Notifications</Button>
        </div>
      )
    }
  ];

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
    {
      key: '/erp-components',
      icon: <CloudOutlined />,
      label: 'ERP Components',
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
        {/* Top Header with Navigation */}
        <Header style={{ 
          padding: '0 24px', 
          background: 'var(--oracle-surface)', 
          borderBottom: '1px solid var(--oracle-border)',
          boxShadow: 'var(--oracle-shadow-sm)', 
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1000
        }}>
          {/* Left side - Brand and collapse toggle */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 32,
                height: 32,
                marginRight: '16px'
              }}
            />
            <Title level={4} style={{ 
              margin: '0', 
              color: 'var(--oracle-text-primary)',
              fontSize: '18px',
              fontWeight: 700,
              marginRight: '32px'
            }}>
              
            </Title>
            
            {/* Top Navigation Menu */}
            <Menu
              mode="horizontal"
              style={{
                background: 'transparent',
                border: 'none',
                fontSize: '14px',
                fontWeight: 500
              }}
              items={topNavItems}
            />
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Global Search */}
            <Search
              placeholder="Search across all modules..."
              style={{ width: 280 }}
              onSearch={(value) => message.info(`Searching for: ${value}`)}
            />

            {/* Help Icon */}
            <Tooltip title="Help & Documentation">
              <Button
                type="text"
                icon={<QuestionCircleOutlined />}
                style={{ fontSize: '16px' }}
                onClick={() => message.info('Help center opened')}
              />
            </Tooltip>

            {/* Language Selector */}
            <Tooltip title="Language">
              <Button
                type="text"
                icon={<GlobalOutlined />}
                style={{ fontSize: '16px' }}
                onClick={() => message.info('Language selector opened')}
              />
            </Tooltip>

            {/* Notifications */}
            <Dropdown
              menu={{ items: notificationMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button
                type="text"
                style={{ padding: '4px 8px' }}
              >
                <Badge count={notifications.length} size="small">
                  <BellOutlined style={{ fontSize: '16px' }} />
                </Badge>
              </Button>
            </Dropdown>

            <Divider type="vertical" style={{ height: '24px' }} />

            {/* User Profile Dropdown */}
            <Dropdown
              menu={{ items: profileMenuItems }}
              trigger={['click']}
              placement="bottomRight"
            >
              <Button
                type="text"
                style={{ 
                  padding: '4px 8px',
                  height: 'auto',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Space>
                  <Avatar 
                    size={32} 
                    icon={<UserOutlined />}
                    style={{ 
                      backgroundColor: 'var(--oracle-primary)',
                      marginRight: '8px'
                    }}
                  />
                  <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                    <div style={{ 
                      fontSize: '14px', 
                      fontWeight: 600,
                      color: 'var(--oracle-text-primary)'
                    }}>
                      {userProfile.name}
                    </div>
                    <div style={{ 
                      fontSize: '12px',
                      color: 'var(--oracle-text-secondary)'
                    }}>
                      {userProfile.role}
                    </div>
                  </div>
                  <DownOutlined style={{ fontSize: '12px', marginLeft: '4px' }} />
                </Space>
              </Button>
            </Dropdown>
          </div>
        </Header>

        {/* Secondary Navigation/Breadcrumb Bar */}
        <div style={{
          background: 'var(--oracle-surface-secondary)',
          borderBottom: '1px solid var(--oracle-border-light)',
          padding: '8px 24px',
          fontSize: '14px'
        }}>
          <Breadcrumb
            items={[
              { title: <HomeOutlined /> },
              { title: 'Applications' },
              { title: 'Component Library' },
              { title: location.pathname === '/' ? 'Dashboard' : location.pathname.replace('/', '').replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) }
            ]}
          />
        </div>
        <Content className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/general" element={<GeneralPage />} />
            <Route path="/layout" element={<LayoutPage />} />
            <Route path="/navigation" element={<NavigationPage />} />
            <Route path="/data-entry" element={<DataEntryPage />} />
            <Route path="/data-display" element={<DataDisplayPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/erp-components" element={<ERPComponentsPage />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

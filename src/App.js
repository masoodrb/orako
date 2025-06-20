import React, { useState, useEffect } from 'react';
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
  message,
  Drawer
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
  DownOutlined,
  MenuOutlined
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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1200);
      
      // Auto-collapse sidebar on mobile
      if (width < 768) {
        setCollapsed(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Mobile navigation menu for drawer
  const mobileNavMenuItems = [
    {
      key: 'nav-dashboard',
      label: 'Dashboard',
      onClick: () => {
        message.info('Dashboard opened');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-analytics',
      label: 'Analytics',
      onClick: () => {
        message.info('Analytics opened');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-reports',
      label: 'Reports',
      onClick: () => {
        message.info('Reports opened');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-administration',
      label: 'Administration',
      onClick: () => {
        message.info('Administration opened');
        setMobileMenuVisible(false);
      }
    },
    {
      type: 'divider'
    },
    {
      key: 'nav-help',
      icon: <QuestionCircleOutlined />,
      label: 'Help & Support',
      onClick: () => {
        message.info('Help center opened');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-language',
      icon: <GlobalOutlined />,
      label: 'Language Settings',
      onClick: () => {
        message.info('Language selector opened');
        setMobileMenuVisible(false);
      }
    }
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
          padding: isMobile ? '0 12px' : '0 24px', 
          background: 'var(--oracle-surface)', 
          borderBottom: '1px solid var(--oracle-border)',
          boxShadow: 'var(--oracle-shadow-sm)', 
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Left side - Brand and collapse toggle */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            flex: isMobile ? '1' : 'none',
            minWidth: 0
          }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 32,
                height: 32,
                marginRight: isMobile ? '8px' : '16px',
                flexShrink: 0
              }}
            />
            <Title level={4} style={{ 
              margin: '0', 
              color: 'var(--oracle-text-primary)',
              fontSize: isMobile ? '16px' : '18px',
              fontWeight: 700,
              marginRight: isMobile ? '8px' : '32px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {isMobile ? 'Oracle ERP' : 'Oracle Cloud ERP'}
            </Title>
            
            {/* Top Navigation Menu - Hidden on mobile and tablet */}
            {!isMobile && !isTablet && (
              <Menu
                mode="horizontal"
                style={{
                  background: 'transparent',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  flex: 1
                }}
                items={topNavItems}
              />
            )}
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '8px' : '16px',
            flexShrink: 0
          }}>
            {/* Global Search - Responsive width */}
            {!isMobile && (
              <Search
                placeholder={isTablet ? "Search..." : "Search across all modules..."}
                style={{ 
                  width: isTablet ? 200 : 280,
                  display: isMobile ? 'none' : 'block'
                }}
                onSearch={(value) => message.info(`Searching for: ${value}`)}
              />
            )}

            {/* Mobile search icon */}
            {isMobile && (
              <Tooltip title="Search">
                <Button
                  type="text"
                  icon={<SearchOutlined />}
                  style={{ fontSize: '16px' }}
                  onClick={() => setMobileSearchVisible(true)}
                />
              </Tooltip>
            )}

            {/* Mobile menu icon for top navigation */}
            {(isMobile || isTablet) && (
              <Tooltip title="Menu">
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  style={{ fontSize: '16px' }}
                  onClick={() => setMobileMenuVisible(true)}
                />
              </Tooltip>
            )}

            {/* Help Icon - Hidden on mobile */}
            {!isMobile && (
              <Tooltip title="Help & Documentation">
                <Button
                  type="text"
                  icon={<QuestionCircleOutlined />}
                  style={{ fontSize: '16px' }}
                  onClick={() => message.info('Help center opened')}
                />
              </Tooltip>
            )}

            {/* Language Selector - Hidden on mobile */}
            {!isMobile && (
              <Tooltip title="Language">
                <Button
                  type="text"
                  icon={<GlobalOutlined />}
                  style={{ fontSize: '16px' }}
                  onClick={() => message.info('Language selector opened')}
                />
              </Tooltip>
            )}

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

            {!isMobile && <Divider type="vertical" style={{ height: '24px' }} />}

            {/* User Profile Dropdown - Responsive */}
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
                    size={isMobile ? 28 : 32} 
                    icon={<UserOutlined />}
                    style={{ 
                      backgroundColor: 'var(--oracle-primary)',
                      marginRight: isMobile ? '4px' : '8px'
                    }}
                  />
                  {/* User info - Hidden on mobile */}
                  {!isMobile && (
                    <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                      <div style={{ 
                        fontSize: '14px', 
                        fontWeight: 600,
                        color: 'var(--oracle-text-primary)'
                      }}>
                        {isTablet ? 'J. Smith' : userProfile.name}
                      </div>
                      {!isTablet && (
                        <div style={{ 
                          fontSize: '12px',
                          color: 'var(--oracle-text-secondary)'
                        }}>
                          {userProfile.role}
                        </div>
                      )}
                    </div>
                  )}
                  {!isMobile && <DownOutlined style={{ fontSize: '12px', marginLeft: '4px' }} />}
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

        {/* Mobile Navigation Drawer */}
        <Drawer
          title={
            <Space>
              <CloudOutlined style={{ color: 'var(--oracle-primary)' }} />
              <span style={{ color: 'var(--oracle-text-primary)', fontWeight: 600 }}>
                Navigation Menu
              </span>
            </Space>
          }
          placement="right"
          open={mobileMenuVisible}
          onClose={() => setMobileMenuVisible(false)}
          width={280}
          headerStyle={{
            background: 'var(--oracle-surface)',
            borderBottom: '1px solid var(--oracle-border)'
          }}
          bodyStyle={{
            padding: 0,
            background: 'var(--oracle-surface)'
          }}
        >
          <Menu
            mode="inline"
            style={{
              border: 'none',
              background: 'transparent'
            }}
            items={mobileNavMenuItems}
          />
        </Drawer>

        {/* Mobile Search Drawer */}
        <Drawer
          title="Global Search"
          placement="top"
          open={mobileSearchVisible}
          onClose={() => setMobileSearchVisible(false)}
          height={200}
          headerStyle={{
            background: 'var(--oracle-surface)',
            borderBottom: '1px solid var(--oracle-border)'
          }}
          bodyStyle={{
            background: 'var(--oracle-surface)',
            padding: '24px'
          }}
        >
          <Search
            placeholder="Search across all modules..."
            size="large"
            style={{ width: '100%' }}
            onSearch={(value) => {
              message.info(`Searching for: ${value}`);
              setMobileSearchVisible(false);
            }}
            enterButton="Search"
          />
          <div style={{ 
            marginTop: '16px', 
            fontSize: '13px', 
            color: 'var(--oracle-text-secondary)' 
          }}>
            Search across modules, reports, documents, and more...
          </div>
        </Drawer>
      </Layout>
    </Layout>
  );
};

export default App;

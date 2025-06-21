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
  MenuOutlined,
  TeamOutlined,
  DollarOutlined,
  TrophyOutlined,
  BankOutlined,
  MessageOutlined,
  MailOutlined,
  ProjectOutlined,
  HistoryOutlined,
  UsergroupAddOutlined,
  RocketOutlined,
  DashboardOutlined,
  LineChartOutlined,
  FileTextOutlined,
  ControlOutlined
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
import CRMPage from './pages/CRMPage';
import AccountingPage from './pages/AccountingPage';
import HRMPage from './pages/HRMPage';
import SalesMarketingPage from './pages/SalesMarketingPage';
import ChatPage from './pages/ChatPage';
import KanbanPage from './pages/KanbanPage';
import MailboxPage from './pages/MailboxPage';
import TimelinePage from './pages/TimelinePage';
import TeamsPage from './pages/TeamsPage';
import AnimatedWidgetsPage from './pages/AnimatedWidgetsPage';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import AdministrationPage from './pages/AdministrationPage';

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

  // Top navigation items with conditional visibility
  const getTopNavItems = () => {
    const menuDropdown = {
      key: 'menu-dropdown',
      icon: <MenuOutlined />,
      label: 'Menu',
      children: [
        {
          key: 'dashboard',
          icon: <DashboardOutlined />,
          label: 'Dashboard',
          onClick: () => navigate('/dashboard')
        },
        {
          key: 'analytics', 
          icon: <LineChartOutlined />,
          label: 'Analytics',
          onClick: () => navigate('/analytics')
        },
        {
          key: 'reports',
          icon: <FileTextOutlined />,
          label: 'Reports', 
          onClick: () => navigate('/reports')
        },
        {
          key: 'administration',
          icon: <ControlOutlined />,
          label: 'Administration',
          onClick: () => navigate('/administration')
        }
      ]
    };

    // Always show Menu dropdown in topbar when sidebar is expanded
    // Hide individual items when sidebar is expanded to avoid duplication
    if (!collapsed) {
      return [menuDropdown];
    } else {
      // When sidebar is collapsed, show individual items in topbar
      return [
        { 
          key: 'dashboard', 
          label: 'Dashboard',
          onClick: () => navigate('/dashboard')
        },
        { 
          key: 'analytics', 
          label: 'Analytics',
          onClick: () => navigate('/analytics')
        },
        { 
          key: 'reports', 
          label: 'Reports',
          onClick: () => navigate('/reports')
        },
        { 
          key: 'administration', 
          label: 'Administration',
          onClick: () => navigate('/administration')
        }
      ];
    }
  };

  // Mobile navigation menu for drawer
  const mobileNavMenuItems = [
    {
      key: 'nav-dashboard',
      label: 'Dashboard',
      onClick: () => {
        navigate('/dashboard');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-analytics',
      label: 'Analytics',
      onClick: () => {
        navigate('/analytics');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-reports',
      label: 'Reports',
      onClick: () => {
        navigate('/reports');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-administration',
      label: 'Administration',
      onClick: () => {
        navigate('/administration');
        setMobileMenuVisible(false);
      }
    },
    {
      type: 'divider'
    },
    {
      key: 'business-modules',
      label: 'Business Modules',
      type: 'group'
    },
    {
      key: 'nav-crm',
      icon: <TeamOutlined />,
      label: 'CRM',
      onClick: () => {
        navigate('/crm');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-accounting',
      icon: <BankOutlined />,
      label: 'Accounting',
      onClick: () => {
        navigate('/accounting');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-hrm',
      icon: <UserOutlined />,
      label: 'Human Resources',
      onClick: () => {
        navigate('/hrm');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-sales-marketing',
      icon: <TrophyOutlined />,
      label: 'Sales & Marketing',
      onClick: () => {
        navigate('/sales-marketing');
        setMobileMenuVisible(false);
      }
    },
    {
      type: 'divider'
    },
    {
      key: 'collaboration-tools-mobile',
      label: 'Collaboration Tools',
      type: 'group'
    },
    {
      key: 'nav-chat',
      icon: <MessageOutlined />,
      label: 'Chat',
      onClick: () => {
        navigate('/chat');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-kanban',
      icon: <ProjectOutlined />,
      label: 'Kanban Board',
      onClick: () => {
        navigate('/kanban');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-mailbox',
      icon: <MailOutlined />,
      label: 'Mailbox',
      onClick: () => {
        navigate('/mailbox');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-timeline',
      icon: <HistoryOutlined />,
      label: 'Timeline',
      onClick: () => {
        navigate('/timeline');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-teams',
      icon: <UsergroupAddOutlined />,
      label: 'Teams',
      onClick: () => {
        navigate('/teams');
        setMobileMenuVisible(false);
      }
    },
    {
      key: 'nav-animated-widgets',
      icon: <RocketOutlined />,
      label: 'Animated Widgets',
      onClick: () => {
        navigate('/animated-widgets');
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
      type: 'divider',
    },
    {
      key: 'ui-components',
      label: 'UI Components',
      type: 'group',
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
    {
      type: 'divider',
    },
    {
      key: 'business-modules',
      label: 'Business Modules',
      type: 'group',
    },
    {
      key: '/crm',
      icon: <TeamOutlined />,
      label: 'CRM',
    },
    {
      key: '/accounting',
      icon: <BankOutlined />,
      label: 'Accounting',
    },
    {
      key: '/hrm',
      icon: <UserOutlined />,
      label: 'Human Resources',
    },
    {
      key: '/sales-marketing',
      icon: <TrophyOutlined />,
      label: 'Sales & Marketing',
    },
    {
      type: 'divider',
    },
    {
      key: 'collaboration-tools',
      label: 'Collaboration Tools',
      type: 'group',
    },
    {
      key: '/chat',
      icon: <MessageOutlined />,
      label: 'Chat',
    },
    {
      key: '/kanban',
      icon: <ProjectOutlined />,
      label: 'Kanban Board',
    },
    {
      key: '/mailbox',
      icon: <MailOutlined />,
      label: 'Mailbox',
    },
    {
      key: '/timeline',
      icon: <HistoryOutlined />,
      label: 'Timeline',
    },
    {
      key: '/teams',
      icon: <UsergroupAddOutlined />,
      label: 'Teams',
    },
    {
      key: '/animated-widgets',
      icon: <RocketOutlined />,
      label: 'Animated Widgets',
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
            flex: isMobile ? '1' : collapsed ? '2' : '1',
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
              marginRight: isMobile ? '8px' : collapsed ? '24px' : '32px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              flexShrink: collapsed ? 1 : 0
            }}>
              {isMobile ? 'Oracle ERP' : collapsed ? 'Oracle ERP' : 'Oracle Cloud ERP'}
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
                  flex: 1,
                  minWidth: 0,
                  justifyContent: collapsed ? 'flex-start' : 'flex-start'
                }}
                items={getTopNavItems()}
                selectedKeys={[]}
                overflowedIndicator={collapsed ? null : undefined}
                triggerSubMenuAction="click"
              />
            )}
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: isMobile ? '8px' : isTablet ? '12px' : '16px',
            flexShrink: 0,
            minWidth: 'fit-content'
          }}>
            {/* Global Search - Responsive width */}
            {!isMobile && (
              <Search
                placeholder={isTablet ? "Search..." : collapsed ? "Search..." : "Search across all modules..."}
                style={{ 
                  width: isTablet ? 180 : collapsed ? 200 : 260,
                  display: isMobile ? 'none' : 'block',
                  marginRight: '8px',
                  flexShrink: 0
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
        <Content className="content-area main-content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/administration" element={<AdministrationPage />} />
            <Route path="/general" element={<GeneralPage />} />
            <Route path="/layout" element={<LayoutPage />} />
            <Route path="/navigation" element={<NavigationPage />} />
            <Route path="/data-entry" element={<DataEntryPage />} />
            <Route path="/data-display" element={<DataDisplayPage />} />
            <Route path="/feedback" element={<FeedbackPage />} />
            <Route path="/erp-components" element={<ERPComponentsPage />} />
            <Route path="/crm" element={<CRMPage />} />
            <Route path="/accounting" element={<AccountingPage />} />
            <Route path="/hrm" element={<HRMPage />} />
            <Route path="/sales-marketing" element={<SalesMarketingPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/kanban" element={<KanbanPage />} />
            <Route path="/mailbox" element={<MailboxPage />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/animated-widgets" element={<AnimatedWidgetsPage />} />
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

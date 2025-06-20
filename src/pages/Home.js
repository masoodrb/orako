import React from 'react';
import { Card, Typography, Row, Col, Statistic, Button } from 'antd';
import { 
  AppstoreOutlined, 
  FormOutlined, 
  AlertOutlined, 
  SettingOutlined,
  BlockOutlined,
  CompassOutlined,
  CloudOutlined,
  TeamOutlined,
  BankOutlined,
  UserOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'General',
      description: 'Basic components like Button, Icon, Typography',
      icon: <SettingOutlined style={{ fontSize: '32px', color: 'var(--oracle-primary)' }} />,
      count: 4,
      path: '/general',
      type: 'ui'
    },
    {
      title: 'Layout',
      description: 'Components for page layout and structure',
      icon: <BlockOutlined style={{ fontSize: '32px', color: 'var(--oracle-success)' }} />,
      count: 4,
      path: '/layout',
      type: 'ui'
    },
    {
      title: 'Navigation',
      description: 'Navigation and menu components',
      icon: <CompassOutlined style={{ fontSize: '32px', color: 'var(--oracle-secondary)' }} />,
      count: 8,
      path: '/navigation',
      type: 'ui'
    },
    {
      title: 'Data Entry',
      description: 'Form controls and input components',
      icon: <FormOutlined style={{ fontSize: '32px', color: 'var(--oracle-warning)' }} />,
      count: 17,
      path: '/data-entry',
      type: 'ui'
    },
    {
      title: 'Data Display',
      description: 'Components for displaying data',
      icon: <AppstoreOutlined style={{ fontSize: '32px', color: 'var(--oracle-info)' }} />,
      count: 17,
      path: '/data-display',
      type: 'ui'
    },
    {
      title: 'Feedback',
      description: 'User feedback and interaction components',
      icon: <AlertOutlined style={{ fontSize: '32px', color: 'var(--oracle-error)' }} />,
      count: 10,
      path: '/feedback',
      type: 'ui'
    },
    {
      title: 'ERP Components',
      description: 'Enterprise business modules and workflows',
      icon: <CloudOutlined style={{ fontSize: '32px', color: 'var(--oracle-secondary)' }} />,
      count: 25,
      path: '/erp-components',
      type: 'ui'
    }
  ];

  const businessModules = [
    {
      title: 'CRM',
      description: 'Customer Relationship Management - leads, opportunities, and customer data',
      icon: <TeamOutlined style={{ fontSize: '32px', color: 'var(--oracle-primary)' }} />,
      features: 'Leads, Opportunities, Customers',
      path: '/crm'
    },
    {
      title: 'Accounting',
      description: 'Financial management with double-entry bookkeeping and reporting',
      icon: <BankOutlined style={{ fontSize: '32px', color: 'var(--oracle-success)' }} />,
      features: 'General Ledger, A/R, A/P, P&L',
      path: '/accounting'
    },
    {
      title: 'Human Resources',
      description: 'Complete HR solution for employee and workforce management',
      icon: <UserOutlined style={{ fontSize: '32px', color: 'var(--oracle-secondary)' }} />,
      features: 'Employees, Payroll, Attendance',
      path: '/hrm'
    },
    {
      title: 'Sales & Marketing',
      description: 'Drive revenue growth with sales tracking and marketing campaigns',
      icon: <TrophyOutlined style={{ fontSize: '32px', color: 'var(--oracle-warning)' }} />,
      features: 'Sales, Campaigns, Analytics',
      path: '/sales-marketing'
    }
  ];

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Oracle Cloud ERP - Enterprise Business Suite</Title>
        <Paragraph>
          Welcome to Oracle Cloud ERP, the world's most complete and integrated cloud business suite. 
          This platform demonstrates our comprehensive component library and design system built for enterprise applications.
        </Paragraph>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: '40px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card className="oracle-shadow-sm" style={{ borderRadius: 'var(--oracle-radius-md)' }}>
            <Statistic
              title="Total Components"
              value={85}
              valueStyle={{ 
                color: 'var(--oracle-primary)', 
                fontSize: '24px',
                fontWeight: 700
              }}
              suffix="+"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="oracle-shadow-sm" style={{ borderRadius: 'var(--oracle-radius-md)' }}>
            <Statistic
              title="Business Modules"
              value={11}
              valueStyle={{ 
                color: 'var(--oracle-secondary)', 
                fontSize: '24px',
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="oracle-shadow-sm" style={{ borderRadius: 'var(--oracle-radius-md)' }}>
            <Statistic
              title="Platform Version"
              value="18.2"
              valueStyle={{ 
                color: 'var(--oracle-success)', 
                fontSize: '24px',
                fontWeight: 700
              }}
            />
          </Card>
        </Col>
      </Row>

      <Title level={2} className="oracle-primary-text" style={{ 
        marginBottom: '32px', 
        fontSize: '24px', 
        fontWeight: 700,
        textAlign: 'center',
        letterSpacing: '0.3px'
      }}>
        UI Component Categories
      </Title>
      <Row gutter={[24, 24]} style={{ marginBottom: '48px' }}>
        {categories.map((category, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              className="oracle-shadow-sm"
              style={{ 
                height: '100%', 
                borderRadius: 'var(--oracle-radius-md)',
                transition: 'all 0.2s ease'
              }}
              onClick={() => navigate(category.path)}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {React.cloneElement(category.icon, { 
                  style: { 
                    fontSize: '36px', 
                    color: category.icon.props.style.color 
                  } 
                })}
              </div>
              <Card.Meta
                title={
                  <div style={{ textAlign: 'center' }}>
                    <Title level={4} style={{ 
                      margin: '12px 0', 
                      fontSize: '18px', 
                      fontWeight: 600,
                      color: 'var(--oracle-text-primary)'
                    }}>
                      {category.title}
                    </Title>
                    <Paragraph type="secondary" style={{ 
                      fontSize: '14px', 
                      margin: 0,
                      color: 'var(--oracle-text-secondary)'
                    }}>
                      {category.count} components
                    </Paragraph>
                  </div>
                }
                description={
                  <div style={{ textAlign: 'center' }}>
                    <Paragraph style={{ 
                      fontSize: '15px', 
                      margin: '16px 0 20px 0',
                      color: 'var(--oracle-text-secondary)',
                      lineHeight: 1.5
                    }}>
                      {category.description}
                    </Paragraph>
                    <Button 
                      type="primary" 
                      className="oracle-shadow-xs"
                      style={{ 
                        fontSize: '14px', 
                        height: '40px',
                        borderRadius: 'var(--oracle-radius-sm)',
                        fontWeight: 500,
                        paddingLeft: '24px',
                        paddingRight: '24px'
                      }}
                    >
                      Access Module
                    </Button>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Title level={2} className="oracle-primary-text" style={{ 
        marginBottom: '32px', 
        fontSize: '24px', 
        fontWeight: 700,
        textAlign: 'center',
        letterSpacing: '0.3px'
      }}>
        Enterprise Business Modules
      </Title>
      <Row gutter={[24, 24]}>
        {businessModules.map((module, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card
              hoverable
              className="oracle-shadow-sm"
              style={{ 
                height: '100%', 
                borderRadius: 'var(--oracle-radius-md)',
                transition: 'all 0.2s ease',
                border: '1px solid var(--oracle-border)'
              }}
              onClick={() => navigate(module.path)}
            >
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                {React.cloneElement(module.icon, { 
                  style: { 
                    fontSize: '36px', 
                    color: module.icon.props.style.color 
                  } 
                })}
              </div>
              <Card.Meta
                title={
                  <div style={{ textAlign: 'center' }}>
                    <Title level={4} style={{ 
                      margin: '12px 0', 
                      fontSize: '18px', 
                      fontWeight: 600,
                      color: 'var(--oracle-text-primary)'
                    }}>
                      {module.title}
                    </Title>
                    <Paragraph type="secondary" style={{ 
                      fontSize: '13px', 
                      margin: 0,
                      color: 'var(--oracle-secondary)',
                      fontWeight: 500
                    }}>
                      {module.features}
                    </Paragraph>
                  </div>
                }
                description={
                  <div style={{ textAlign: 'center' }}>
                    <Paragraph style={{ 
                      fontSize: '14px', 
                      margin: '16px 0 20px 0',
                      color: 'var(--oracle-text-secondary)',
                      lineHeight: 1.5
                    }}>
                      {module.description}
                    </Paragraph>
                    <Button 
                      type="primary" 
                      className="oracle-shadow-xs"
                      style={{ 
                        fontSize: '14px', 
                        height: '40px',
                        borderRadius: 'var(--oracle-radius-sm)',
                        fontWeight: 500,
                        paddingLeft: '24px',
                        paddingRight: '24px'
                      }}
                    >
                      Open Module
                    </Button>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card 
        className="oracle-shadow-md" 
        style={{ 
          marginTop: '40px',
          borderRadius: 'var(--oracle-radius-lg)',
          border: '1px solid var(--oracle-border)'
        }}
      >
        <Title level={3} className="oracle-primary-text" style={{ 
          fontSize: '20px', 
          fontWeight: 700,
          marginBottom: '20px'
        }}>
          About Oracle Cloud ERP Platform
        </Title>
        <Paragraph style={{ 
          fontSize: '16px', 
          margin: '12px 0 20px 0',
          color: 'var(--oracle-text-secondary)',
          lineHeight: 1.6
        }}>
          Oracle Cloud ERP is the world's most complete cloud business suite, delivering 
          integrated applications for finance, procurement, project portfolio management, 
          and more. This platform showcases our enterprise-grade component library and 
          professional design system.
        </Paragraph>
        <Paragraph style={{ 
          fontSize: '16px', 
          margin: '12px 0 16px 0',
          color: 'var(--oracle-text-primary)',
          fontWeight: 600
        }}>
          Enterprise Technology Stack:
        </Paragraph>
        <Row gutter={[20, 16]}>
          <Col xs={24} md={12}>
            <ul style={{ 
              fontSize: '15px', 
              margin: '0', 
              paddingLeft: '24px',
              color: 'var(--oracle-text-secondary)'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--oracle-primary)' }}>React 18.2.0</strong> - Enterprise UI Framework
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--oracle-primary)' }}>Ant Design 5.12.8</strong> - Professional Component Suite
              </li>
            </ul>
          </Col>
          <Col xs={24} md={12}>
            <ul style={{ 
              fontSize: '15px', 
              margin: '0', 
              paddingLeft: '24px',
              color: 'var(--oracle-text-secondary)'
            }}>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--oracle-primary)' }}>React Router 6.20.1</strong> - Application Navigation
              </li>
              <li style={{ marginBottom: '12px' }}>
                <strong style={{ color: 'var(--oracle-primary)' }}>Oracle Design System</strong> - Enterprise Standards
              </li>
            </ul>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Home;

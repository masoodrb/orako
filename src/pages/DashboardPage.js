import React from 'react';
import { Typography, Card, Row, Col, Statistic, Progress, Space } from 'antd';
import { 
  ArrowUpOutlined, 
  ArrowDownOutlined, 
  UserOutlined, 
  ShoppingCartOutlined,
  DollarOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const DashboardPage = () => {
  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <Title level={1}>Dashboard</Title>
        <Paragraph>
          Welcome to your Oracle Cloud ERP Dashboard. Get insights into your business performance,
          key metrics, and operational status at a glance.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={112893}
              precision={2}
              valueStyle={{ color: 'var(--oracle-success)' }}
              prefix={<DollarOutlined />}
              suffix={<ArrowUpOutlined style={{ color: 'var(--oracle-success)' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={1128}
              valueStyle={{ color: 'var(--oracle-primary)' }}
              prefix={<UserOutlined />}
              suffix={<ArrowUpOutlined style={{ color: 'var(--oracle-success)' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Orders"
              value={93}
              valueStyle={{ color: 'var(--oracle-warning)' }}
              prefix={<ShoppingCartOutlined />}
              suffix={<ArrowDownOutlined style={{ color: 'var(--oracle-error)' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Page Views"
              value={11280}
              prefix={<EyeOutlined />}
              suffix={<ArrowUpOutlined style={{ color: 'var(--oracle-success)' }} />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Performance Overview" className="dashboard-card">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Paragraph style={{ margin: 0, fontWeight: 500 }}>CPU Usage</Paragraph>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--oracle-warning)' }}>75%</span>
                </div>
                <Progress 
                  percent={75} 
                  status="active" 
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  trailColor="rgba(0,0,0,0.06)"
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Paragraph style={{ margin: 0, fontWeight: 500 }}>Memory Usage</Paragraph>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--oracle-primary)' }}>45%</span>
                </div>
                <Progress 
                  percent={45} 
                  strokeColor="#52c41a"
                  trailColor="rgba(0,0,0,0.06)"
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Paragraph style={{ margin: 0, fontWeight: 500 }}>Disk Usage</Paragraph>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--oracle-error)' }}>85%</span>
                </div>
                <Progress 
                  percent={85} 
                  status="exception" 
                  strokeColor="#ff4d4f"
                  trailColor="rgba(0,0,0,0.06)"
                />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Paragraph style={{ margin: 0, fontWeight: 500 }}>Network I/O</Paragraph>
                  <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--oracle-success)' }}>30%</span>
                </div>
                <Progress 
                  percent={30} 
                  strokeColor="#1890ff"
                  trailColor="rgba(0,0,0,0.06)"
                />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" className="dashboard-card">
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Card 
                size="small" 
                hoverable
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  color: 'white'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Title level={5} style={{ color: 'white', margin: '0 0 8px 0' }}>Generate Monthly Report</Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Create comprehensive monthly business report</Paragraph>
                  </div>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    📊
                  </div>
                </div>
              </Card>
              <Card 
                size="small" 
                hoverable
                style={{ 
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  color: 'white'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Title level={5} style={{ color: 'white', margin: '0 0 8px 0' }}>User Management</Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Manage user accounts and permissions</Paragraph>
                  </div>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    👥
                  </div>
                </div>
              </Card>
              <Card 
                size="small" 
                hoverable
                style={{ 
                  background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                  border: 'none',
                  color: 'white'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Title level={5} style={{ color: 'white', margin: '0 0 8px 0' }}>System Settings</Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Configure system-wide settings</Paragraph>
                  </div>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    ⚙️
                  </div>
                </div>
              </Card>
              <Card 
                size="small" 
                hoverable
                style={{ 
                  background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                  border: 'none',
                  color: 'white'
                }}
                bodyStyle={{ padding: '16px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <Title level={5} style={{ color: 'white', margin: '0 0 8px 0' }}>Backup & Recovery</Title>
                    <Paragraph style={{ color: 'rgba(255,255,255,0.8)', margin: 0 }}>Manage data backup and recovery operations</Paragraph>
                  </div>
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: 'rgba(255,255,255,0.2)', 
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    💾
                  </div>
                </div>
              </Card>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

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
                <Paragraph>CPU Usage</Paragraph>
                <Progress percent={75} status="active" />
              </div>
              <div>
                <Paragraph>Memory Usage</Paragraph>
                <Progress percent={45} />
              </div>
              <div>
                <Paragraph>Disk Usage</Paragraph>
                <Progress percent={85} status="exception" />
              </div>
              <div>
                <Paragraph>Network I/O</Paragraph>
                <Progress percent={30} />
              </div>
            </Space>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Quick Actions" className="dashboard-card">
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              <Card size="small" hoverable>
                <Title level={5}>Generate Monthly Report</Title>
                <Paragraph>Create comprehensive monthly business report</Paragraph>
              </Card>
              <Card size="small" hoverable>
                <Title level={5}>User Management</Title>
                <Paragraph>Manage user accounts and permissions</Paragraph>
              </Card>
              <Card size="small" hoverable>
                <Title level={5}>System Settings</Title>
                <Paragraph>Configure system-wide settings</Paragraph>
              </Card>
              <Card size="small" hoverable>
                <Title level={5}>Backup & Recovery</Title>
                <Paragraph>Manage data backup and recovery operations</Paragraph>
              </Card>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;

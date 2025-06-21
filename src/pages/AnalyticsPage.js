import React, { useState } from 'react';
import { Typography, Card, Row, Col, Select, DatePicker, Space, Button, Table, Tag } from 'antd';
import { 
  LineChartOutlined, 
  BarChartOutlined, 
  PieChartOutlined,
  DownloadOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const AnalyticsPage = () => {
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [timeRange, setTimeRange] = useState('7d');

  // Sample data for analytics table
  const analyticsData = [
    {
      key: '1',
      metric: 'Page Views',
      current: 45672,
      previous: 42341,
      change: '+7.9%',
      trend: 'up'
    },
    {
      key: '2',
      metric: 'Unique Visitors',
      current: 12453,
      previous: 11876,
      change: '+4.9%',
      trend: 'up'
    },
    {
      key: '3',
      metric: 'Bounce Rate',
      current: '23.4%',
      previous: '26.7%',
      change: '-3.3%',
      trend: 'down'
    },
    {
      key: '4',
      metric: 'Conversion Rate',
      current: '3.2%',
      previous: '2.8%',
      change: '+0.4%',
      trend: 'up'
    },
    {
      key: '5',
      metric: 'Average Session Duration',
      current: '4m 32s',
      previous: '4m 18s',
      change: '+14s',
      trend: 'up'
    }
  ];

  const columns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
    },
    {
      title: 'Current Period',
      dataIndex: 'current',
      key: 'current',
      render: (value) => <strong>{value}</strong>
    },
    {
      title: 'Previous Period',
      dataIndex: 'previous',
      key: 'previous',
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      render: (value, record) => (
        <Tag color={record.trend === 'up' ? 'green' : record.trend === 'down' ? 'red' : 'blue'}>
          {value}
        </Tag>
      )
    }
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <Title level={1}>Analytics</Title>
        <Paragraph>
          Comprehensive analytics and insights for your Oracle Cloud ERP system.
          Track performance metrics, user behavior, and business intelligence.
        </Paragraph>
      </div>

      {/* Filter Controls */}
      <Card style={{ marginBottom: '24px' }}>
        <Space wrap>
          <div>
            <label style={{ marginRight: '8px' }}>Metric:</label>
            <Select
              value={selectedMetric}
              onChange={setSelectedMetric}
              style={{ width: 200 }}
              options={[
                { value: 'revenue', label: 'Revenue Analytics' },
                { value: 'users', label: 'User Analytics' },
                { value: 'performance', label: 'Performance Analytics' },
                { value: 'sales', label: 'Sales Analytics' }
              ]}
            />
          </div>
          <div>
            <label style={{ marginRight: '8px' }}>Time Range:</label>
            <Select
              value={timeRange}
              onChange={setTimeRange}
              style={{ width: 150 }}
              options={[
                { value: '7d', label: 'Last 7 days' },
                { value: '30d', label: 'Last 30 days' },
                { value: '90d', label: 'Last 90 days' },
                { value: 'custom', label: 'Custom Range' }
              ]}
            />
          </div>
          {timeRange === 'custom' && (
            <RangePicker />
          )}
          <Button icon={<FilterOutlined />}>
            Apply Filters
          </Button>
          <Button icon={<DownloadOutlined />} type="primary">
            Export Data
          </Button>
        </Space>
      </Card>

      {/* Analytics Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} lg={8}>
          <Card title="Chart Visualization" extra={<LineChartOutlined />}>
            <div style={{ 
              height: '200px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'var(--oracle-bg-secondary)',
              borderRadius: '8px'
            }}>
              <div style={{ textAlign: 'center', color: 'var(--oracle-text-secondary)' }}>
                <LineChartOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <div>Line Chart Placeholder</div>
                <div style={{ fontSize: '12px' }}>Real charts would be implemented with Chart.js or D3</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Bar Chart Analysis" extra={<BarChartOutlined />}>
            <div style={{ 
              height: '200px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'var(--oracle-bg-secondary)',
              borderRadius: '8px'
            }}>
              <div style={{ textAlign: 'center', color: 'var(--oracle-text-secondary)' }}>
                <BarChartOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <div>Bar Chart Placeholder</div>
                <div style={{ fontSize: '12px' }}>Showing comparative analysis</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Distribution Chart" extra={<PieChartOutlined />}>
            <div style={{ 
              height: '200px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              background: 'var(--oracle-bg-secondary)',
              borderRadius: '8px'
            }}>
              <div style={{ textAlign: 'center', color: 'var(--oracle-text-secondary)' }}>
                <PieChartOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
                <div>Pie Chart Placeholder</div>
                <div style={{ fontSize: '12px' }}>Data distribution overview</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Analytics Table */}
      <Card title="Performance Metrics" className="analytics-table">
        <Table
          dataSource={analyticsData}
          columns={columns}
          pagination={false}
          size="middle"
        />
      </Card>
    </div>
  );
};

export default AnalyticsPage;

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
          <Card title="Revenue Trend" extra={<LineChartOutlined />}>
            <div style={{ 
              height: '200px', 
              padding: '16px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '8px',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Simulated Line Chart */}
              <svg width="100%" height="100%" viewBox="0 0 300 160" style={{ position: 'absolute', top: 0, left: 0 }}>
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="30" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Revenue line */}
                <polyline
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="3"
                  points="20,120 50,100 80,80 110,90 140,60 170,70 200,40 230,50 260,30 290,20"
                />
                
                {/* Data points */}
                {[
                  {x: 20, y: 120, value: '$12K'},
                  {x: 50, y: 100, value: '$18K'},
                  {x: 80, y: 80, value: '$25K'},
                  {x: 110, y: 90, value: '$22K'},
                  {x: 140, y: 60, value: '$35K'},
                  {x: 170, y: 70, value: '$30K'},
                  {x: 200, y: 40, value: '$45K'},
                  {x: 230, y: 50, value: '$40K'},
                  {x: 260, y: 30, value: '$52K'},
                  {x: 290, y: 20, value: '$58K'}
                ].map((point, i) => (
                  <g key={i}>
                    <circle cx={point.x} cy={point.y} r="4" fill="#FFD700" />
                    <circle cx={point.x} cy={point.y} r="8" fill="rgba(255,215,0,0.3)" />
                  </g>
                ))}
              </svg>
              
              {/* Chart info overlay */}
              <div style={{ 
                position: 'absolute', 
                bottom: '16px', 
                left: '16px', 
                color: 'white',
                fontSize: '12px'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>+24.5%</div>
                <div>Revenue Growth</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="User Analytics" extra={<BarChartOutlined />}>
            <div style={{ 
              height: '200px', 
              padding: '16px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '8px',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around'
            }}>
              {/* Simulated Bar Chart */}
              {[
                {height: '60%', label: 'Mon', value: '1.2K'},
                {height: '80%', label: 'Tue', value: '1.8K'},
                {height: '45%', label: 'Wed', value: '0.9K'},
                {height: '90%', label: 'Thu', value: '2.1K'},
                {height: '75%', label: 'Fri', value: '1.6K'},
                {height: '65%', label: 'Sat', value: '1.3K'},
                {height: '85%', label: 'Sun', value: '1.9K'}
              ].map((bar, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ 
                    width: '24px', 
                    height: bar.height, 
                    background: 'rgba(255,255,255,0.9)', 
                    borderRadius: '4px 4px 0 0',
                    marginBottom: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: '10px',
                      color: 'white',
                      fontWeight: 'bold'
                    }}>
                      {bar.value}
                    </div>
                  </div>
                  <div style={{ fontSize: '10px', color: 'white', fontWeight: '500' }}>
                    {bar.label}
                  </div>
                </div>
              ))}
              
              {/* Chart info overlay */}
              <div style={{ 
                position: 'absolute', 
                top: '16px', 
                right: '16px', 
                color: 'white',
                fontSize: '12px',
                textAlign: 'right'
              }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>11.2K</div>
                <div>Weekly Active Users</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Sales Distribution" extra={<PieChartOutlined />}>
            <div style={{ 
              height: '200px', 
              padding: '16px',
              background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              borderRadius: '8px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Simulated Pie Chart */}
              <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
                {/* Pie segments */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#FFD700"
                  strokeWidth="20"
                  strokeDasharray="94 314"
                  strokeDashoffset="0"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#FF6B6B"
                  strokeWidth="20"
                  strokeDasharray="63 314"
                  strokeDashoffset="-94"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="#4ECDC4"
                  strokeWidth="20"
                  strokeDasharray="47 314"
                  strokeDashoffset="-157"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="none"
                  stroke="rgba(255,255,255,0.6)"
                  strokeWidth="20"
                  strokeDasharray="110 314"
                  strokeDashoffset="-204"
                />
              </svg>
              
              {/* Legend */}
              <div style={{ 
                position: 'absolute', 
                bottom: '16px', 
                left: '16px', 
                color: 'white',
                fontSize: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#FFD700', borderRadius: '50%', marginRight: '6px' }}></div>
                  <span>Desktop 30%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#FF6B6B', borderRadius: '50%', marginRight: '6px' }}></div>
                  <span>Mobile 20%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#4ECDC4', borderRadius: '50%', marginRight: '6px' }}></div>
                  <span>Tablet 15%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '8px', height: '8px', background: 'rgba(255,255,255,0.6)', borderRadius: '50%', marginRight: '6px' }}></div>
                  <span>Other 35%</span>
                </div>
              </div>
              
              {/* Center text */}
              <div style={{ 
                position: 'absolute', 
                top: '50%', 
                left: '50%', 
                transform: 'translate(-50%, -50%)', 
                color: 'white',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '16px', fontWeight: 'bold' }}>2.4K</div>
                <div style={{ fontSize: '10px' }}>Total Sales</div>
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

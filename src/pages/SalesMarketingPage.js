import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Statistic,
  Tag,
  Progress,
  Tabs,
  Space,
  Badge,
  Timeline,
  Typography,
  Chart,
  Tooltip,
  Avatar
} from 'antd';
import {
  TrophyOutlined,
  RiseOutlined,
  FallOutlined,
  AimOutlined,
  ThunderboltOutlined,
  SoundOutlined,
  MailOutlined,
  ShareAltOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CalendarOutlined,
  PhoneOutlined,
  DollarOutlined,
  TeamOutlined,
  LineChartOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Title } = Typography;

const SalesMarketingPage = () => {
  const [selectedTab, setSelectedTab] = useState('sales-dashboard');

  // Sample sales data
  const salesData = [
    {
      key: '1',
      salesperson: 'Sarah Johnson',
      target: 150000,
      achieved: 135000,
      deals: 12,
      avgDealSize: 11250,
      conversionRate: 24.5,
      region: 'West Coast',
      lastActivity: '2025-06-21'
    },
    {
      key: '2',
      salesperson: 'Mike Wilson',
      target: 120000,
      achieved: 128000,
      deals: 16,
      avgDealSize: 8000,
      conversionRate: 32.1,
      region: 'East Coast',
      lastActivity: '2025-06-20'
    },
    {
      key: '3',
      salesperson: 'Lisa Park',
      target: 180000,
      achieved: 165000,
      deals: 10,
      avgDealSize: 16500,
      conversionRate: 18.7,
      region: 'Central',
      lastActivity: '2025-06-21'
    }
  ];

  // Sample marketing campaigns
  const campaignsData = [
    {
      key: '1',
      name: 'Summer Product Launch',
      type: 'Product Launch',
      channel: 'Multi-Channel',
      budget: 50000,
      spent: 42000,
      leads: 1250,
      conversions: 89,
      revenue: 445000,
      roi: 892,
      status: 'Active',
      startDate: '2025-06-01',
      endDate: '2025-07-31'
    },
    {
      key: '2',
      name: 'LinkedIn Lead Generation',
      type: 'Lead Generation',
      channel: 'Social Media',
      budget: 25000,
      spent: 18500,
      leads: 850,
      conversions: 125,
      revenue: 312000,
      roi: 1586,
      status: 'Active',
      startDate: '2025-05-15',
      endDate: '2025-08-15'
    },
    {
      key: '3',
      name: 'Email Newsletter Q2',
      type: 'Email Marketing',
      channel: 'Email',
      budget: 5000,
      spent: 4200,
      leads: 320,
      conversions: 45,
      revenue: 89000,
      roi: 2119,
      status: 'Completed',
      startDate: '2025-04-01',
      endDate: '2025-06-30'
    }
  ];

  // Sample leads data
  const marketingLeadsData = [
    {
      key: '1',
      name: 'John Smith',
      company: 'Oracle Corporation',
      source: 'LinkedIn Campaign',
      score: 85,
      stage: 'Marketing Qualified',
      assignedTo: 'Sarah Johnson',
      created: '2025-06-20',
      lastTouch: '2025-06-21',
      email: 'john.smith@oracle.com'
    },
    {
      key: '2',
      name: 'Emily Davis',
      company: 'Microsoft Corp',
      source: 'Website Form',
      score: 72,
      stage: 'Sales Qualified',
      assignedTo: 'Mike Wilson',
      created: '2025-06-19',
      lastTouch: '2025-06-20',
      email: 'emily.davis@microsoft.com'
    },
    {
      key: '3',
      name: 'Robert Chen',
      company: 'Salesforce Inc',
      source: 'Email Campaign',
      score: 91,
      stage: 'Opportunity',
      assignedTo: 'Lisa Park',
      created: '2025-06-18',
      lastTouch: '2025-06-21',
      email: 'robert.chen@salesforce.com'
    }
  ];

  // Sample analytics data
  const analyticsData = [
    {
      key: '1',
      metric: 'Website Traffic',
      thisMonth: 25430,
      lastMonth: 22150,
      change: 14.8,
      trend: 'up'
    },
    {
      key: '2',
      metric: 'Conversion Rate',
      thisMonth: 3.2,
      lastMonth: 2.8,
      change: 14.3,
      trend: 'up'
    },
    {
      key: '3',
      metric: 'Cost Per Lead',
      thisMonth: 45,
      lastMonth: 52,
      change: -13.5,
      trend: 'down'
    },
    {
      key: '4',
      metric: 'Email Open Rate',
      thisMonth: 24.5,
      lastMonth: 22.1,
      change: 10.9,
      trend: 'up'
    }
  ];

  const salesColumns = [
    {
      title: 'Salesperson',
      dataIndex: 'salesperson',
      key: 'salesperson',
      render: (name) => (
        <Space>
          <Avatar style={{ backgroundColor: 'var(--oracle-primary)' }}>
            {name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{name}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Target vs Achieved',
      key: 'performance',
      render: (_, record) => {
        const percentage = (record.achieved / record.target) * 100;
        return (
          <div>
            <Progress 
              percent={percentage} 
              strokeColor={percentage >= 100 ? 'var(--oracle-success)' : 'var(--oracle-warning)'}
              format={() => `${percentage.toFixed(1)}%`}
            />
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              ${record.achieved.toLocaleString()} / ${record.target.toLocaleString()}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Deals',
      dataIndex: 'deals',
      key: 'deals',
      render: (deals) => <Badge count={deals} style={{ backgroundColor: 'var(--oracle-secondary)' }} />,
    },
    {
      title: 'Avg Deal Size',
      dataIndex: 'avgDealSize',
      key: 'avgDealSize',
      render: (size) => `$${size.toLocaleString()}`,
    },
    {
      title: 'Conversion Rate',
      dataIndex: 'conversionRate',
      key: 'conversionRate',
      render: (rate) => `${rate}%`,
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      render: (region) => <Tag color="blue">{region}</Tag>,
    },
    {
      title: 'Last Activity',
      dataIndex: 'lastActivity',
      key: 'lastActivity',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const campaignColumns = [
    {
      title: 'Campaign',
      key: 'campaign',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.name}</div>
          <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
            {record.type} • {record.channel}
          </div>
        </div>
      ),
    },
    {
      title: 'Budget',
      key: 'budget',
      render: (_, record) => {
        const spentPercentage = (record.spent / record.budget) * 100;
        return (
          <div>
            <Progress 
              percent={spentPercentage} 
              strokeColor="var(--oracle-warning)"
              format={() => `${spentPercentage.toFixed(1)}%`}
            />
            <div style={{ fontSize: '12px', marginTop: '4px' }}>
              ${record.spent.toLocaleString()} / ${record.budget.toLocaleString()}
            </div>
          </div>
        );
      },
    },
    {
      title: 'Leads',
      dataIndex: 'leads',
      key: 'leads',
      render: (leads) => <span style={{ color: 'var(--oracle-secondary)' }}>{leads.toLocaleString()}</span>,
    },
    {
      title: 'Conversions',
      dataIndex: 'conversions',
      key: 'conversions',
      render: (conversions) => <span style={{ color: 'var(--oracle-success)' }}>{conversions}</span>,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => `$${revenue.toLocaleString()}`,
    },
    {
      title: 'ROI',
      dataIndex: 'roi',
      key: 'roi',
      render: (roi) => <span style={{ color: 'var(--oracle-success)' }}>{roi}%</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          'Active': 'green',
          'Paused': 'orange',
          'Completed': 'blue',
          'Draft': 'default'
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const leadsColumns = [
    {
      title: 'Lead',
      key: 'lead',
      render: (_, record) => (
        <Space>
          <Avatar style={{ backgroundColor: 'var(--oracle-primary)' }}>
            {record.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
              {record.company}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
      render: (source) => <Tag color="blue">{source}</Tag>,
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Progress 
          percent={score} 
          size="small" 
          strokeColor="var(--oracle-primary)"
          format={percent => `${percent}`}
        />
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage) => {
        const colors = {
          'Marketing Qualified': 'orange',
          'Sales Qualified': 'blue',
          'Opportunity': 'green',
          'Customer': 'success'
        };
        return <Tag color={colors[stage]}>{stage}</Tag>;
      },
    },
    {
      title: 'Assigned To',
      dataIndex: 'assignedTo',
      key: 'assignedTo',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Last Touch',
      dataIndex: 'lastTouch',
      key: 'lastTouch',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<MailOutlined />} size="small" />
          <Button icon={<PhoneOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const analyticsColumns = [
    {
      title: 'Metric',
      dataIndex: 'metric',
      key: 'metric',
      render: (metric) => <span style={{ fontWeight: 600 }}>{metric}</span>,
    },
    {
      title: 'This Month',
      dataIndex: 'thisMonth',
      key: 'thisMonth',
      render: (value, record) => {
        if (record.metric.includes('Rate') || record.metric.includes('Cost')) {
          return record.metric.includes('Cost') ? `$${value}` : `${value}%`;
        }
        return value.toLocaleString();
      },
    },
    {
      title: 'Last Month',
      dataIndex: 'lastMonth',
      key: 'lastMonth',
      render: (value, record) => {
        if (record.metric.includes('Rate') || record.metric.includes('Cost')) {
          return record.metric.includes('Cost') ? `$${value}` : `${value}%`;
        }
        return value.toLocaleString();
      },
    },
    {
      title: 'Change',
      key: 'change',
      render: (_, record) => {
        const isPositive = record.trend === 'up';
        const icon = isPositive ? <RiseOutlined /> : <FallOutlined />;
        const color = isPositive ? 'var(--oracle-success)' : 'var(--oracle-error)';
        
        return (
          <span style={{ color }}>
            {icon} {Math.abs(record.change)}%
          </span>
        );
      },
    },
  ];

  const recentActivities = [
    {
      time: '30 minutes ago',
      activity: 'New lead from LinkedIn campaign',
      user: 'Marketing Team',
      type: 'lead'
    },
    {
      time: '2 hours ago',
      activity: 'Email campaign sent to 2,500 contacts',
      user: 'Sarah Johnson',
      type: 'email'
    },
    {
      time: '4 hours ago',
      activity: 'Sales call completed with Oracle Corp',
      user: 'Mike Wilson',
      type: 'call'
    },
    {
      time: '6 hours ago',
      activity: 'Product demo scheduled',
      user: 'Lisa Park',
      type: 'demo'
    }
  ];

  const tabItems = [
    {
      key: 'sales-dashboard',
      label: (
        <Space>
          <TrophyOutlined />
          <span>Sales Dashboard</span>
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Search placeholder="Search salespeople..." enterButton />
            </Col>
            <Col span={4}>
              <Select placeholder="Region" style={{ width: '100%' }}>
                <Option value="west">West Coast</Option>
                <Option value="east">East Coast</Option>
                <Option value="central">Central</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={4}>
              <Button type="primary" icon={<PlusOutlined />} block>
                Add Target
              </Button>
            </Col>
            <Col span={4}>
              <Button icon={<LineChartOutlined />} block>
                View Report
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={salesData} 
            columns={salesColumns} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1000 }}
          />
        </div>
      ),
    },
    {
      key: 'campaigns',
      label: (
        <Space>
          <SoundOutlined />
          <span>Marketing Campaigns</span>
          <Badge count={campaignsData.filter(c => c.status === 'Active').length} style={{ backgroundColor: 'var(--oracle-secondary)' }} />
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Search placeholder="Search campaigns..." enterButton />
            </Col>
            <Col span={4}>
              <Select placeholder="Type" style={{ width: '100%' }}>
                <Option value="product-launch">Product Launch</Option>
                <Option value="lead-generation">Lead Generation</Option>
                <Option value="email-marketing">Email Marketing</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Status" style={{ width: '100%' }}>
                <Option value="active">Active</Option>
                <Option value="paused">Paused</Option>
                <Option value="completed">Completed</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={4}>
              <Button type="primary" icon={<PlusOutlined />} block>
                New Campaign
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={campaignsData} 
            columns={campaignColumns} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1200 }}
          />
        </div>
      ),
    },
    {
      key: 'leads',
      label: (
        <Space>
          <AimOutlined />
          <span>Marketing Leads</span>
          <Badge count={marketingLeadsData.length} />
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Search placeholder="Search leads..." enterButton />
            </Col>
            <Col span={4}>
              <Select placeholder="Source" style={{ width: '100%' }}>
                <Option value="linkedin">LinkedIn</Option>
                <Option value="website">Website</Option>
                <Option value="email">Email</Option>
                <Option value="referral">Referral</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Stage" style={{ width: '100%' }}>
                <Option value="mql">Marketing Qualified</Option>
                <Option value="sql">Sales Qualified</Option>
                <Option value="opportunity">Opportunity</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={4}>
              <Button type="primary" icon={<PlusOutlined />} block>
                Import Leads
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={marketingLeadsData} 
            columns={leadsColumns} 
            pagination={{ pageSize: 15 }}
            scroll={{ x: 1000 }}
          />
        </div>
      ),
    },
    {
      key: 'analytics',
      label: (
        <Space>
          <BarChartOutlined />
          <span>Analytics</span>
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Select placeholder="Time Period" style={{ width: '100%' }}>
                <Option value="last-30-days">Last 30 Days</Option>
                <Option value="last-90-days">Last 90 Days</Option>
                <Option value="this-quarter">This Quarter</Option>
                <Option value="this-year">This Year</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder="Campaign" style={{ width: '100%' }}>
                <Option value="all">All Campaigns</Option>
                <Option value="summer-launch">Summer Product Launch</Option>
                <Option value="linkedin">LinkedIn Lead Generation</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Button type="primary" icon={<BarChartOutlined />} block>
                Generate Report
              </Button>
            </Col>
            <Col span={6}>
              <Button icon={<ShareAltOutlined />} block>
                Export Data
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={analyticsData} 
            columns={analyticsColumns} 
            pagination={false}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>Sales & Marketing</h1>
        <p>Drive revenue growth with comprehensive sales tracking and marketing campaign management</p>
      </div>

      {/* Sales & Marketing KPI Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={428000}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: 'var(--oracle-success)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <RiseOutlined style={{ color: 'var(--oracle-success)' }} />
              <span style={{ color: 'var(--oracle-success)', marginLeft: '4px' }}>
                +18.5% vs target
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Sales Team Performance"
              value={96.2}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: 'var(--oracle-primary)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                Average target achievement
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Marketing ROI"
              value={1532}
              suffix="%"
              prefix={<ThunderboltOutlined />}
              valueStyle={{ color: 'var(--oracle-secondary)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <RiseOutlined style={{ color: 'var(--oracle-success)' }} />
              <span style={{ color: 'var(--oracle-success)', marginLeft: '4px' }}>
                +245% from last quarter
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Campaigns"
              value={8}
              prefix={<SoundOutlined />}
              valueStyle={{ color: 'var(--oracle-warning)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                $82K total budget
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={18}>
          {/* Main Sales & Marketing Tabs */}
          <Card>
            <Tabs
              activeKey={selectedTab}
              onChange={setSelectedTab}
              items={tabItems}
              size="large"
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          {/* Recent Sales & Marketing Activities */}
          <Card title="Recent Activities" size="small">
            <Timeline
              items={recentActivities.map((activity, index) => ({
                children: (
                  <div key={index}>
                    <div style={{ fontWeight: 500, fontSize: '13px' }}>
                      {activity.activity}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: 'var(--oracle-text-secondary)',
                      marginTop: '4px'
                    }}>
                      {activity.user} • {activity.time}
                    </div>
                  </div>
                ),
                color: activity.type === 'lead' ? 'green' : 
                       activity.type === 'email' ? 'blue' :
                       activity.type === 'call' ? 'orange' : 'purple'
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SalesMarketingPage;

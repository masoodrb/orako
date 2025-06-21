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
  Progress,
  Statistic,
  Tag,
  Avatar,
  Timeline,
  Tabs,
  Form,
  Space,
  Badge,
  Tooltip,
  Divider
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  DollarOutlined,
  TrophyOutlined,
  TeamOutlined,
  RiseOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const CRMPage = () => {
  const [selectedTab, setSelectedTab] = useState('leads');

  // Sample data for leads
  const leadsData = [
    {
      key: '1',
      name: 'John Smith',
      company: 'Oracle Corporation',
      email: 'john.smith@oracle.com',
      phone: '+1-555-0123',
      value: 125000,
      stage: 'Qualification',
      owner: 'Sarah Johnson',
      lastActivity: '2025-06-20',
      score: 85
    },
    {
      key: '2',
      name: 'Emily Davis',
      company: 'Microsoft Corp',
      email: 'emily.davis@microsoft.com',
      phone: '+1-555-0456',
      value: 89000,
      stage: 'Proposal',
      owner: 'Mike Wilson',
      lastActivity: '2025-06-19',
      score: 72
    },
    {
      key: '3',
      name: 'Robert Chen',
      company: 'Salesforce Inc',
      email: 'robert.chen@salesforce.com',
      phone: '+1-555-0789',
      value: 156000,
      stage: 'Negotiation',
      owner: 'Lisa Park',
      lastActivity: '2025-06-21',
      score: 91
    }
  ];

  // Sample data for opportunities
  const opportunitiesData = [
    {
      key: '1',
      name: 'Cloud Infrastructure Upgrade',
      account: 'Oracle Corporation',
      amount: 450000,
      stage: 'Proposal',
      probability: 75,
      closeDate: '2025-07-15',
      owner: 'Sarah Johnson'
    },
    {
      key: '2',
      name: 'ERP Implementation',
      account: 'Microsoft Corp',
      amount: 320000,
      stage: 'Negotiation',
      probability: 60,
      closeDate: '2025-08-01',
      owner: 'Mike Wilson'
    }
  ];

  // Sample data for customers
  const customersData = [
    {
      key: '1',
      name: 'Oracle Corporation',
      contact: 'John Smith',
      email: 'john.smith@oracle.com',
      phone: '+1-555-0123',
      industry: 'Technology',
      value: 2500000,
      lastOrder: '2025-06-15',
      status: 'Active'
    },
    {
      key: '2',
      name: 'Microsoft Corp',
      contact: 'Emily Davis',
      email: 'emily.davis@microsoft.com',
      phone: '+1-555-0456',
      industry: 'Technology',
      value: 1800000,
      lastOrder: '2025-05-28',
      status: 'Active'
    }
  ];

  const leadsColumns = [
    {
      title: 'Lead Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <div style={{ fontWeight: 600 }}>{text}</div>
            <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
              {record.company}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact Info',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div><MailOutlined /> {record.email}</div>
          <div><PhoneOutlined /> {record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      render: (value) => (
        <Statistic
          value={value}
          prefix={<DollarOutlined />}
          precision={0}
          valueStyle={{ fontSize: '14px' }}
        />
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage) => {
        const colors = {
          'New': 'blue',
          'Qualification': 'orange',
          'Proposal': 'purple',
          'Negotiation': 'green',
          'Closed Won': 'success',
          'Closed Lost': 'error'
        };
        return <Tag color={colors[stage]}>{stage}</Tag>;
      },
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
      render: (score) => (
        <Progress percent={score} size="small" strokeColor="var(--oracle-primary)" />
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  const opportunitiesColumns = [
    {
      title: 'Opportunity',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{text}</div>
          <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
            {record.account}
          </div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Statistic
          value={amount}
          prefix={<DollarOutlined />}
          precision={0}
          valueStyle={{ fontSize: '14px' }}
        />
      ),
    },
    {
      title: 'Stage',
      dataIndex: 'stage',
      key: 'stage',
      render: (stage) => <Tag color="blue">{stage}</Tag>,
    },
    {
      title: 'Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (probability) => (
        <Progress 
          percent={probability} 
          size="small" 
          strokeColor="var(--oracle-secondary)"
          format={percent => `${percent}%`}
        />
      ),
    },
    {
      title: 'Close Date',
      dataIndex: 'closeDate',
      key: 'closeDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Owner',
      dataIndex: 'owner',
      key: 'owner',
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

  const customersColumns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar style={{ backgroundColor: 'var(--oracle-primary)' }}>
            {text.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{text}</div>
            <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
              {record.industry}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.contact}</div>
          <div style={{ fontSize: '12px' }}>{record.email}</div>
          <div style={{ fontSize: '12px' }}>{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Total Value',
      dataIndex: 'value',
      key: 'value',
      render: (value) => (
        <Statistic
          value={value}
          prefix={<DollarOutlined />}
          precision={0}
          valueStyle={{ fontSize: '14px' }}
        />
      ),
    },
    {
      title: 'Last Order',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'Active' ? 'success' : 'default'} 
          text={status} 
        />
      ),
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

  const salesActivities = [
    {
      time: '2 hours ago',
      activity: 'Call completed with Oracle Corporation',
      user: 'Sarah Johnson',
      type: 'call'
    },
    {
      time: '5 hours ago',
      activity: 'Email sent to Microsoft Corp',
      user: 'Mike Wilson',
      type: 'email'
    },
    {
      time: '1 day ago',
      activity: 'Meeting scheduled with Salesforce Inc',
      user: 'Lisa Park',
      type: 'meeting'
    },
    {
      time: '2 days ago',
      activity: 'Proposal sent to Oracle Corporation',
      user: 'Sarah Johnson',
      type: 'proposal'
    }
  ];

  const tabItems = [
    {
      key: 'leads',
      label: (
        <Space>
          <UserOutlined />
          <span>Leads</span>
          <Badge count={leadsData.length} />
        </Space>
      ),
      children: (
        <div>
          {/* Search Row */}
          <Row style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Search 
                placeholder="Search leads..." 
                enterButton 
                style={{ maxWidth: '400px', width: '100%' }} 
              />
            </Col>
          </Row>
          
          {/* Filters Row */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={4}>
              <Select placeholder="Stage" style={{ width: '100%' }}>
                <Option value="new">New</Option>
                <Option value="qualification">Qualification</Option>
                <Option value="proposal">Proposal</Option>
                <Option value="negotiation">Negotiation</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Owner" style={{ width: '100%' }}>
                <Option value="sarah">Sarah Johnson</Option>
                <Option value="mike">Mike Wilson</Option>
                <Option value="lisa">Lisa Park</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={4}>
              <Button type="primary" icon={<PlusOutlined />} block>
                New Lead
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={leadsData} 
            columns={leadsColumns} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </div>
      ),
    },
    {
      key: 'opportunities',
      label: (
        <Space>
          <TrophyOutlined />
          <span>Opportunities</span>
          <Badge count={opportunitiesData.length} />
        </Space>
      ),
      children: (
        <div>
          {/* Search Row */}
          <Row style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Search 
                placeholder="Search opportunities..." 
                enterButton 
                style={{ maxWidth: '400px', width: '100%' }} 
              />
            </Col>
          </Row>
          
          {/* Filters Row */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={4}>
              <Select placeholder="Stage" style={{ width: '100%' }}>
                <Option value="qualification">Qualification</Option>
                <Option value="proposal">Proposal</Option>
                <Option value="negotiation">Negotiation</Option>
                <Option value="closed">Closed Won</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={6}>
              <Button type="primary" icon={<PlusOutlined />} block>
                New Opportunity
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={opportunitiesData} 
            columns={opportunitiesColumns} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </div>
      ),
    },
    {
      key: 'customers',
      label: (
        <Space>
          <TeamOutlined />
          <span>Customers</span>
          <Badge count={customersData.length} />
        </Space>
      ),
      children: (
        <div>
          {/* Search Row */}
          <Row style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Search 
                placeholder="Search customers..." 
                enterButton 
                style={{ maxWidth: '400px', width: '100%' }} 
              />
            </Col>
          </Row>
          
          {/* Filters Row */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={4}>
              <Select placeholder="Industry" style={{ width: '100%' }}>
                <Option value="technology">Technology</Option>
                <Option value="finance">Finance</Option>
                <Option value="healthcare">Healthcare</Option>
                <Option value="manufacturing">Manufacturing</Option>
              </Select>
            </Col>
            <Col span={4}>
              <Select placeholder="Status" style={{ width: '100%' }}>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={6}>
              <Button type="primary" icon={<PlusOutlined />} block>
                New Customer
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={customersData} 
            columns={customersColumns} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>Customer Relationship Management</h1>
        <p>Manage your sales pipeline, customer relationships, and business opportunities</p>
      </div>

      {/* KPI Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Pipeline Value"
              value={1250000}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: 'var(--oracle-primary)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <RiseOutlined style={{ color: 'var(--oracle-success)' }} />
              <span style={{ color: 'var(--oracle-success)', marginLeft: '4px' }}>
                +12.5% from last month
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Leads"
              value={156}
              prefix={<UserOutlined />}
              valueStyle={{ color: 'var(--oracle-secondary)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                23 new this week
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={23.8}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: 'var(--oracle-success)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-success)' }}>
                +2.3% improvement
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={485000}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: 'var(--oracle-warning)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                Target: $500K
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={18}>
          {/* Main CRM Tabs */}
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
          {/* Sales Activity Timeline */}
          <Card title="Recent Sales Activities" size="small">
            <Timeline
              items={salesActivities.map((activity, index) => ({
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
                color: activity.type === 'call' ? 'blue' : 
                       activity.type === 'email' ? 'green' :
                       activity.type === 'meeting' ? 'orange' : 'purple'
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CRMPage;

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
  Divider,
  Modal,
  message
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
  
  // Modal states
  const [isLeadModalVisible, setIsLeadModalVisible] = useState(false);
  const [isOpportunityModalVisible, setIsOpportunityModalVisible] = useState(false);
  const [isCustomerModalVisible, setIsCustomerModalVisible] = useState(false);
  
  // Form instances
  const [leadForm] = Form.useForm();
  const [opportunityForm] = Form.useForm();
  const [customerForm] = Form.useForm();

  // Sample data for leads
  const [leadsData, setLeadsData] = useState([
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
      score: 85,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
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
      score: 72,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
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
      score: 91,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  // Sample data for opportunities
  const [opportunitiesData, setOpportunitiesData] = useState([
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
  ]);

  // Sample data for customers
  const [customersData, setCustomersData] = useState([
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
  ]);

  // Form submission handlers
  const handleAddLead = (values) => {
    const newLead = {
      key: Date.now().toString(),
      name: values.name,
      company: values.company,
      email: values.email,
      phone: values.phone,
      value: values.value || 0,
      stage: values.stage || 'New',
      owner: values.owner || 'Current User',
      lastActivity: dayjs().format('YYYY-MM-DD'),
      score: values.score || 50
    };
    setLeadsData(prev => [newLead, ...prev]);
    setIsLeadModalVisible(false);
    leadForm.resetFields();
    message.success('Lead added successfully');
  };

  const handleAddOpportunity = (values) => {
    const newOpportunity = {
      key: Date.now().toString(),
      name: values.name,
      account: values.account,
      amount: values.amount || 0,
      stage: values.stage || 'Qualification',
      probability: values.probability || 10,
      closeDate: values.closeDate ? values.closeDate.format('YYYY-MM-DD') : '',
      owner: values.owner || 'Current User'
    };
    setOpportunitiesData(prev => [newOpportunity, ...prev]);
    setIsOpportunityModalVisible(false);
    opportunityForm.resetFields();
    message.success('Opportunity added successfully');
  };

  const handleAddCustomer = (values) => {
    const newCustomer = {
      key: Date.now().toString(),
      name: values.name,
      contact: values.contact,
      email: values.email,
      phone: values.phone,
      industry: values.industry || 'Other',
      value: values.value || 0,
      lastOrder: values.lastOrder ? values.lastOrder.format('YYYY-MM-DD') : '',
      status: values.status || 'Active'
    };
    setCustomersData(prev => [newCustomer, ...prev]);
    setIsCustomerModalVisible(false);
    customerForm.resetFields();
    message.success('Customer added successfully');
  };

  const leadsColumns = [
    {
      title: 'Lead Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar 
            src={record.avatar}
            icon={!record.avatar ? <UserOutlined /> : undefined}
          >
            {!record.avatar && text.charAt(0)}
          </Avatar>
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
              <Button type="primary" icon={<PlusOutlined />} block onClick={() => setIsLeadModalVisible(true)}>
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
              <Button type="primary" icon={<PlusOutlined />} block onClick={() => setIsOpportunityModalVisible(true)}>
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
              <Button type="primary" icon={<PlusOutlined />} block onClick={() => setIsCustomerModalVisible(true)}>
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

      {/* New Lead Modal */}
      <Modal
        title="Add New Lead"
        open={isLeadModalVisible}
        onCancel={() => setIsLeadModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={leadForm}
          layout="vertical"
          onFinish={handleAddLead}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Lead Name"
                rules={[{ required: true, message: 'Please enter lead name' }]}
              >
                <Input placeholder="Enter lead name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="company"
                label="Company"
                rules={[{ required: true, message: 'Please enter company name' }]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="value"
                label="Estimated Value ($)"
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="stage"
                label="Stage"
              >
                <Select placeholder="Select stage">
                  <Option value="New">New</Option>
                  <Option value="Qualification">Qualification</Option>
                  <Option value="Proposal">Proposal</Option>
                  <Option value="Negotiation">Negotiation</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="score"
                label="Lead Score"
              >
                <Input type="number" placeholder="50" min={0} max={100} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="owner"
            label="Owner"
          >
            <Select placeholder="Select owner">
              <Option value="Sarah Johnson">Sarah Johnson</Option>
              <Option value="Mike Wilson">Mike Wilson</Option>
              <Option value="Lisa Park">Lisa Park</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Lead
              </Button>
              <Button onClick={() => setIsLeadModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* New Opportunity Modal */}
      <Modal
        title="Add New Opportunity"
        open={isOpportunityModalVisible}
        onCancel={() => setIsOpportunityModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={opportunityForm}
          layout="vertical"
          onFinish={handleAddOpportunity}
        >
          <Form.Item
            name="name"
            label="Opportunity Name"
            rules={[{ required: true, message: 'Please enter opportunity name' }]}
          >
            <Input placeholder="Enter opportunity name" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="account"
                label="Account"
                rules={[{ required: true, message: 'Please enter account name' }]}
              >
                <Input placeholder="Enter account name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Amount ($)"
                rules={[{ required: true, message: 'Please enter amount' }]}
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="stage"
                label="Stage"
                rules={[{ required: true, message: 'Please select stage' }]}
              >
                <Select placeholder="Select stage">
                  <Option value="Qualification">Qualification</Option>
                  <Option value="Proposal">Proposal</Option>
                  <Option value="Negotiation">Negotiation</Option>
                  <Option value="Closed Won">Closed Won</Option>
                  <Option value="Closed Lost">Closed Lost</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="probability"
                label="Probability (%)"
              >
                <Input type="number" placeholder="10" min={0} max={100} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="closeDate"
                label="Expected Close Date"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="owner"
            label="Owner"
          >
            <Select placeholder="Select owner">
              <Option value="Sarah Johnson">Sarah Johnson</Option>
              <Option value="Mike Wilson">Mike Wilson</Option>
              <Option value="Lisa Park">Lisa Park</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Opportunity
              </Button>
              <Button onClick={() => setIsOpportunityModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* New Customer Modal */}
      <Modal
        title="Add New Customer"
        open={isCustomerModalVisible}
        onCancel={() => setIsCustomerModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={customerForm}
          layout="vertical"
          onFinish={handleAddCustomer}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Company Name"
                rules={[{ required: true, message: 'Please enter company name' }]}
              >
                <Input placeholder="Enter company name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="contact"
                label="Primary Contact"
                rules={[{ required: true, message: 'Please enter contact name' }]}
              >
                <Input placeholder="Enter contact name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="industry"
                label="Industry"
              >
                <Select placeholder="Select industry">
                  <Option value="Technology">Technology</Option>
                  <Option value="Healthcare">Healthcare</Option>
                  <Option value="Finance">Finance</Option>
                  <Option value="Manufacturing">Manufacturing</Option>
                  <Option value="Retail">Retail</Option>
                  <Option value="Education">Education</Option>
                  <Option value="Other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="value"
                label="Account Value ($)"
              >
                <Input type="number" placeholder="0" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="status"
                label="Status"
              >
                <Select placeholder="Select status">
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="lastOrder"
            label="Last Order Date"
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Add Customer
              </Button>
              <Button onClick={() => setIsCustomerModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CRMPage;

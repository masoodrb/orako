import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Table,
  Space,
  Input,
  Select,
  DatePicker,
  Modal,
  Form,
  Tag,
  Statistic,
  Avatar,
  Tooltip,
  Dropdown,
  message,
  Progress,
  Timeline,
  Descriptions,
  Divider,
  Badge,
  Tabs,
  InputNumber,
  List,
  Empty
} from 'antd';
import {
  FileSearchOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SendOutlined,
  DownloadOutlined,
  PrinterOutlined,
  MailOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  CalendarOutlined,
  CopyOutlined,
  ShareAltOutlined,
  FileProtectOutlined,
  TrophyOutlined,
  RiseOutlined,
  BarChartOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  BuildOutlined,
  StarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const QuotationsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('quotations');

  // Sample quotations data
  const quotationsData = [
    {
      key: '1',
      quotationNumber: 'QUO-2024-001',
      title: 'ERP Software Implementation Package',
      client: 'Oracle Corporation',
      contactPerson: 'John Smith',
      email: 'john.smith@oracle.com',
      phone: '+1-555-0123',
      address: '500 Oracle Parkway, Redwood City, CA 94065',
      totalAmount: 150000,
      currency: 'USD',
      status: 'Sent',
      priority: 'High',
      validUntil: '2024-02-15',
      createdDate: '2024-01-15',
      submittedBy: 'Sarah Johnson',
      salesRep: 'Michael Chen',
      probability: 75,
      nextFollowUp: '2024-01-25',
      tags: ['Enterprise', 'ERP', 'Implementation'],
      description: 'Complete ERP software implementation with training and 1-year support.',
      items: [
        { name: 'ERP Software License', quantity: 100, rate: 500, amount: 50000 },
        { name: 'Implementation Services', quantity: 200, rate: 300, amount: 60000 },
        { name: 'Training Sessions', quantity: 40, rate: 250, amount: 10000 },
        { name: 'Support & Maintenance (1 Year)', quantity: 1, rate: 30000, amount: 30000 }
      ],
      notes: 'Client is interested in additional modules for future expansion.',
      terms: 'Payment terms: 50% upfront, 50% on completion. Delivery: 6 months.',
    },
    {
      key: '2',
      quotationNumber: 'QUO-2024-002',
      title: 'Cloud Infrastructure Migration',
      client: 'Microsoft Azure Division',
      contactPerson: 'Emily Davis',
      email: 'emily.davis@microsoft.com',
      phone: '+1-555-0124',
      address: 'One Microsoft Way, Redmond, WA 98052',
      totalAmount: 85000,
      currency: 'USD',
      status: 'Draft',
      priority: 'Medium',
      validUntil: '2024-02-20',
      createdDate: '2024-01-18',
      submittedBy: 'David Miller',
      salesRep: 'Lisa Anderson',
      probability: 60,
      nextFollowUp: '2024-01-30',
      tags: ['Cloud', 'Migration', 'Infrastructure'],
      description: 'Complete cloud infrastructure migration and optimization services.',
      items: [
        { name: 'Cloud Migration Planning', quantity: 1, rate: 15000, amount: 15000 },
        { name: 'Data Migration Services', quantity: 500, rate: 80, amount: 40000 },
        { name: 'Infrastructure Setup', quantity: 1, rate: 20000, amount: 20000 },
        { name: 'Optimization & Testing', quantity: 1, rate: 10000, amount: 10000 }
      ],
      notes: 'Client requires minimal downtime during migration.',
      terms: 'Payment terms: 30% upfront, 40% milestone, 30% completion.',
    },
    {
      key: '3',
      quotationNumber: 'QUO-2024-003',
      title: 'Digital Transformation Consulting',
      client: 'IBM Global Services',
      contactPerson: 'Robert Wilson',
      email: 'robert.wilson@ibm.com',
      phone: '+1-555-0125',
      address: '1 New Orchard Road, Armonk, NY 10504',
      totalAmount: 220000,
      currency: 'USD',
      status: 'Approved',
      priority: 'High',
      validUntil: '2024-02-10',
      createdDate: '2024-01-10',
      submittedBy: 'Maria Garcia',
      salesRep: 'Alex Thompson',
      probability: 95,
      nextFollowUp: '2024-01-22',
      tags: ['Digital', 'Transformation', 'Consulting'],
      description: 'Comprehensive digital transformation strategy and implementation.',
      items: [
        { name: 'Digital Strategy Assessment', quantity: 1, rate: 25000, amount: 25000 },
        { name: 'Process Automation', quantity: 10, rate: 8000, amount: 80000 },
        { name: 'System Integration', quantity: 1, rate: 60000, amount: 60000 },
        { name: 'Change Management', quantity: 1, rate: 35000, amount: 35000 },
        { name: 'Training & Support', quantity: 1, rate: 20000, amount: 20000 }
      ],
      notes: 'Client approved initial proposal, negotiating implementation timeline.',
      terms: 'Payment terms: 25% upfront, 25% each quarter milestone.',
    },
    {
      key: '4',
      quotationNumber: 'QUO-2024-004',
      title: 'Cybersecurity Audit & Implementation',
      client: 'Amazon Web Services',
      contactPerson: 'Jennifer Brown',
      email: 'jennifer.brown@aws.com',
      phone: '+1-555-0126',
      address: '410 Terry Ave N, Seattle, WA 98109',
      totalAmount: 65000,
      currency: 'USD',
      status: 'Rejected',
      priority: 'Low',
      validUntil: '2024-01-30',
      createdDate: '2024-01-12',
      submittedBy: 'Carlos Rodriguez',
      salesRep: 'Jennifer Lee',
      probability: 0,
      nextFollowUp: null,
      tags: ['Security', 'Audit', 'Compliance'],
      description: 'Complete cybersecurity audit and security enhancement implementation.',
      items: [
        { name: 'Security Assessment', quantity: 1, rate: 15000, amount: 15000 },
        { name: 'Vulnerability Testing', quantity: 1, rate: 20000, amount: 20000 },
        { name: 'Security Implementation', quantity: 1, rate: 25000, amount: 25000 },
        { name: 'Compliance Documentation', quantity: 1, rate: 5000, amount: 5000 }
      ],
      notes: 'Client chose another vendor with lower pricing.',
      terms: 'Payment terms: 40% upfront, 60% on completion.',
    },
    {
      key: '5',
      quotationNumber: 'QUO-2024-005',
      title: 'AI & Machine Learning Platform',
      client: 'Google Cloud Platform',
      contactPerson: 'Alex Thompson',
      email: 'alex.thompson@google.com',
      phone: '+1-555-0127',
      address: '1600 Amphitheatre Parkway, Mountain View, CA 94043',
      totalAmount: 195000,
      currency: 'USD',
      status: 'Under Review',
      priority: 'High',
      validUntil: '2024-03-01',
      createdDate: '2024-01-20',
      submittedBy: 'Dr. Priya Patel',
      salesRep: 'Robert Kim',
      probability: 80,
      nextFollowUp: '2024-01-28',
      tags: ['AI', 'Machine Learning', 'Analytics'],
      description: 'Custom AI and machine learning platform development with analytics.',
      items: [
        { name: 'AI Platform Development', quantity: 1, rate: 80000, amount: 80000 },
        { name: 'ML Model Development', quantity: 5, rate: 15000, amount: 75000 },
        { name: 'Data Analytics Dashboard', quantity: 1, rate: 25000, amount: 25000 },
        { name: 'Testing & Optimization', quantity: 1, rate: 15000, amount: 15000 }
      ],
      notes: 'Client is very interested, pending technical review.',
      terms: 'Payment terms: 30% upfront, 40% milestone, 30% completion.',
    }
  ];

  // Statistics data
  const statisticsData = {
    totalQuotations: quotationsData.length,
    totalValue: quotationsData.reduce((sum, quotation) => sum + quotation.totalAmount, 0),
    avgQuotationValue: quotationsData.reduce((sum, quotation) => sum + quotation.totalAmount, 0) / quotationsData.length,
    winRate: Math.round((quotationsData.filter(q => q.status === 'Approved').length / quotationsData.length) * 100),
    pendingQuotations: quotationsData.filter(q => ['Sent', 'Under Review', 'Draft'].includes(q.status)).length,
    approvedQuotations: quotationsData.filter(q => q.status === 'Approved').length
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'default',
      'Sent': 'processing',
      'Under Review': 'warning',
      'Approved': 'success',
      'Rejected': 'error'
    };
    return colors[status] || 'default';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'red',
      'Medium': 'orange',
      'Low': 'blue'
    };
    return colors[priority] || 'default';
  };

  const handleCreateQuotation = () => {
    setSelectedQuotation(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleViewQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    setIsModalVisible(true);
  };

  const handleEditQuotation = (quotation) => {
    setSelectedQuotation(quotation);
    form.setFieldsValue({
      ...quotation,
      validUntil: quotation.validUntil ? dayjs(quotation.validUntil) : null,
      nextFollowUp: quotation.nextFollowUp ? dayjs(quotation.nextFollowUp) : null,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (selectedQuotation && !form.getFieldsValue().title) {
      // View mode - just close modal
      setIsModalVisible(false);
      return;
    }
    
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success(selectedQuotation ? 'Quotation updated successfully!' : 'Quotation created successfully!');
      setIsModalVisible(false);
      form.resetFields();
    }).catch(error => {
      console.log('Validation error:', error);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedQuotation(null);
  };

  const columns = [
    {
      title: 'Quotation #',
      dataIndex: 'quotationNumber',
      key: 'quotationNumber',
      width: 140,
      render: (text, record) => (
        <div>
          <Text strong style={{ color: 'var(--orako-primary)' }}>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {dayjs(record.createdDate).format('MMM DD, YYYY')}
          </Text>
        </div>
      ),
    },
    {
      title: 'Quotation Details',
      key: 'details',
      width: 250,
      render: (_, record) => (
        <div>
          <Text strong>{record.title}</Text>
          <br />
          <Text type="secondary">{record.client}</Text>
          <br />
          <div style={{ marginTop: '4px' }}>
            {record.tags.slice(0, 2).map(tag => (
              <Tag key={tag} size="small" style={{ fontSize: '10px' }}>{tag}</Tag>
            ))}
            {record.tags.length > 2 && <Text type="secondary">+{record.tags.length - 2}</Text>}
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      width: 160,
      render: (_, record) => (
        <div>
          <Text>{record.contactPerson}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.phone}</Text>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: 120,
      render: (amount, record) => (
        <div>
          <Text strong style={{ color: 'var(--orako-success)', fontSize: '16px' }}>
            ${amount.toLocaleString()}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.currency}</Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status, record) => (
        <div>
          <Tag color={getStatusColor(status)}>{status}</Tag>
          <br />
          <Tag color={getPriorityColor(record.priority)} size="small">
            {record.priority}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Progress',
      key: 'progress',
      width: 120,
      render: (_, record) => (
        <div>
          <Progress 
            percent={record.probability} 
            size="small" 
            strokeColor={record.probability > 70 ? 'var(--orako-success)' : record.probability > 40 ? 'var(--orako-warning)' : 'var(--orako-error)'}
          />
          <Text type="secondary" style={{ fontSize: '11px' }}>Win Rate: {record.probability}%</Text>
        </div>
      ),
    },
    {
      title: 'Valid Until',
      dataIndex: 'validUntil',
      key: 'validUntil',
      width: 110,
      render: (date) => (
        <Text style={{ 
          color: dayjs(date).isBefore(dayjs()) ? 'var(--orako-error)' : 'var(--orako-text-primary)' 
        }}>
          {dayjs(date).format('MMM DD, YYYY')}
        </Text>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewQuotation(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEditQuotation(record)}
            />
          </Tooltip>
          <Dropdown 
            menu={{
              items: [
                {
                  key: 'send',
                  icon: <SendOutlined />,
                  label: 'Send to Client',
                  onClick: () => message.success('Quotation sent to client')
                },
                {
                  key: 'duplicate',
                  icon: <CopyOutlined />,
                  label: 'Duplicate',
                  onClick: () => message.success('Quotation duplicated')
                },
                {
                  key: 'download',
                  icon: <DownloadOutlined />,
                  label: 'Download PDF',
                  onClick: () => message.success('Downloading quotation PDF')
                },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: 'Delete',
                  danger: true,
                  onClick: () => message.success('Quotation deleted')
                }
              ]
            }}
            trigger={['click']}
          >
            <Button type="text" icon={<EditOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  const filteredData = quotationsData.filter(quotation => {
    const matchesSearch = quotation.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         quotation.client.toLowerCase().includes(searchText.toLowerCase()) ||
                         quotation.quotationNumber.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>
          <FileSearchOutlined style={{ marginRight: '12px', color: 'var(--orako-primary)' }} />
          Quotations Management
        </Title>
        <Paragraph>
          Create, manage, and track quotations and price estimates for clients
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Total Quotations"
              value={statisticsData.totalQuotations}
              prefix={<FileSearchOutlined />}
              valueStyle={{ color: 'var(--orako-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Total Value"
              value={statisticsData.totalValue}
              prefix="$"
              precision={0}
              valueStyle={{ color: 'var(--orako-success)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Win Rate"
              value={statisticsData.winRate}
              suffix="%"
              prefix={<TrophyOutlined />}
              valueStyle={{ color: 'var(--orako-warning)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Avg Quotation Value"
              value={statisticsData.avgQuotationValue}
              prefix="$"
              precision={0}
              valueStyle={{ color: 'var(--orako-info)' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card className="oracle-shadow-sm">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="All Quotations" key="quotations">
            {/* Filters and Actions */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Search
                  placeholder="Search quotations..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Filter by status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <Option value="all">All Status</Option>
                  <Option value="Draft">Draft</Option>
                  <Option value="Sent">Sent</Option>
                  <Option value="Under Review">Under Review</Option>
                  <Option value="Approved">Approved</Option>
                  <Option value="Rejected">Rejected</Option>
                </Select>
              </Col>
              <Col xs={24} sm={24} md={8} lg={12}>
                <Space style={{ float: 'right' }}>
                  <Button icon={<FilterOutlined />}>
                    More Filters
                  </Button>
                  <Button icon={<DownloadOutlined />}>
                    Export
                  </Button>
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateQuotation}>
                    Create Quotation
                  </Button>
                </Space>
              </Col>
            </Row>

            {/* Quotations Table */}
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} quotations`,
              }}
              scroll={{ x: 1300 }}
              size="middle"
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Analytics" key="analytics">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Quotation Status Distribution" className="oracle-shadow-sm">
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">Status distribution chart would be displayed here</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Monthly Quotation Trends" className="oracle-shadow-sm">
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">Monthly trends chart would be displayed here</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24}>
                <Card title="Top Performing Quotations" className="oracle-shadow-sm">
                  <Table
                    dataSource={quotationsData.filter(q => q.status === 'Approved').slice(0, 5)}
                    columns={[
                      {
                        title: 'Quotation',
                        dataIndex: 'title',
                        key: 'title',
                      },
                      {
                        title: 'Client',
                        dataIndex: 'client',
                        key: 'client',
                      },
                      {
                        title: 'Value',
                        dataIndex: 'totalAmount',
                        key: 'totalAmount',
                        render: (amount) => `$${amount.toLocaleString()}`,
                      },
                      {
                        title: 'Items',
                        dataIndex: 'items',
                        key: 'items',
                        render: (items) => items?.length || 0,
                      },
                      {
                        title: 'Win Rate',
                        dataIndex: 'probability',
                        key: 'probability',
                        render: (prob) => `${prob}%`,
                      }
                    ]}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      {/* View/Edit Quotation Modal */}
      <Modal
        title={
          selectedQuotation && !form.getFieldsValue().title ? 
          `Quotation Details - ${selectedQuotation?.quotationNumber}` : 
          selectedQuotation ? 'Edit Quotation' : 'Create New Quotation'
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={1000}
        okText={
          selectedQuotation && !form.getFieldsValue().title ? 'Close' :
          selectedQuotation ? 'Update Quotation' : 'Create Quotation'
        }
        cancelText={selectedQuotation && !form.getFieldsValue().title ? null : 'Cancel'}
      >
        {selectedQuotation && !form.getFieldsValue().title ? (
          // View Mode
          <div>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Quotation Number">{selectedQuotation.quotationNumber}</Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(selectedQuotation.status)}>{selectedQuotation.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Title">{selectedQuotation.title}</Descriptions.Item>
              <Descriptions.Item label="Priority">
                <Tag color={getPriorityColor(selectedQuotation.priority)}>{selectedQuotation.priority}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Client">{selectedQuotation.client}</Descriptions.Item>
              <Descriptions.Item label="Contact Person">{selectedQuotation.contactPerson}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedQuotation.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedQuotation.phone}</Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                <Text strong style={{ color: 'var(--orako-success)', fontSize: '16px' }}>
                  ${selectedQuotation.totalAmount.toLocaleString()} {selectedQuotation.currency}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Valid Until">
                {dayjs(selectedQuotation.validUntil).format('MMMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Sales Rep">{selectedQuotation.salesRep}</Descriptions.Item>
              <Descriptions.Item label="Win Probability">{selectedQuotation.probability}%</Descriptions.Item>
            </Descriptions>
            
            <Divider orientation="left">Items</Divider>
            <Table
              dataSource={selectedQuotation.items}
              columns={[
                { title: 'Item', dataIndex: 'name', key: 'name' },
                { title: 'Qty', dataIndex: 'quantity', key: 'quantity', width: 80 },
                { title: 'Rate', dataIndex: 'rate', key: 'rate', width: 100, render: (rate) => `$${rate}` },
                { title: 'Amount', dataIndex: 'amount', key: 'amount', width: 120, render: (amount) => `$${amount.toLocaleString()}` }
              ]}
              pagination={false}
              size="small"
              summary={() => (
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}><strong>Total</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <strong>${selectedQuotation.totalAmount.toLocaleString()}</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              )}
            />
            
            <Divider orientation="left">Additional Information</Divider>
            <Descriptions column={1}>
              <Descriptions.Item label="Description">{selectedQuotation.description}</Descriptions.Item>
              <Descriptions.Item label="Notes">{selectedQuotation.notes}</Descriptions.Item>
              <Descriptions.Item label="Terms & Conditions">{selectedQuotation.terms}</Descriptions.Item>
            </Descriptions>
          </div>
        ) : (
          // Edit/Create Mode
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              currency: 'USD',
              priority: 'Medium',
              status: 'Draft',
              probability: 50
            }}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  name="title"
                  label="Quotation Title"
                  rules={[{ required: true, message: 'Please enter quotation title' }]}
                >
                  <Input placeholder="Enter quotation title" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="client"
                  label="Client Name"
                  rules={[{ required: true, message: 'Please enter client name' }]}
                >
                  <Input placeholder="Enter client name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="contactPerson"
                  label="Contact Person"
                  rules={[{ required: true, message: 'Please enter contact person' }]}
                >
                  <Input placeholder="Enter contact person name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  name="email"
                  label="Contact Email"
                  rules={[
                    { required: true, message: 'Please enter contact email' },
                    { type: 'email', message: 'Please enter valid email' }
                  ]}
                >
                  <Input placeholder="Enter contact email" />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item
                  name="totalAmount"
                  label="Total Amount"
                  rules={[{ required: true, message: 'Please enter amount' }]}
                >
                  <InputNumber 
                    style={{ width: '100%' }} 
                    placeholder="0" 
                    prefix="$" 
                    min={0}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="currency" label="Currency">
                  <Select>
                    <Option value="USD">USD</Option>
                    <Option value="EUR">EUR</Option>
                    <Option value="GBP">GBP</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="probability" label="Win Probability (%)">
                  <InputNumber 
                    style={{ width: '100%' }} 
                    min={0} 
                    max={100} 
                    placeholder="50" 
                    suffix="%" 
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="status" label="Status">
                  <Select>
                    <Option value="Draft">Draft</Option>
                    <Option value="Sent">Sent</Option>
                    <Option value="Under Review">Under Review</Option>
                    <Option value="Approved">Approved</Option>
                    <Option value="Rejected">Rejected</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="priority" label="Priority">
                  <Select>
                    <Option value="High">High</Option>
                    <Option value="Medium">Medium</Option>
                    <Option value="Low">Low</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={8}>
                <Form.Item name="validUntil" label="Valid Until">
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="description" label="Description">
                  <TextArea 
                    rows={3} 
                    placeholder="Enter quotation description and details"
                  />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="tags" label="Tags">
                  <Select mode="tags" style={{ width: '100%' }} placeholder="Add tags">
                    <Option value="Enterprise">Enterprise</Option>
                    <Option value="Implementation">Implementation</Option>
                    <Option value="Consulting">Consulting</Option>
                    <Option value="Cloud">Cloud</Option>
                    <Option value="Security">Security</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default QuotationsPage;

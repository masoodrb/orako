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
  Upload,
  Divider,
  Badge,
  Tabs
} from 'antd';
import {
  FileTextOutlined,
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
  UploadOutlined,
  CopyOutlined,
  ShareAltOutlined,
  FileProtectOutlined,
  TrophyOutlined,
  RiseOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ProposalsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('proposals');

  // Sample proposals data
  const proposalsData = [
    {
      key: '1',
      proposalNumber: 'PROP-2024-001',
      title: 'Enterprise Software Implementation',
      client: 'Oracle Corporation',
      contactPerson: 'John Smith',
      email: 'john.smith@oracle.com',
      amount: 125000,
      currency: 'USD',
      status: 'Sent',
      priority: 'High',
      validUntil: '2024-02-15',
      createdDate: '2024-01-15',
      submittedBy: 'Sarah Johnson',
      probability: 75,
      nextFollowUp: '2024-01-25',
      tags: ['Enterprise', 'Implementation', 'Oracle'],
      description: 'Comprehensive enterprise software implementation including training and support services.',
    },
    {
      key: '2',
      proposalNumber: 'PROP-2024-002',
      title: 'Cloud Migration Services',
      client: 'Microsoft Azure',
      contactPerson: 'Emily Davis',
      email: 'emily.davis@microsoft.com',
      amount: 75000,
      currency: 'USD',
      status: 'Draft',
      priority: 'Medium',
      validUntil: '2024-02-20',
      createdDate: '2024-01-18',
      submittedBy: 'Michael Chen',
      probability: 60,
      nextFollowUp: '2024-01-30',
      tags: ['Cloud', 'Migration', 'Azure'],
      description: 'Complete cloud migration strategy and implementation services.',
    },
    {
      key: '3',
      proposalNumber: 'PROP-2024-003',
      title: 'Digital Transformation Consulting',
      client: 'IBM Global Services',
      contactPerson: 'Robert Wilson',
      email: 'robert.wilson@ibm.com',
      amount: 200000,
      currency: 'USD',
      status: 'Accepted',
      priority: 'High',
      validUntil: '2024-02-10',
      createdDate: '2024-01-10',
      submittedBy: 'Lisa Anderson',
      probability: 95,
      nextFollowUp: '2024-01-22',
      tags: ['Digital', 'Transformation', 'Consulting'],
      description: 'End-to-end digital transformation consulting and implementation.',
    },
    {
      key: '4',
      proposalNumber: 'PROP-2024-004',
      title: 'Security Audit & Implementation',
      client: 'Amazon Web Services',
      contactPerson: 'Jennifer Brown',
      email: 'jennifer.brown@aws.com',
      amount: 50000,
      currency: 'USD',
      status: 'Rejected',
      priority: 'Low',
      validUntil: '2024-01-30',
      createdDate: '2024-01-12',
      submittedBy: 'David Miller',
      probability: 0,
      nextFollowUp: null,
      tags: ['Security', 'Audit', 'AWS'],
      description: 'Comprehensive security audit and vulnerability assessment services.',
    },
    {
      key: '5',
      proposalNumber: 'PROP-2024-005',
      title: 'AI & Machine Learning Implementation',
      client: 'Google Cloud',
      contactPerson: 'Alex Thompson',
      email: 'alex.thompson@google.com',
      amount: 180000,
      currency: 'USD',
      status: 'Under Review',
      priority: 'High',
      validUntil: '2024-03-01',
      createdDate: '2024-01-20',
      submittedBy: 'Maria Garcia',
      probability: 80,
      nextFollowUp: '2024-01-28',
      tags: ['AI', 'Machine Learning', 'Google'],
      description: 'AI and machine learning solution implementation with custom model development.',
    }
  ];

  // Statistics data
  const statisticsData = {
    totalProposals: proposalsData.length,
    totalValue: proposalsData.reduce((sum, proposal) => sum + proposal.amount, 0),
    avgProposalValue: proposalsData.reduce((sum, proposal) => sum + proposal.amount, 0) / proposalsData.length,
    winRate: Math.round((proposalsData.filter(p => p.status === 'Accepted').length / proposalsData.length) * 100),
    pendingProposals: proposalsData.filter(p => ['Sent', 'Under Review', 'Draft'].includes(p.status)).length,
    acceptedProposals: proposalsData.filter(p => p.status === 'Accepted').length
  };

  const getStatusColor = (status) => {
    const colors = {
      'Draft': 'default',
      'Sent': 'processing',
      'Under Review': 'warning',
      'Accepted': 'success',
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

  const handleCreateProposal = () => {
    setSelectedProposal(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditProposal = (proposal) => {
    setSelectedProposal(proposal);
    form.setFieldsValue({
      ...proposal,
      validUntil: proposal.validUntil ? dayjs(proposal.validUntil) : null,
      nextFollowUp: proposal.nextFollowUp ? dayjs(proposal.nextFollowUp) : null,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success(selectedProposal ? 'Proposal updated successfully!' : 'Proposal created successfully!');
      setIsModalVisible(false);
      form.resetFields();
    }).catch(error => {
      console.log('Validation error:', error);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedProposal(null);
  };

  const columns = [
    {
      title: 'Proposal #',
      dataIndex: 'proposalNumber',
      key: 'proposalNumber',
      width: 130,
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
      title: 'Proposal Details',
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
      width: 150,
      render: (_, record) => (
        <div>
          <Text>{record.contactPerson}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 100,
      render: (amount, record) => (
        <div>
          <Text strong style={{ color: 'var(--orako-success)' }}>
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
      width: 100,
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
              onClick={() => message.info('View proposal details')}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEditProposal(record)}
            />
          </Tooltip>
          <Dropdown 
            menu={{
              items: [
                {
                  key: 'send',
                  icon: <SendOutlined />,
                  label: 'Send to Client',
                  onClick: () => message.success('Proposal sent to client')
                },
                {
                  key: 'duplicate',
                  icon: <CopyOutlined />,
                  label: 'Duplicate',
                  onClick: () => message.success('Proposal duplicated')
                },
                {
                  key: 'download',
                  icon: <DownloadOutlined />,
                  label: 'Download PDF',
                  onClick: () => message.success('Downloading proposal PDF')
                },
                {
                  key: 'delete',
                  icon: <DeleteOutlined />,
                  label: 'Delete',
                  danger: true,
                  onClick: () => message.success('Proposal deleted')
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

  const filteredData = proposalsData.filter(proposal => {
    const matchesSearch = proposal.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         proposal.client.toLowerCase().includes(searchText.toLowerCase()) ||
                         proposal.proposalNumber.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || proposal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>
          <FileTextOutlined style={{ marginRight: '12px', color: 'var(--orako-primary)' }} />
          Proposals Management
        </Title>
        <Paragraph>
          Create, manage, and track business proposals and client submissions
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Total Proposals"
              value={statisticsData.totalProposals}
              prefix={<FileTextOutlined />}
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
              title="Avg Proposal Value"
              value={statisticsData.avgProposalValue}
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
          <Tabs.TabPane tab="All Proposals" key="proposals">
            {/* Filters and Actions */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Search
                  placeholder="Search proposals..."
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
                  <Option value="Accepted">Accepted</Option>
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
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateProposal}>
                    Create Proposal
                  </Button>
                </Space>
              </Col>
            </Row>

            {/* Proposals Table */}
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} proposals`,
              }}
              scroll={{ x: 1200 }}
              size="middle"
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Analytics" key="analytics">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Proposal Status Distribution" className="oracle-shadow-sm">
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">Status distribution chart would be displayed here</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Monthly Proposal Trends" className="oracle-shadow-sm">
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">Monthly trends chart would be displayed here</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24}>
                <Card title="Top Performing Proposals" className="oracle-shadow-sm">
                  <Table
                    dataSource={proposalsData.filter(p => p.status === 'Accepted').slice(0, 5)}
                    columns={[
                      {
                        title: 'Proposal',
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
                        dataIndex: 'amount',
                        key: 'amount',
                        render: (amount) => `$${amount.toLocaleString()}`,
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

      {/* Create/Edit Proposal Modal */}
      <Modal
        title={selectedProposal ? 'Edit Proposal' : 'Create New Proposal'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText={selectedProposal ? 'Update Proposal' : 'Create Proposal'}
      >
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
                label="Proposal Title"
                rules={[{ required: true, message: 'Please enter proposal title' }]}
              >
                <Input placeholder="Enter proposal title" />
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
                name="amount"
                label="Proposal Amount"
                rules={[{ required: true, message: 'Please enter amount' }]}
              >
                <Input type="number" placeholder="0" prefix="$" />
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
                <Input type="number" min={0} max={100} placeholder="50" suffix="%" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="status" label="Status">
                <Select>
                  <Option value="Draft">Draft</Option>
                  <Option value="Sent">Sent</Option>
                  <Option value="Under Review">Under Review</Option>
                  <Option value="Accepted">Accepted</Option>
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
                  rows={4} 
                  placeholder="Enter proposal description and details"
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
      </Modal>
    </div>
  );
};

export default ProposalsPage;

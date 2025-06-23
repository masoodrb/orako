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
  Tag,
  Statistic,
  Avatar,
  Tooltip,
  Dropdown,
  message,
  Progress,
  Badge,
  Divider,
  List,
  Empty,
  Drawer,
  Descriptions,
  Timeline
} from 'antd';
import {
  UnorderedListOutlined,
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
  FileSearchOutlined,
  TrophyOutlined,
  RiseOutlined,
  BarChartOutlined,
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
  ReloadOutlined,
  ExportOutlined,
  ImportOutlined,
  SettingOutlined,
  StarOutlined,
  HeartOutlined,
  FlagOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const QuotationsListPage = () => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('table'); // table, grid, list
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [selectedQuotation, setSelectedQuotation] = useState(null);

  // Extended quotations data with more details
  const quotationsData = [
    {
      key: '1',
      quotationNumber: 'QUO-2024-001',
      title: 'ERP Software Implementation Package',
      client: 'Oracle Corporation',
      clientLogo: '🔶', // In real app, this would be image URL
      contactPerson: 'John Smith',
      email: 'john.smith@oracle.com',
      phone: '+1-555-0123',
      totalAmount: 150000,
      currency: 'USD',
      status: 'Sent',
      priority: 'High',
      validUntil: '2024-02-15',
      createdDate: '2024-01-15',
      submittedBy: 'Sarah Johnson',
      salesRep: 'Michael Chen',
      department: 'Enterprise Solutions',
      probability: 75,
      estimatedCloseDate: '2024-02-10',
      tags: ['Enterprise', 'ERP', 'Implementation'],
      lastActivity: '2024-01-20',
      activityType: 'Client Follow-up',
      itemCount: 4,
      notes: 'Client is interested in additional modules for future expansion.',
      attachments: ['proposal.pdf', 'technical_specs.docx'],
      competitors: ['SAP', 'Microsoft'],
      industry: 'Technology',
      region: 'North America'
    },
    {
      key: '2',
      quotationNumber: 'QUO-2024-002',
      title: 'Cloud Infrastructure Migration',
      client: 'Microsoft Azure Division',
      clientLogo: '🟦',
      contactPerson: 'Emily Davis',
      email: 'emily.davis@microsoft.com',
      phone: '+1-555-0124',
      totalAmount: 85000,
      currency: 'USD',
      status: 'Draft',
      priority: 'Medium',
      validUntil: '2024-02-20',
      createdDate: '2024-01-18',
      submittedBy: 'David Miller',
      salesRep: 'Lisa Anderson',
      department: 'Cloud Services',
      probability: 60,
      estimatedCloseDate: '2024-02-25',
      tags: ['Cloud', 'Migration', 'Infrastructure'],
      lastActivity: '2024-01-19',
      activityType: 'Proposal Draft',
      itemCount: 4,
      notes: 'Client requires minimal downtime during migration.',
      attachments: ['migration_plan.pdf'],
      competitors: ['AWS', 'Google Cloud'],
      industry: 'Technology',
      region: 'North America'
    },
    {
      key: '3',
      quotationNumber: 'QUO-2024-003',
      title: 'Digital Transformation Consulting',
      client: 'IBM Global Services',
      clientLogo: '🔵',
      contactPerson: 'Robert Wilson',
      email: 'robert.wilson@ibm.com',
      phone: '+1-555-0125',
      totalAmount: 220000,
      currency: 'USD',
      status: 'Approved',
      priority: 'High',
      validUntil: '2024-02-10',
      createdDate: '2024-01-10',
      submittedBy: 'Maria Garcia',
      salesRep: 'Alex Thompson',
      department: 'Digital Solutions',
      probability: 95,
      estimatedCloseDate: '2024-01-30',
      tags: ['Digital', 'Transformation', 'Consulting'],
      lastActivity: '2024-01-21',
      activityType: 'Contract Negotiation',
      itemCount: 5,
      notes: 'Client approved initial proposal, negotiating implementation timeline.',
      attachments: ['contract.pdf', 'sow.docx', 'timeline.xlsx'],
      competitors: ['Accenture', 'Deloitte'],
      industry: 'Technology',
      region: 'North America'
    },
    {
      key: '4',
      quotationNumber: 'QUO-2024-004',
      title: 'Cybersecurity Audit & Implementation',
      client: 'Amazon Web Services',
      clientLogo: '🟧',
      contactPerson: 'Jennifer Brown',
      email: 'jennifer.brown@aws.com',
      phone: '+1-555-0126',
      totalAmount: 65000,
      currency: 'USD',
      status: 'Rejected',
      priority: 'Low',
      validUntil: '2024-01-30',
      createdDate: '2024-01-12',
      submittedBy: 'Carlos Rodriguez',
      salesRep: 'Jennifer Lee',
      department: 'Security Services',
      probability: 0,
      estimatedCloseDate: null,
      tags: ['Security', 'Audit', 'Compliance'],
      lastActivity: '2024-01-22',
      activityType: 'Rejection Notice',
      itemCount: 4,
      notes: 'Client chose another vendor with lower pricing.',
      attachments: ['security_proposal.pdf'],
      competitors: ['CrowdStrike', 'Palo Alto'],
      industry: 'Technology',
      region: 'North America'
    },
    {
      key: '5',
      quotationNumber: 'QUO-2024-005',
      title: 'AI & Machine Learning Platform',
      client: 'Google Cloud Platform',
      clientLogo: '🔴',
      contactPerson: 'Alex Thompson',
      email: 'alex.thompson@google.com',
      phone: '+1-555-0127',
      totalAmount: 195000,
      currency: 'USD',
      status: 'Under Review',
      priority: 'High',
      validUntil: '2024-03-01',
      createdDate: '2024-01-20',
      submittedBy: 'Dr. Priya Patel',
      salesRep: 'Robert Kim',
      department: 'AI Solutions',
      probability: 80,
      estimatedCloseDate: '2024-02-15',
      tags: ['AI', 'Machine Learning', 'Analytics'],
      lastActivity: '2024-01-23',
      activityType: 'Technical Review',
      itemCount: 4,
      notes: 'Client is very interested, pending technical review.',
      attachments: ['ai_proposal.pdf', 'technical_architecture.pdf'],
      competitors: ['NVIDIA', 'Intel'],
      industry: 'Technology',
      region: 'North America'
    },
    {
      key: '6',
      quotationNumber: 'QUO-2024-006',
      title: 'Supply Chain Optimization',
      client: 'Walmart Inc.',
      clientLogo: '🟨',
      contactPerson: 'Mark Johnson',
      email: 'mark.johnson@walmart.com',
      phone: '+1-555-0128',
      totalAmount: 180000,
      currency: 'USD',
      status: 'Sent',
      priority: 'Medium',
      validUntil: '2024-02-28',
      createdDate: '2024-01-22',
      submittedBy: 'Kevin Lee',
      salesRep: 'Amanda Wilson',
      department: 'Supply Chain',
      probability: 65,
      estimatedCloseDate: '2024-03-05',
      tags: ['Supply Chain', 'Optimization', 'Logistics'],
      lastActivity: '2024-01-23',
      activityType: 'Proposal Sent',
      itemCount: 6,
      notes: 'Large-scale supply chain optimization project.',
      attachments: ['supply_chain_proposal.pdf'],
      competitors: ['JDA', 'Manhattan Associates'],
      industry: 'Retail',
      region: 'North America'
    }
  ];

  // Statistics
  const stats = {
    total: quotationsData.length,
    sent: quotationsData.filter(q => q.status === 'Sent').length,
    approved: quotationsData.filter(q => q.status === 'Approved').length,
    underReview: quotationsData.filter(q => q.status === 'Under Review').length,
    rejected: quotationsData.filter(q => q.status === 'Rejected').length,
    draft: quotationsData.filter(q => q.status === 'Draft').length,
    totalValue: quotationsData.reduce((sum, q) => sum + q.totalAmount, 0),
    avgValue: quotationsData.reduce((sum, q) => sum + q.totalAmount, 0) / quotationsData.length,
    winRate: Math.round((quotationsData.filter(q => q.status === 'Approved').length / quotationsData.length) * 100)
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

  const handleViewDetails = (quotation) => {
    setSelectedQuotation(quotation);
    setDetailsDrawerVisible(true);
  };

  const handleBulkAction = (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning('Please select quotations first');
      return;
    }
    message.success(`${action} applied to ${selectedRowKeys.length} quotations`);
    setSelectedRowKeys([]);
  };

  const columns = [
    {
      title: 'Quotation',
      key: 'quotation',
      width: 200,
      render: (_, record) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '16px', marginRight: '8px' }}>{record.clientLogo}</span>
            <Text strong style={{ color: 'var(--orako-primary)' }}>{record.quotationNumber}</Text>
          </div>
          <Text>{record.title}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            Created: {dayjs(record.createdDate).format('MMM DD, YYYY')}
          </Text>
        </div>
      ),
    },
    {
      title: 'Client',
      key: 'client',
      width: 180,
      render: (_, record) => (
        <div>
          <Text strong>{record.client}</Text>
          <br />
          <Text type="secondary">{record.contactPerson}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.department}</Text>
        </div>
      ),
    },
    {
      title: 'Value',
      key: 'value',
      width: 120,
      render: (_, record) => (
        <div>
          <Text strong style={{ color: 'var(--orako-success)', fontSize: '16px' }}>
            ${record.totalAmount.toLocaleString()}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.currency}</Text>
        </div>
      ),
    },
    {
      title: 'Status & Priority',
      key: 'status',
      width: 140,
      render: (_, record) => (
        <div>
          <Tag color={getStatusColor(record.status)}>{record.status}</Tag>
          <br />
          <Tag color={getPriorityColor(record.priority)} size="small" style={{ marginTop: '4px' }}>
            {record.priority} Priority
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
            strokeColor={
              record.probability > 70 ? 'var(--orako-success)' : 
              record.probability > 40 ? 'var(--orako-warning)' : 
              'var(--orako-error)'
            }
          />
          <Text type="secondary" style={{ fontSize: '11px' }}>
            Win Rate: {record.probability}%
          </Text>
        </div>
      ),
    },
    {
      title: 'Timeline',
      key: 'timeline',
      width: 140,
      render: (_, record) => (
        <div>
          <Text style={{ fontSize: '12px' }}>
            Valid Until: {dayjs(record.validUntil).format('MMM DD')}
          </Text>
          <br />
          {record.estimatedCloseDate && (
            <Text style={{ fontSize: '12px' }}>
              Est. Close: {dayjs(record.estimatedCloseDate).format('MMM DD')}
            </Text>
          )}
        </div>
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
              onClick={() => handleViewDetails(record)}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => message.info('Edit quotation')}
            />
          </Tooltip>
          <Dropdown 
            menu={{
              items: [
                {
                  key: 'send',
                  icon: <SendOutlined />,
                  label: 'Send to Client',
                  onClick: () => message.success('Quotation sent')
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
                  onClick: () => message.success('Downloading PDF')
                },
                {
                  type: 'divider'
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
            <Button type="text" icon={<SettingOutlined />} size="small" />
          </Dropdown>
        </Space>
      ),
    },
  ];

  // Filter and sort data
  const filteredData = quotationsData.filter(quotation => {
    const matchesSearch = quotation.title.toLowerCase().includes(searchText.toLowerCase()) ||
                         quotation.client.toLowerCase().includes(searchText.toLowerCase()) ||
                         quotation.quotationNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                         quotation.contactPerson.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quotation.status === statusFilter;
    const matchesClient = clientFilter === 'all' || quotation.client === clientFilter;
    const matchesDateRange = dateRange.length === 0 || 
                             (dayjs(quotation.createdDate).isAfter(dayjs(dateRange[0])) && 
                              dayjs(quotation.createdDate).isBefore(dayjs(dateRange[1])));
    return matchesSearch && matchesStatus && matchesClient && matchesDateRange;
  });

  // Sort data
  const sortedData = [...filteredData].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case 'date':
        aValue = dayjs(a.createdDate);
        bValue = dayjs(b.createdDate);
        break;
      case 'amount':
        aValue = a.totalAmount;
        bValue = b.totalAmount;
        break;
      case 'client':
        aValue = a.client.toLowerCase();
        bValue = b.client.toLowerCase();
        break;
      case 'status':
        aValue = a.status;
        bValue = b.status;
        break;
      default:
        return 0;
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const uniqueClients = [...new Set(quotationsData.map(q => q.client))];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>
          <UnorderedListOutlined style={{ marginRight: '12px', color: 'var(--orako-primary)' }} />
          Quotations List
        </Title>
        <Paragraph>
          Comprehensive list view of all quotations with advanced filtering and sorting
        </Paragraph>
      </div>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card size="small" className="oracle-shadow-sm">
            <Statistic
              title="Total"
              value={stats.total}
              valueStyle={{ fontSize: '20px', color: 'var(--orako-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card size="small" className="oracle-shadow-sm">
            <Statistic
              title="Sent"
              value={stats.sent}
              valueStyle={{ fontSize: '20px', color: 'var(--orako-info)' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card size="small" className="oracle-shadow-sm">
            <Statistic
              title="Approved"
              value={stats.approved}
              valueStyle={{ fontSize: '20px', color: 'var(--orako-success)' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card size="small" className="oracle-shadow-sm">
            <Statistic
              title="Under Review"
              value={stats.underReview}
              valueStyle={{ fontSize: '20px', color: 'var(--orako-warning)' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card size="small" className="oracle-shadow-sm">
            <Statistic
              title="Win Rate"
              value={stats.winRate}
              suffix="%"
              valueStyle={{ fontSize: '20px', color: 'var(--orako-secondary)' }}
            />
          </Card>
        </Col>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card size="small" className="oracle-shadow-sm">
            <Statistic
              title="Total Value"
              value={stats.totalValue}
              prefix="$"
              precision={0}
              valueStyle={{ fontSize: '20px', color: 'var(--orako-success)' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Controls */}
      <Card className="oracle-shadow-sm" style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Search
              placeholder="Search quotations..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              style={{ width: '100%' }}
              placeholder="Status"
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
          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              style={{ width: '100%' }}
              placeholder="Client"
              value={clientFilter}
              onChange={setClientFilter}
            >
              <Option value="all">All Clients</Option>
              {uniqueClients.map(client => (
                <Option key={client} value={client}>{client}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <RangePicker
              style={{ width: '100%' }}
              value={dateRange}
              onChange={setDateRange}
              placeholder={['Start Date', 'End Date']}
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Space>
              <Select
                style={{ width: '100px' }}
                value={sortBy}
                onChange={setSortBy}
              >
                <Option value="date">Date</Option>
                <Option value="amount">Amount</Option>
                <Option value="client">Client</Option>
                <Option value="status">Status</Option>
              </Select>
              <Button
                icon={sortOrder === 'asc' ? <SortAscendingOutlined /> : <SortDescendingOutlined />}
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              />
            </Space>
          </Col>
        </Row>

        {/* Bulk Actions */}
        {selectedRowKeys.length > 0 && (
          <div style={{ marginTop: '16px', padding: '12px', background: 'var(--orako-surface-secondary)', borderRadius: '6px' }}>
            <Space>
              <Text strong>{selectedRowKeys.length} quotations selected</Text>
              <Button size="small" onClick={() => handleBulkAction('Send')}>
                Bulk Send
              </Button>
              <Button size="small" onClick={() => handleBulkAction('Export')}>
                Bulk Export
              </Button>
              <Button size="small" onClick={() => handleBulkAction('Archive')}>
                Bulk Archive
              </Button>
              <Button size="small" danger onClick={() => handleBulkAction('Delete')}>
                Bulk Delete
              </Button>
            </Space>
          </div>
        )}
      </Card>

      {/* Quotations Table */}
      <Card className="oracle-shadow-sm">
        <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text strong>
            Showing {sortedData.length} of {quotationsData.length} quotations
          </Text>
          <Space>
            <Button icon={<ReloadOutlined />} onClick={() => message.success('Refreshed')}>
              Refresh
            </Button>
            <Button icon={<ExportOutlined />}>
              Export All
            </Button>
          </Space>
        </div>
        
        <Table
          columns={columns}
          dataSource={sortedData}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          pagination={{
            pageSize: 20,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} quotations`,
          }}
          scroll={{ x: 1200 }}
          size="middle"
        />
      </Card>

      {/* Details Drawer */}
      <Drawer
        title={`Quotation Details - ${selectedQuotation?.quotationNumber}`}
        placement="right"
        width={600}
        open={detailsDrawerVisible}
        onClose={() => setDetailsDrawerVisible(false)}
      >
        {selectedQuotation && (
          <div>
            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Title">{selectedQuotation.title}</Descriptions.Item>
              <Descriptions.Item label="Client">
                <Space>
                  <span>{selectedQuotation.clientLogo}</span>
                  <Text strong>{selectedQuotation.client}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Contact">{selectedQuotation.contactPerson}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedQuotation.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedQuotation.phone}</Descriptions.Item>
              <Descriptions.Item label="Department">{selectedQuotation.department}</Descriptions.Item>
              <Descriptions.Item label="Industry">{selectedQuotation.industry}</Descriptions.Item>
              <Descriptions.Item label="Region">{selectedQuotation.region}</Descriptions.Item>
              <Descriptions.Item label="Total Amount">
                <Text strong style={{ color: 'var(--orako-success)', fontSize: '16px' }}>
                  ${selectedQuotation.totalAmount.toLocaleString()} {selectedQuotation.currency}
                </Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={getStatusColor(selectedQuotation.status)}>{selectedQuotation.status}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Priority">
                <Tag color={getPriorityColor(selectedQuotation.priority)}>{selectedQuotation.priority}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Win Probability">{selectedQuotation.probability}%</Descriptions.Item>
              <Descriptions.Item label="Sales Rep">{selectedQuotation.salesRep}</Descriptions.Item>
              <Descriptions.Item label="Created Date">
                {dayjs(selectedQuotation.createdDate).format('MMMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Valid Until">
                {dayjs(selectedQuotation.validUntil).format('MMMM DD, YYYY')}
              </Descriptions.Item>
              {selectedQuotation.estimatedCloseDate && (
                <Descriptions.Item label="Est. Close Date">
                  {dayjs(selectedQuotation.estimatedCloseDate).format('MMMM DD, YYYY')}
                </Descriptions.Item>
              )}
            </Descriptions>

            <Divider orientation="left">Tags</Divider>
            <Space wrap>
              {selectedQuotation.tags.map(tag => (
                <Tag key={tag} color="blue">{tag}</Tag>
              ))}
            </Space>

            <Divider orientation="left">Recent Activity</Divider>
            <Timeline
              items={[
                {
                  dot: <ClockCircleOutlined />,
                  children: (
                    <div>
                      <Text strong>{selectedQuotation.activityType}</Text>
                      <br />
                      <Text type="secondary">
                        {dayjs(selectedQuotation.lastActivity).format('MMMM DD, YYYY')}
                      </Text>
                    </div>
                  ),
                },
                {
                  dot: <CheckCircleOutlined />,
                  children: (
                    <div>
                      <Text>Quotation Created</Text>
                      <br />
                      <Text type="secondary">
                        by {selectedQuotation.submittedBy} - {dayjs(selectedQuotation.createdDate).format('MMMM DD, YYYY')}
                      </Text>
                    </div>
                  ),
                },
              ]}
            />

            <Divider orientation="left">Notes</Divider>
            <Paragraph>{selectedQuotation.notes}</Paragraph>

            <Divider orientation="left">Attachments</Divider>
            <List
              size="small"
              dataSource={selectedQuotation.attachments}
              renderItem={item => (
                <List.Item>
                  <Text>{item}</Text>
                  <Button type="link" size="small" icon={<DownloadOutlined />}>
                    Download
                  </Button>
                </List.Item>
              )}
            />

            <Divider orientation="left">Competitors</Divider>
            <Space wrap>
              {selectedQuotation.competitors.map(competitor => (
                <Tag key={competitor} color="orange">{competitor}</Tag>
              ))}
            </Space>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default QuotationsListPage;

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
  message,
  Progress,
  Timeline,
  Descriptions,
  Divider,
  Badge,
  Tabs,
  InputNumber,
  List,
  Empty,
  Alert,
  Radio,
  Drawer,
  Rate,
  Checkbox
} from 'antd';
import {
  TrophyOutlined,
  GiftOutlined,
  StarOutlined,
  CrownOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  SendOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  DollarOutlined,
  TeamOutlined,
  CalendarOutlined,
  HistoryOutlined,
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  ShoppingCartOutlined,
  RiseOutlined,
  FallOutlined,
  ReloadOutlined,
  BankOutlined,
  HeartOutlined,
  FireOutlined,
  ThunderboltOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const ClientAwardPointsPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('clients');
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);

  // Sample client points data
  const clientPointsData = [
    {
      key: '1',
      clientId: 'CLI-001',
      clientName: 'Oracle Corporation',
      clientLogo: '🔶',
      contactPerson: 'John Smith',
      email: 'john.smith@oracle.com',
      phone: '+1-555-0123',
      totalPoints: 12500,
      availablePoints: 8750,
      usedPoints: 3750,
      tier: 'Platinum',
      tierProgress: 85,
      nextTierPoints: 15000,
      joinDate: '2023-01-15',
      lastActivity: '2024-01-20',
      totalOrders: 45,
      totalSpent: 250000,
      avgOrderValue: 5555,
      status: 'Active',
      recentTransactions: [
        { date: '2024-01-20', type: 'Earned', points: 500, description: 'Large order purchase' },
        { date: '2024-01-15', type: 'Redeemed', points: -250, description: 'Gift card redemption' },
        { date: '2024-01-10', type: 'Earned', points: 300, description: 'Referral bonus' }
      ],
      preferences: ['Software', 'Training', 'Consulting'],
      region: 'North America',
      industry: 'Technology'
    },
    {
      key: '2',
      clientId: 'CLI-002',
      clientName: 'Microsoft Corporation',
      clientLogo: '🟦',
      contactPerson: 'Emily Davis',
      email: 'emily.davis@microsoft.com',
      phone: '+1-555-0124',
      totalPoints: 8900,
      availablePoints: 6200,
      usedPoints: 2700,
      tier: 'Gold',
      tierProgress: 62,
      nextTierPoints: 10000,
      joinDate: '2023-03-22',
      lastActivity: '2024-01-18',
      totalOrders: 32,
      totalSpent: 178000,
      avgOrderValue: 5562,
      status: 'Active',
      recentTransactions: [
        { date: '2024-01-18', type: 'Earned', points: 400, description: 'Service package purchase' },
        { date: '2024-01-12', type: 'Redeemed', points: -180, description: 'Discount applied' },
        { date: '2024-01-08', type: 'Earned', points: 200, description: 'Review bonus' }
      ],
      preferences: ['Cloud Services', 'Integration', 'Support'],
      region: 'North America',
      industry: 'Technology'
    },
    {
      key: '3',
      clientId: 'CLI-003',
      clientName: 'Google LLC',
      clientLogo: '🔴',
      contactPerson: 'Alex Thompson',
      email: 'alex.thompson@google.com',
      phone: '+1-555-0125',
      totalPoints: 15600,
      availablePoints: 12200,
      usedPoints: 3400,
      tier: 'Platinum',
      tierProgress: 96,
      nextTierPoints: 20000,
      joinDate: '2022-11-10',
      lastActivity: '2024-01-22',
      totalOrders: 67,
      totalSpent: 420000,
      avgOrderValue: 6268,
      status: 'Active',
      recentTransactions: [
        { date: '2024-01-22', type: 'Earned', points: 600, description: 'Premium service purchase' },
        { date: '2024-01-19', type: 'Earned', points: 150, description: 'Loyalty bonus' },
        { date: '2024-01-14', type: 'Redeemed', points: -300, description: 'Service upgrade' }
      ],
      preferences: ['AI Solutions', 'Analytics', 'Machine Learning'],
      region: 'North America',
      industry: 'Technology'
    },
    {
      key: '4',
      clientId: 'CLI-004',
      clientName: 'Amazon Web Services',
      clientLogo: '🟧',
      contactPerson: 'Jennifer Brown',
      email: 'jennifer.brown@aws.com',
      phone: '+1-555-0126',
      totalPoints: 6200,
      availablePoints: 4800,
      usedPoints: 1400,
      tier: 'Silver',
      tierProgress: 42,
      nextTierPoints: 7500,
      joinDate: '2023-06-05',
      lastActivity: '2024-01-16',
      totalOrders: 23,
      totalSpent: 125000,
      avgOrderValue: 5434,
      status: 'Active',
      recentTransactions: [
        { date: '2024-01-16', type: 'Earned', points: 280, description: 'Infrastructure service' },
        { date: '2024-01-11', type: 'Redeemed', points: -120, description: 'Training discount' },
        { date: '2024-01-05', type: 'Earned', points: 200, description: 'Regular purchase' }
      ],
      preferences: ['Infrastructure', 'Security', 'Compliance'],
      region: 'North America',
      industry: 'Technology'
    },
    {
      key: '5',
      clientId: 'CLI-005',
      clientName: 'IBM Global Services',
      clientLogo: '🔵',
      contactPerson: 'Robert Wilson',
      email: 'robert.wilson@ibm.com',
      phone: '+1-555-0127',
      totalPoints: 3400,
      availablePoints: 2800,
      usedPoints: 600,
      tier: 'Bronze',
      tierProgress: 23,
      nextTierPoints: 5000,
      joinDate: '2023-09-18',
      lastActivity: '2024-01-14',
      totalOrders: 15,
      totalSpent: 68000,
      avgOrderValue: 4533,
      status: 'Active',
      recentTransactions: [
        { date: '2024-01-14', type: 'Earned', points: 180, description: 'Consulting service' },
        { date: '2024-01-09', type: 'Earned', points: 120, description: 'Small order' },
        { date: '2024-01-03', type: 'Redeemed', points: -80, description: 'Service discount' }
      ],
      preferences: ['Consulting', 'Strategy', 'Transformation'],
      region: 'North America',
      industry: 'Technology'
    }
  ];

  // Rewards catalog
  const rewardsData = [
    {
      key: '1',
      name: 'Service Discount - 10%',
      description: '10% discount on any service package',
      pointsCost: 500,
      category: 'Discounts',
      availability: 'Available',
      popularity: 85,
      validityDays: 30
    },
    {
      key: '2',
      name: 'Free Training Session',
      description: 'One free training session for up to 10 users',
      pointsCost: 1200,
      category: 'Training',
      availability: 'Available',
      popularity: 92,
      validityDays: 60
    },
    {
      key: '3',
      name: 'Premium Support - 3 Months',
      description: '3 months of premium support access',
      pointsCost: 2500,
      category: 'Support',
      availability: 'Available',
      popularity: 78,
      validityDays: 90
    },
    {
      key: '4',
      name: 'Consultation Credits - 5 Hours',
      description: '5 hours of expert consultation services',
      pointsCost: 1800,
      category: 'Consulting',
      availability: 'Limited',
      popularity: 88,
      validityDays: 45
    },
    {
      key: '5',
      name: 'Service Upgrade Voucher',
      description: 'Upgrade any service to premium tier',
      pointsCost: 3000,
      category: 'Upgrades',
      availability: 'Available',
      popularity: 65,
      validityDays: 120
    }
  ];

  // Statistics
  const statisticsData = {
    totalClients: clientPointsData.length,
    totalPointsIssued: clientPointsData.reduce((sum, client) => sum + client.totalPoints, 0),
    totalPointsRedeemed: clientPointsData.reduce((sum, client) => sum + client.usedPoints, 0),
    avgPointsPerClient: Math.round(clientPointsData.reduce((sum, client) => sum + client.totalPoints, 0) / clientPointsData.length),
    activeClients: clientPointsData.filter(client => client.status === 'Active').length,
    platinumClients: clientPointsData.filter(client => client.tier === 'Platinum').length,
    goldClients: clientPointsData.filter(client => client.tier === 'Gold').length,
    silverClients: clientPointsData.filter(client => client.tier === 'Silver').length,
    bronzeClients: clientPointsData.filter(client => client.tier === 'Bronze').length
  };

  const getTierColor = (tier) => {
    const colors = {
      'Platinum': '#E5E7EB',
      'Gold': '#FCD34D',
      'Silver': '#9CA3AF',
      'Bronze': '#F97316'
    };
    return colors[tier] || '#6B7280';
  };

  const getTierIcon = (tier) => {
    const icons = {
      'Platinum': <StarOutlined />,
      'Gold': <CrownOutlined />,
      'Silver': <StarOutlined />,
      'Bronze': <TrophyOutlined />
    };
    return icons[tier] || <TrophyOutlined />;
  };

  const handleViewDetails = (client) => {
    setSelectedClient(client);
    setDetailsDrawerVisible(true);
  };

  const handleAwardPoints = (client) => {
    setSelectedClient(client);
    form.setFieldsValue({
      clientName: client.clientName,
      currentPoints: client.availablePoints
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Award points:', values);
      message.success('Points awarded successfully!');
      setIsModalVisible(false);
      form.resetFields();
    }).catch(error => {
      console.log('Validation error:', error);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedClient(null);
  };

  const columns = [
    {
      title: 'Client',
      key: 'client',
      width: 200,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            size={40} 
            style={{ marginRight: '12px', backgroundColor: 'var(--orako-primary)' }}
          >
            {record.clientLogo}
          </Avatar>
          <div>
            <Text strong>{record.clientName}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.clientId}</Text>
            <br />
            <Text type="secondary" style={{ fontSize: '12px' }}>{record.contactPerson}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Points Summary',
      key: 'points',
      width: 180,
      render: (_, record) => (
        <div>
          <div style={{ marginBottom: '8px' }}>
            <Text strong style={{ color: 'var(--orako-success)', fontSize: '16px' }}>
              {record.availablePoints.toLocaleString()}
            </Text>
            <Text type="secondary"> / {record.totalPoints.toLocaleString()}</Text>
          </div>
          <Progress 
            percent={Math.round((record.availablePoints / record.totalPoints) * 100)} 
            size="small" 
            strokeColor="var(--orako-primary)"
          />
          <Text type="secondary" style={{ fontSize: '11px' }}>
            Used: {record.usedPoints.toLocaleString()} points
          </Text>
        </div>
      ),
    },
    {
      title: 'Tier & Progress',
      key: 'tier',
      width: 160,
      render: (_, record) => (
        <div>
          <div style={{ marginBottom: '8px' }}>
            <Tag 
              color={getTierColor(record.tier)} 
              style={{ color: record.tier === 'Platinum' || record.tier === 'Silver' ? '#000' : '#fff' }}
            >
              {getTierIcon(record.tier)} {record.tier}
            </Tag>
          </div>
          <Progress 
            percent={record.tierProgress} 
            size="small" 
            strokeColor={getTierColor(record.tier)}
          />
          <Text type="secondary" style={{ fontSize: '11px' }}>
            Next tier: {record.nextTierPoints.toLocaleString()} pts
          </Text>
        </div>
      ),
    },
    {
      title: 'Activity',
      key: 'activity',
      width: 140,
      render: (_, record) => (
        <div>
          <Text style={{ fontSize: '12px' }}>
            Orders: {record.totalOrders}
          </Text>
          <br />
          <Text style={{ fontSize: '12px' }}>
            Spent: ${record.totalSpent.toLocaleString()}
          </Text>
          <br />
          <Text type="secondary" style={{ fontSize: '11px' }}>
            Last: {dayjs(record.lastActivity).format('MMM DD, YYYY')}
          </Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
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
          <Tooltip title="Award Points">
            <Button 
              type="text" 
              icon={<GiftOutlined />} 
              size="small"
              onClick={() => handleAwardPoints(record)}
            />
          </Tooltip>
          <Tooltip title="View History">
            <Button 
              type="text" 
              icon={<HistoryOutlined />} 
              size="small"
              onClick={() => message.info('View points history')}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredData = clientPointsData.filter(client => {
    const matchesSearch = client.clientName.toLowerCase().includes(searchText.toLowerCase()) ||
                         client.contactPerson.toLowerCase().includes(searchText.toLowerCase()) ||
                         client.clientId.toLowerCase().includes(searchText.toLowerCase());
    const matchesTier = tierFilter === 'all' || client.tier === tierFilter;
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>
          <TrophyOutlined style={{ marginRight: '12px', color: 'var(--orako-primary)' }} />
          Client Award Points
        </Title>
        <Paragraph>
          Manage client loyalty points, rewards, and tier progression
        </Paragraph>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="orako-shadow-sm">
            <Statistic
              title="Total Clients"
              value={statisticsData.totalClients}
              prefix={<TeamOutlined />}
              valueStyle={{ color: 'var(--orako-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="orako-shadow-sm">
            <Statistic
              title="Points Issued"
              value={statisticsData.totalPointsIssued}
              prefix={<StarOutlined />}
              valueStyle={{ color: 'var(--orako-success)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="orako-shadow-sm">
            <Statistic
              title="Points Redeemed"
              value={statisticsData.totalPointsRedeemed}
              prefix={<GiftOutlined />}
              valueStyle={{ color: 'var(--orako-warning)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="orako-shadow-sm">
            <Statistic
              title="Avg Points/Client"
              value={statisticsData.avgPointsPerClient}
              prefix={<TrophyOutlined />}
              valueStyle={{ color: 'var(--orako-info)' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Tier Distribution */}
      <Card className="orako-shadow-sm" style={{ marginBottom: '24px' }}>
        <Title level={4}>Tier Distribution</Title>
        <Row gutter={[16, 16]}>
          <Col xs={6}>
            <div style={{ textAlign: 'center' }}>
              <StarOutlined style={{ fontSize: '24px', color: '#E5E7EB' }} />
              <br />
              <Text strong>{statisticsData.platinumClients}</Text>
              <br />
              <Text type="secondary">Platinum</Text>
            </div>
          </Col>
          <Col xs={6}>
            <div style={{ textAlign: 'center' }}>
              <CrownOutlined style={{ fontSize: '24px', color: '#FCD34D' }} />
              <br />
              <Text strong>{statisticsData.goldClients}</Text>
              <br />
              <Text type="secondary">Gold</Text>
            </div>
          </Col>
          <Col xs={6}>
            <div style={{ textAlign: 'center' }}>
              <StarOutlined style={{ fontSize: '24px', color: '#9CA3AF' }} />
              <br />
              <Text strong>{statisticsData.silverClients}</Text>
              <br />
              <Text type="secondary">Silver</Text>
            </div>
          </Col>
          <Col xs={6}>
            <div style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: '24px', color: '#F97316' }} />
              <br />
              <Text strong>{statisticsData.bronzeClients}</Text>
              <br />
              <Text type="secondary">Bronze</Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Card className="orako-shadow-sm">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Client Points" key="clients">
            {/* Filters and Actions */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <Search
                  placeholder="Search clients..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Filter by tier"
                  value={tierFilter}
                  onChange={setTierFilter}
                >
                  <Option value="all">All Tiers</Option>
                  <Option value="Platinum">Platinum</Option>
                  <Option value="Gold">Gold</Option>
                  <Option value="Silver">Silver</Option>
                  <Option value="Bronze">Bronze</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={8} lg={4}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Filter by status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <Option value="all">All Status</Option>
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Col>
              <Col xs={24} sm={24} md={8} lg={10}>
                <Space style={{ float: 'right' }}>
                  <Button icon={<FilterOutlined />}>
                    More Filters
                  </Button>
                  <Button icon={<DownloadOutlined />}>
                    Export
                  </Button>
                  <Button type="primary" icon={<GiftOutlined />}>
                    Bulk Award Points
                  </Button>
                </Space>
              </Col>
            </Row>

            {/* Clients Table */}
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} clients`,
              }}
              scroll={{ x: 1200 }}
              size="middle"
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Rewards Catalog" key="rewards">
            <Row gutter={[24, 24]}>
              {rewardsData.map(reward => (
                <Col xs={24} sm={12} lg={8} key={reward.key}>
                  <Card
                    className="orako-shadow-sm"
                    actions={[
                      <Button type="link" icon={<EditOutlined />}>Edit</Button>,
                      <Button type="link" icon={<EyeOutlined />}>View</Button>
                    ]}
                  >
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                      <GiftOutlined style={{ fontSize: '32px', color: 'var(--orako-primary)' }} />
                    </div>
                    <Card.Meta
                      title={reward.name}
                      description={reward.description}
                    />
                    <Divider />
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Text strong style={{ color: 'var(--orako-success)' }}>
                          {reward.pointsCost} pts
                        </Text>
                      </Col>
                      <Col span={12}>
                        <Tag color={reward.availability === 'Available' ? 'green' : 'orange'}>
                          {reward.availability}
                        </Tag>
                      </Col>
                      <Col span={24}>
                        <Progress 
                          percent={reward.popularity} 
                          size="small" 
                          strokeColor="var(--orako-primary)"
                          format={percent => `${percent}% popular`}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Analytics" key="analytics">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Points Distribution" className="orako-shadow-sm">
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">Points distribution chart would be displayed here</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Redemption Trends" className="orako-shadow-sm">
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">Redemption trends chart would be displayed here</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24}>
                <Card title="Top Performers" className="orako-shadow-sm">
                  <Table
                    dataSource={clientPointsData.sort((a, b) => b.totalPoints - a.totalPoints).slice(0, 5)}
                    columns={[
                      {
                        title: 'Rank',
                        key: 'rank',
                        render: (_, record, index) => (
                          <div style={{ textAlign: 'center' }}>
                            {index === 0 && <CrownOutlined style={{ color: '#FCD34D' }} />}
                            {index === 1 && <TrophyOutlined style={{ color: '#9CA3AF' }} />}
                            {index === 2 && <StarOutlined style={{ color: '#F97316' }} />}
                            <Text strong>{index + 1}</Text>
                          </div>
                        ),
                        width: 80
                      },
                      {
                        title: 'Client',
                        dataIndex: 'clientName',
                        key: 'clientName',
                      },
                      {
                        title: 'Total Points',
                        dataIndex: 'totalPoints',
                        key: 'totalPoints',
                        render: (points) => points.toLocaleString(),
                      },
                      {
                        title: 'Tier',
                        dataIndex: 'tier',
                        key: 'tier',
                        render: (tier) => (
                          <Tag color={getTierColor(tier)} style={{ color: tier === 'Platinum' || tier === 'Silver' ? '#000' : '#fff' }}>
                            {tier}
                          </Tag>
                        ),
                      },
                      {
                        title: 'Total Spent',
                        dataIndex: 'totalSpent',
                        key: 'totalSpent',
                        render: (spent) => `$${spent.toLocaleString()}`,
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

      {/* Award Points Modal */}
      <Modal
        title="Award Points"
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={600}
      >
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="clientName" label="Client">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="currentPoints" label="Current Available Points">
                <Input disabled suffix="pts" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="pointsToAward"
                label="Points to Award"
                rules={[{ required: true, message: 'Please enter points to award' }]}
              >
                <InputNumber 
                  style={{ width: '100%' }} 
                  min={1} 
                  placeholder="Enter points"
                  suffix="pts"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="reason" label="Reason">
                <Select placeholder="Select reason">
                  <Option value="purchase">Large Purchase</Option>
                  <Option value="referral">Referral Bonus</Option>
                  <Option value="loyalty">Loyalty Bonus</Option>
                  <Option value="review">Review Bonus</Option>
                  <Option value="milestone">Milestone Achievement</Option>
                  <Option value="promotion">Promotional Award</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea 
                  rows={3} 
                  placeholder="Enter description or additional notes"
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="notifyClient" valuePropName="checked" initialValue={true}>
                <Checkbox>Send notification to client</Checkbox>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Client Details Drawer */}
      <Drawer
        title={`Client Details - ${selectedClient?.clientName}`}
        placement="right"
        width={600}
        open={detailsDrawerVisible}
        onClose={() => setDetailsDrawerVisible(false)}
      >
        {selectedClient && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Avatar size={80} style={{ backgroundColor: 'var(--orako-primary)' }}>
                {selectedClient.clientLogo}
              </Avatar>
              <br />
              <Title level={3} style={{ margin: '12px 0 4px 0' }}>
                {selectedClient.clientName}
              </Title>
              <Tag 
                color={getTierColor(selectedClient.tier)}
                style={{ 
                  color: selectedClient.tier === 'Platinum' || selectedClient.tier === 'Silver' ? '#000' : '#fff',
                  fontSize: '14px',
                  padding: '4px 12px'
                }}
              >
                {getTierIcon(selectedClient.tier)} {selectedClient.tier} Member
              </Tag>
            </div>

            <Descriptions bordered column={1} size="small">
              <Descriptions.Item label="Client ID">{selectedClient.clientId}</Descriptions.Item>
              <Descriptions.Item label="Contact Person">{selectedClient.contactPerson}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedClient.email}</Descriptions.Item>
              <Descriptions.Item label="Phone">{selectedClient.phone}</Descriptions.Item>
              <Descriptions.Item label="Industry">{selectedClient.industry}</Descriptions.Item>
              <Descriptions.Item label="Region">{selectedClient.region}</Descriptions.Item>
              <Descriptions.Item label="Member Since">
                {dayjs(selectedClient.joinDate).format('MMMM DD, YYYY')}
              </Descriptions.Item>
              <Descriptions.Item label="Last Activity">
                {dayjs(selectedClient.lastActivity).format('MMMM DD, YYYY')}
              </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Points Summary</Divider>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="Available"
                  value={selectedClient.availablePoints}
                  valueStyle={{ color: 'var(--orako-success)' }}
                  suffix="pts"
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Total Earned"
                  value={selectedClient.totalPoints}
                  valueStyle={{ color: 'var(--orako-primary)' }}
                  suffix="pts"
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Redeemed"
                  value={selectedClient.usedPoints}
                  valueStyle={{ color: 'var(--orako-warning)' }}
                  suffix="pts"
                />
              </Col>
            </Row>

            <Divider orientation="left">Tier Progress</Divider>
            <div style={{ marginBottom: '16px' }}>
              <Text strong>Progress to next tier</Text>
              <Progress 
                percent={selectedClient.tierProgress} 
                strokeColor={getTierColor(selectedClient.tier)}
                style={{ marginTop: '8px' }}
              />
              <Text type="secondary">
                {selectedClient.nextTierPoints - selectedClient.totalPoints} points needed for next tier
              </Text>
            </div>

            <Divider orientation="left">Recent Transactions</Divider>
            <Timeline>
              {selectedClient.recentTransactions.map((transaction, index) => (
                <Timeline.Item
                  key={index}
                  dot={transaction.type === 'Earned' ? 
                    <PlusOutlined style={{ color: 'var(--orako-success)' }} /> : 
                    <GiftOutlined style={{ color: 'var(--orako-warning)' }} />
                  }
                >
                  <div>
                    <Text strong>
                      {transaction.type === 'Earned' ? '+' : ''}{transaction.points} points
                    </Text>
                    <br />
                    <Text>{transaction.description}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {dayjs(transaction.date).format('MMMM DD, YYYY')}
                    </Text>
                  </div>
                </Timeline.Item>
              ))}
            </Timeline>

            <Divider orientation="left">Preferences</Divider>
            <Space wrap>
              {selectedClient.preferences.map(preference => (
                <Tag key={preference} color="blue">{preference}</Tag>
              ))}
            </Space>

            <Divider orientation="left">Purchase History</Divider>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Statistic
                  title="Total Orders"
                  value={selectedClient.totalOrders}
                  valueStyle={{ color: 'var(--orako-info)' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Total Spent"
                  value={selectedClient.totalSpent}
                  prefix="$"
                  valueStyle={{ color: 'var(--orako-success)' }}
                />
              </Col>
              <Col span={8}>
                <Statistic
                  title="Avg Order"
                  value={selectedClient.avgOrderValue}
                  prefix="$"
                  valueStyle={{ color: 'var(--orako-secondary)' }}
                />
              </Col>
            </Row>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default ClientAwardPointsPage;

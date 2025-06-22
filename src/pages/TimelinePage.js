import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Avatar, 
  Timeline, 
  Badge, 
  Button, 
  Space, 
  Select, 
  DatePicker, 
  Input, 
  Tag, 
  Divider,
  Tooltip,
  Modal,
  Form,
  message,
  List,
  Statistic,
  Progress
} from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  TeamOutlined,
  FileTextOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  TrophyOutlined,
  BugOutlined,
  RocketOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  HistoryOutlined,
  BellOutlined,
  CommentOutlined,
  LikeOutlined,
  ShareAltOutlined,
  StarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { TextArea } = Input;

const TimelinePage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [dateRange, setDateRange] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  // Sample timeline data
  const activityTypes = {
    meeting: { color: '#1890ff', icon: <TeamOutlined />, label: 'Meeting' },
    email: { color: '#52c41a', icon: <MailOutlined />, label: 'Email' },
    call: { color: '#faad14', icon: <PhoneOutlined />, label: 'Phone Call' },
    document: { color: '#722ed1', icon: <FileTextOutlined />, label: 'Document' },
    task: { color: '#fa8c16', icon: <CheckCircleOutlined />, label: 'Task' },
    sale: { color: '#13c2c2', icon: <DollarOutlined />, label: 'Sale' },
    order: { color: '#eb2f96', icon: <ShoppingCartOutlined />, label: 'Order' },
    payment: { color: '#f5222d', icon: <BankOutlined />, label: 'Payment' },
    milestone: { color: '#a0d911', icon: <TrophyOutlined />, label: 'Milestone' },
    bug: { color: '#ff4d4f', icon: <BugOutlined />, label: 'Bug Report' },
    feature: { color: '#722ed1', icon: <RocketOutlined />, label: 'Feature' },
    system: { color: '#8c8c8c', icon: <SettingOutlined />, label: 'System' }
  };

  const [activities, setActivities] = useState([
    {
      id: '1',
      type: 'milestone',
      title: 'Q4 2024 Goals Achieved',
      description: 'Successfully completed all quarterly objectives including 15% revenue growth and customer satisfaction improvements.',
      user: { name: 'John Smith', role: 'Project Manager' },
      timestamp: '2024-02-08T16:30:00',
      priority: 'high',
      status: 'completed',
      tags: ['quarterly', 'goals', 'achievement'],
      metadata: {
        progress: 100,
        revenue: '$2.4M',
        satisfaction: '9.2/10'
      },
      attachments: 2,
      comments: 8,
      likes: 12
    },
    {
      id: '2',
      type: 'meeting',
      title: 'Board Meeting - Strategic Planning',
      description: 'Quarterly board meeting to discuss strategic initiatives for 2024. Key decisions made on budget allocation and new market expansion.',
      user: { name: 'Sarah Johnson', role: 'CEO' },
      timestamp: '2024-02-08T14:00:00',
      priority: 'high',
      status: 'completed',
      tags: ['board', 'strategy', 'planning'],
      metadata: {
        duration: '2 hours',
        attendees: 8,
        decisions: 5
      },
      attachments: 3,
      comments: 15,
      likes: 6
    },
    {
      id: '3',
      type: 'sale',
      title: 'Major Enterprise Deal Closed',
      description: 'Successfully closed $500K enterprise contract with TechCorp Industries. This represents our largest single deal this quarter.',
      user: { name: 'Michael Brown', role: 'Sales Director' },
      timestamp: '2024-02-08T11:45:00',
      priority: 'high',
      status: 'completed',
      tags: ['enterprise', 'sales', 'contract'],
      metadata: {
        amount: '$500,000',
        duration: '3 years',
        commission: '$25,000'
      },
      attachments: 1,
      comments: 12,
      likes: 18
    },
    {
      id: '4',
      type: 'email',
      title: 'Security Audit Report Distributed',
      description: 'Comprehensive security audit report sent to all stakeholders. Report shows excellent security posture with 9.2/10 rating.',
      user: { name: 'Emily Davis', role: 'Security Manager' },
      timestamp: '2024-02-08T10:15:00',
      priority: 'medium',
      status: 'completed',
      tags: ['security', 'audit', 'compliance'],
      metadata: {
        recipients: 25,
        rating: '9.2/10',
        issues: 2
      },
      attachments: 1,
      comments: 7,
      likes: 9
    },
    {
      id: '5',
      type: 'task',
      title: 'Database Migration Completed',
      description: 'Successfully migrated customer database to new infrastructure. Zero downtime achieved with improved performance metrics.',
      user: { name: 'David Wilson', role: 'DevOps Engineer' },
      timestamp: '2024-02-07T22:30:00',
      priority: 'high',
      status: 'completed',
      tags: ['database', 'migration', 'infrastructure'],
      metadata: {
        downtime: '0 minutes',
        performance: '+35%',
        records: '2.4M'
      },
      attachments: 4,
      comments: 11,
      likes: 14
    },
    {
      id: '6',
      type: 'feature',
      title: 'New Dashboard Analytics Released',
      description: 'Launched enhanced dashboard with real-time analytics and improved data visualization capabilities for better business insights.',
      user: { name: 'Lisa Garcia', role: 'Product Manager' },
      timestamp: '2024-02-07T16:20:00',
      priority: 'medium',
      status: 'completed',
      tags: ['product', 'analytics', 'dashboard'],
      metadata: {
        features: 12,
        users: '1,200+',
        feedback: '4.8/5'
      },
      attachments: 5,
      comments: 20,
      likes: 25
    },
    {
      id: '7',
      type: 'call',
      title: 'Client Consultation - Growth Strategy',
      description: 'Strategic consultation call with MegaCorp to discuss their digital transformation roadmap and implementation timeline.',
      user: { name: 'Robert Chen', role: 'Business Consultant' },
      timestamp: '2024-02-07T14:00:00',
      priority: 'medium',
      status: 'completed',
      tags: ['consultation', 'strategy', 'transformation'],
      metadata: {
        duration: '90 minutes',
        outcome: 'Positive',
        followUp: 'Feb 15'
      },
      attachments: 2,
      comments: 5,
      likes: 7
    },
    {
      id: '8',
      type: 'document',
      title: 'Q1 Budget Proposal Submitted',
      description: 'Comprehensive budget proposal for Q1 2024 submitted for approval. Includes detailed breakdowns for all departments.',
      user: { name: 'Jennifer Lee', role: 'Finance Director' },
      timestamp: '2024-02-07T12:45:00',
      priority: 'high',
      status: 'pending',
      tags: ['budget', 'finance', 'proposal'],
      metadata: {
        amount: '$1.2M',
        departments: 8,
        items: 150
      },
      attachments: 3,
      comments: 9,
      likes: 6
    },
    {
      id: '9',
      type: 'bug',
      title: 'Critical Login Issue Resolved',
      description: 'Fixed critical authentication bug that was preventing users from logging in. Issue affected approximately 200 users.',
      user: { name: 'Alex Kumar', role: 'Senior Developer' },
      timestamp: '2024-02-07T09:30:00',
      priority: 'critical',
      status: 'completed',
      tags: ['bug', 'authentication', 'critical'],
      metadata: {
        affected: '200 users',
        resolution: '45 minutes',
        severity: 'Critical'
      },
      attachments: 1,
      comments: 13,
      likes: 8
    },
    {
      id: '10',
      type: 'order',
      title: 'Large Equipment Order Processed',
      description: 'Processed major equipment order for office expansion. New hardware will support team growth and improved productivity.',
      user: { name: 'Maria Rodriguez', role: 'Operations Manager' },
      timestamp: '2024-02-06T15:20:00',
      priority: 'medium',
      status: 'processing',
      tags: ['equipment', 'order', 'expansion'],
      metadata: {
        value: '$85,000',
        items: 45,
        delivery: 'Feb 20'
      },
      attachments: 2,
      comments: 4,
      likes: 3
    }
  ]);

  const statusConfig = {
    completed: { color: '#52c41a', icon: <CheckCircleOutlined />, label: 'Completed' },
    pending: { color: '#faad14', icon: <ClockCircleOutlined />, label: 'Pending' },
    processing: { color: '#1890ff', icon: <SyncOutlined />, label: 'Processing' },
    cancelled: { color: '#ff4d4f', icon: <StopOutlined />, label: 'Cancelled' }
  };

  const priorityConfig = {
    critical: { color: '#ff4d4f', label: 'Critical' },
    high: { color: '#fa541c', label: 'High' },
    medium: { color: '#faad14', label: 'Medium' },
    low: { color: '#52c41a', label: 'Low' }
  };

  const getFilteredActivities = () => {
    return activities.filter(activity => {
      const matchesType = selectedFilter === 'all' || activity.type === selectedFilter;
      const matchesSearch = !searchTerm || 
        activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.user.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      let matchesDate = true;
      if (dateRange && dateRange.length === 2) {
        const activityDate = dayjs(activity.timestamp);
        matchesDate = activityDate.isAfter(dateRange[0]) && activityDate.isBefore(dateRange[1]);
      }
      
      return matchesType && matchesSearch && matchesDate;
    });
  };

  const handleViewDetails = (activity) => {
    setSelectedActivity(activity);
    setIsModalVisible(true);
  };

  const handleAddActivity = (values) => {
    const newActivity = {
      id: Date.now().toString(),
      type: values.type,
      title: values.title,
      description: values.description || '',
      user: { name: values.userName || 'Current User', role: values.userRole || 'User' },
      timestamp: values.timestamp ? values.timestamp.toISOString() : new Date().toISOString(),
      priority: values.priority || 'medium',
      status: values.status || 'pending',
      tags: values.tags || [],
      metadata: values.metadata || {},
      attachments: values.attachments || 0,
      comments: 0,
      likes: 0
    };

    setActivities(prev => [newActivity, ...prev]);
    setIsAddModalVisible(false);
    addForm.resetFields();
    message.success('Activity added successfully');
  };

  const getTimelineItems = () => {
    const filteredActivities = getFilteredActivities();
    
    return filteredActivities.map(activity => ({
      color: activityTypes[activity.type].color,
      dot: (
        <div style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: activityTypes[activity.type].color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '3px solid white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {React.cloneElement(activityTypes[activity.type].icon, { 
            style: { color: 'white', fontSize: 14 } 
          })}
        </div>
      ),
      children: (
        <Card 
          size="small" 
          className="timeline-card"
          style={{ 
            marginBottom: 16,
            borderRadius: 8,
            boxShadow: 'var(--oracle-shadow-sm)',
            border: '1px solid var(--oracle-border)'
          }}
          bodyStyle={{ padding: '16px 20px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Tag 
                  color={activityTypes[activity.type].color}
                  style={{ margin: 0, fontSize: '11px' }}
                >
                  {activityTypes[activity.type].label}
                </Tag>
                <Tag 
                  color={priorityConfig[activity.priority].color}
                  style={{ margin: 0, fontSize: '11px' }}
                >
                  {priorityConfig[activity.priority].label}
                </Tag>
                <Tag 
                  color={statusConfig[activity.status].color}
                  icon={statusConfig[activity.status].icon}
                  style={{ margin: 0, fontSize: '11px' }}
                >
                  {statusConfig[activity.status].label}
                </Tag>
              </div>
              
              <Title level={5} style={{ margin: 0, marginBottom: 8, fontSize: '16px', lineHeight: '22px' }}>
                {activity.title}
              </Title>
              
              <Paragraph 
                style={{ 
                  margin: 0, 
                  marginBottom: 12,
                  color: 'var(--oracle-text-secondary)',
                  fontSize: '14px',
                  lineHeight: '20px'
                }}
                ellipsis={{ rows: 2 }}
              >
                {activity.description}
              </Paragraph>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <Avatar 
                    size={24} 
                    icon={<UserOutlined />}
                    style={{ backgroundColor: 'var(--oracle-primary)' }}
                  >
                    {activity.user.name.charAt(0)}
                  </Avatar>
                  <div>
                    <Text strong style={{ fontSize: '13px' }}>
                      {activity.user.name}
                    </Text>
                    <br />
                    <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
                      {activity.user.role}
                    </Text>
                  </div>
                </Space>

                <Text style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
                  {dayjs(activity.timestamp).format('MMM DD, YYYY [at] h:mm A')}
                </Text>
              </div>

              {/* Metadata */}
              {activity.metadata && (
                <div style={{ marginTop: 12, padding: '8px 0', borderTop: '1px solid var(--oracle-border)' }}>
                  <Row gutter={16}>
                    {Object.entries(activity.metadata).slice(0, 3).map(([key, value]) => (
                      <Col key={key} span={8}>
                        <div style={{ textAlign: 'center' }}>
                          <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)', display: 'block' }}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Text>
                          <Text strong style={{ fontSize: '13px' }}>
                            {value}
                          </Text>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}

              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div style={{ marginTop: 12 }}>
                  {activity.tags.map(tag => (
                    <Tag 
                      key={tag} 
                      size="small" 
                      style={{ 
                        fontSize: '10px', 
                        margin: '2px 4px 2px 0',
                        borderRadius: 10 
                      }}
                    >
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}

              {/* Engagement */}
              <div style={{ 
                marginTop: 12, 
                paddingTop: 8, 
                borderTop: '1px solid var(--oracle-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <Space size={16}>
                  <Space size={4}>
                    <LikeOutlined style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }} />
                    <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
                      {activity.likes}
                    </Text>
                  </Space>
                  <Space size={4}>
                    <CommentOutlined style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }} />
                    <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
                      {activity.comments}
                    </Text>
                  </Space>
                  {activity.attachments > 0 && (
                    <Space size={4}>
                      <FileTextOutlined style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }} />
                      <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
                        {activity.attachments}
                      </Text>
                    </Space>
                  )}
                </Space>

                <Button 
                  type="link" 
                  size="small" 
                  onClick={() => handleViewDetails(activity)}
                  style={{ fontSize: '12px', padding: 0, height: 'auto' }}
                >
                  View Details
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )
    }));
  };

  const getTimelineStats = () => {
    const filtered = getFilteredActivities();
    const typeStats = {};
    const statusStats = {};

    filtered.forEach(activity => {
      typeStats[activity.type] = (typeStats[activity.type] || 0) + 1;
      statusStats[activity.status] = (statusStats[activity.status] || 0) + 1;
    });

    return { typeStats, statusStats, total: filtered.length };
  };

  const stats = getTimelineStats();

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ flex: 1 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--oracle-text-primary)' }}>
            Activity Timeline
          </Title>
          <Text style={{ color: 'var(--oracle-text-secondary)', fontSize: '16px' }}>
            Track and monitor all business activities and events in chronological order
          </Text>
        </div>
        
        <Space>
          <Button icon={<DownloadOutlined />}>
            Export
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalVisible(true)}>
            Add Activity
          </Button>
        </Space>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#e6f7ff' }}>
                <HistoryOutlined style={{ color: '#1890ff' }} />
              </div>
              <div>
                <div className="stats-number">{stats.total}</div>
                <div className="stats-label">Total Activities</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#f6ffed' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
              </div>
              <div>
                <div className="stats-number">{stats.statusStats.completed || 0}</div>
                <div className="stats-label">Completed</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#fff7e6' }}>
                <SyncOutlined style={{ color: '#faad14' }} />
              </div>
              <div>
                <div className="stats-number">{stats.statusStats.processing || 0}</div>
                <div className="stats-label">In Progress</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#fff2e8' }}>
                <ClockCircleOutlined style={{ color: '#fa541c' }} />
              </div>
              <div>
                <div className="stats-number">{stats.statusStats.pending || 0}</div>
                <div className="stats-label">Pending</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Filters Sidebar */}
        <Col xs={24} lg={6}>
          <Card 
            title="Filters" 
            size="small"
            style={{ marginBottom: 16 }}
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong style={{ fontSize: '12px', display: 'block', marginBottom: 8 }}>
                  Activity Type
                </Text>
                <Select
                  value={selectedFilter}
                  onChange={setSelectedFilter}
                  style={{ width: '100%' }}
                  options={[
                    { value: 'all', label: 'All Types' },
                    ...Object.entries(activityTypes).map(([key, config]) => ({
                      value: key,
                      label: (
                        <Space>
                          {config.icon}
                          {config.label}
                        </Space>
                      )
                    }))
                  ]}
                />
              </div>

              <div>
                <Text strong style={{ fontSize: '12px', display: 'block', marginBottom: 8 }}>
                  Date Range
                </Text>
                <RangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  style={{ width: '100%' }}
                  size="small"
                />
              </div>

              <div>
                <Text strong style={{ fontSize: '12px', display: 'block', marginBottom: 8 }}>
                  Search
                </Text>
                <Search
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="small"
                />
              </div>
            </Space>
          </Card>

          {/* Activity Type Distribution */}
          <Card 
            title="Activity Distribution" 
            size="small"
          >
            <List
              size="small"
              dataSource={Object.entries(stats.typeStats)}
              renderItem={([type, count]) => (
                <List.Item style={{ padding: '8px 0', borderBottom: 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Space>
                      {activityTypes[type].icon}
                      <Text style={{ fontSize: '12px' }}>
                        {activityTypes[type].label}
                      </Text>
                    </Space>
                    <Badge 
                      count={count} 
                      style={{ backgroundColor: activityTypes[type].color }}
                    />
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Timeline */}
        <Col xs={24} lg={18}>
          <Card 
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <HistoryOutlined />
                  <Text strong>Activity Timeline</Text>
                  <Badge count={getFilteredActivities().length} style={{ backgroundColor: 'var(--oracle-primary)' }} />
                </Space>
                <Button size="small" icon={<FilterOutlined />} onClick={() => message.info('Advanced filters')}>
                  More Filters
                </Button>
              </div>
            }
            size="small"
          >
            {getFilteredActivities().length > 0 ? (
              <Timeline
                mode="left"
                items={getTimelineItems()}
                style={{ paddingTop: 20 }}
              />
            ) : (
              <div style={{ 
                textAlign: 'center', 
                color: 'var(--oracle-text-secondary)',
                padding: '60px 20px'
              }}>
                <HistoryOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <Title level={4} style={{ color: 'var(--oracle-text-secondary)' }}>
                  No activities found
                </Title>
                <Text>Try adjusting your filters or search criteria</Text>
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Activity Detail Modal */}
      <Modal
        title={selectedActivity?.title}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedActivity && (
          <div style={{ marginTop: 20 }}>
            <div style={{ marginBottom: 20 }}>
              <Space wrap>
                <Tag color={activityTypes[selectedActivity.type].color}>
                  {activityTypes[selectedActivity.type].label}
                </Tag>
                <Tag color={priorityConfig[selectedActivity.priority].color}>
                  {priorityConfig[selectedActivity.priority].label}
                </Tag>
                <Tag 
                  color={statusConfig[selectedActivity.status].color}
                  icon={statusConfig[selectedActivity.status].icon}
                >
                  {statusConfig[selectedActivity.status].label}
                </Tag>
              </Space>
            </div>

            <Paragraph style={{ fontSize: '14px', lineHeight: '22px', marginBottom: 20 }}>
              {selectedActivity.description}
            </Paragraph>

            <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
              <Col span={12}>
                <Card size="small" title="Activity Details">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Created by:</Text>
                      <Text strong>{selectedActivity.user.name}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Role:</Text>
                      <Text>{selectedActivity.user.role}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Date:</Text>
                      <Text>{dayjs(selectedActivity.timestamp).format('MMM DD, YYYY')}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text>Time:</Text>
                      <Text>{dayjs(selectedActivity.timestamp).format('h:mm A')}</Text>
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="Engagement">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Space>
                        <LikeOutlined />
                        <Text>Likes:</Text>
                      </Space>
                      <Text strong>{selectedActivity.likes}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Space>
                        <CommentOutlined />
                        <Text>Comments:</Text>
                      </Space>
                      <Text strong>{selectedActivity.comments}</Text>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Space>
                        <FileTextOutlined />
                        <Text>Attachments:</Text>
                      </Space>
                      <Text strong>{selectedActivity.attachments}</Text>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>

            {selectedActivity.metadata && (
              <Card size="small" title="Additional Information" style={{ marginBottom: 20 }}>
                <Row gutter={16}>
                  {Object.entries(selectedActivity.metadata).map(([key, value]) => (
                    <Col key={key} span={8}>
                      <Statistic
                        title={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={value}
                        valueStyle={{ fontSize: '18px' }}
                      />
                    </Col>
                  ))}
                </Row>
              </Card>
            )}

            {selectedActivity.tags && selectedActivity.tags.length > 0 && (
              <div>
                <Text strong style={{ display: 'block', marginBottom: 8 }}>Tags:</Text>
                {selectedActivity.tags.map(tag => (
                  <Tag key={tag} style={{ marginBottom: 4 }}>
                    {tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Add Activity Modal */}
      <Modal
        title="Add New Activity"
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false);
          addForm.resetFields();
        }}
        footer={null}
        width={700}
      >
        <Form
          form={addForm}
          layout="vertical"
          onFinish={handleAddActivity}
          style={{ marginTop: 20 }}
        >
          <Row gutter={16}>
            {/* Required Fields */}
            <Col span={24}>
              <Form.Item
                label="Activity Title"
                name="title"
                rules={[
                  { required: true, message: 'Please enter activity title' },
                  { min: 3, message: 'Title must be at least 3 characters' }
                ]}
              >
                <Input placeholder="Enter a descriptive title for the activity" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Activity Type"
                name="type"
                rules={[{ required: true, message: 'Please select activity type' }]}
              >
                <Select placeholder="Select activity type">
                  {Object.entries(activityTypes).map(([key, config]) => (
                    <Select.Option key={key} value={key}>
                      <Space>
                        {config.icon}
                        {config.label}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Date & Time"
                name="timestamp"
                rules={[{ required: true, message: 'Please select date and time' }]}
              >
                <DatePicker 
                  showTime 
                  style={{ width: '100%' }}
                  placeholder="Select date and time"
                  defaultValue={dayjs()}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: 'Please enter activity description' },
                  { min: 10, message: 'Description must be at least 10 characters' }
                ]}
              >
                <TextArea 
                  rows={4} 
                  placeholder="Provide detailed description of the activity, outcomes, and any relevant information"
                />
              </Form.Item>
            </Col>

            {/* Optional Fields */}
            <Col span={12}>
              <Form.Item
                label="Priority"
                name="priority"
                initialValue="medium"
              >
                <Select placeholder="Select priority level">
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <Select.Option key={key} value={key}>
                      <Space>
                        <div 
                          style={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            backgroundColor: config.color 
                          }} 
                        />
                        {config.label}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                initialValue="pending"
              >
                <Select placeholder="Select current status">
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <Select.Option key={key} value={key}>
                      <Space>
                        {config.icon}
                        {config.label}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="User Name"
                name="userName"
              >
                <Input placeholder="Enter user name (optional)" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="User Role"
                name="userRole"
              >
                <Input placeholder="Enter user role (optional)" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Tags"
                name="tags"
              >
                <Select
                  mode="tags"
                  placeholder="Add tags to categorize this activity"
                  style={{ width: '100%' }}
                  tokenSeparators={[',']}
                >
                  <Select.Option value="urgent">urgent</Select.Option>
                  <Select.Option value="meeting">meeting</Select.Option>
                  <Select.Option value="milestone">milestone</Select.Option>
                  <Select.Option value="client">client</Select.Option>
                  <Select.Option value="internal">internal</Select.Option>
                  <Select.Option value="project">project</Select.Option>
                  <Select.Option value="sales">sales</Select.Option>
                  <Select.Option value="support">support</Select.Option>
                  <Select.Option value="development">development</Select.Option>
                  <Select.Option value="marketing">marketing</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Metadata Fields */}
            <Col span={24}>
              <Divider orientation="left">Additional Information (Optional)</Divider>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Duration"
                name={['metadata', 'duration']}
              >
                <Input placeholder="e.g., 2 hours, 30 minutes" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Amount/Value"
                name={['metadata', 'amount']}
              >
                <Input placeholder="e.g., $10,000, 50 units" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="Participants/Count"
                name={['metadata', 'participants']}
              >
                <Input placeholder="e.g., 10 attendees, 5 users" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Location"
                name={['metadata', 'location']}
              >
                <Input placeholder="Meeting room, office, remote" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Contact/Client"
                name={['metadata', 'contact']}
              >
                <Input placeholder="Client name or contact person" />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Notes"
                name={['metadata', 'notes']}
              >
                <TextArea 
                  rows={2} 
                  placeholder="Additional notes or comments"
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'right', marginTop: 20, paddingTop: 20, borderTop: '1px solid var(--oracle-border)' }}>
            <Space>
              <Button onClick={() => {
                setIsAddModalVisible(false);
                addForm.resetFields();
              }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add Activity
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TimelinePage;

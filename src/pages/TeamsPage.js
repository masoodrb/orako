import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Avatar, 
  Badge, 
  Button, 
  Space, 
  Input, 
  Select, 
  Table, 
  List, 
  Tag, 
  Dropdown, 
  Modal, 
  Form, 
  message,
  Divider,
  Tooltip,
  Progress,
  Statistic,
  Calendar,
  Switch,
  Rate,
  Tabs,
  Upload
} from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  UserAddOutlined,
  SettingOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TrophyOutlined,
  StarOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  CrownOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  EyeOutlined,
  MessageOutlined,
  VideoCameraOutlined,
  FileTextOutlined,
  BankOutlined,
  RocketOutlined,
  BugOutlined,
  BarChartOutlined,
  PieChartOutlined,
  DashboardOutlined,
  GlobalOutlined,
  WifiOutlined,
  ProjectOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { TextArea } = Input;
const { TabPane } = Tabs;

const TeamsPage = () => {
  const [selectedTeam, setSelectedTeam] = useState('engineering');
  const [selectedView, setSelectedView] = useState('overview');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalType, setModalType] = useState('member'); // 'member' or 'team'
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();

  // Sample teams data
  const teams = {
    engineering: {
      id: 'engineering',
      name: 'Engineering Team',
      description: 'Full-stack development and DevOps engineering team',
      department: 'Technology',
      manager: { name: 'Sarah Johnson', email: 'sarah.johnson@oracle.com', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face' },
      color: '#1890ff',
      icon: <RocketOutlined />,
      stats: {
        members: 12,
        projects: 8,
        completedTasks: 156,
        efficiency: 92
      },
      members: [
        {
          id: '1',
          name: 'Sarah Johnson',
          role: 'Engineering Manager',
          email: 'sarah.johnson@oracle.com',
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          status: 'online',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
          skills: ['Leadership', 'Architecture', 'Node.js', 'React'],
          performance: 95,
          projects: ['ERP Module', 'API Gateway'],
          joinDate: '2022-01-15',
          level: 'Senior',
          isManager: true
        },
        {
          id: '2',
          name: 'Michael Brown',
          role: 'Senior Frontend Developer',
          email: 'michael.brown@oracle.com',
          phone: '+1 (555) 234-5678',
          location: 'Seattle, WA',
          status: 'online',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          skills: ['React', 'TypeScript', 'UI/UX', 'Redux'],
          performance: 92,
          projects: ['Dashboard UI', 'Component Library'],
          joinDate: '2022-03-20',
          level: 'Senior'
        },
        {
          id: '3',
          name: 'Emily Davis',
          role: 'Backend Developer',
          email: 'emily.davis@oracle.com',
          phone: '+1 (555) 345-6789',
          location: 'Austin, TX',
          status: 'away',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          skills: ['Python', 'Django', 'PostgreSQL', 'AWS'],
          performance: 88,
          projects: ['Authentication Service', 'Data Pipeline'],
          joinDate: '2022-06-10',
          level: 'Mid'
        },
        {
          id: '4',
          name: 'David Wilson',
          role: 'DevOps Engineer',
          email: 'david.wilson@oracle.com',
          phone: '+1 (555) 456-7890',
          location: 'Boston, MA',
          status: 'online',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS'],
          performance: 94,
          projects: ['Infrastructure', 'Deployment Pipeline'],
          joinDate: '2021-11-05',
          level: 'Senior'
        }
      ]
    },
    sales: {
      id: 'sales',
      name: 'Sales Team',
      description: 'Strategic sales and business development team',
      department: 'Sales',
      manager: { name: 'Robert Chen', email: 'robert.chen@oracle.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
      color: '#52c41a',
      icon: <TrophyOutlined />,
      stats: {
        members: 8,
        deals: 45,
        revenue: '$2.4M',
        conversion: 78
      },
      members: [
        {
          id: '5',
          name: 'Robert Chen',
          role: 'Sales Director',
          email: 'robert.chen@oracle.com',
          phone: '+1 (555) 567-8901',
          location: 'New York, NY',
          status: 'online',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          skills: ['Enterprise Sales', 'Negotiation', 'CRM', 'Strategy'],
          performance: 96,
          projects: ['Q4 Campaign', 'Enterprise Deals'],
          joinDate: '2021-08-15',
          level: 'Senior',
          isManager: true
        },
        {
          id: '6',
          name: 'Lisa Garcia',
          role: 'Senior Account Executive',
          email: 'lisa.garcia@oracle.com',
          phone: '+1 (555) 678-9012',
          location: 'Los Angeles, CA',
          status: 'busy',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
          skills: ['Account Management', 'SaaS Sales', 'Presentations'],
          performance: 91,
          projects: ['West Coast Accounts', 'Product Demos'],
          joinDate: '2022-02-28',
          level: 'Senior'
        }
      ]
    },
    finance: {
      id: 'finance',
      name: 'Finance Team',
      description: 'Financial planning, analysis, and accounting team',
      department: 'Finance',
      manager: { name: 'Jennifer Lee', email: 'jennifer.lee@oracle.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
      color: '#faad14',
      icon: <BankOutlined />,
      stats: {
        members: 6,
        reports: 24,
        accuracy: 99.8,
        savings: '$150K'
      },
      members: [
        {
          id: '7',
          name: 'Jennifer Lee',
          role: 'Finance Director',
          email: 'jennifer.lee@oracle.com',
          phone: '+1 (555) 789-0123',
          location: 'Chicago, IL',
          status: 'online',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
          skills: ['Financial Analysis', 'Budgeting', 'Excel', 'SAP'],
          performance: 97,
          projects: ['Q4 Budget', 'Cost Analysis'],
          joinDate: '2021-05-10',
          level: 'Senior',
          isManager: true
        }
      ]
    }
  };

  const statusConfig = {
    online: { color: '#52c41a', label: 'Online' },
    away: { color: '#faad14', label: 'Away' },
    busy: { color: '#ff4d4f', label: 'Busy' },
    offline: { color: '#8c8c8c', label: 'Offline' }
  };

  const levelConfig = {
    Junior: { color: '#13c2c2', icon: <StarOutlined /> },
    Mid: { color: '#1890ff', icon: <SafetyCertificateOutlined /> },
    Senior: { color: '#722ed1', icon: <CrownOutlined /> }
  };

  const getCurrentTeam = () => teams[selectedTeam];

  const getAllMembers = () => {
    return Object.values(teams).flatMap(team => 
      team.members.map(member => ({ ...member, teamName: team.name, teamColor: team.color }))
    );
  };

  const getFilteredMembers = () => {
    const currentTeam = getCurrentTeam();
    if (!currentTeam) return [];
    
    return currentTeam.members.filter(member =>
      !searchTerm || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleAddMember = () => {
    setModalType('member');
    setEditingItem(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditMember = (member) => {
    setModalType('member');
    setEditingItem(member);
    form.setFieldsValue({
      ...member,
      teamId: selectedTeam
    });
    setIsModalVisible(true);
  };

  const handleSaveMember = (values) => {
    console.log('Saving member:', values);
    message.success(editingItem ? 'Member updated successfully' : 'Member added successfully');
    setIsModalVisible(false);
  };

  const memberColumns = [
    {
      title: 'Member',
      key: 'member',
      render: (_, member) => (
        <Space>
          <div style={{ position: 'relative' }}>
            <Avatar 
              size={40} 
              src={member.avatar}
              icon={!member.avatar ? <UserOutlined /> : undefined}
              style={{ backgroundColor: member.avatar ? 'transparent' : 'var(--orako-primary)' }}
            >
              {!member.avatar && member.name.charAt(0)}
            </Avatar>
            <Badge 
              color={statusConfig[member.status].color}
              style={{ 
                position: 'absolute', 
                bottom: 0, 
                right: 0,
                border: '2px solid white'
              }}
            />
          </div>
          <div>
            <Text strong>{member.name}</Text>
            <br />
            <Text style={{ fontSize: '12px', color: 'var(--orako-text-secondary)' }}>
              {member.role}
            </Text>
          </div>
        </Space>
      )
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, member) => (
        <div>
          <div style={{ marginBottom: 4 }}>
            <MailOutlined style={{ marginRight: 8, color: 'var(--orako-text-secondary)' }} />
            <Text style={{ fontSize: '12px' }}>{member.email}</Text>
          </div>
          <div>
            <PhoneOutlined style={{ marginRight: 8, color: 'var(--orako-text-secondary)' }} />
            <Text style={{ fontSize: '12px' }}>{member.phone}</Text>
          </div>
        </div>
      )
    },
    {
      title: 'Level',
      key: 'level',
      render: (_, member) => (
        <Tag 
          color={levelConfig[member.level].color}
          icon={levelConfig[member.level].icon}
        >
          {member.level}
        </Tag>
      )
    },
    {
      title: 'Performance',
      key: 'performance',
      render: (_, member) => (
        <div style={{ width: 100 }}>
          <Progress 
            percent={member.performance} 
            size="small"
            strokeColor={
              member.performance >= 90 ? '#52c41a' :
              member.performance >= 75 ? '#faad14' : '#ff4d4f'
            }
          />
        </div>
      )
    },
    {
      title: 'Projects',
      key: 'projects',
      render: (_, member) => (
        <div>
          {member.projects.slice(0, 2).map(project => (
            <Tag key={project} size="small" style={{ margin: '1px 2px' }}>
              {project}
            </Tag>
          ))}
          {member.projects.length > 2 && (
            <Tag size="small">+{member.projects.length - 2}</Tag>
          )}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, member) => (
        <Dropdown
          menu={{
            items: [
              { key: 'view', icon: <EyeOutlined />, label: 'View Profile' },
              { key: 'edit', icon: <EditOutlined />, label: 'Edit Member' },
              { key: 'message', icon: <MessageOutlined />, label: 'Send Message' },
              { type: 'divider' },
              { key: 'delete', icon: <DeleteOutlined />, label: 'Remove', danger: true }
            ],
            onClick: ({ key }) => {
              if (key === 'edit') handleEditMember(member);
              else message.info(`${key} action for ${member.name}`);
            }
          }}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      )
    }
  ];

  const TeamOverview = () => {
    const team = getCurrentTeam();
    if (!team) return null;

    return (
      <div>
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="stats-card">
              <div className="stats-content">
                <div className="stats-icon" style={{ backgroundColor: '#e6f7ff' }}>
                  <TeamOutlined style={{ color: '#1890ff' }} />
                </div>
                <div>
                  <div className="stats-number">{team.stats.members}</div>
                  <div className="stats-label">Team Members</div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="stats-card">
              <div className="stats-content">
                <div className="stats-icon" style={{ backgroundColor: '#f6ffed' }}>
                  <ProjectOutlined style={{ color: '#52c41a' }} />
                </div>
                <div>
                  <div className="stats-number">
                    {Object.keys(team.stats)[1] === 'projects' ? team.stats.projects :
                     Object.keys(team.stats)[1] === 'deals' ? team.stats.deals :
                     team.stats.reports}
                  </div>
                  <div className="stats-label">
                    {Object.keys(team.stats)[1] === 'projects' ? 'Active Projects' :
                     Object.keys(team.stats)[1] === 'deals' ? 'Active Deals' :
                     'Monthly Reports'}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="stats-card">
              <div className="stats-content">
                <div className="stats-icon" style={{ backgroundColor: '#fff7e6' }}>
                  <BarChartOutlined style={{ color: '#faad14' }} />
                </div>
                <div>
                  <div className="stats-number">
                    {Object.keys(team.stats)[2] === 'completedTasks' ? team.stats.completedTasks :
                     Object.keys(team.stats)[2] === 'revenue' ? team.stats.revenue :
                     `${team.stats.accuracy}%`}
                  </div>
                  <div className="stats-label">
                    {Object.keys(team.stats)[2] === 'completedTasks' ? 'Completed Tasks' :
                     Object.keys(team.stats)[2] === 'revenue' ? 'Total Revenue' :
                     'Accuracy Rate'}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card size="small" className="stats-card">
              <div className="stats-content">
                <div className="stats-icon" style={{ backgroundColor: '#f9f0ff' }}>
                  <TrophyOutlined style={{ color: '#722ed1' }} />
                </div>
                <div>
                  <div className="stats-number">
                    {Object.keys(team.stats)[3] === 'efficiency' ? `${team.stats.efficiency}%` :
                     Object.keys(team.stats)[3] === 'conversion' ? `${team.stats.conversion}%` :
                     team.stats.savings}
                  </div>
                  <div className="stats-label">
                    {Object.keys(team.stats)[3] === 'efficiency' ? 'Efficiency Rate' :
                     Object.keys(team.stats)[3] === 'conversion' ? 'Conversion Rate' :
                     'Cost Savings'}
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card 
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span>Team Members</span>
                  <Search
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: 200 }}
                    size="small"
                  />
                </div>
              }
              size="small"
              extra={
                <Button type="primary" size="small" icon={<UserAddOutlined />} onClick={handleAddMember}>
                  Add Member
                </Button>
              }
            >
              <Table
                columns={memberColumns}
                dataSource={getFilteredMembers()}
                rowKey="id"
                pagination={false}
                size="small"
              />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Team Manager" size="small" style={{ marginBottom: 16 }}>
              <div style={{ textAlign: 'center' }}>
                <Avatar 
                  size={64} 
                  src={team.manager.avatar}
                  icon={!team.manager.avatar ? <UserOutlined /> : undefined}
                  style={{ backgroundColor: team.manager.avatar ? 'transparent' : 'var(--orako-primary)', marginBottom: 12 }}
                >
                  {!team.manager.avatar && team.manager.name.charAt(0)}
                </Avatar>
                <Title level={5} style={{ margin: 0, marginBottom: 4 }}>
                  {team.manager.name}
                </Title>
                <Text style={{ color: 'var(--orako-text-secondary)' }}>
                  Team Manager
                </Text>
                <Divider />
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button type="primary" block icon={<MailOutlined />}>
                    Send Email
                  </Button>
                  <Button block icon={<VideoCameraOutlined />}>
                    Video Call
                  </Button>
                </Space>
              </div>
            </Card>

            <Card title="Team Activity" size="small">
              <List
                size="small"
                dataSource={[
                  { action: 'New member joined', user: 'Alex Kumar', time: '2 hours ago' },
                  { action: 'Project milestone completed', user: 'Sarah Johnson', time: '4 hours ago' },
                  { action: 'Weekly standup meeting', user: 'Team', time: '1 day ago' },
                  { action: 'Code review completed', user: 'Michael Brown', time: '2 days ago' }
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<ClockCircleOutlined style={{ color: 'var(--orako-text-secondary)' }} />}
                      title={<Text style={{ fontSize: '12px' }}>{item.action}</Text>}
                      description={
                        <div>
                          <Text style={{ fontSize: '11px', color: 'var(--orako-text-secondary)' }}>
                            {item.user}
                          </Text>
                          <Text style={{ fontSize: '11px', color: 'var(--orako-text-secondary)', marginLeft: 8 }}>
                            {item.time}
                          </Text>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  const AllTeamsView = () => (
    <Row gutter={[24, 24]}>
      {Object.values(teams).map(team => (
        <Col key={team.id} xs={24} lg={8}>
          <Card 
            size="small"
            className="team-card"
            style={{ 
              borderRadius: 8,
              border: `2px solid ${team.color}20`,
              cursor: 'pointer'
            }}
            onClick={() => {
              setSelectedTeam(team.id);
              setSelectedView('overview');
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: `${team.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px'
              }}>
                {React.cloneElement(team.icon, { 
                  style: { fontSize: 24, color: team.color } 
                })}
              </div>
              <Title level={4} style={{ margin: 0, marginBottom: 4 }}>
                {team.name}
              </Title>
              <Text style={{ color: 'var(--orako-text-secondary)' }}>
                {team.description}
              </Text>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Members"
                  value={team.stats.members}
                  valueStyle={{ fontSize: '20px', color: team.color }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title={Object.keys(team.stats)[1] === 'projects' ? 'Projects' :
                         Object.keys(team.stats)[1] === 'deals' ? 'Deals' : 'Reports'}
                  value={Object.values(team.stats)[1]}
                  valueStyle={{ fontSize: '20px', color: team.color }}
                />
              </Col>
            </Row>

            <Divider />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Space>
                <Avatar 
                  size={24} 
                  icon={<UserOutlined />}
                  style={{ backgroundColor: team.color }}
                >
                  {team.manager.name.charAt(0)}
                </Avatar>
                <div>
                  <Text style={{ fontSize: '12px', display: 'block' }}>
                    {team.manager.name}
                  </Text>
                  <Text style={{ fontSize: '11px', color: 'var(--orako-text-secondary)' }}>
                    Manager
                  </Text>
                </div>
              </Space>
              <Button type="primary" size="small" style={{ backgroundColor: team.color, borderColor: team.color }}>
                View Team
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ flex: 1 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--orako-text-primary)' }}>
            Teams & Collaboration
          </Title>
          <Text style={{ color: 'var(--orako-text-secondary)', fontSize: '16px' }}>
            Manage teams, members, and foster collaboration across departments
          </Text>
        </div>
        
        <Space>
          <Select
            value={selectedView}
            onChange={setSelectedView}
            style={{ minWidth: 120 }}
            options={[
              { value: 'all', label: 'All Teams' },
              { value: 'overview', label: 'Team Overview' },
              { value: 'members', label: 'Members' },
              { value: 'projects', label: 'Projects' }
            ]}
          />
          {selectedView !== 'all' && (
            <Select
              value={selectedTeam}
              onChange={setSelectedTeam}
              style={{ minWidth: 150 }}
              options={Object.values(teams).map(team => ({
                value: team.id,
                label: (
                  <Space>
                    {team.icon}
                    {team.name}
                  </Space>
                )
              }))}
            />
          )}
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddMember}>
            Add Member
          </Button>
        </Space>
      </div>

      {/* Content */}
      {selectedView === 'all' ? (
        <AllTeamsView />
      ) : (
        <TeamOverview />
      )}

      {/* Member Modal */}
      <Modal
        title={editingItem ? 'Edit Team Member' : 'Add Team Member'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveMember}
          style={{ marginTop: 20 }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                rules={[{ required: true, message: 'Please enter role' }]}
              >
                <Input placeholder="Enter role/position" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Profile Picture URL"
            name="avatar"
            help="Optional: Enter a URL for the member's profile picture"
          >
            <Input 
              placeholder="https://example.com/profile.jpg" 
              type="url"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Team"
                name="teamId"
                rules={[{ required: true, message: 'Please select team' }]}
              >
                <Select placeholder="Select team">
                  {Object.values(teams).map(team => (
                    <Select.Option key={team.id} value={team.id}>
                      <Space>
                        {team.icon}
                        {team.name}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Level"
                name="level"
                rules={[{ required: true, message: 'Please select level' }]}
              >
                <Select placeholder="Select level">
                  {Object.entries(levelConfig).map(([key, config]) => (
                    <Select.Option key={key} value={key}>
                      <Space>
                        {config.icon}
                        {key}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Location"
            name="location"
          >
            <Input placeholder="Enter location" />
          </Form.Item>

          <Form.Item
            label="Skills"
            name="skills"
          >
            <Select
              mode="tags"
              placeholder="Add skills"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            label="Projects"
            name="projects"
          >
            <Select
              mode="tags"
              placeholder="Add projects"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingItem ? 'Update Member' : 'Add Member'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TeamsPage;

import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Avatar,
  Button,
  Typography,
  Descriptions,
  Progress,
  Timeline,
  List,
  Space,
  Tag,
  Statistic,
  Badge,
  Upload,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Divider,
  Tabs,
  Table,
  Rate,
  Chart,
  Empty,
  Image,
  Tooltip,
  Modal,
  Calendar
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  UploadOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
  TrophyOutlined,
  TeamOutlined,
  ProjectOutlined,
  FileTextOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FlagOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
  LinkedinOutlined,
  GithubOutlined,
  TwitterOutlined,
  GlobalOutlined,
  BankOutlined,
  HistoryOutlined,
  BarChartOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  HeartOutlined,
  MessageOutlined,
  SettingOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const MyProfilePage = () => {
  const [editingProfile, setEditingProfile] = useState(false);
  const [form] = Form.useForm();

  // Sample profile data
  const profileData = {
    name: 'Sarah Johnson',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    employeeId: 'EMP001',
    hireDate: '2023-01-15',
    manager: 'John Smith',
    team: 'Frontend Development',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612c0e4?w=400&h=400&fit=crop&crop=face',
    bio: 'Passionate software engineer with 8+ years of experience in building scalable web applications. Expert in React, Node.js, and cloud technologies. Love mentoring junior developers and contributing to open source projects.',
    skills: [
      { name: 'React', level: 95, category: 'Frontend' },
      { name: 'Node.js', level: 88, category: 'Backend' },
      { name: 'TypeScript', level: 92, category: 'Language' },
      { name: 'AWS', level: 85, category: 'Cloud' },
      { name: 'MongoDB', level: 82, category: 'Database' },
      { name: 'Docker', level: 78, category: 'DevOps' }
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarahjohnson',
      github: 'https://github.com/sarahjohnson',
      twitter: 'https://twitter.com/sarahj_dev',
      website: 'https://sarahjohnson.dev'
    }
  };

  // Sample activity data
  const recentActivity = [
    {
      key: '1',
      type: 'project',
      title: 'Completed Project Phoenix',
      description: 'Successfully delivered the new customer portal',
      timestamp: '2025-06-21 14:30',
      icon: <CheckCircleOutlined style={{ color: 'var(--oracle-success)' }} />
    },
    {
      key: '2',
      type: 'meeting',
      title: 'Team Standup Meeting',
      description: 'Daily standup with the frontend team',
      timestamp: '2025-06-21 09:00',
      icon: <TeamOutlined style={{ color: 'var(--oracle-secondary)' }} />
    },
    {
      key: '3',
      type: 'code',
      title: 'Code Review Completed',
      description: 'Reviewed 5 pull requests for the authentication module',
      timestamp: '2025-06-20 16:45',
      icon: <FileTextOutlined style={{ color: 'var(--oracle-primary)' }} />
    },
    {
      key: '4',
      type: 'achievement',
      title: 'Employee of the Month',
      description: 'Recognized for outstanding contribution to the Q2 release',
      timestamp: '2025-06-01 12:00',
      icon: <TrophyOutlined style={{ color: 'var(--oracle-warning)' }} />
    }
  ];

  // Sample projects data
  const projectsData = [
    {
      key: '1',
      name: 'Customer Portal v2.0',
      status: 'Completed',
      role: 'Lead Developer',
      completion: 100,
      deadline: '2025-06-15',
      team: 5
    },
    {
      key: '2',
      name: 'Mobile App Redesign',
      status: 'In Progress',
      role: 'Frontend Developer',
      completion: 75,
      deadline: '2025-07-30',
      team: 8
    },
    {
      key: '3',
      name: 'API Integration Platform',
      status: 'Planning',
      role: 'Technical Lead',
      completion: 25,
      deadline: '2025-09-15',
      team: 6
    }
  ];

  // Sample certifications data
  const certifications = [
    {
      key: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2024-08-15',
      expiry: '2027-08-15',
      credentialId: 'AWS-CSA-2024-0815'
    },
    {
      key: '2',
      name: 'React Professional Certification',
      issuer: 'Meta',
      date: '2024-03-10',
      expiry: '2026-03-10',
      credentialId: 'META-REACT-2024-031'
    },
    {
      key: '3',
      name: 'Scrum Master Certified',
      issuer: 'Scrum Alliance',
      date: '2023-11-20',
      expiry: '2025-11-20',
      credentialId: 'SA-CSM-2023-1120'
    }
  ];

  // Sample performance data
  const performanceData = [
    { month: 'Jan', score: 88 },
    { month: 'Feb', score: 92 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 94 },
    { month: 'May', score: 90 },
    { month: 'Jun', score: 96 }
  ];

  const handleProfileUpdate = (values) => {
    message.success('Profile updated successfully!');
    setEditingProfile(false);
  };

  const handleAvatarUpload = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
      message.success('Profile picture updated successfully!');
    }, 1000);
  };

  const projectColumns = [
    {
      title: 'Project',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <Text strong>{name}</Text>,
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        if (status === 'Completed') color = 'success';
        else if (status === 'In Progress') color = 'processing';
        else if (status === 'Planning') color = 'warning';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Progress',
      dataIndex: 'completion',
      key: 'completion',
      render: (completion) => (
        <Progress 
          percent={completion} 
          size="small" 
          strokeColor={
            completion >= 90 ? 'var(--oracle-success)' : 
            completion >= 70 ? 'var(--oracle-secondary)' : 
            'var(--oracle-warning)'
          }
        />
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Team Size',
      dataIndex: 'team',
      key: 'team',
      render: (size) => (
        <Space>
          <TeamOutlined />
          {size}
        </Space>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'overview',
      label: (
        <Space>
          <UserOutlined />
          Overview
        </Space>
      ),
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <Avatar 
                  size={120} 
                  src={profileData.avatar}
                  style={{ marginBottom: '16px' }}
                />
                <div>
                  <Upload
                    showUploadList={false}
                    customRequest={handleAvatarUpload}
                    accept="image/*"
                  >
                    <Button icon={<UploadOutlined />} size="small">
                      Change Photo
                    </Button>
                  </Upload>
                </div>
              </div>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Employee ID">{profileData.employeeId}</Descriptions.Item>
                <Descriptions.Item label="Department">{profileData.department}</Descriptions.Item>
                <Descriptions.Item label="Manager">{profileData.manager}</Descriptions.Item>
                <Descriptions.Item label="Team">{profileData.team}</Descriptions.Item>
                <Descriptions.Item label="Hire Date">
                  {dayjs(profileData.hireDate).format('MMM DD, YYYY')}
                </Descriptions.Item>
              </Descriptions>
              <Divider />
              <div style={{ textAlign: 'center' }}>
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button icon={<LinkedinOutlined />} block>
                    LinkedIn
                  </Button>
                  <Button icon={<GithubOutlined />} block>
                    GitHub
                  </Button>
                  <Button icon={<GlobalOutlined />} block>
                    Website
                  </Button>
                </Space>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Card 
                  title="About Me" 
                  extra={
                    <Button 
                      icon={<EditOutlined />} 
                      onClick={() => setEditingProfile(true)}
                    >
                      Edit Profile
                    </Button>
                  }
                >
                  {editingProfile ? (
                    <Form
                      form={form}
                      layout="vertical"
                      onFinish={handleProfileUpdate}
                      initialValues={profileData}
                    >
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                          <Form.Item label="Full Name" name="name">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item label="Job Title" name="title">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item label="Email" name="email">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item label="Phone" name="phone">
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item label="Bio" name="bio">
                            <TextArea rows={4} />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Space>
                            <Button type="primary" htmlType="submit">
                              Save Changes
                            </Button>
                            <Button onClick={() => setEditingProfile(false)}>
                              Cancel
                            </Button>
                          </Space>
                        </Col>
                      </Row>
                    </Form>
                  ) : (
                    <div>
                      <Title level={3}>{profileData.name}</Title>
                      <Text type="secondary" style={{ fontSize: '16px' }}>
                        {profileData.title}
                      </Text>
                      <div style={{ margin: '16px 0' }}>
                        <Space direction="vertical">
                          <Space>
                            <MailOutlined />
                            <Text>{profileData.email}</Text>
                          </Space>
                          <Space>
                            <PhoneOutlined />
                            <Text>{profileData.phone}</Text>
                          </Space>
                          <Space>
                            <EnvironmentOutlined />
                            <Text>{profileData.location}</Text>
                          </Space>
                        </Space>
                      </div>
                      <Paragraph>{profileData.bio}</Paragraph>
                    </div>
                  )}
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Skills & Expertise">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {profileData.skills.map((skill, index) => (
                      <div key={index} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <Text strong>{skill.name}</Text>
                          <Text type="secondary">{skill.level}%</Text>
                        </div>
                        <Progress 
                          percent={skill.level} 
                          size="small" 
                          showInfo={false}
                          strokeColor="var(--oracle-primary)"
                        />
                        <Text type="secondary" style={{ fontSize: '12px' }}>{skill.category}</Text>
                      </div>
                    ))}
                  </Space>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Performance Overview">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Statistic
                        title="Overall Rating"
                        value={4.8}
                        suffix="/ 5.0"
                        valueStyle={{ color: 'var(--oracle-success)' }}
                      />
                      <Rate disabled defaultValue={4.8} allowHalf />
                    </Col>
                    <Col span={12}>
                      <Statistic
                        title="Projects Completed"
                        value={23}
                        valueStyle={{ color: 'var(--oracle-secondary)' }}
                        prefix={<TrophyOutlined />}
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <div>
                    <Text strong>Recent Achievements</Text>
                    <List
                      size="small"
                      dataSource={[
                        'Employee of the Month - June 2025',
                        'Best Code Quality Award - Q1 2025',
                        'Innovation Award - 2024'
                      ]}
                      renderItem={(item) => (
                        <List.Item>
                          <Space>
                            <TrophyOutlined style={{ color: 'var(--oracle-warning)' }} />
                            <Text>{item}</Text>
                          </Space>
                        </List.Item>
                      )}
                    />
                  </div>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      ),
    },
    {
      key: 'activity',
      label: (
        <Space>
          <HistoryOutlined />
          Activity
        </Space>
      ),
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card title="Recent Activity">
              <Timeline
                items={recentActivity.map((activity) => ({
                  dot: activity.icon,
                  children: (
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '4px' }}>
                        {activity.title}
                      </div>
                      <div style={{ color: 'var(--oracle-text-secondary)', marginBottom: '4px' }}>
                        {activity.description}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
                        {dayjs(activity.timestamp).format('MMM DD, YYYY HH:mm')}
                      </div>
                    </div>
                  ),
                }))}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Activity Summary">
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Statistic
                    title="This Week"
                    value={32}
                    suffix="hours"
                    valueStyle={{ color: 'var(--oracle-primary)' }}
                    prefix={<ClockCircleOutlined />}
                  />
                </Col>
                <Col span={24}>
                  <Statistic
                    title="Tasks Completed"
                    value={15}
                    valueStyle={{ color: 'var(--oracle-success)' }}
                    prefix={<CheckCircleOutlined />}
                  />
                </Col>
                <Col span={24}>
                  <Statistic
                    title="Code Reviews"
                    value={8}
                    valueStyle={{ color: 'var(--oracle-secondary)' }}
                    prefix={<FileTextOutlined />}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'projects',
      label: (
        <Space>
          <ProjectOutlined />
          Projects
        </Space>
      ),
      children: (
        <Card title="My Projects">
          <Table 
            dataSource={projectsData} 
            columns={projectColumns} 
            pagination={false}
            size="middle"
          />
        </Card>
      ),
    },
    {
      key: 'certifications',
      label: (
        <Space>
          <SafetyCertificateOutlined />
          Certifications
        </Space>
      ),
      children: (
        <Card title="Professional Certifications">
          <List
            itemLayout="horizontal"
            dataSource={certifications}
            renderItem={(cert) => (
              <List.Item
                actions={[
                  <Button size="small" icon={<EyeOutlined />}>
                    View
                  </Button>,
                  <Button size="small" icon={<DownloadOutlined />}>
                    Download
                  </Button>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar 
                      icon={<SafetyCertificateOutlined />} 
                      style={{ backgroundColor: 'var(--oracle-success)' }}
                    />
                  }
                  title={cert.name}
                  description={
                    <Space direction="vertical" size="small">
                      <Text type="secondary">{cert.issuer}</Text>
                      <Space>
                        <Text type="secondary">
                          Issued: {dayjs(cert.date).format('MMM DD, YYYY')}
                        </Text>
                        <Text type="secondary">
                          Expires: {dayjs(cert.expiry).format('MMM DD, YYYY')}
                        </Text>
                      </Space>
                      <Text code style={{ fontSize: '12px' }}>
                        ID: {cert.credentialId}
                      </Text>
                    </Space>
                  }
                />
              </List.Item>
            )}
          />
        </Card>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>My Profile</Title>
        <Paragraph>
          View and manage your professional profile, track your activities, and showcase your achievements
        </Paragraph>
      </div>

      {/* Profile Content */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Tabs
              items={tabItems}
              size="large"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MyProfilePage;

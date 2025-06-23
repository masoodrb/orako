import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Select,
  Switch,
  Button,
  Typography,
  Divider,
  Space,
  Alert,
  Tabs,
  Radio,
  Slider,
  TimePicker,
  Upload,
  message,
  List,
  Avatar,
  Badge,
  Table,
  Tag,
  Modal,
  Tooltip,
  Progress,
  Popconfirm
} from 'antd';
import {
  SettingOutlined,
  UserOutlined,
  SecurityScanOutlined,
  BellOutlined,
  GlobalOutlined,
  EyeOutlined,
  CloudOutlined,
  KeyOutlined,
  ShieldOutlined,
  MobileOutlined,
  MailOutlined,
  InfoCircleOutlined,
  SaveOutlined,
  ReloadOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  LockOutlined,
  UnlockOutlined,
  CheckOutlined,
  ExclamationCircleOutlined,
  DownloadOutlined,
  ApiOutlined,
  DatabaseOutlined,
  TeamOutlined,
  AuditOutlined,
  HistoryOutlined,
  PlusOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const SettingsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // Sample data for tables
  const connectedDevices = [
    {
      key: '1',
      device: 'MacBook Pro',
      location: 'San Francisco, CA',
      lastActive: '2025-06-22 10:30 AM',
      browser: 'Chrome 125.0',
      ip: '192.168.1.100',
      status: 'Active'
    },
    {
      key: '2',
      device: 'iPhone 15 Pro',
      location: 'San Francisco, CA',
      lastActive: '2025-06-22 09:15 AM',
      browser: 'Safari Mobile',
      ip: '192.168.1.101',
      status: 'Active'
    },
    {
      key: '3',
      device: 'Windows Desktop',
      location: 'New York, NY',
      lastActive: '2025-06-20 03:45 PM',
      browser: 'Edge 125.0',
      ip: '10.0.0.50',
      status: 'Inactive'
    }
  ];

  const apiKeys = [
    {
      key: '1',
      name: 'Production API Key',
      description: 'Main production environment access',
      created: '2025-01-15',
      lastUsed: '2025-06-22',
      permissions: ['read', 'write'],
      status: 'Active'
    },
    {
      key: '2',
      name: 'Development API Key',
      description: 'Development and testing purposes',
      created: '2025-03-10',
      lastUsed: '2025-06-21',
      permissions: ['read'],
      status: 'Active'
    },
    {
      key: '3',
      name: 'Mobile App API Key',
      description: 'Mobile application integration',
      created: '2025-05-01',
      lastUsed: '2025-06-18',
      permissions: ['read', 'write', 'delete'],
      status: 'Revoked'
    }
  ];

  const auditLogs = [
    {
      key: '1',
      action: 'User Login',
      timestamp: '2025-06-22 10:30:15',
      ip: '192.168.1.100',
      device: 'MacBook Pro',
      result: 'Success'
    },
    {
      key: '2',
      action: 'Password Changed',
      timestamp: '2025-06-21 14:22:30',
      ip: '192.168.1.100',
      device: 'MacBook Pro',
      result: 'Success'
    },
    {
      key: '3',
      action: 'Failed Login Attempt',
      timestamp: '2025-06-20 16:45:12',
      ip: '203.0.113.100',
      device: 'Unknown',
      result: 'Failed'
    }
  ];

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Settings saved successfully!');
    }, 1500);
  };

  const handleRevokeDevice = (deviceKey) => {
    Modal.confirm({
      title: 'Revoke Device Access',
      content: 'Are you sure you want to revoke access for this device? The user will need to log in again.',
      okText: 'Revoke',
      okType: 'danger',
      onOk() {
        message.success('Device access revoked successfully');
      }
    });
  };

  const handleRevokeApiKey = (keyId) => {
    Modal.confirm({
      title: 'Revoke API Key',
      content: 'Are you sure you want to revoke this API key? This action cannot be undone and may break integrations.',
      okText: 'Revoke',
      okType: 'danger',
      onOk() {
        message.success('API key revoked successfully');
      }
    });
  };

  const deviceColumns = [
    {
      title: 'Device',
      key: 'device',
      render: (_, record) => (
        <Space>
          <Avatar icon={<MobileOutlined />} style={{ backgroundColor: 'var(--orako-secondary)' }} />
          <div>
            <div style={{ fontWeight: 600 }}>{record.device}</div>
            <div style={{ fontSize: '12px', color: 'var(--orako-text-secondary)' }}>
              {record.browser}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
      render: (ip) => <Text code>{ip}</Text>,
    },
    {
      title: 'Last Active',
      dataIndex: 'lastActive',
      key: 'lastActive',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => message.info('View device details')}
          >
            Details
          </Button>
          {record.status === 'Active' && (
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleRevokeDevice(record.key)}
            >
              Revoke
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const apiKeyColumns = [
    {
      title: 'API Key',
      key: 'apiKey',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.name}</div>
          <div style={{ fontSize: '12px', color: 'var(--orako-text-secondary)' }}>
            {record.description}
          </div>
        </div>
      ),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions) => (
        <Space>
          {permissions.map(permission => (
            <Tag key={permission} color="blue">{permission}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Last Used',
      dataIndex: 'lastUsed',
      key: 'lastUsed',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            size="small" 
            icon={<EyeOutlined />}
            onClick={() => message.info('Show API key details')}
          >
            View
          </Button>
          <Button 
            size="small" 
            icon={<EditOutlined />}
            onClick={() => message.info('Edit API key permissions')}
          >
            Edit
          </Button>
          {record.status === 'Active' && (
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleRevokeApiKey(record.key)}
            >
              Revoke
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const auditColumns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action) => <Text strong>{action}</Text>,
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
      render: (ip) => <Text code>{ip}</Text>,
    },
    {
      title: 'Device',
      dataIndex: 'device',
      key: 'device',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
      render: (result) => (
        <Tag color={result === 'Success' ? 'green' : 'red'}>{result}</Tag>
      ),
    },
  ];

  const tabItems = [
    {
      key: 'general',
      label: (
        <Space>
          <SettingOutlined />
          General
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="Account Information" extra={<Button icon={<EditOutlined />}>Edit</Button>}>
                <Form form={form} layout="vertical" onFinish={handleSave}>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12}>
                      <Form.Item label="First Name" name="firstName" initialValue="John">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Last Name" name="lastName" initialValue="Doe">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Email Address" name="email" initialValue="john.doe@company.com">
                        <Input disabled />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Phone Number" name="phone" initialValue="+1 (555) 123-4567">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Job Title" name="jobTitle" initialValue="Senior Software Engineer">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item label="Department" name="department" initialValue="engineering">
                        <Select>
                          <Option value="engineering">Engineering</Option>
                          <Option value="product">Product</Option>
                          <Option value="design">Design</Option>
                          <Option value="sales">Sales</Option>
                          <Option value="marketing">Marketing</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item label="Bio" name="bio" initialValue="Experienced software engineer with expertise in cloud technologies and enterprise applications.">
                        <TextArea rows={3} />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Regional Settings">
                <Form layout="vertical">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} sm={8}>
                      <Form.Item label="Time Zone" name="timezone" initialValue="america/los_angeles">
                        <Select>
                          <Option value="america/los_angeles">Pacific Time (PT)</Option>
                          <Option value="america/new_york">Eastern Time (ET)</Option>
                          <Option value="america/chicago">Central Time (CT)</Option>
                          <Option value="europe/london">Greenwich Mean Time (GMT)</Option>
                          <Option value="asia/tokyo">Japan Standard Time (JST)</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Form.Item label="Language" name="language" initialValue="en">
                        <Select>
                          <Option value="en">English</Option>
                          <Option value="es">Spanish</Option>
                          <Option value="fr">French</Option>
                          <Option value="de">German</Option>
                          <Option value="ja">Japanese</Option>
                          <Option value="zh">Chinese</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                      <Form.Item label="Date Format" name="dateFormat" initialValue="mm/dd/yyyy">
                        <Select>
                          <Option value="mm/dd/yyyy">MM/DD/YYYY</Option>
                          <Option value="dd/mm/yyyy">DD/MM/YYYY</Option>
                          <Option value="yyyy-mm-dd">YYYY-MM-DD</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'security',
      label: (
        <Space>
          <SecurityScanOutlined />
          Security
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="Password & Authentication">
                <Row gutter={[16, 24]}>
                  <Col xs={24} lg={12}>
                    <div style={{ marginBottom: '16px' }}>
                      <Title level={5}>Change Password</Title>
                      <Form layout="vertical">
                        <Form.Item label="Current Password">
                          <Input.Password />
                        </Form.Item>
                        <Form.Item label="New Password">
                          <Input.Password />
                        </Form.Item>
                        <Form.Item label="Confirm New Password">
                          <Input.Password />
                        </Form.Item>
                        <Button type="primary" icon={<LockOutlined />}>
                          Update Password
                        </Button>
                      </Form>
                    </div>
                  </Col>
                  <Col xs={24} lg={12}>
                    <div>
                      <Title level={5}>Two-Factor Authentication</Title>
                      <div style={{ marginBottom: '16px' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>Enable 2FA</span>
                            <Switch 
                              checked={twoFactorEnabled} 
                              onChange={setTwoFactorEnabled}
                              checkedChildren={<CheckOutlined />}
                              unCheckedChildren={<DeleteOutlined />}
                            />
                          </div>
                          {twoFactorEnabled && (
                            <Alert
                              message="Two-factor authentication is enabled"
                              description="Your account is protected with 2FA. You'll need your authenticator app to sign in."
                              type="success"
                              showIcon
                            />
                          )}
                          <Button icon={<MobileOutlined />} disabled={!twoFactorEnabled}>
                            Configure Authenticator App
                          </Button>
                        </Space>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Connected Devices" extra={<Button icon={<ReloadOutlined />}>Refresh</Button>}>
                <Table 
                  dataSource={connectedDevices} 
                  columns={deviceColumns} 
                  pagination={false}
                  size="middle"
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Security Audit Log">
                <Table 
                  dataSource={auditLogs} 
                  columns={auditColumns} 
                  pagination={{ pageSize: 5 }}
                  size="middle"
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'notifications',
      label: (
        <Space>
          <BellOutlined />
          Notifications
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="Email Notifications">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: 'Account Activity',
                      description: 'Receive emails about login attempts and security changes',
                      checked: true,
                    },
                    {
                      title: 'Project Updates',
                      description: 'Get notified about project milestones and deadlines',
                      checked: true,
                    },
                    {
                      title: 'Team Messages',
                      description: 'Email notifications for team chat messages and mentions',
                      checked: false,
                    },
                    {
                      title: 'System Maintenance',
                      description: 'Important system updates and maintenance schedules',
                      checked: true,
                    },
                    {
                      title: 'Weekly Reports',
                      description: 'Weekly summary of your activities and metrics',
                      checked: false,
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Switch 
                          defaultChecked={item.checked}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<DeleteOutlined />}
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<MailOutlined />} style={{ backgroundColor: 'var(--orako-secondary)' }} />}
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Push Notifications">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: 'Browser Notifications',
                      description: 'Show desktop notifications in your browser',
                      checked: true,
                    },
                    {
                      title: 'Mobile Push',
                      description: 'Send notifications to your mobile device',
                      checked: true,
                    },
                    {
                      title: 'Do Not Disturb',
                      description: 'Automatically disable notifications during focus time',
                      checked: false,
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Switch 
                          defaultChecked={item.checked}
                          checkedChildren={<CheckOutlined />}
                          unCheckedChildren={<DeleteOutlined />}
                        />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<BellOutlined />} style={{ backgroundColor: 'var(--orako-warning)' }} />}
                        title={item.title}
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'integrations',
      label: (
        <Space>
          <ApiOutlined />
          Integrations
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card 
                title="API Keys" 
                extra={
                  <Button type="primary" icon={<PlusOutlined />}>
                    Generate New Key
                  </Button>
                }
              >
                <Table 
                  dataSource={apiKeys} 
                  columns={apiKeyColumns} 
                  pagination={false}
                  size="middle"
                />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Connected Applications">
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    {
                      title: 'Slack Integration',
                      description: 'Send notifications and updates to Slack channels',
                      status: 'Connected',
                      avatar: '🔗',
                    },
                    {
                      title: 'GitHub Integration',
                      description: 'Sync repositories and track development progress',
                      status: 'Connected',
                      avatar: '🐙',
                    },
                    {
                      title: 'Jira Integration',
                      description: 'Synchronize issues and project management',
                      status: 'Disconnected',
                      avatar: '📋',
                    },
                    {
                      title: 'Google Workspace',
                      description: 'Calendar, Drive, and email integration',
                      status: 'Connected',
                      avatar: '🌐',
                    },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button 
                          type={item.status === 'Connected' ? 'default' : 'primary'}
                          size="small"
                        >
                          {item.status === 'Connected' ? 'Disconnect' : 'Connect'}
                        </Button>,
                        <Button size="small" icon={<SettingOutlined />}>
                          Configure
                        </Button>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar style={{ backgroundColor: 'var(--orako-primary)' }}>
                            {item.avatar}
                          </Avatar>
                        }
                        title={
                          <Space>
                            {item.title}
                            <Badge 
                              status={item.status === 'Connected' ? 'success' : 'error'} 
                              text={item.status}
                            />
                          </Space>
                        }
                        description={item.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'preferences',
      label: (
        <Space>
          <EyeOutlined />
          Preferences
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[24, 24]}>
            <Col span={24}>
              <Card title="Display Settings">
                <Row gutter={[16, 24]}>
                  <Col xs={24} sm={12}>
                    <div style={{ marginBottom: '24px' }}>
                      <Title level={5}>Theme</Title>
                      <Radio.Group defaultValue="light" style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Radio value="light">Light Theme</Radio>
                          <Radio value="dark">Dark Theme</Radio>
                          <Radio value="auto">Auto (System Preference)</Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </Col>
                  <Col xs={24} sm={12}>
                    <div style={{ marginBottom: '24px' }}>
                      <Title level={5}>Sidebar</Title>
                      <Radio.Group defaultValue="expanded" style={{ width: '100%' }}>
                        <Space direction="vertical" style={{ width: '100%' }}>
                          <Radio value="expanded">Always Expanded</Radio>
                          <Radio value="collapsed">Always Collapsed</Radio>
                          <Radio value="auto">Auto Collapse</Radio>
                        </Space>
                      </Radio.Group>
                    </div>
                  </Col>
                  <Col span={24}>
                    <div style={{ marginBottom: '24px' }}>
                      <Title level={5}>Font Size</Title>
                      <Slider
                        min={12}
                        max={18}
                        defaultValue={14}
                        marks={{
                          12: '12px',
                          14: '14px (Default)',
                          16: '16px',
                          18: '18px'
                        }}
                        tooltip={{ formatter: (value) => `${value}px` }}
                      />
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Dashboard Preferences">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Default Dashboard View">
                      <Select defaultValue="overview" style={{ width: '100%' }}>
                        <Option value="overview">Overview</Option>
                        <Option value="analytics">Analytics</Option>
                        <Option value="reports">Reports</Option>
                        <Option value="projects">Projects</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item label="Refresh Interval">
                      <Select defaultValue="5" style={{ width: '100%' }}>
                        <Option value="1">1 minute</Option>
                        <Option value="5">5 minutes</Option>
                        <Option value="10">10 minutes</Option>
                        <Option value="30">30 minutes</Option>
                        <Option value="0">Manual only</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>Settings</Title>
        <Paragraph>
          Manage your account preferences, security settings, and system configurations
        </Paragraph>
      </div>

      {/* Settings Content */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              size="large"
            />
            <Divider />
            <Space>
              <Button 
                type="primary" 
                icon={<SaveOutlined />} 
                loading={loading}
                onClick={handleSave}
              >
                Save Changes
              </Button>
              <Button icon={<ReloadOutlined />}>
                Reset to Defaults
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SettingsPage;

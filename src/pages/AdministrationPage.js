import React, { useState } from 'react';
import { Typography, Card, Row, Col, Tabs, Table, Button, Space, Modal, Form, Input, Select, Switch, Tag, Divider } from 'antd';
import { 
  ControlOutlined, 
  UserOutlined,
  SettingOutlined,
  LockOutlined,
  DatabaseOutlined,
  BellOutlined,
  SecurityScanOutlined,
  TeamOutlined,
  KeyOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

const AdministrationPage = () => {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isRoleModalVisible, setIsRoleModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('users');

  // Sample users data
  const usersData = [
    {
      key: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      role: 'Administrator',
      status: 'Active',
      lastLogin: '2025-06-21 10:30',
      department: 'IT'
    },
    {
      key: '2',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@company.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2025-06-21 09:15',
      department: 'Finance'
    },
    {
      key: '3',
      name: 'Mike Chen',
      email: 'mike.chen@company.com',
      role: 'User',
      status: 'Inactive',
      lastLogin: '2025-06-20 16:45',
      department: 'Sales'
    },
    {
      key: '4',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'Manager',
      status: 'Active',
      lastLogin: '2025-06-21 11:20',
      department: 'HR'
    }
  ];

  // Sample roles data
  const rolesData = [
    {
      key: '1',
      name: 'Administrator',
      description: 'Full system access and management capabilities',
      permissions: ['Full Access', 'User Management', 'System Settings'],
      users: 2
    },
    {
      key: '2',
      name: 'Manager',
      description: 'Department management and reporting access',
      permissions: ['Department Access', 'Reporting', 'User View'],
      users: 5
    },
    {
      key: '3',
      name: 'User',
      description: 'Standard user access to assigned modules',
      permissions: ['Module Access', 'Data Entry', 'View Reports'],
      users: 23
    },
    {
      key: '4',
      name: 'Auditor',
      description: 'Read-only access for auditing purposes',
      permissions: ['Read-Only', 'Audit Trail', 'Export Data'],
      users: 1
    }
  ];

  const systemLogs = [
    {
      key: '1',
      timestamp: '2025-06-21 11:45:32',
      user: 'John Smith',
      action: 'User Created',
      details: 'Created new user: Emily Davis',
      severity: 'Info'
    },
    {
      key: '2',
      timestamp: '2025-06-21 11:30:15',
      user: 'System',
      action: 'Backup Completed',
      details: 'Daily backup completed successfully',
      severity: 'Success'
    },
    {
      key: '3',
      timestamp: '2025-06-21 10:15:43',
      user: 'Sarah Johnson',
      action: 'Permission Changed',
      details: 'Updated role permissions for Manager role',
      severity: 'Warning'
    },
    {
      key: '4',
      timestamp: '2025-06-21 09:22:18',
      user: 'System',
      action: 'Login Failed',
      details: 'Failed login attempt for user: unknown@test.com',
      severity: 'Error'
    }
  ];

  const getStatusColor = (status) => {
    return status === 'Active' ? 'green' : 'red';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Success': return 'green';
      case 'Info': return 'blue';
      case 'Warning': return 'orange';
      case 'Error': return 'red';
      default: return 'default';
    }
  };

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: '12px', color: 'var(--orako-text-secondary)' }}>
            {record.email}
          </div>
        </div>
      )
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      )
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small">Edit</Button>
          <Button icon={<DeleteOutlined />} size="small" danger>Delete</Button>
        </Space>
      ),
    },
  ];

  const roleColumns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: '12px', color: 'var(--orako-text-secondary)' }}>
            {record.description}
          </div>
        </div>
      )
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions) => (
        <div>
          {permissions.map(permission => (
            <Tag key={permission} style={{ margin: '2px' }}>{permission}</Tag>
          ))}
        </div>
      )
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} size="small">Edit</Button>
          <Button icon={<DeleteOutlined />} size="small" danger>Delete</Button>
        </Space>
      ),
    },
  ];

  const logColumns = [
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity) => (
        <Tag color={getSeverityColor(severity)}>
          {severity}
        </Tag>
      )
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <Title level={1}>Administration</Title>
        <Paragraph>
          Comprehensive system administration panel for managing users, roles, permissions,
          system settings, and monitoring Oracle Cloud ERP operations.
        </Paragraph>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={<span><UserOutlined />User Management</span>} key="users">
          <Card 
            title="User Management" 
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsUserModalVisible(true)}
              >
                Add User
              </Button>
            }
          >
            <Table
              dataSource={usersData}
              columns={userColumns}
              pagination={{ pageSize: 10 }}
              size="middle"
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><TeamOutlined />Roles & Permissions</span>} key="roles">
          <Card 
            title="Roles & Permissions" 
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIsRoleModalVisible(true)}
              >
                Add Role
              </Button>
            }
          >
            <Table
              dataSource={rolesData}
              columns={roleColumns}
              pagination={{ pageSize: 10 }}
              size="middle"
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><SettingOutlined />System Settings</span>} key="settings">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="General Settings" className="settings-card">
                <Form layout="vertical">
                  <Form.Item label="System Name">
                    <Input defaultValue="Oracle Cloud ERP" />
                  </Form.Item>
                  <Form.Item label="Time Zone">
                    <Select defaultValue="UTC-8" style={{ width: '100%' }}>
                      <Select.Option value="UTC-8">Pacific Time (UTC-8)</Select.Option>
                      <Select.Option value="UTC-5">Eastern Time (UTC-5)</Select.Option>
                      <Select.Option value="UTC+0">UTC</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="Default Language">
                    <Select defaultValue="en" style={{ width: '100%' }}>
                      <Select.Option value="en">English</Select.Option>
                      <Select.Option value="es">Spanish</Select.Option>
                      <Select.Option value="fr">French</Select.Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col xs={24} lg={12}>
              <Card title="Security Settings" className="settings-card">
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Two-Factor Authentication</span>
                    <Switch defaultChecked />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Password Complexity</span>
                    <Switch defaultChecked />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Session Timeout</span>
                    <Select defaultValue="30" style={{ width: 100 }}>
                      <Select.Option value="15">15 min</Select.Option>
                      <Select.Option value="30">30 min</Select.Option>
                      <Select.Option value="60">1 hour</Select.Option>
                    </Select>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Audit Logging</span>
                    <Switch defaultChecked />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab={<span><SecurityScanOutlined />System Logs</span>} key="logs">
          <Card title="System Activity Logs">
            <Table
              dataSource={systemLogs}
              columns={logColumns}
              pagination={{ pageSize: 15 }}
              size="middle"
            />
          </Card>
        </TabPane>

        <TabPane tab={<span><DatabaseOutlined />System Health</span>} key="health">
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card title="Database Status" className="health-card">
                <div style={{ textAlign: 'center' }}>
                  <DatabaseOutlined style={{ fontSize: '48px', color: 'var(--orako-success)', marginBottom: '16px' }} />
                  <div style={{ fontSize: '18px', fontWeight: 500 }}>Healthy</div>
                  <div style={{ color: 'var(--orako-text-secondary)' }}>Last check: 2 minutes ago</div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="Security Status" className="health-card">
                <div style={{ textAlign: 'center' }}>
                  <SafetyOutlined style={{ fontSize: '48px', color: 'var(--orako-success)', marginBottom: '16px' }} />
                  <div style={{ fontSize: '18px', fontWeight: 500 }}>Secure</div>
                  <div style={{ color: 'var(--orako-text-secondary)' }}>No threats detected</div>
                </div>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card title="System Load" className="health-card">
                <div style={{ textAlign: 'center' }}>
                  <ControlOutlined style={{ fontSize: '48px', color: 'var(--orako-warning)', marginBottom: '16px' }} />
                  <div style={{ fontSize: '18px', fontWeight: 500 }}>Normal</div>
                  <div style={{ color: 'var(--orako-text-secondary)' }}>CPU: 45%, Memory: 62%</div>
                </div>
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        open={isUserModalVisible}
        onCancel={() => setIsUserModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsUserModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Create User
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Full Name" required>
            <Input placeholder="Enter full name" />
          </Form.Item>
          <Form.Item label="Email Address" required>
            <Input placeholder="Enter email address" />
          </Form.Item>
          <Form.Item label="Role" required>
            <Select placeholder="Select role">
              <Select.Option value="admin">Administrator</Select.Option>
              <Select.Option value="manager">Manager</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Department">
            <Select placeholder="Select department">
              <Select.Option value="it">IT</Select.Option>
              <Select.Option value="finance">Finance</Select.Option>
              <Select.Option value="hr">Human Resources</Select.Option>
              <Select.Option value="sales">Sales</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Role Modal */}
      <Modal
        title="Add New Role"
        open={isRoleModalVisible}
        onCancel={() => setIsRoleModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsRoleModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Create Role
          </Button>,
        ]}
        width={600}
      >
        <Form layout="vertical">
          <Form.Item label="Role Name" required>
            <Input placeholder="Enter role name" />
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea placeholder="Enter role description" rows={3} />
          </Form.Item>
          <Form.Item label="Permissions">
            <div style={{ border: '1px solid var(--orako-border)', borderRadius: '6px', padding: '16px' }}>
              <div style={{ marginBottom: '12px', fontWeight: 500 }}>Select Permissions:</div>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>User Management</span>
                  <Switch />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>System Settings</span>
                  <Switch />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Data Access</span>
                  <Switch defaultChecked />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Report Generation</span>
                  <Switch defaultChecked />
                </div>
              </Space>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdministrationPage;

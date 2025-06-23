import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Table, 
  Progress, 
  Timeline, 
  Steps, 
  Tabs, 
  Calendar, 
  Badge, 
  Statistic, 
  Row, 
  Col, 
  Button, 
  Tag, 
  Tooltip, 
  Dropdown, 
  Menu,
  Avatar,
  List,
  Tree,
  Transfer,
  Select,
  DatePicker,
  Input,
  InputNumber,
  Switch,
  Radio,
  Space,
  Divider,
  Alert,
  Descriptions,
  Empty,
  Result,
  Spin,
  Affix,
  BackTop,
  Anchor,
  Breadcrumb,
  Drawer,
  Modal,
  Popover,
  Tour,
  message,
  notification
} from 'antd';
import {
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  TeamOutlined,
  BarChartOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BankOutlined,
  ContactsOutlined,
  ProjectOutlined,
  SettingOutlined,
  SearchOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  PrinterOutlined,
  DownloadOutlined,
  UploadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  BellOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  HomeOutlined,
  CarOutlined,
  ToolOutlined,
  SafetyOutlined,
  AuditOutlined,
  FundOutlined,
  StockOutlined,
  RiseOutlined,
  FallOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;
const { Step } = Steps;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const ERPComponentsPage = () => {
  const [activeTab, setActiveTab] = useState('1');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  // Sample ERP data
  const salesData = [
    {
      key: '1',
      orderId: 'ORD-001',
      customer: 'Acme Corporation',
      amount: 125000,
      status: 'Approved',
      date: '2025-06-15',
      priority: 'High',
      salesRep: 'John Smith',
      region: 'North America'
    },
    {
      key: '2',
      orderId: 'ORD-002',
      customer: 'TechFlow Solutions',
      amount: 89500,
      status: 'Pending',
      date: '2025-06-18',
      priority: 'Medium',
      salesRep: 'Sarah Johnson',
      region: 'Europe'
    },
    {
      key: '3',
      orderId: 'ORD-003',
      customer: 'Global Industries',
      amount: 245000,
      status: 'Processing',
      date: '2025-06-20',
      priority: 'High',
      salesRep: 'Mike Chen',
      region: 'Asia Pacific'
    }
  ];

  const financialData = [
    {
      key: '1',
      account: 'Cash & Cash Equivalents',
      amount: 2450000,
      percentage: 15.2,
      trend: 'up'
    },
    {
      key: '2',
      account: 'Accounts Receivable',
      amount: 1890000,
      percentage: 11.7,
      trend: 'up'
    },
    {
      key: '3',
      account: 'Inventory',
      amount: 3200000,
      percentage: 19.8,
      trend: 'down'
    },
    {
      key: '4',
      account: 'Fixed Assets',
      amount: 5670000,
      percentage: 35.1,
      trend: 'up'
    }
  ];

  const hrData = [
    {
      key: '1',
      employee: 'Alice Williams',
      position: 'Senior Manager',
      department: 'Finance',
      salary: 95000,
      status: 'Active',
      startDate: '2020-03-15',
      performance: 92
    },
    {
      key: '2',
      employee: 'Bob Martinez',
      position: 'Software Engineer',
      department: 'IT',
      salary: 78000,
      status: 'Active',
      startDate: '2021-07-22',
      performance: 88
    },
    {
      key: '3',
      employee: 'Carol Davis',
      position: 'Marketing Director',
      department: 'Marketing',
      salary: 110000,
      status: 'On Leave',
      startDate: '2019-01-10',
      performance: 95
    }
  ];

  // Column definitions for different ERP modules
  const salesColumns = [
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId',
      sorter: true,
      render: (text) => <Text strong className="oracle-primary-text">{text}</Text>
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      sorter: true,
      render: (text) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          {text}
        </Space>
      )
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: true,
      render: (amount) => (
        <Statistic 
          value={amount} 
          prefix="$" 
          precision={0}
          valueStyle={{ fontSize: '14px', color: 'var(--orako-success)' }}
        />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          'Approved': 'success',
          'Pending': 'warning',
          'Processing': 'processing',
          'Rejected': 'error'
        };
        return <Badge status={colors[status]} text={status} />;
      }
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => {
        const colors = {
          'High': 'red',
          'Medium': 'orange',
          'Low': 'green'
        };
        return <Tag color={colors[priority]}>{priority}</Tag>;
      }
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Tooltip title="View Details">
            <Button icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit">
            <Button icon={<EditOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Delete">
            <Button icon={<DeleteOutlined />} size="small" danger />
          </Tooltip>
        </Space>
      )
    }
  ];

  const financialColumns = [
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      render: (text) => <Text strong>{text}</Text>
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => (
        <Statistic 
          value={amount} 
          prefix="$" 
          precision={0}
          valueStyle={{ fontSize: '14px' }}
        />
      )
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage, record) => (
        <Space>
          <Progress 
            percent={percentage} 
            size="small" 
            showInfo={false}
            strokeColor={record.trend === 'up' ? 'var(--orako-success)' : 'var(--orako-error)'}
          />
          <Text>{percentage}%</Text>
          {record.trend === 'up' ? <RiseOutlined style={{ color: 'var(--orako-success)' }} /> : <FallOutlined style={{ color: 'var(--orako-error)' }} />}
        </Space>
      )
    }
  ];

  const hrColumns = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      render: (text) => (
        <Space>
          <Avatar icon={<UserOutlined />} size="small" />
          {text}
        </Space>
      )
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      render: (dept) => <Tag>{dept}</Tag>
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => (
        <Statistic 
          value={salary} 
          prefix="$" 
          precision={0}
          valueStyle={{ fontSize: '14px' }}
        />
      )
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: (performance) => (
        <Progress 
          percent={performance} 
          size="small"
          strokeColor={performance >= 90 ? 'var(--orako-success)' : performance >= 80 ? 'var(--orako-warning)' : 'var(--orako-error)'}
        />
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          'Active': 'success',
          'On Leave': 'warning',
          'Inactive': 'default'
        };
        return <Badge status={colors[status]} text={status} />;
      }
    }
  ];

  // Workflow/Approval Process
  const workflowSteps = [
    {
      title: 'Submit Request',
      description: 'User submits expense report',
      status: 'finish'
    },
    {
      title: 'Manager Review',
      description: 'Direct manager approval',
      status: 'finish'
    },
    {
      title: 'Finance Review',
      description: 'Finance team validation',
      status: 'process'
    },
    {
      title: 'Final Approval',
      description: 'CFO final approval',
      status: 'wait'
    },
    {
      title: 'Payment Processing',
      description: 'Process reimbursement',
      status: 'wait'
    }
  ];

  // Audit Trail
  const auditTrail = [
    {
      time: '2025-06-21 14:30',
      action: 'Created',
      user: 'John Smith',
      details: 'Order ORD-001 created'
    },
    {
      time: '2025-06-21 15:15',
      action: 'Modified',
      user: 'Sarah Johnson',
      details: 'Updated customer information'
    },
    {
      time: '2025-06-21 16:45',
      action: 'Approved',
      user: 'Mike Chen',
      details: 'Order approved by sales manager'
    },
    {
      time: '2025-06-21 17:20',
      action: 'Processed',
      user: 'System',
      details: 'Order sent to fulfillment'
    }
  ];

  // Dashboard KPIs
  const kpiData = [
    {
      title: 'Total Revenue',
      value: 12500000,
      prefix: '$',
      precision: 0,
      trend: 'up',
      percentage: 15.2
    },
    {
      title: 'Active Customers',
      value: 1456,
      suffix: '',
      precision: 0,
      trend: 'up',
      percentage: 8.7
    },
    {
      title: 'Pending Orders',
      value: 234,
      suffix: '',
      precision: 0,
      trend: 'down',
      percentage: -3.2
    },
    {
      title: 'Avg Response Time',
      value: 2.4,
      suffix: 'hrs',
      precision: 1,
      trend: 'down',
      percentage: -12.5
    }
  ];

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const showNotification = () => {
    notification.success({
      message: 'ERP System Notification',
      description: 'Your purchase order PO-2025-001 has been approved and is ready for processing.',
      placement: 'topRight',
      duration: 4
    });
  };

  const showMessage = () => {
    message.success('Data exported successfully');
  };

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Enterprise ERP Components</Title>
        <Paragraph>
          Comprehensive collection of components commonly used in cloud ERP systems like Oracle Cloud, 
          Microsoft Dynamics 365, SAP S/4HANA Cloud, and other enterprise platforms.
        </Paragraph>
      </div>

      {/* Executive Dashboard */}
      <div className="demo-section">
        <Title level={2}>Executive Dashboard</Title>
        
        <Row gutter={[20, 20]} style={{ marginBottom: '24px' }}>
          {kpiData.map((kpi, index) => (
            <Col xs={24} sm={12} md={6} key={index}>
              <Card className="oracle-shadow-sm">
                <Statistic
                  title={kpi.title}
                  value={kpi.value}
                  prefix={kpi.prefix}
                  suffix={kpi.suffix}
                  precision={kpi.precision}
                  valueStyle={{ color: kpi.trend === 'up' ? 'var(--orako-success)' : 'var(--orako-error)' }}
                />
                <div style={{ marginTop: '8px' }}>
                  <Space>
                    {kpi.trend === 'up' ? <RiseOutlined style={{ color: 'var(--orako-success)' }} /> : <FallOutlined style={{ color: 'var(--orako-error)' }} />}
                    <Text type={kpi.trend === 'up' ? 'success' : 'danger'}>
                      {Math.abs(kpi.percentage)}%
                    </Text>
                    <Text type="secondary">vs last month</Text>
                  </Space>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* ERP Module Tabs */}
      <div className="demo-section">
        <Title level={2}>ERP Business Modules</Title>
        
        <Tabs activeKey={activeTab} onChange={handleTabChange} type="card">
          
          {/* Sales & CRM Module */}
          <TabPane 
            tab={<span><ShoppingCartOutlined />Sales & CRM</span>} 
            key="1"
          >
            <Card title="Sales Orders Management" className="oracle-shadow-sm">
              <Space style={{ marginBottom: '16px' }} wrap>
                <Button type="primary" icon={<PlusOutlined />}>New Order</Button>
                <Button icon={<ExportOutlined />} onClick={showMessage}>Export</Button>
                <Button icon={<ImportOutlined />}>Import</Button>
                <Button icon={<PrinterOutlined />}>Print</Button>
                <Select defaultValue="all" style={{ width: 120 }}>
                  <Option value="all">All Status</Option>
                  <Option value="approved">Approved</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="processing">Processing</Option>
                </Select>
                <RangePicker />
              </Space>
              
              <Table
                columns={salesColumns}
                dataSource={salesData}
                rowSelection={{
                  selectedRowKeys,
                  onChange: setSelectedRowKeys,
                }}
                pagination={{
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
                scroll={{ x: 800 }}
              />
            </Card>
          </TabPane>

          {/* Finance Module */}
          <TabPane 
            tab={<span><DollarOutlined />Finance & Accounting</span>} 
            key="2"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={16}>
                <Card title="Chart of Accounts" className="oracle-shadow-sm">
                  <Table
                    columns={financialColumns}
                    dataSource={financialData}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
              <Col xs={24} lg={8}>
                <Card title="Quick Actions" className="oracle-shadow-sm">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Button block icon={<FileTextOutlined />}>Create Invoice</Button>
                    <Button block icon={<BankOutlined />}>Record Payment</Button>
                    <Button block icon={<BarChartOutlined />}>Generate Report</Button>
                    <Button block icon={<AuditOutlined />}>Run Audit</Button>
                    <Divider />
                    <Descriptions size="small" column={1}>
                      <Descriptions.Item label="Cash Flow">$2.45M</Descriptions.Item>
                      <Descriptions.Item label="A/R Aging">$1.89M</Descriptions.Item>
                      <Descriptions.Item label="A/P Aging">$890K</Descriptions.Item>
                    </Descriptions>
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>

          {/* Human Resources Module */}
          <TabPane 
            tab={<span><TeamOutlined />Human Resources</span>} 
            key="3"
          >
            <Card title="Employee Management" className="oracle-shadow-sm">
              <Space style={{ marginBottom: '16px' }} wrap>
                <Button type="primary" icon={<PlusOutlined />}>Add Employee</Button>
                <Button icon={<ContactsOutlined />}>Directory</Button>
                <Button icon={<CalendarOutlined />}>Time Off</Button>
                <Button icon={<BarChartOutlined />}>Performance</Button>
                <Select defaultValue="all" style={{ width: 150 }}>
                  <Option value="all">All Departments</Option>
                  <Option value="finance">Finance</Option>
                  <Option value="it">IT</Option>
                  <Option value="marketing">Marketing</Option>
                  <Option value="sales">Sales</Option>
                </Select>
              </Space>
              
              <Table
                columns={hrColumns}
                dataSource={hrData}
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                }}
              />
            </Card>
          </TabPane>

          {/* Project Management Module */}
          <TabPane 
            tab={<span><ProjectOutlined />Project Management</span>} 
            key="4"
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={14}>
                <Card title="Project Timeline" className="oracle-shadow-sm">
                  <Timeline
                    items={[
                      {
                        dot: <CheckCircleOutlined style={{ color: 'var(--orako-success)' }} />,
                        children: (
                          <div>
                            <Text strong>Project Initiation</Text>
                            <br />
                            <Text type="secondary">Completed on 2025-01-15</Text>
                            <br />
                            <Progress percent={100} size="small" showInfo={false} />
                          </div>
                        )
                      },
                      {
                        dot: <CheckCircleOutlined style={{ color: 'var(--orako-success)' }} />,
                        children: (
                          <div>
                            <Text strong>Requirements Analysis</Text>
                            <br />
                            <Text type="secondary">Completed on 2025-02-28</Text>
                            <br />
                            <Progress percent={100} size="small" showInfo={false} />
                          </div>
                        )
                      },
                      {
                        dot: <ExclamationCircleOutlined style={{ color: 'var(--orako-warning)' }} />,
                        children: (
                          <div>
                            <Text strong>Development Phase</Text>
                            <br />
                            <Text type="secondary">In Progress - Due 2025-07-30</Text>
                            <br />
                            <Progress percent={65} size="small" strokeColor="var(--orako-warning)" />
                          </div>
                        )
                      },
                      {
                        dot: <CloseCircleOutlined style={{ color: 'var(--orako-neutral-400)' }} />,
                        children: (
                          <div>
                            <Text strong>Testing & QA</Text>
                            <br />
                            <Text type="secondary">Scheduled for 2025-08-01</Text>
                            <br />
                            <Progress percent={0} size="small" showInfo={false} />
                          </div>
                        )
                      }
                    ]}
                  />
                </Card>
              </Col>
              <Col xs={24} lg={10}>
                <Card title="Project Resources" className="oracle-shadow-sm">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text strong>Budget Utilization</Text>
                      <Progress percent={68} strokeColor="var(--orako-secondary)" />
                      <Text type="secondary">$680K of $1M used</Text>
                    </div>
                    <div>
                      <Text strong>Time Utilization</Text>
                      <Progress percent={72} strokeColor="var(--orako-warning)" />
                      <Text type="secondary">18 of 25 weeks elapsed</Text>
                    </div>
                    <div>
                      <Text strong>Team Members</Text>
                      <List
                        size="small"
                        dataSource={[
                          { name: 'John Doe', role: 'Project Manager' },
                          { name: 'Jane Smith', role: 'Lead Developer' },
                          { name: 'Bob Wilson', role: 'UI/UX Designer' },
                          { name: 'Alice Brown', role: 'QA Engineer' }
                        ]}
                        renderItem={item => (
                          <List.Item>
                            <Space>
                              <Avatar icon={<UserOutlined />} size="small" />
                              <div>
                                <Text strong>{item.name}</Text>
                                <br />
                                <Text type="secondary" style={{ fontSize: '12px' }}>{item.role}</Text>
                              </div>
                            </Space>
                          </List.Item>
                        )}
                      />
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>
          </TabPane>

        </Tabs>
      </div>

      {/* Workflow & Approval Process */}
      <div className="demo-section">
        <Title level={2}>Workflow & Approval Process</Title>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Expense Report Approval Workflow" className="oracle-shadow-sm">
              <Steps current={currentStep} direction="vertical">
                {workflowSteps.map((step, index) => (
                  <Step
                    key={index}
                    title={step.title}
                    description={step.description}
                    status={step.status}
                  />
                ))}
              </Steps>
              <div style={{ marginTop: '16px' }}>
                <Space>
                  <Button 
                    type="primary" 
                    onClick={() => setCurrentStep(Math.min(currentStep + 1, workflowSteps.length - 1))}
                    disabled={currentStep >= workflowSteps.length - 1}
                  >
                    Approve & Continue
                  </Button>
                  <Button onClick={() => setCurrentStep(Math.max(currentStep - 1, 0))}>
                    Previous Step
                  </Button>
                  <Button danger>Reject</Button>
                </Space>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Audit Trail" className="oracle-shadow-sm">
              <Timeline
                mode="left"
                items={auditTrail.map(item => ({
                  children: (
                    <div>
                      <Text strong>{item.action}</Text>
                      <br />
                      <Text type="secondary">{item.user}</Text>
                      <br />
                      <Text style={{ fontSize: '12px' }}>{item.details}</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '11px' }}>{item.time}</Text>
                    </div>
                  )
                }))}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* System Integration & Notifications */}
      <div className="demo-section">
        <Title level={2}>System Integration & Notifications</Title>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            <Card title="Real-time Notifications" className="oracle-shadow-sm">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Alert
                  message="System Maintenance Scheduled"
                  description="Planned maintenance window: June 25, 2025 02:00-04:00 UTC"
                  type="info"
                  showIcon
                  closable
                />
                <Alert
                  message="Approval Required"
                  description="3 purchase orders pending your approval (PO-001, PO-002, PO-003)"
                  type="warning"
                  showIcon
                  action={
                    <Button size="small" type="primary">
                      Review
                    </Button>
                  }
                />
                <Alert
                  message="Integration Success"
                  description="Successfully synchronized 1,250 customer records from CRM system"
                  type="success"
                  showIcon
                  closable
                />
                <div>
                  <Button 
                    type="primary" 
                    icon={<BellOutlined />} 
                    onClick={showNotification}
                  >
                    Test Notification
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Integration Status" className="oracle-shadow-sm">
              <List
                dataSource={[
                  { system: 'CRM (Salesforce)', status: 'Connected', lastSync: '2 minutes ago', color: 'success' },
                  { system: 'Payroll System', status: 'Connected', lastSync: '15 minutes ago', color: 'success' },
                  { system: 'Bank Integration', status: 'Connected', lastSync: '1 hour ago', color: 'success' },
                  { system: 'Inventory System', status: 'Error', lastSync: '2 hours ago', color: 'error' },
                  { system: 'Email Service', status: 'Connected', lastSync: '30 seconds ago', color: 'success' }
                ]}
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button size="small" icon={<SettingOutlined />} />,
                      <Button size="small" icon={<ReloadOutlined />} />
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Badge status={item.color} />}
                      title={item.system}
                      description={`Status: ${item.status} • Last sync: ${item.lastSync}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* Advanced Features */}
      <div className="demo-section">
        <Title level={2}>Advanced ERP Features</Title>
        
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card title="Document Management" className="oracle-shadow-sm">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button block icon={<UploadOutlined />}>Upload Document</Button>
                <Button block icon={<FileTextOutlined />}>Generate Contract</Button>
                <Button block icon={<PrinterOutlined />}>Print Invoice</Button>
                <Button block icon={<DownloadOutlined />}>Export Report</Button>
                <Divider />
                <Text type="secondary">Recent Documents:</Text>
                <List
                  size="small"
                  dataSource={[
                    'Q2 Financial Report.pdf',
                    'Contract_ACM001.docx',
                    'Inventory_Report.xlsx'
                  ]}
                  renderItem={item => (
                    <List.Item actions={[<EyeOutlined />, <DownloadOutlined />]}>
                      <FileTextOutlined style={{ marginRight: '8px' }} />
                      {item}
                    </List.Item>
                  )}
                />
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Business Intelligence" className="oracle-shadow-sm">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>Sales Trend</Text>
                  <Progress percent={85} strokeColor="var(--orako-success)" />
                  <Text type="secondary">↗ 15% vs last quarter</Text>
                </div>
                <div>
                  <Text strong>Customer Satisfaction</Text>
                  <Progress percent={92} strokeColor="var(--orako-secondary)" />
                  <Text type="secondary">4.6/5.0 rating</Text>
                </div>
                <div>
                  <Text strong>Operational Efficiency</Text>
                  <Progress percent={78} strokeColor="var(--orako-warning)" />
                  <Text type="secondary">Room for improvement</Text>
                </div>
                <Button type="primary" block icon={<BarChartOutlined />}>
                  View Full Dashboard
                </Button>
              </Space>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card title="Quick Actions" className="oracle-shadow-sm">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button 
                  block 
                  type="primary" 
                  icon={<PlusOutlined />}
                  onClick={() => setModalVisible(true)}
                >
                  Create New Record
                </Button>
                <Button 
                  block 
                  icon={<SearchOutlined />}
                  onClick={() => setDrawerVisible(true)}
                >
                  Global Search
                </Button>
                <Button block icon={<FilterOutlined />}>Advanced Filter</Button>
                <Button block icon={<CalendarOutlined />}>Schedule Meeting</Button>
                <Button block icon={<MailOutlined />}>Send Notification</Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Modals and Drawers for ERP functionality */}
      <Modal
        title="Create New Record"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Create
          </Button>
        ]}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <div>
            <Text strong>Record Type:</Text>
            <Select defaultValue="customer" style={{ width: '100%', marginTop: '4px' }}>
              <Option value="customer">Customer</Option>
              <Option value="vendor">Vendor</Option>
              <Option value="product">Product</Option>
              <Option value="order">Sales Order</Option>
            </Select>
          </div>
          <div>
            <Text strong>Priority:</Text>
            <Radio.Group defaultValue="medium" style={{ width: '100%', marginTop: '4px' }}>
              <Radio value="low">Low</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="high">High</Radio>
            </Radio.Group>
          </div>
          <div>
            <Text strong>Due Date:</Text>
            <DatePicker style={{ width: '100%', marginTop: '4px' }} />
          </div>
        </Space>
      </Modal>

      <Drawer
        title="Global Search"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        width={400}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Search placeholder="Search across all modules..." />
          <Divider />
          <Text strong>Recent Searches:</Text>
          <List
            size="small"
            dataSource={[
              'Customer: Acme Corp',
              'Invoice: INV-2025-001',
              'Employee: John Smith',
              'Product: PRD-ABC123'
            ]}
            renderItem={item => (
              <List.Item actions={[<SearchOutlined />]}>
                {item}
              </List.Item>
            )}
          />
          <Divider />
          <Text strong>Search Filters:</Text>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Select placeholder="Module" style={{ width: '100%' }}>
              <Option value="all">All Modules</Option>
              <Option value="sales">Sales</Option>
              <Option value="finance">Finance</Option>
              <Option value="hr">HR</Option>
            </Select>
            <RangePicker style={{ width: '100%' }} />
          </Space>
        </Space>
      </Drawer>

      <BackTop />
    </div>
  );
};

export default ERPComponentsPage;

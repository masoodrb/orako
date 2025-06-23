import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Tag,
  Space,
  Typography,
  Statistic,
  Form,
  Modal,
  Tooltip,
  Switch,
  Progress,
  Badge,
  Timeline,
  message
} from 'antd';
import {
  ReloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  StopOutlined,
  CalendarOutlined,
  DollarOutlined,
  UserOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  HistoryOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const RecurringInvoicePage = () => {
  const [loading, setLoading] = useState(false);
  const [recurringModalVisible, setRecurringModalVisible] = useState(false);
  const [selectedRecurring, setSelectedRecurring] = useState(null);

  // Sample recurring invoice data
  const recurringData = [
    {
      key: '1',
      templateName: 'Monthly Web Hosting',
      client: 'Acme Corporation',
      amount: 299.00,
      frequency: 'Monthly',
      status: 'Active',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      nextInvoice: '2025-07-01',
      lastInvoice: '2025-06-01',
      totalInvoices: 6,
      successfulInvoices: 6,
      failedInvoices: 0,
      currency: 'USD',
      autoSend: true
    },
    {
      key: '2',
      templateName: 'Quarterly Maintenance',
      client: 'Tech Solutions Inc',
      amount: 1500.00,
      frequency: 'Quarterly',
      status: 'Active',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      nextInvoice: '2025-07-01',
      lastInvoice: '2025-04-01',
      totalInvoices: 2,
      successfulInvoices: 2,
      failedInvoices: 0,
      currency: 'USD',
      autoSend: true
    },
    {
      key: '3',
      templateName: 'Annual Software License',
      client: 'Global Enterprises',
      amount: 5000.00,
      frequency: 'Annually',
      status: 'Paused',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      nextInvoice: '2026-01-01',
      lastInvoice: '2025-01-01',
      totalInvoices: 1,
      successfulInvoices: 1,
      failedInvoices: 0,
      currency: 'USD',
      autoSend: false
    },
    {
      key: '4',
      templateName: 'Weekly Cleaning Service',
      client: 'StartUp Co',
      amount: 150.00,
      frequency: 'Weekly',
      status: 'Stopped',
      startDate: '2025-03-01',
      endDate: '2025-06-01',
      nextInvoice: null,
      lastInvoice: '2025-05-25',
      totalInvoices: 12,
      successfulInvoices: 11,
      failedInvoices: 1,
      currency: 'USD',
      autoSend: true
    }
  ];

  const handleCreateRecurring = () => {
    setSelectedRecurring(null);
    setRecurringModalVisible(true);
  };

  const handleEditRecurring = (record) => {
    setSelectedRecurring(record);
    setRecurringModalVisible(true);
  };

  const handleDeleteRecurring = (record) => {
    Modal.confirm({
      title: 'Delete Recurring Invoice',
      content: `Are you sure you want to delete "${record.templateName}"? This will stop all future invoices.`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        message.success('Recurring invoice deleted successfully');
      }
    });
  };

  const handlePauseRecurring = (record) => {
    message.success(`Recurring invoice "${record.templateName}" paused`);
  };

  const handleResumeRecurring = (record) => {
    message.success(`Recurring invoice "${record.templateName}" resumed`);
  };

  const handleStopRecurring = (record) => {
    Modal.confirm({
      title: 'Stop Recurring Invoice',
      content: `Are you sure you want to stop "${record.templateName}"? This will end the recurring schedule.`,
      okText: 'Stop',
      okType: 'danger',
      onOk() {
        message.success('Recurring invoice stopped');
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Paused': return 'warning';
      case 'Stopped': return 'error';
      default: return 'default';
    }
  };

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'Weekly': return 'blue';
      case 'Monthly': return 'green';
      case 'Quarterly': return 'orange';
      case 'Annually': return 'purple';
      default: return 'default';
    }
  };

  const getSuccessRate = (successful, total) => {
    return total > 0 ? Math.round((successful / total) * 100) : 100;
  };

  const columns = [
    {
      title: 'Template Name',
      dataIndex: 'templateName',
      key: 'templateName',
      render: (text) => <Text strong>{text}</Text>,
      sorter: true,
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      render: (client) => (
        <Space>
          <UserOutlined />
          {client}
        </Space>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => (
        <Text strong style={{ color: 'var(--orako-success)' }}>
          {record.currency} ${amount.toLocaleString()}
        </Text>
      ),
      sorter: true,
    },
    {
      title: 'Frequency',
      dataIndex: 'frequency',
      key: 'frequency',
      render: (frequency) => <Tag color={getFrequencyColor(frequency)}>{frequency}</Tag>,
      filters: [
        { text: 'Weekly', value: 'Weekly' },
        { text: 'Monthly', value: 'Monthly' },
        { text: 'Quarterly', value: 'Quarterly' },
        { text: 'Annually', value: 'Annually' },
      ],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Paused', value: 'Paused' },
        { text: 'Stopped', value: 'Stopped' },
      ],
    },
    {
      title: 'Success Rate',
      key: 'successRate',
      render: (_, record) => {
        const rate = getSuccessRate(record.successfulInvoices, record.totalInvoices);
        return (
          <Progress 
            percent={rate} 
            size="small" 
            strokeColor={rate >= 95 ? 'var(--orako-success)' : rate >= 80 ? 'var(--orako-warning)' : 'var(--orako-error)'}
            format={(percent) => `${percent}%`}
          />
        );
      },
      sorter: true,
    },
    {
      title: 'Next Invoice',
      dataIndex: 'nextInvoice',
      key: 'nextInvoice',
      render: (date) => date ? (
        <span style={{ 
          color: dayjs(date).isBefore(dayjs().add(7, 'days')) ? 'var(--orako-warning)' : 'inherit' 
        }}>
          {dayjs(date).format('MMM DD, YYYY')}
        </span>
      ) : (
        <Text type="secondary">N/A</Text>
      ),
      sorter: true,
    },
    {
      title: 'Auto Send',
      dataIndex: 'autoSend',
      key: 'autoSend',
      render: (autoSend) => (
        <Badge 
          status={autoSend ? 'success' : 'default'} 
          text={autoSend ? 'Enabled' : 'Disabled'} 
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              size="small" 
              icon={<EyeOutlined />}
              onClick={() => setSelectedRecurring(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Template">
            <Button 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => handleEditRecurring(record)}
            />
          </Tooltip>
          {record.status === 'Active' ? (
            <Tooltip title="Pause">
              <Button 
                size="small" 
                icon={<PauseCircleOutlined />}
                onClick={() => handlePauseRecurring(record)}
              />
            </Tooltip>
          ) : record.status === 'Paused' ? (
            <Tooltip title="Resume">
              <Button 
                size="small" 
                type="primary"
                icon={<PlayCircleOutlined />}
                onClick={() => handleResumeRecurring(record)}
              />
            </Tooltip>
          ) : null}
          {record.status !== 'Stopped' && (
            <Tooltip title="Stop">
              <Button 
                size="small" 
                danger 
                icon={<StopOutlined />}
                onClick={() => handleStopRecurring(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteRecurring(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const totalRecurringValue = recurringData.reduce((sum, recurring) => 
    recurring.status === 'Active' ? sum + recurring.amount : sum, 0
  );
  const activeTemplates = recurringData.filter(r => r.status === 'Active').length;
  const totalInvoicesGenerated = recurringData.reduce((sum, r) => sum + r.totalInvoices, 0);
  const overallSuccessRate = recurringData.reduce((sum, r) => sum + r.successfulInvoices, 0) / 
    Math.max(recurringData.reduce((sum, r) => sum + r.totalInvoices, 0), 1) * 100;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>Recurring Invoices</Title>
        <Text type="secondary">
          Automate your billing with recurring invoice templates and schedules
        </Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Recurring Revenue"
              value={totalRecurringValue}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-success)' }}
            />
            <Text type="secondary">Active templates</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Templates"
              value={activeTemplates}
              valueStyle={{ color: 'var(--orako-primary)' }}
            />
            <Text type="secondary">Currently running</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Invoices Generated"
              value={totalInvoicesGenerated}
              valueStyle={{ color: 'var(--orako-secondary)' }}
            />
            <Text type="secondary">All time</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Success Rate"
              value={overallSuccessRate}
              suffix="%"
              precision={1}
              valueStyle={{ color: 'var(--orako-warning)' }}
            />
            <Text type="secondary">Successful deliveries</Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card 
            title="Recurring Invoice Templates" 
            extra={
              <Space>
                <Button icon={<HistoryOutlined />}>
                  Invoice History
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateRecurring}>
                  Create Template
                </Button>
              </Space>
            }
          >
            {/* Filters */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col span={8}>
                <Search placeholder="Search templates..." enterButton />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={6}>
                <Select placeholder="Status" style={{ width: '100%' }}>
                  <Option value="all">All Status</Option>
                  <Option value="active">Active</Option>
                  <Option value="paused">Paused</Option>
                  <Option value="stopped">Stopped</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select placeholder="Frequency" style={{ width: '100%' }}>
                  <Option value="all">All Frequencies</Option>
                  <Option value="weekly">Weekly</Option>
                  <Option value="monthly">Monthly</Option>
                  <Option value="quarterly">Quarterly</Option>
                  <Option value="annually">Annually</Option>
                </Select>
              </Col>
              <Col span={6}>
                <RangePicker style={{ width: '100%' }} />
              </Col>
              <Col span={6}>
                <Button icon={<FilterOutlined />} block>
                  More Filters
                </Button>
              </Col>
            </Row>

            <Table 
              dataSource={recurringData} 
              columns={columns} 
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} templates`,
              }}
              scroll={{ x: 1400 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Recurring Invoice Modal */}
      <Modal
        title={selectedRecurring ? 'Edit Recurring Template' : 'Create Recurring Invoice Template'}
        open={recurringModalVisible}
        onCancel={() => setRecurringModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setRecurringModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="draft" onClick={() => message.success('Template saved as draft')}>
            Save as Draft
          </Button>,
          <Button 
            key="create" 
            type="primary" 
            onClick={() => {
              message.success('Recurring invoice template created');
              setRecurringModalVisible(false);
            }}
          >
            Create Template
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item label="Template Name" required>
                <Input placeholder="e.g., Monthly Web Hosting" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Client" required>
                <Select placeholder="Select client">
                  <Option value="acme">Acme Corporation</Option>
                  <Option value="tech">Tech Solutions Inc</Option>
                  <Option value="global">Global Enterprises</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Amount" required>
                <Input prefix="$" placeholder="0.00" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Frequency" required>
                <Select placeholder="Select frequency">
                  <Option value="weekly">Weekly</Option>
                  <Option value="bi-weekly">Bi-weekly</Option>
                  <Option value="monthly">Monthly</Option>
                  <Option value="quarterly">Quarterly</Option>
                  <Option value="bi-annually">Bi-annually</Option>
                  <Option value="annually">Annually</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Start Date" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="End Date">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Auto Send">
                <Switch defaultChecked />
                <Text type="secondary" style={{ marginLeft: '8px' }}>
                  Automatically send invoices
                </Text>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Send Reminder">
                <Switch />
                <Text type="secondary" style={{ marginLeft: '8px' }}>
                  Send payment reminders
                </Text>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Description">
                <Input.TextArea rows={3} placeholder="Description for invoice line items..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Notes">
                <Input.TextArea rows={2} placeholder="Additional notes for the invoice..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default RecurringInvoicePage;

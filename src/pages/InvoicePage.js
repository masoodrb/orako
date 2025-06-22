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
  Divider,
  Form,
  Modal,
  Steps,
  Badge,
  Tooltip,
  Progress,
  Timeline,
  Descriptions,
  message
} from 'antd';
import {
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  SendOutlined,
  PrinterOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  BarChartOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Step } = Steps;

const InvoicePage = () => {
  const [loading, setLoading] = useState(false);
  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Sample invoice data
  const invoiceData = [
    {
      key: '1',
      invoiceNumber: 'INV-2025-001',
      client: 'Acme Corporation',
      amount: 15750.00,
      status: 'Paid',
      dueDate: '2025-06-15',
      issueDate: '2025-05-15',
      paymentDate: '2025-06-10',
      items: 5,
      tax: 1575.00,
      discount: 0,
      currency: 'USD'
    },
    {
      key: '2',
      invoiceNumber: 'INV-2025-002',
      client: 'Tech Solutions Inc',
      amount: 8200.00,
      status: 'Pending',
      dueDate: '2025-07-01',
      issueDate: '2025-06-01',
      paymentDate: null,
      items: 3,
      tax: 820.00,
      discount: 200.00,
      currency: 'USD'
    },
    {
      key: '3',
      invoiceNumber: 'INV-2025-003',
      client: 'Global Enterprises',
      amount: 23400.00,
      status: 'Overdue',
      dueDate: '2025-06-20',
      issueDate: '2025-05-20',
      paymentDate: null,
      items: 8,
      tax: 2340.00,
      discount: 500.00,
      currency: 'USD'
    },
    {
      key: '4',
      invoiceNumber: 'INV-2025-004',
      client: 'StartUp Co',
      amount: 5600.00,
      status: 'Draft',
      dueDate: '2025-07-15',
      issueDate: null,
      paymentDate: null,
      items: 2,
      tax: 560.00,
      discount: 0,
      currency: 'USD'
    }
  ];

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setInvoiceModalVisible(true);
  };

  const handleEditInvoice = (record) => {
    setSelectedInvoice(record);
    setInvoiceModalVisible(true);
  };

  const handleDeleteInvoice = (record) => {
    Modal.confirm({
      title: 'Delete Invoice',
      content: `Are you sure you want to delete invoice ${record.invoiceNumber}?`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        message.success('Invoice deleted successfully');
      }
    });
  };

  const handleSendInvoice = (record) => {
    message.success(`Invoice ${record.invoiceNumber} sent to ${record.client}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'processing';
      case 'Overdue': return 'error';
      case 'Draft': return 'default';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
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
        <Text strong style={{ color: 'var(--oracle-success)' }}>
          {record.currency} ${amount.toLocaleString()}
        </Text>
      ),
      sorter: true,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
      filters: [
        { text: 'Paid', value: 'Paid' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Overdue', value: 'Overdue' },
        { text: 'Draft', value: 'Draft' },
      ],
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      key: 'issueDate',
      render: (date) => date ? dayjs(date).format('MMM DD, YYYY') : '-',
      sorter: true,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => (
        <span style={{ 
          color: dayjs(date).isBefore(dayjs()) ? 'var(--oracle-error)' : 'inherit' 
        }}>
          {dayjs(date).format('MMM DD, YYYY')}
        </span>
      ),
      sorter: true,
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
              onClick={() => setSelectedInvoice(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Invoice">
            <Button 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => handleEditInvoice(record)}
            />
          </Tooltip>
          <Tooltip title="Send Invoice">
            <Button 
              size="small" 
              icon={<SendOutlined />}
              onClick={() => handleSendInvoice(record)}
              disabled={record.status === 'Draft'}
            />
          </Tooltip>
          <Tooltip title="Download PDF">
            <Button 
              size="small" 
              icon={<DownloadOutlined />}
              onClick={() => message.success('PDF downloaded')}
            />
          </Tooltip>
          <Tooltip title="Print">
            <Button 
              size="small" 
              icon={<PrinterOutlined />}
              onClick={() => message.success('Invoice sent to printer')}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteInvoice(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const totalRevenue = invoiceData.reduce((sum, invoice) => 
    invoice.status === 'Paid' ? sum + invoice.amount : sum, 0
  );
  const pendingAmount = invoiceData.reduce((sum, invoice) => 
    invoice.status === 'Pending' ? sum + invoice.amount : sum, 0
  );
  const overdueAmount = invoiceData.reduce((sum, invoice) => 
    invoice.status === 'Overdue' ? sum + invoice.amount : sum, 0
  );

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>Invoice Management</Title>
        <Text type="secondary">
          Create, manage, and track all your invoices in one place
        </Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--oracle-success)' }}
            />
            <Text type="secondary">Paid invoices</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Amount"
              value={pendingAmount}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--oracle-warning)' }}
            />
            <Text type="secondary">Awaiting payment</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Overdue Amount"
              value={overdueAmount}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--oracle-error)' }}
            />
            <Text type="secondary">Past due date</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Invoices"
              value={invoiceData.length}
              valueStyle={{ color: 'var(--oracle-primary)' }}
            />
            <Text type="secondary">All time</Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card 
            title="Invoices" 
            extra={
              <Space>
                <Button icon={<BarChartOutlined />}>
                  Analytics
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateInvoice}>
                  Create Invoice
                </Button>
              </Space>
            }
          >
            {/* Filters */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col span={8}>
                <Search placeholder="Search invoices..." enterButton />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={6}>
                <Select placeholder="Status" style={{ width: '100%' }}>
                  <Option value="all">All Status</Option>
                  <Option value="paid">Paid</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="overdue">Overdue</Option>
                  <Option value="draft">Draft</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select placeholder="Client" style={{ width: '100%' }}>
                  <Option value="all">All Clients</Option>
                  <Option value="acme">Acme Corporation</Option>
                  <Option value="tech">Tech Solutions Inc</Option>
                  <Option value="global">Global Enterprises</Option>
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
              dataSource={invoiceData} 
              columns={columns} 
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} invoices`,
              }}
              scroll={{ x: 1200 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Invoice Modal */}
      <Modal
        title={selectedInvoice ? 'Edit Invoice' : 'Create New Invoice'}
        open={invoiceModalVisible}
        onCancel={() => setInvoiceModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setInvoiceModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="draft" onClick={() => message.success('Invoice saved as draft')}>
            Save as Draft
          </Button>,
          <Button 
            key="send" 
            type="primary" 
            onClick={() => {
              message.success('Invoice created and sent');
              setInvoiceModalVisible(false);
            }}
          >
            Create & Send
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Row gutter={[16, 16]}>
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
              <Form.Item label="Invoice Date" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Due Date" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Currency">
                <Select defaultValue="USD">
                  <Option value="USD">USD</Option>
                  <Option value="EUR">EUR</Option>
                  <Option value="GBP">GBP</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Notes">
                <Input.TextArea rows={3} placeholder="Additional notes or terms..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default InvoicePage;

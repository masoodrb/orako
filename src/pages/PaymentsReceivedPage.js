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
  Badge,
  Upload,
  Progress,
  message
} from 'antd';
import {
  DollarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  DownloadOutlined,
  CreditCardOutlined,
  BankOutlined,
  PayCircleOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const PaymentsReceivedPage = () => {
  const [loading, setLoading] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Sample payment data
  const paymentData = [
    {
      key: '1',
      paymentId: 'PAY-2025-001',
      client: 'Acme Corporation',
      amount: 15750.00,
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      paymentDate: '2025-06-20',
      invoiceNumber: 'INV-2025-001',
      reference: 'TXN123456789',
      currency: 'USD',
      fees: 15.75,
      netAmount: 15734.25,
      bankAccount: 'Chase Bank ****1234'
    },
    {
      key: '2',
      paymentId: 'PAY-2025-002',
      client: 'Tech Solutions Inc',
      amount: 8200.00,
      paymentMethod: 'Credit Card',
      status: 'Processing',
      paymentDate: '2025-06-21',
      invoiceNumber: 'INV-2025-002',
      reference: 'CC789012345',
      currency: 'USD',
      fees: 238.60,
      netAmount: 7961.40,
      bankAccount: 'Visa ****5678'
    },
    {
      key: '3',
      paymentId: 'PAY-2025-003',
      client: 'Global Enterprises',
      amount: 23400.00,
      paymentMethod: 'ACH',
      status: 'Completed',
      paymentDate: '2025-06-19',
      invoiceNumber: 'INV-2025-003',
      reference: 'ACH345678901',
      currency: 'USD',
      fees: 5.00,
      netAmount: 23395.00,
      bankAccount: 'Business Account ****9876'
    },
    {
      key: '4',
      paymentId: 'PAY-2025-004',
      client: 'StartUp Co',
      amount: 5600.00,
      paymentMethod: 'PayPal',
      status: 'Failed',
      paymentDate: '2025-06-18',
      invoiceNumber: 'INV-2025-004',
      reference: 'PP567890123',
      currency: 'USD',
      fees: 0,
      netAmount: 0,
      bankAccount: 'PayPal ****0123'
    },
    {
      key: '5',
      paymentId: 'PAY-2025-005',
      client: 'Innovation Labs',
      amount: 1200.00,
      paymentMethod: 'Check',
      status: 'Pending',
      paymentDate: '2025-06-22',
      invoiceNumber: 'INV-2025-005',
      reference: 'CHK001234',
      currency: 'USD',
      fees: 0,
      netAmount: 1200.00,
      bankAccount: 'Check Deposit'
    }
  ];

  const handleRecordPayment = () => {
    setSelectedPayment(null);
    setPaymentModalVisible(true);
  };

  const handleEditPayment = (record) => {
    setSelectedPayment(record);
    setPaymentModalVisible(true);
  };

  const handleDeletePayment = (record) => {
    Modal.confirm({
      title: 'Delete Payment Record',
      content: `Are you sure you want to delete payment ${record.paymentId}?`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        message.success('Payment record deleted successfully');
      }
    });
  };

  const handleRefundPayment = (record) => {
    Modal.confirm({
      title: 'Refund Payment',
      content: `Are you sure you want to refund payment ${record.paymentId} of $${record.amount}?`,
      okText: 'Refund',
      okType: 'danger',
      onOk() {
        message.success('Refund initiated successfully');
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'Processing': return 'processing';
      case 'Pending': return 'warning';
      case 'Failed': return 'error';
      default: return 'default';
    }
  };

  const getMethodIcon = (method) => {
    switch (method) {
      case 'Credit Card': return <CreditCardOutlined />;
      case 'Bank Transfer': return <BankOutlined />;
      case 'ACH': return <BankOutlined />;
      case 'PayPal': return <PayCircleOutlined />;
      case 'Check': return <FileTextOutlined />;
      default: return <DollarOutlined />;
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case 'Credit Card': return 'blue';
      case 'Bank Transfer': return 'green';
      case 'ACH': return 'cyan';
      case 'PayPal': return 'orange';
      case 'Check': return 'purple';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
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
        <div>
          <Text strong style={{ color: 'var(--orako-success)' }}>
            {record.currency} ${amount.toLocaleString()}
          </Text>
          {record.fees > 0 && (
            <div>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Fee: ${record.fees} | Net: ${record.netAmount.toLocaleString()}
              </Text>
            </div>
          )}
        </div>
      ),
      sorter: true,
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      render: (method) => (
        <Tag icon={getMethodIcon(method)} color={getMethodColor(method)}>
          {method}
        </Tag>
      ),
      filters: [
        { text: 'Credit Card', value: 'Credit Card' },
        { text: 'Bank Transfer', value: 'Bank Transfer' },
        { text: 'ACH', value: 'ACH' },
        { text: 'PayPal', value: 'PayPal' },
        { text: 'Check', value: 'Check' },
      ],
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Processing', value: 'Processing' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Failed', value: 'Failed' },
      ],
    },
    {
      title: 'Invoice',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (invoice) => <Text code>{invoice}</Text>,
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      render: (reference) => <Text type="secondary">{reference}</Text>,
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
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
              onClick={() => setSelectedPayment(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Payment">
            <Button 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => handleEditPayment(record)}
              disabled={record.status === 'Completed'}
            />
          </Tooltip>
          <Tooltip title="Download Receipt">
            <Button 
              size="small" 
              icon={<DownloadOutlined />}
              onClick={() => message.success('Receipt downloaded')}
            />
          </Tooltip>
          {record.status === 'Completed' && (
            <Tooltip title="Refund">
              <Button 
                size="small" 
                danger 
                onClick={() => handleRefundPayment(record)}
              >
                Refund
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleDeletePayment(record)}
              disabled={record.status === 'Completed'}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const totalReceived = paymentData.reduce((sum, payment) => 
    payment.status === 'Completed' ? sum + payment.amount : sum, 0
  );
  const pendingAmount = paymentData.reduce((sum, payment) => 
    payment.status === 'Processing' || payment.status === 'Pending' ? sum + payment.amount : sum, 0
  );
  const totalFees = paymentData.reduce((sum, payment) => 
    payment.status === 'Completed' ? sum + payment.fees : sum, 0
  );
  const failedPayments = paymentData.filter(p => p.status === 'Failed').length;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>Payments Received</Title>
        <Text type="secondary">
          Track and manage all incoming payments from your customers
        </Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Received"
              value={totalReceived}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-success)' }}
            />
            <Text type="secondary">Completed payments</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Amount"
              value={pendingAmount}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-warning)' }}
            />
            <Text type="secondary">Processing payments</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Fees"
              value={totalFees}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-error)' }}
            />
            <Text type="secondary">Transaction fees</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Failed Payments"
              value={failedPayments}
              valueStyle={{ color: 'var(--orako-error)' }}
            />
            <Text type="secondary">Requires attention</Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card 
            title="Payment Records" 
            extra={
              <Space>
                <Upload>
                  <Button icon={<UploadOutlined />}>
                    Import Payments
                  </Button>
                </Upload>
                <Button icon={<DownloadOutlined />}>
                  Export Report
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleRecordPayment}>
                  Record Payment
                </Button>
              </Space>
            }
          >
            {/* Filters */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col span={8}>
                <Search placeholder="Search payments..." enterButton />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={6}>
                <Select placeholder="Status" style={{ width: '100%' }}>
                  <Option value="all">All Status</Option>
                  <Option value="completed">Completed</Option>
                  <Option value="processing">Processing</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="failed">Failed</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select placeholder="Payment Method" style={{ width: '100%' }}>
                  <Option value="all">All Methods</Option>
                  <Option value="credit">Credit Card</Option>
                  <Option value="bank">Bank Transfer</Option>
                  <Option value="ach">ACH</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="check">Check</Option>
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
              dataSource={paymentData} 
              columns={columns} 
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} payments`,
              }}
              scroll={{ x: 1400 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Payment Modal */}
      <Modal
        title={selectedPayment ? 'Edit Payment Record' : 'Record New Payment'}
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setPaymentModalVisible(false)}>
            Cancel
          </Button>,
          <Button 
            key="save" 
            type="primary" 
            onClick={() => {
              message.success('Payment recorded successfully');
              setPaymentModalVisible(false);
            }}
          >
            Record Payment
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
              <Form.Item label="Invoice" required>
                <Select placeholder="Select invoice">
                  <Option value="INV-2025-001">INV-2025-001 - $15,750.00</Option>
                  <Option value="INV-2025-002">INV-2025-002 - $8,200.00</Option>
                  <Option value="INV-2025-003">INV-2025-003 - $23,400.00</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Payment Amount" required>
                <Input prefix="$" placeholder="0.00" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Payment Method" required>
                <Select placeholder="Select method">
                  <Option value="credit">Credit Card</Option>
                  <Option value="bank">Bank Transfer</Option>
                  <Option value="ach">ACH</Option>
                  <Option value="paypal">PayPal</Option>
                  <Option value="check">Check</Option>
                  <Option value="cash">Cash</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Payment Date" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Transaction Fee">
                <Input prefix="$" placeholder="0.00" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Reference Number">
                <Input placeholder="Transaction reference..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Bank Account">
                <Select placeholder="Select account">
                  <Option value="chase">Chase Bank ****1234</Option>
                  <Option value="wells">Wells Fargo ****5678</Option>
                  <Option value="business">Business Account ****9876</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Notes">
                <Input.TextArea rows={3} placeholder="Additional payment notes..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default PaymentsReceivedPage;

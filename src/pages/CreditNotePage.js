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
  Alert,
  message
} from 'antd';
import {
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SendOutlined,
  UndoOutlined,
  DollarOutlined,
  UserOutlined,
  WarningOutlined,
  CheckCircleOutlined,
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const CreditNotePage = () => {
  const [loading, setLoading] = useState(false);
  const [creditNoteModalVisible, setCreditNoteModalVisible] = useState(false);
  const [selectedCreditNote, setSelectedCreditNote] = useState(null);

  // Sample credit note data
  const creditNoteData = [
    {
      key: '1',
      creditNoteNumber: 'CN-2025-001',
      client: 'Acme Corporation',
      amount: 2500.00,
      status: 'Applied',
      issueDate: '2025-06-15',
      relatedInvoice: 'INV-2025-001',
      reason: 'Product Return',
      appliedAmount: 2500.00,
      remainingAmount: 0,
      currency: 'USD'
    },
    {
      key: '2',
      creditNoteNumber: 'CN-2025-002',
      client: 'Tech Solutions Inc',
      amount: 1200.00,
      status: 'Pending',
      issueDate: '2025-06-18',
      relatedInvoice: 'INV-2025-002',
      reason: 'Service Adjustment',
      appliedAmount: 0,
      remainingAmount: 1200.00,
      currency: 'USD'
    },
    {
      key: '3',
      creditNoteNumber: 'CN-2025-003',
      client: 'Global Enterprises',
      amount: 800.00,
      status: 'Partially Applied',
      issueDate: '2025-06-10',
      relatedInvoice: 'INV-2025-003',
      reason: 'Billing Error',
      appliedAmount: 300.00,
      remainingAmount: 500.00,
      currency: 'USD'
    },
    {
      key: '4',
      creditNoteNumber: 'CN-2025-004',
      client: 'StartUp Co',
      amount: 450.00,
      status: 'Voided',
      issueDate: '2025-06-05',
      relatedInvoice: 'INV-2025-004',
      reason: 'Discount Applied',
      appliedAmount: 0,
      remainingAmount: 0,
      currency: 'USD'
    }
  ];

  const handleCreateCreditNote = () => {
    setSelectedCreditNote(null);
    setCreditNoteModalVisible(true);
  };

  const handleEditCreditNote = (record) => {
    setSelectedCreditNote(record);
    setCreditNoteModalVisible(true);
  };

  const handleDeleteCreditNote = (record) => {
    Modal.confirm({
      title: 'Delete Credit Note',
      content: `Are you sure you want to delete credit note ${record.creditNoteNumber}?`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        message.success('Credit note deleted successfully');
      }
    });
  };

  const handleApplyCreditNote = (record) => {
    Modal.confirm({
      title: 'Apply Credit Note',
      content: `Apply credit note ${record.creditNoteNumber} to customer account?`,
      okText: 'Apply',
      onOk() {
        message.success('Credit note applied successfully');
      }
    });
  };

  const handleVoidCreditNote = (record) => {
    Modal.confirm({
      title: 'Void Credit Note',
      content: `Are you sure you want to void credit note ${record.creditNoteNumber}? This action cannot be undone.`,
      okText: 'Void',
      okType: 'danger',
      onOk() {
        message.success('Credit note voided successfully');
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied': return 'success';
      case 'Pending': return 'processing';
      case 'Partially Applied': return 'warning';
      case 'Voided': return 'error';
      default: return 'default';
    }
  };

  const getReasonColor = (reason) => {
    switch (reason) {
      case 'Product Return': return 'blue';
      case 'Service Adjustment': return 'green';
      case 'Billing Error': return 'red';
      case 'Discount Applied': return 'purple';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Credit Note #',
      dataIndex: 'creditNoteNumber',
      key: 'creditNoteNumber',
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
        <Text strong style={{ color: 'var(--orako-error)' }}>
          -{record.currency} ${amount.toLocaleString()}
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
        { text: 'Applied', value: 'Applied' },
        { text: 'Pending', value: 'Pending' },
        { text: 'Partially Applied', value: 'Partially Applied' },
        { text: 'Voided', value: 'Voided' },
      ],
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      render: (reason) => <Tag color={getReasonColor(reason)}>{reason}</Tag>,
    },
    {
      title: 'Related Invoice',
      dataIndex: 'relatedInvoice',
      key: 'relatedInvoice',
      render: (invoice) => <Text code>{invoice}</Text>,
    },
    {
      title: 'Remaining',
      dataIndex: 'remainingAmount',
      key: 'remainingAmount',
      render: (amount, record) => (
        <Text style={{ 
          color: amount > 0 ? 'var(--orako-warning)' : 'var(--orako-text-secondary)' 
        }}>
          ${amount.toLocaleString()}
        </Text>
      ),
      sorter: true,
    },
    {
      title: 'Issue Date',
      dataIndex: 'issueDate',
      key: 'issueDate',
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
              onClick={() => setSelectedCreditNote(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Credit Note">
            <Button 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => handleEditCreditNote(record)}
              disabled={record.status === 'Applied' || record.status === 'Voided'}
            />
          </Tooltip>
          {record.status === 'Pending' && (
            <Tooltip title="Apply Credit Note">
              <Button 
                size="small" 
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleApplyCreditNote(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="Download PDF">
            <Button 
              size="small" 
              icon={<DownloadOutlined />}
              onClick={() => message.success('PDF downloaded')}
            />
          </Tooltip>
          {record.status !== 'Voided' && (
            <Tooltip title="Void Credit Note">
              <Button 
                size="small" 
                danger 
                icon={<UndoOutlined />}
                onClick={() => handleVoidCreditNote(record)}
              />
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteCreditNote(record)}
              disabled={record.status === 'Applied'}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const totalCreditAmount = creditNoteData.reduce((sum, note) => sum + note.amount, 0);
  const appliedAmount = creditNoteData.reduce((sum, note) => sum + note.appliedAmount, 0);
  const pendingAmount = creditNoteData.reduce((sum, note) => 
    note.status === 'Pending' ? sum + note.amount : sum, 0
  );
  const remainingAmount = creditNoteData.reduce((sum, note) => sum + note.remainingAmount, 0);

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>Credit Notes Management</Title>
        <Text type="secondary">
          Issue and manage credit notes for returns, adjustments, and billing corrections
        </Text>
      </div>

      {/* Warning Alert */}
      <Alert
        message="Credit Note Information"
        description="Credit notes reduce customer balances and can be applied to future invoices or refunded. Handle with care as they affect financial records."
        type="info"
        showIcon
        style={{ marginBottom: '24px' }}
      />

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Credit Amount"
              value={totalCreditAmount}
              prefix="-$"
              precision={2}
              valueStyle={{ color: 'var(--orako-error)' }}
            />
            <Text type="secondary">All credit notes</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Applied Amount"
              value={appliedAmount}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-success)' }}
            />
            <Text type="secondary">Used credits</Text>
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
            <Text type="secondary">Awaiting application</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Available Credits"
              value={remainingAmount}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-primary)' }}
            />
            <Text type="secondary">Can be used</Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card 
            title="Credit Notes" 
            extra={
              <Space>
                <Button icon={<FileTextOutlined />}>
                  Bulk Actions
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateCreditNote}>
                  Create Credit Note
                </Button>
              </Space>
            }
          >
            {/* Filters */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col span={8}>
                <Search placeholder="Search credit notes..." enterButton />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={6}>
                <Select placeholder="Status" style={{ width: '100%' }}>
                  <Option value="all">All Status</Option>
                  <Option value="applied">Applied</Option>
                  <Option value="pending">Pending</Option>
                  <Option value="partially">Partially Applied</Option>
                  <Option value="voided">Voided</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select placeholder="Reason" style={{ width: '100%' }}>
                  <Option value="all">All Reasons</Option>
                  <Option value="return">Product Return</Option>
                  <Option value="adjustment">Service Adjustment</Option>
                  <Option value="error">Billing Error</Option>
                  <Option value="discount">Discount Applied</Option>
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
              dataSource={creditNoteData} 
              columns={columns} 
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} credit notes`,
              }}
              scroll={{ x: 1300 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Credit Note Modal */}
      <Modal
        title={selectedCreditNote ? 'Edit Credit Note' : 'Create New Credit Note'}
        open={creditNoteModalVisible}
        onCancel={() => setCreditNoteModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setCreditNoteModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="draft" onClick={() => message.success('Credit note saved as draft')}>
            Save as Draft
          </Button>,
          <Button 
            key="create" 
            type="primary" 
            onClick={() => {
              message.success('Credit note created successfully');
              setCreditNoteModalVisible(false);
            }}
          >
            Create Credit Note
          </Button>,
        ]}
      >
        <Alert
          message="Important"
          description="Credit notes will reduce the customer's outstanding balance. Ensure all details are correct before issuing."
          type="warning"
          showIcon
          style={{ marginBottom: '24px' }}
        />
        
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
              <Form.Item label="Related Invoice">
                <Select placeholder="Select invoice">
                  <Option value="INV-2025-001">INV-2025-001</Option>
                  <Option value="INV-2025-002">INV-2025-002</Option>
                  <Option value="INV-2025-003">INV-2025-003</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Credit Amount" required>
                <Input prefix="$" placeholder="0.00" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Reason" required>
                <Select placeholder="Select reason">
                  <Option value="return">Product Return</Option>
                  <Option value="adjustment">Service Adjustment</Option>
                  <Option value="error">Billing Error</Option>
                  <Option value="discount">Discount Applied</Option>
                  <Option value="other">Other</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Issue Date" required>
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
              <Form.Item label="Description">
                <Input.TextArea rows={3} placeholder="Detailed reason for credit note..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Internal Notes">
                <Input.TextArea rows={2} placeholder="Internal notes (not visible to customer)..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default CreditNotePage;

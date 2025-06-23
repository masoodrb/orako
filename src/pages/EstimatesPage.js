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
  Progress,
  message
} from 'antd';
import {
  FileTextOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  SendOutlined,
  CopyOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;

const EstimatesPage = () => {
  const [loading, setLoading] = useState(false);
  const [estimateModalVisible, setEstimateModalVisible] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);

  // Sample estimate data
  const estimateData = [
    {
      key: '1',
      estimateNumber: 'EST-2025-001',
      client: 'Acme Corporation',
      amount: 15750.00,
      status: 'Sent',
      validUntil: '2025-07-15',
      createdDate: '2025-06-01',
      items: 5,
      tax: 1575.00,
      discount: 0,
      currency: 'USD',
      probability: 80
    },
    {
      key: '2',
      estimateNumber: 'EST-2025-002',
      client: 'Tech Solutions Inc',
      amount: 8200.00,
      status: 'Accepted',
      validUntil: '2025-07-01',
      createdDate: '2025-05-15',
      items: 3,
      tax: 820.00,
      discount: 200.00,
      currency: 'USD',
      probability: 100
    },
    {
      key: '3',
      estimateNumber: 'EST-2025-003',
      client: 'Global Enterprises',
      amount: 23400.00,
      status: 'Draft',
      validUntil: '2025-08-01',
      createdDate: '2025-06-10',
      items: 8,
      tax: 2340.00,
      discount: 500.00,
      currency: 'USD',
      probability: 60
    },
    {
      key: '4',
      estimateNumber: 'EST-2025-004',
      client: 'StartUp Co',
      amount: 5600.00,
      status: 'Expired',
      validUntil: '2025-06-15',
      createdDate: '2025-05-01',
      items: 2,
      tax: 560.00,
      discount: 0,
      currency: 'USD',
      probability: 20
    },
    {
      key: '5',
      estimateNumber: 'EST-2025-005',
      client: 'Innovation Labs',
      amount: 12800.00,
      status: 'Rejected',
      validUntil: '2025-06-30',
      createdDate: '2025-05-20',
      items: 4,
      tax: 1280.00,
      discount: 300.00,
      currency: 'USD',
      probability: 0
    }
  ];

  const handleCreateEstimate = () => {
    setSelectedEstimate(null);
    setEstimateModalVisible(true);
  };

  const handleEditEstimate = (record) => {
    setSelectedEstimate(record);
    setEstimateModalVisible(true);
  };

  const handleDeleteEstimate = (record) => {
    Modal.confirm({
      title: 'Delete Estimate',
      content: `Are you sure you want to delete estimate ${record.estimateNumber}?`,
      okText: 'Delete',
      okType: 'danger',
      onOk() {
        message.success('Estimate deleted successfully');
      }
    });
  };

  const handleSendEstimate = (record) => {
    message.success(`Estimate ${record.estimateNumber} sent to ${record.client}`);
  };

  const handleConvertToInvoice = (record) => {
    message.success(`Estimate ${record.estimateNumber} converted to invoice`);
  };

  const handleDuplicateEstimate = (record) => {
    message.success(`Estimate ${record.estimateNumber} duplicated`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted': return 'success';
      case 'Sent': return 'processing';
      case 'Draft': return 'default';
      case 'Expired': return 'warning';
      case 'Rejected': return 'error';
      default: return 'default';
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 80) return 'var(--orako-success)';
    if (probability >= 60) return 'var(--orako-warning)';
    if (probability >= 40) return 'var(--orako-secondary)';
    return 'var(--orako-error)';
  };

  const columns = [
    {
      title: 'Estimate #',
      dataIndex: 'estimateNumber',
      key: 'estimateNumber',
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
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
      filters: [
        { text: 'Draft', value: 'Draft' },
        { text: 'Sent', value: 'Sent' },
        { text: 'Accepted', value: 'Accepted' },
        { text: 'Rejected', value: 'Rejected' },
        { text: 'Expired', value: 'Expired' },
      ],
    },
    {
      title: 'Win Probability',
      dataIndex: 'probability',
      key: 'probability',
      render: (probability) => (
        <Progress 
          percent={probability} 
          size="small" 
          strokeColor={getProbabilityColor(probability)}
          format={(percent) => `${percent}%`}
        />
      ),
      sorter: true,
    },
    {
      title: 'Valid Until',
      dataIndex: 'validUntil',
      key: 'validUntil',
      render: (date) => (
        <span style={{ 
          color: dayjs(date).isBefore(dayjs()) ? 'var(--orako-error)' : 'inherit' 
        }}>
          {dayjs(date).format('MMM DD, YYYY')}
        </span>
      ),
      sorter: true,
    },
    {
      title: 'Created',
      dataIndex: 'createdDate',
      key: 'createdDate',
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
              onClick={() => setSelectedEstimate(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Estimate">
            <Button 
              size="small" 
              icon={<EditOutlined />}
              onClick={() => handleEditEstimate(record)}
              disabled={record.status === 'Accepted'}
            />
          </Tooltip>
          <Tooltip title="Send Estimate">
            <Button 
              size="small" 
              icon={<SendOutlined />}
              onClick={() => handleSendEstimate(record)}
              disabled={record.status === 'Draft' ? false : record.status !== 'Sent'}
            />
          </Tooltip>
          <Tooltip title="Duplicate">
            <Button 
              size="small" 
              icon={<CopyOutlined />}
              onClick={() => handleDuplicateEstimate(record)}
            />
          </Tooltip>
          {record.status === 'Accepted' && (
            <Tooltip title="Convert to Invoice">
              <Button 
                size="small" 
                type="primary"
                icon={<CheckCircleOutlined />}
                onClick={() => handleConvertToInvoice(record)}
              >
                Convert
              </Button>
            </Tooltip>
          )}
          <Tooltip title="Delete">
            <Button 
              size="small" 
              danger 
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteEstimate(record)}
              disabled={record.status === 'Accepted'}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const totalEstimateValue = estimateData.reduce((sum, estimate) => sum + estimate.amount, 0);
  const acceptedValue = estimateData.reduce((sum, estimate) => 
    estimate.status === 'Accepted' ? sum + estimate.amount : sum, 0
  );
  const pendingValue = estimateData.reduce((sum, estimate) => 
    estimate.status === 'Sent' ? sum + estimate.amount : sum, 0
  );
  const winRate = (estimateData.filter(e => e.status === 'Accepted').length / 
    estimateData.filter(e => e.status !== 'Draft').length * 100) || 0;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>Estimates Management</Title>
        <Text type="secondary">
          Create, track, and manage project estimates and quotations
        </Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Estimate Value"
              value={totalEstimateValue}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-primary)' }}
            />
            <Text type="secondary">All estimates</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Accepted Value"
              value={acceptedValue}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-success)' }}
            />
            <Text type="secondary">Won estimates</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Value"
              value={pendingValue}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--orako-warning)' }}
            />
            <Text type="secondary">Awaiting response</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Win Rate"
              value={winRate}
              suffix="%"
              precision={1}
              valueStyle={{ color: 'var(--orako-secondary)' }}
            />
            <Text type="secondary">Success rate</Text>
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card 
            title="Estimates" 
            extra={
              <Space>
                <Button icon={<FileTextOutlined />}>
                  Templates
                </Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateEstimate}>
                  Create Estimate
                </Button>
              </Space>
            }
          >
            {/* Filters */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col span={8}>
                <Search placeholder="Search estimates..." enterButton />
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
              <Col span={6}>
                <Select placeholder="Status" style={{ width: '100%' }}>
                  <Option value="all">All Status</Option>
                  <Option value="draft">Draft</Option>
                  <Option value="sent">Sent</Option>
                  <Option value="accepted">Accepted</Option>
                  <Option value="rejected">Rejected</Option>
                  <Option value="expired">Expired</Option>
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
              dataSource={estimateData} 
              columns={columns} 
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => 
                  `${range[0]}-${range[1]} of ${total} estimates`,
              }}
              scroll={{ x: 1400 }}
            />
          </Card>
        </Col>
      </Row>

      {/* Estimate Modal */}
      <Modal
        title={selectedEstimate ? 'Edit Estimate' : 'Create New Estimate'}
        open={estimateModalVisible}
        onCancel={() => setEstimateModalVisible(false)}
        width={800}
        footer={[
          <Button key="cancel" onClick={() => setEstimateModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="draft" onClick={() => message.success('Estimate saved as draft')}>
            Save as Draft
          </Button>,
          <Button 
            key="send" 
            type="primary" 
            onClick={() => {
              message.success('Estimate created and sent');
              setEstimateModalVisible(false);
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
              <Form.Item label="Valid Until" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Win Probability">
                <Select placeholder="Select probability">
                  <Option value={90}>90% - Very High</Option>
                  <Option value={70}>70% - High</Option>
                  <Option value={50}>50% - Medium</Option>
                  <Option value={30}>30% - Low</Option>
                  <Option value={10}>10% - Very Low</Option>
                </Select>
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
              <Form.Item label="Project Description">
                <Input.TextArea rows={4} placeholder="Describe the project scope and deliverables..." />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Terms & Conditions">
                <Input.TextArea rows={3} placeholder="Additional terms and conditions..." />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default EstimatesPage;

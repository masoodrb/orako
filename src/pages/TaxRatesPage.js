import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Table,
  Space,
  Input,
  Select,
  Modal,
  Form,
  Tag,
  Statistic,
  Switch,
  Tooltip,
  message,
  Divider,
  Badge,
  Tabs,
  Alert,
  Progress,
  InputNumber,
  DatePicker
} from 'antd';
import {
  PercentageOutlined,
  PlusOutlined,
  SearchOutlined,
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  UploadOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  CalculatorOutlined,
  BankOutlined,
  GlobalOutlined,
  CalendarOutlined,
  SettingOutlined,
  CopyOutlined,
  ReloadOutlined,
  FileExcelOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;
const { Option } = Select;

const TaxRatesPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTaxRate, setSelectedTaxRate] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('tax-rates');

  // Sample tax rates data
  const taxRatesData = [
    {
      key: '1',
      taxCode: 'VAT-STD',
      taxName: 'Value Added Tax - Standard',
      taxType: 'VAT',
      rate: 20.00,
      country: 'United Kingdom',
      region: 'England',
      description: 'Standard VAT rate for most goods and services',
      status: 'Active',
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      compoundTax: false,
      includedInPrice: true,
      applicableItems: ['Goods', 'Services'],
      createdBy: 'Tax Administrator',
      lastModified: '2024-01-15',
      usageCount: 1250
    },
    {
      key: '2',
      taxCode: 'VAT-RED',
      taxName: 'Value Added Tax - Reduced',
      taxType: 'VAT',
      rate: 5.00,
      country: 'United Kingdom',
      region: 'England',
      description: 'Reduced VAT rate for essential goods',
      status: 'Active',
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      compoundTax: false,
      includedInPrice: true,
      applicableItems: ['Food', 'Books', 'Medicines'],
      createdBy: 'Tax Administrator',
      lastModified: '2024-01-10',
      usageCount: 890
    },
    {
      key: '3',
      taxCode: 'VAT-ZERO',
      taxName: 'Value Added Tax - Zero Rate',
      taxType: 'VAT',
      rate: 0.00,
      country: 'United Kingdom',
      region: 'England',
      description: 'Zero-rated VAT for exports and exempt items',
      status: 'Active',
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      compoundTax: false,
      includedInPrice: false,
      applicableItems: ['Exports', 'Medical Equipment'],
      createdBy: 'Tax Administrator',
      lastModified: '2024-01-08',
      usageCount: 456
    },
    {
      key: '4',
      taxCode: 'GST-STD',
      taxName: 'Goods and Services Tax',
      taxType: 'GST',
      rate: 18.00,
      country: 'India',
      region: 'All States',
      description: 'Standard GST rate for most goods and services',
      status: 'Active',
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      compoundTax: true,
      includedInPrice: false,
      applicableItems: ['Electronics', 'Clothing', 'Services'],
      createdBy: 'Tax Administrator',
      lastModified: '2024-01-12',
      usageCount: 2100
    },
    {
      key: '5',
      taxCode: 'SALES-CA',
      taxName: 'California Sales Tax',
      taxType: 'Sales Tax',
      rate: 7.25,
      country: 'United States',
      region: 'California',
      description: 'Base sales tax rate for California state',
      status: 'Active',
      effectiveFrom: '2024-01-01',
      effectiveTo: null,
      compoundTax: false,
      includedInPrice: false,
      applicableItems: ['Retail Goods'],
      createdBy: 'Tax Administrator',
      lastModified: '2024-01-05',
      usageCount: 780
    },
    {
      key: '6',
      taxCode: 'CORP-TAX',
      taxName: 'Corporate Income Tax',
      taxType: 'Income Tax',
      rate: 25.00,
      country: 'United States',
      region: 'Federal',
      description: 'Federal corporate income tax rate',
      status: 'Active',
      effectiveFrom: '2024-01-01',
      effectiveTo: '2024-12-31',
      compoundTax: false,
      includedInPrice: false,
      applicableItems: ['Corporate Income'],
      createdBy: 'Tax Administrator',
      lastModified: '2024-01-01',
      usageCount: 125
    },
    {
      key: '7',
      taxCode: 'LUXURY-TAX',
      taxName: 'Luxury Goods Tax',
      taxType: 'Excise Tax',
      rate: 15.00,
      country: 'France',
      region: 'All Regions',
      description: 'Special tax on luxury goods and services',
      status: 'Inactive',
      effectiveFrom: '2023-01-01',
      effectiveTo: '2023-12-31',
      compoundTax: false,
      includedInPrice: true,
      applicableItems: ['Luxury Cars', 'Jewelry', 'Yachts'],
      createdBy: 'Tax Administrator',
      lastModified: '2023-12-31',
      usageCount: 89
    }
  ];

  // Statistics data
  const statisticsData = {
    totalTaxRates: taxRatesData.length,
    activeTaxRates: taxRatesData.filter(tax => tax.status === 'Active').length,
    inactiveTaxRates: taxRatesData.filter(tax => tax.status === 'Inactive').length,
    avgTaxRate: (taxRatesData.filter(tax => tax.status === 'Active').reduce((sum, tax) => sum + tax.rate, 0) / taxRatesData.filter(tax => tax.status === 'Active').length).toFixed(2),
    totalUsage: taxRatesData.reduce((sum, tax) => sum + tax.usageCount, 0),
    uniqueCountries: [...new Set(taxRatesData.map(tax => tax.country))].length
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'success' : 'default';
  };

  const getTaxTypeColor = (type) => {
    const colors = {
      'VAT': 'blue',
      'GST': 'green',
      'Sales Tax': 'orange',
      'Income Tax': 'purple',
      'Excise Tax': 'red'
    };
    return colors[type] || 'default';
  };

  const handleCreateTaxRate = () => {
    setSelectedTaxRate(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditTaxRate = (taxRate) => {
    setSelectedTaxRate(taxRate);
    form.setFieldsValue({
      ...taxRate,
      effectiveFrom: taxRate.effectiveFrom ? dayjs(taxRate.effectiveFrom) : null,
      effectiveTo: taxRate.effectiveTo ? dayjs(taxRate.effectiveTo) : null,
    });
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      message.success(selectedTaxRate ? 'Tax rate updated successfully!' : 'Tax rate created successfully!');
      setIsModalVisible(false);
      form.resetFields();
    }).catch(error => {
      console.log('Validation error:', error);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setSelectedTaxRate(null);
  };

  const handleDeleteTaxRate = (taxRate) => {
    Modal.confirm({
      title: 'Delete Tax Rate',
      content: `Are you sure you want to delete "${taxRate.taxName}"?`,
      onOk: () => {
        message.success('Tax rate deleted successfully!');
      }
    });
  };

  const columns = [
    {
      title: 'Tax Code',
      dataIndex: 'taxCode',
      key: 'taxCode',
      width: 120,
      render: (text, record) => (
        <div>
          <Text strong style={{ color: 'var(--orako-primary)' }}>{text}</Text>
          <br />
          <Tag color={getTaxTypeColor(record.taxType)} size="small">
            {record.taxType}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Tax Details',
      key: 'details',
      width: 250,
      render: (_, record) => (
        <div>
          <Text strong>{record.taxName}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.description}
          </Text>
          <br />
          <div style={{ marginTop: '4px' }}>
            <Text type="secondary" style={{ fontSize: '11px' }}>
              {record.country} - {record.region}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Tax Rate',
      dataIndex: 'rate',
      key: 'rate',
      width: 100,
      render: (rate, record) => (
        <div style={{ textAlign: 'center' }}>
          <Text strong style={{ 
            fontSize: '16px', 
            color: rate === 0 ? 'var(--orako-info)' : 'var(--orako-success)' 
          }}>
            {rate.toFixed(2)}%
          </Text>
          <br />
          <Tag color={record.compoundTax ? 'orange' : 'blue'} size="small">
            {record.compoundTax ? 'Compound' : 'Simple'}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      width: 120,
      render: (_, record) => (
        <div>
          <Badge 
            status={record.status === 'Active' ? 'success' : 'default'} 
            text={record.status}
          />
          <br />
          <Text type="secondary" style={{ fontSize: '11px' }}>
            Used {record.usageCount} times
          </Text>
        </div>
      ),
    },
    {
      title: 'Effective Period',
      key: 'effectivePeriod',
      width: 140,
      render: (_, record) => (
        <div>
          <Text style={{ fontSize: '12px' }}>
            From: {dayjs(record.effectiveFrom).format('MMM DD, YYYY')}
          </Text>
          <br />
          <Text style={{ fontSize: '12px' }}>
            To: {record.effectiveTo ? dayjs(record.effectiveTo).format('MMM DD, YYYY') : 'Ongoing'}
          </Text>
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => message.info('View tax rate details')}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEditTaxRate(record)}
            />
          </Tooltip>
          <Tooltip title="Copy">
            <Button 
              type="text" 
              icon={<CopyOutlined />} 
              size="small"
              onClick={() => message.success('Tax rate copied')}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small"
              danger
              onClick={() => handleDeleteTaxRate(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredData = taxRatesData.filter(taxRate => {
    const matchesSearch = taxRate.taxName.toLowerCase().includes(searchText.toLowerCase()) ||
                         taxRate.taxCode.toLowerCase().includes(searchText.toLowerCase()) ||
                         taxRate.country.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || taxRate.status === statusFilter;
    const matchesType = typeFilter === 'all' || taxRate.taxType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>
          <PercentageOutlined style={{ marginRight: '12px', color: 'var(--orako-primary)' }} />
          Tax Rates Management
        </Title>
        <Paragraph>
          Configure and manage tax rates, VAT, GST, and other taxation rules
        </Paragraph>
      </div>

      {/* Alert for tax compliance */}
      <Alert
        message="Tax Compliance Notice"
        description="Ensure all tax rates comply with local regulations. Consult with tax professionals for complex tax scenarios."
        type="info"
        showIcon
        closable
        style={{ marginBottom: '24px' }}
      />

      {/* Statistics Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Total Tax Rates"
              value={statisticsData.totalTaxRates}
              prefix={<PercentageOutlined />}
              valueStyle={{ color: 'var(--orako-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Active Rates"
              value={statisticsData.activeTaxRates}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: 'var(--orako-success)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Average Rate"
              value={statisticsData.avgTaxRate}
              suffix="%"
              prefix={<CalculatorOutlined />}
              valueStyle={{ color: 'var(--orako-warning)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="oracle-shadow-sm">
            <Statistic
              title="Countries/Regions"
              value={statisticsData.uniqueCountries}
              prefix={<GlobalOutlined />}
              valueStyle={{ color: 'var(--orako-info)' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card className="oracle-shadow-sm">
        <Tabs activeKey={activeTab} onChange={setActiveTab}>
          <Tabs.TabPane tab="Tax Rates" key="tax-rates">
            {/* Filters and Actions */}
            <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
              <Col xs={24} sm={12} md={6}>
                <Search
                  placeholder="Search tax rates..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Filter by status"
                  value={statusFilter}
                  onChange={setStatusFilter}
                >
                  <Option value="all">All Status</Option>
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Filter by type"
                  value={typeFilter}
                  onChange={setTypeFilter}
                >
                  <Option value="all">All Types</Option>
                  <Option value="VAT">VAT</Option>
                  <Option value="GST">GST</Option>
                  <Option value="Sales Tax">Sales Tax</Option>
                  <Option value="Income Tax">Income Tax</Option>
                  <Option value="Excise Tax">Excise Tax</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space style={{ float: 'right' }}>
                  <Button icon={<FilterOutlined />}>
                    More Filters
                  </Button>
                  <Button icon={<FileExcelOutlined />}>
                    Export
                  </Button>
                  <Button type="primary" icon={<PlusOutlined />} onClick={handleCreateTaxRate}>
                    Add Tax Rate
                  </Button>
                </Space>
              </Col>
            </Row>

            {/* Tax Rates Table */}
            <Table
              columns={columns}
              dataSource={filteredData}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} tax rates`,
              }}
              scroll={{ x: 1200 }}
              size="middle"
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab="Tax Calculator" key="calculator">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Tax Calculator" className="oracle-shadow-sm">
                  <Form layout="vertical">
                    <Form.Item label="Base Amount">
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="Enter amount"
                        prefix="$"
                        min={0}
                        step={0.01}
                      />
                    </Form.Item>
                    <Form.Item label="Select Tax Rate">
                      <Select style={{ width: '100%' }} placeholder="Choose tax rate">
                        {taxRatesData.filter(t => t.status === 'Active').map(tax => (
                          <Option key={tax.key} value={tax.key}>
                            {tax.taxCode} - {tax.rate}% ({tax.taxName})
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" icon={<CalculatorOutlined />} block>
                        Calculate Tax
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Calculation Result" className="oracle-shadow-sm">
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <Text type="secondary">Enter amount and select tax rate to calculate</Text>
                  </div>
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab="Reports" key="reports">
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card title="Tax Rate Usage" className="oracle-shadow-sm">
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">Tax rate usage chart would be displayed here</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card title="Regional Tax Distribution" className="oracle-shadow-sm">
                  <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text type="secondary">Regional distribution chart would be displayed here</Text>
                  </div>
                </Card>
              </Col>
              <Col xs={24}>
                <Card title="Most Used Tax Rates" className="oracle-shadow-sm">
                  <Table
                    dataSource={taxRatesData.sort((a, b) => b.usageCount - a.usageCount).slice(0, 5)}
                    columns={[
                      {
                        title: 'Tax Code',
                        dataIndex: 'taxCode',
                        key: 'taxCode',
                      },
                      {
                        title: 'Tax Name',
                        dataIndex: 'taxName',
                        key: 'taxName',
                      },
                      {
                        title: 'Rate',
                        dataIndex: 'rate',
                        key: 'rate',
                        render: (rate) => `${rate}%`,
                      },
                      {
                        title: 'Usage Count',
                        dataIndex: 'usageCount',
                        key: 'usageCount',
                        render: (count) => (
                          <div>
                            <Text strong>{count.toLocaleString()}</Text>
                            <Progress 
                              percent={Math.round((count / Math.max(...taxRatesData.map(t => t.usageCount))) * 100)} 
                              size="small" 
                              showInfo={false}
                            />
                          </div>
                        ),
                      }
                    ]}
                    pagination={false}
                    size="small"
                  />
                </Card>
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Card>

      {/* Create/Edit Tax Rate Modal */}
      <Modal
        title={selectedTaxRate ? 'Edit Tax Rate' : 'Create New Tax Rate'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        width={800}
        okText={selectedTaxRate ? 'Update Tax Rate' : 'Create Tax Rate'}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'Active',
            compoundTax: false,
            includedInPrice: false,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="taxCode"
                label="Tax Code"
                rules={[{ required: true, message: 'Please enter tax code' }]}
              >
                <Input placeholder="e.g., VAT-STD" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="taxName"
                label="Tax Name"
                rules={[{ required: true, message: 'Please enter tax name' }]}
              >
                <Input placeholder="e.g., Standard VAT Rate" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="taxType"
                label="Tax Type"
                rules={[{ required: true, message: 'Please select tax type' }]}
              >
                <Select placeholder="Select tax type">
                  <Option value="VAT">VAT</Option>
                  <Option value="GST">GST</Option>
                  <Option value="Sales Tax">Sales Tax</Option>
                  <Option value="Income Tax">Income Tax</Option>
                  <Option value="Excise Tax">Excise Tax</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item
                name="rate"
                label="Tax Rate (%)"
                rules={[{ required: true, message: 'Please enter tax rate' }]}
              >
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                  step={0.01}
                  placeholder="0.00"
                  suffix="%"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item name="status" label="Status">
                <Select>
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="country"
                label="Country"
                rules={[{ required: true, message: 'Please enter country' }]}
              >
                <Input placeholder="e.g., United States" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="region"
                label="Region/State"
                rules={[{ required: true, message: 'Please enter region' }]}
              >
                <Input placeholder="e.g., California" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="effectiveFrom" label="Effective From">
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="effectiveTo" label="Effective To">
                <DatePicker style={{ width: '100%' }} placeholder="Leave empty for ongoing" />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea 
                  rows={3} 
                  placeholder="Enter tax rate description and applicable conditions"
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="compoundTax" valuePropName="checked">
                <Space>
                  <Switch />
                  <Text>Compound Tax (tax on tax)</Text>
                  <Tooltip title="Whether this tax is calculated on top of other taxes">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="includedInPrice" valuePropName="checked">
                <Space>
                  <Switch />
                  <Text>Included in Item Price</Text>
                  <Tooltip title="Whether tax is already included in the item price">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="applicableItems" label="Applicable To">
                <Select 
                  mode="tags" 
                  style={{ width: '100%' }} 
                  placeholder="Select or type applicable items/categories"
                >
                  <Option value="Goods">Goods</Option>
                  <Option value="Services">Services</Option>
                  <Option value="Food">Food</Option>
                  <Option value="Books">Books</Option>
                  <Option value="Electronics">Electronics</Option>
                  <Option value="Clothing">Clothing</Option>
                  <Option value="Medicines">Medicines</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default TaxRatesPage;

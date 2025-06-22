import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Button,
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Table,
  Space,
  Divider,
  Steps,
  message,
  Upload,
  Switch,
  Radio,
  Tooltip,
  Tag,
  Modal,
  AutoComplete,
  Cascader,
  Alert,
  Progress,
  Drawer
} from 'antd';
import {
  FormOutlined,
  SaveOutlined,
  SendOutlined,
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  FileTextOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  CalculatorOutlined,
  PrinterOutlined,
  EyeOutlined,
  CopyOutlined,
  SettingOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined,
  PercentageOutlined,
  ShoppingCartOutlined,
  EditOutlined,
  CloseOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;

const QuotationsFormPage = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [quotationItems, setQuotationItems] = useState([
    { id: 1, description: '', quantity: 1, rate: 0, taxRate: 0, amount: 0 }
  ]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [calculationVisible, setCalculationVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formMode, setFormMode] = useState('create'); // create, edit, template

  // Sample data for dropdowns
  const clients = [
    { value: 'oracle-corp', label: 'Oracle Corporation', email: 'contact@oracle.com', phone: '+1-555-0123' },
    { value: 'microsoft', label: 'Microsoft Corporation', email: 'contact@microsoft.com', phone: '+1-555-0124' },
    { value: 'google', label: 'Google LLC', email: 'contact@google.com', phone: '+1-555-0125' },
    { value: 'amazon', label: 'Amazon Web Services', email: 'contact@aws.com', phone: '+1-555-0126' },
    { value: 'ibm', label: 'IBM Global Services', email: 'contact@ibm.com', phone: '+1-555-0127' }
  ];

  const products = [
    { value: 'erp-license', label: 'ERP Software License', rate: 500 },
    { value: 'consulting', label: 'Consulting Services', rate: 300 },
    { value: 'training', label: 'Training Services', rate: 250 },
    { value: 'support', label: 'Support & Maintenance', rate: 200 },
    { value: 'implementation', label: 'Implementation Services', rate: 350 },
    { value: 'customization', label: 'Custom Development', rate: 400 }
  ];

  const taxRates = [
    { value: 0, label: 'No Tax (0%)' },
    { value: 5, label: 'Reduced VAT (5%)' },
    { value: 10, label: 'Standard Tax (10%)' },
    { value: 18, label: 'GST (18%)' },
    { value: 20, label: 'Standard VAT (20%)' }
  ];

  const salesReps = [
    { value: 'sarah-johnson', label: 'Sarah Johnson' },
    { value: 'michael-chen', label: 'Michael Chen' },
    { value: 'lisa-anderson', label: 'Lisa Anderson' },
    { value: 'david-miller', label: 'David Miller' },
    { value: 'maria-garcia', label: 'Maria Garcia' }
  ];

  const templates = [
    { value: 'software-implementation', label: 'Software Implementation Package' },
    { value: 'consulting-services', label: 'Consulting Services Package' },
    { value: 'maintenance-support', label: 'Maintenance & Support Package' },
    { value: 'training-package', label: 'Training Package' },
    { value: 'custom-development', label: 'Custom Development Package' }
  ];

  // Calculate totals
  const calculateTotals = () => {
    const subtotal = quotationItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalTax = quotationItems.reduce((sum, item) => sum + ((item.amount || 0) * (item.taxRate || 0) / 100), 0);
    const total = subtotal + totalTax;
    return { subtotal, totalTax, total };
  };

  const updateItemAmount = (index, field, value) => {
    const newItems = [...quotationItems];
    newItems[index][field] = value;
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = (newItems[index].quantity || 0) * (newItems[index].rate || 0);
    }
    
    setQuotationItems(newItems);
  };

  const addItem = () => {
    const newItem = {
      id: quotationItems.length + 1,
      description: '',
      quantity: 1,
      rate: 0,
      taxRate: 0,
      amount: 0
    };
    setQuotationItems([...quotationItems, newItem]);
  };

  const removeItem = (index) => {
    if (quotationItems.length > 1) {
      const newItems = quotationItems.filter((_, i) => i !== index);
      setQuotationItems(newItems);
    }
  };

  const loadTemplate = (templateValue) => {
    // Sample template data
    const templateData = {
      'software-implementation': {
        title: 'ERP Software Implementation Package',
        description: 'Complete ERP software implementation with training and support',
        items: [
          { id: 1, description: 'ERP Software License (100 users)', quantity: 100, rate: 500, taxRate: 20, amount: 50000 },
          { id: 2, description: 'Implementation Services', quantity: 200, rate: 300, taxRate: 20, amount: 60000 },
          { id: 3, description: 'Training Sessions', quantity: 40, rate: 250, taxRate: 20, amount: 10000 },
          { id: 4, description: 'Support & Maintenance (1 Year)', quantity: 1, rate: 30000, taxRate: 20, amount: 30000 }
        ]
      }
    };

    const template = templateData[templateValue];
    if (template) {
      form.setFieldsValue({
        title: template.title,
        description: template.description
      });
      setQuotationItems(template.items);
      message.success('Template loaded successfully');
    }
  };

  const handleClientSelect = (value) => {
    const client = clients.find(c => c.value === value);
    if (client) {
      form.setFieldsValue({
        clientEmail: client.email,
        clientPhone: client.phone
      });
    }
  };

  const handleProductSelect = (value, index) => {
    const product = products.find(p => p.value === value);
    if (product) {
      updateItemAmount(index, 'description', product.label);
      updateItemAmount(index, 'rate', product.rate);
    }
  };

  const handleSubmit = async (action) => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();
      const quotationData = {
        ...values,
        items: quotationItems,
        totals: calculateTotals(),
        action // 'draft', 'send', 'approve'
      };
      
      console.log('Quotation data:', quotationData);
      
      const actionMessages = {
        draft: 'Quotation saved as draft',
        send: 'Quotation sent to client',
        approve: 'Quotation approved and finalized'
      };
      
      // Simulate API call
      setTimeout(() => {
        message.success(actionMessages[action]);
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      console.log('Validation error:', error);
      setIsSubmitting(false);
    }
  };

  const stepContent = [
    // Step 1: Basic Information
    <div key="basic">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Form.Item
            name="quotationNumber"
            label="Quotation Number"
            rules={[{ required: true, message: 'Please enter quotation number' }]}
          >
            <Input placeholder="QUO-2024-001" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="template" label="Load from Template">
            <Select placeholder="Select template" allowClear onChange={loadTemplate}>
              {templates.map(template => (
                <Option key={template.value} value={template.value}>{template.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="title"
            label="Quotation Title"
            rules={[{ required: true, message: 'Please enter title' }]}
          >
            <Input placeholder="Enter quotation title" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            name="client"
            label="Client"
            rules={[{ required: true, message: 'Please select client' }]}
          >
            <Select placeholder="Select client" onChange={handleClientSelect} showSearch>
              {clients.map(client => (
                <Option key={client.value} value={client.value}>{client.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="clientEmail" label="Client Email">
            <Input placeholder="client@company.com" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="clientPhone" label="Client Phone">
            <Input placeholder="+1-555-0123" />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            name="validUntil"
            label="Valid Until"
            rules={[{ required: true, message: 'Please select valid until date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item name="salesRep" label="Sales Representative">
            <Select placeholder="Select sales rep">
              {salesReps.map(rep => (
                <Option key={rep.value} value={rep.value}>{rep.label}</Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item name="priority" label="Priority" initialValue="Medium">
            <Select>
              <Option value="High">High</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Low">Low</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="description" label="Description">
            <TextArea rows={4} placeholder="Enter quotation description and details" />
          </Form.Item>
        </Col>
      </Row>
    </div>,

    // Step 2: Items & Pricing
    <div key="items">
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Title level={4}>Quotation Items</Title>
        <Space>
          <Button icon={<CalculatorOutlined />} onClick={() => setCalculationVisible(true)}>
            Quick Calculator
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={addItem}>
            Add Item
          </Button>
        </Space>
      </div>

      <Table
        dataSource={quotationItems}
        pagination={false}
        rowKey="id"
        scroll={{ x: 800 }}
        columns={[
          {
            title: 'Description',
            key: 'description',
            width: 250,
            render: (_, record, index) => (
              <div>
                <AutoComplete
                  style={{ width: '100%', marginBottom: '8px' }}
                  value={record.description}
                  onChange={(value) => updateItemAmount(index, 'description', value)}
                  options={products.map(p => ({ value: p.label }))}
                  placeholder="Enter item description"
                />
                <Select
                  style={{ width: '100%' }}
                  placeholder="Or select from products"
                  onChange={(value) => handleProductSelect(value, index)}
                  size="small"
                >
                  {products.map(product => (
                    <Option key={product.value} value={product.value}>{product.label}</Option>
                  ))}
                </Select>
              </div>
            ),
          },
          {
            title: 'Qty',
            key: 'quantity',
            width: 80,
            render: (_, record, index) => (
              <InputNumber
                min={1}
                value={record.quantity}
                onChange={(value) => updateItemAmount(index, 'quantity', value)}
                style={{ width: '100%' }}
              />
            ),
          },
          {
            title: 'Rate',
            key: 'rate',
            width: 100,
            render: (_, record, index) => (
              <InputNumber
                min={0}
                step={0.01}
                value={record.rate}
                onChange={(value) => updateItemAmount(index, 'rate', value)}
                style={{ width: '100%' }}
                prefix="$"
              />
            ),
          },
          {
            title: 'Tax %',
            key: 'taxRate',
            width: 100,
            render: (_, record, index) => (
              <Select
                style={{ width: '100%' }}
                value={record.taxRate}
                onChange={(value) => updateItemAmount(index, 'taxRate', value)}
              >
                {taxRates.map(tax => (
                  <Option key={tax.value} value={tax.value}>{tax.label}</Option>
                ))}
              </Select>
            ),
          },
          {
            title: 'Amount',
            key: 'amount',
            width: 120,
            render: (_, record) => (
              <Text strong style={{ color: 'var(--oracle-success)' }}>
                ${record.amount?.toLocaleString() || '0.00'}
              </Text>
            ),
          },
          {
            title: 'Action',
            key: 'action',
            width: 60,
            render: (_, record, index) => (
              <Button
                type="text"
                icon={<DeleteOutlined />}
                size="small"
                danger
                onClick={() => removeItem(index)}
                disabled={quotationItems.length === 1}
              />
            ),
          },
        ]}
        summary={() => {
          const { subtotal, totalTax, total } = calculateTotals();
          return (
            <Table.Summary>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}><strong>Subtotal</strong></Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text strong>${subtotal.toLocaleString()}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}><strong>Total Tax</strong></Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text strong>${totalTax.toLocaleString()}</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
              </Table.Summary.Row>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0} colSpan={4}>
                  <Text strong style={{ fontSize: '16px' }}>Total Amount</Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Text strong style={{ fontSize: '16px', color: 'var(--oracle-success)' }}>
                    ${total.toLocaleString()}
                  </Text>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>
          );
        }}
      />
    </div>,

    // Step 3: Terms & Conditions
    <div key="terms">
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Form.Item name="paymentTerms" label="Payment Terms" initialValue="50% upfront, 50% on completion">
            <Select>
              <Option value="100% upfront">100% Upfront</Option>
              <Option value="50% upfront, 50% on completion">50% Upfront, 50% on Completion</Option>
              <Option value="30% upfront, 70% on completion">30% Upfront, 70% on Completion</Option>
              <Option value="25% quarterly">25% Quarterly Payments</Option>
              <Option value="Net 30">Net 30 Days</Option>
              <Option value="Net 60">Net 60 Days</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="deliveryTimeline" label="Delivery Timeline">
            <Input placeholder="e.g., 6 months from contract signing" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="warranty" label="Warranty Period">
            <Select placeholder="Select warranty period">
              <Option value="No warranty">No Warranty</Option>
              <Option value="3 months">3 Months</Option>
              <Option value="6 months">6 Months</Option>
              <Option value="1 year">1 Year</Option>
              <Option value="2 years">2 Years</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="currency" label="Currency" initialValue="USD">
            <Select>
              <Option value="USD">USD - US Dollar</Option>
              <Option value="EUR">EUR - Euro</Option>
              <Option value="GBP">GBP - British Pound</Option>
              <Option value="CAD">CAD - Canadian Dollar</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="terms" label="Terms & Conditions">
            <TextArea
              rows={6}
              placeholder="Enter terms and conditions, disclaimers, and legal clauses"
              defaultValue="1. This quotation is valid for 30 days from the date of issue.
2. Prices are subject to change without notice.
3. Payment terms as specified above.
4. Delivery timeline may vary based on project complexity.
5. All services are subject to our standard terms and conditions."
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="notes" label="Internal Notes">
            <TextArea
              rows={3}
              placeholder="Internal notes (not visible to client)"
            />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="attachments" label="Attachments">
            <Upload.Dragger
              name="files"
              multiple
              action="/upload"
              onChange={(info) => {
                const { status } = info.file;
                if (status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to upload</p>
              <p className="ant-upload-hint">
                Support for single or bulk upload. Attach relevant documents, specifications, or references.
              </p>
            </Upload.Dragger>
          </Form.Item>
        </Col>
      </Row>
    </div>
  ];

  const steps = [
    {
      title: 'Basic Information',
      icon: <FormOutlined />,
      description: 'Client details and quotation info'
    },
    {
      title: 'Items & Pricing',
      icon: <ShoppingCartOutlined />,
      description: 'Add items and calculate pricing'
    },
    {
      title: 'Terms & Finalize',
      icon: <FileTextOutlined />,
      description: 'Terms, conditions, and submission'
    }
  ];

  const { subtotal, totalTax, total } = calculateTotals();

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>
          <FormOutlined style={{ marginRight: '12px', color: 'var(--oracle-primary)' }} />
          Create Quotation
        </Title>
        <Paragraph>
          Create detailed quotations with items, pricing, and terms
        </Paragraph>
      </div>

      {/* Progress Summary */}
      <Card className="oracle-shadow-sm" style={{ marginBottom: '24px' }}>
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} lg={16}>
            <Steps current={currentStep} size="small">
              {steps.map((step, index) => (
                <Step
                  key={index}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                />
              ))}
            </Steps>
          </Col>
          <Col xs={24} lg={8}>
            <div style={{ textAlign: 'right' }}>
              <Text type="secondary">Current Total</Text>
              <br />
              <Text strong style={{ fontSize: '24px', color: 'var(--oracle-success)' }}>
                ${total.toLocaleString()}
              </Text>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Main Form */}
      <Card className="oracle-shadow-sm">
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            priority: 'Medium',
            currency: 'USD',
            paymentTerms: '50% upfront, 50% on completion'
          }}
        >
          {stepContent[currentStep]}

          <Divider />

          {/* Navigation Buttons */}
          <Row justify="space-between">
            <Col>
              {currentStep > 0 && (
                <Button onClick={() => setCurrentStep(currentStep - 1)}>
                  Previous
                </Button>
              )}
            </Col>
            <Col>
              <Space>
                {currentStep === steps.length - 1 ? (
                  <>
                    <Button icon={<EyeOutlined />} onClick={() => setPreviewVisible(true)}>
                      Preview
                    </Button>
                    <Button 
                      icon={<SaveOutlined />} 
                      onClick={() => handleSubmit('draft')}
                      loading={isSubmitting}
                    >
                      Save Draft
                    </Button>
                    <Button 
                      type="primary" 
                      icon={<SendOutlined />} 
                      onClick={() => handleSubmit('send')}
                      loading={isSubmitting}
                    >
                      Send to Client
                    </Button>
                  </>
                ) : (
                  <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                    Next
                  </Button>
                )}
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Quick Calculator Drawer */}
      <Drawer
        title="Quick Calculator"
        placement="right"
        width={400}
        open={calculationVisible}
        onClose={() => setCalculationVisible(false)}
      >
        <div>
          <Title level={4}>Price Calculator</Title>
          <Form layout="vertical">
            <Form.Item label="Base Price">
              <InputNumber style={{ width: '100%' }} prefix="$" placeholder="0.00" />
            </Form.Item>
            <Form.Item label="Quantity">
              <InputNumber style={{ width: '100%' }} min={1} placeholder="1" />
            </Form.Item>
            <Form.Item label="Discount %">
              <InputNumber style={{ width: '100%' }} min={0} max={100} placeholder="0" />
            </Form.Item>
            <Form.Item label="Tax Rate %">
              <Select style={{ width: '100%' }} placeholder="Select tax rate">
                {taxRates.map(tax => (
                  <Option key={tax.value} value={tax.value}>{tax.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Divider />
            <div style={{ textAlign: 'center' }}>
              <Text type="secondary">Calculated Total</Text>
              <br />
              <Text strong style={{ fontSize: '20px', color: 'var(--oracle-success)' }}>
                $0.00
              </Text>
            </div>
            <Button type="primary" block style={{ marginTop: '16px' }}>
              Add to Quotation
            </Button>
          </Form>
        </div>
      </Drawer>

      {/* Preview Modal */}
      <Modal
        title="Quotation Preview"
        open={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setPreviewVisible(false)}>
            Close
          </Button>,
          <Button key="print" icon={<PrinterOutlined />}>
            Print
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            Download PDF
          </Button>
        ]}
      >
        <div style={{ padding: '20px', background: 'white' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <Title level={2}>QUOTATION</Title>
            <Text type="secondary">Quotation Number: {form.getFieldValue('quotationNumber') || 'QUO-2024-XXX'}</Text>
          </div>
          
          <Row gutter={[24, 24]}>
            <Col xs={24} md={12}>
              <Title level={4}>From:</Title>
              <Text>Your Company Name</Text><br />
              <Text>123 Business Street</Text><br />
              <Text>City, State 12345</Text><br />
              <Text>contact@company.com</Text>
            </Col>
            <Col xs={24} md={12}>
              <Title level={4}>To:</Title>
              <Text>{form.getFieldValue('client') || 'Client Name'}</Text><br />
              <Text>{form.getFieldValue('clientEmail') || 'client@email.com'}</Text><br />
              <Text>{form.getFieldValue('clientPhone') || 'Phone Number'}</Text>
            </Col>
          </Row>

          <Divider />

          <Title level={4}>Items:</Title>
          <Table
            dataSource={quotationItems}
            pagination={false}
            size="small"
            columns={[
              { title: 'Description', dataIndex: 'description', key: 'description' },
              { title: 'Qty', dataIndex: 'quantity', key: 'quantity', width: 60 },
              { title: 'Rate', dataIndex: 'rate', key: 'rate', width: 80, render: (rate) => `$${rate}` },
              { title: 'Amount', dataIndex: 'amount', key: 'amount', width: 100, render: (amount) => `$${amount?.toLocaleString()}` }
            ]}
            summary={() => (
              <Table.Summary>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={3}><strong>Total</strong></Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <strong>${total.toLocaleString()}</strong>
                  </Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />

          <Divider />

          <Title level={4}>Terms & Conditions:</Title>
          <Paragraph>
            {form.getFieldValue('terms') || 'Standard terms and conditions apply.'}
          </Paragraph>
        </div>
      </Modal>
    </div>
  );
};

export default QuotationsFormPage;

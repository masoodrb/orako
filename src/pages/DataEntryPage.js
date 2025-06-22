import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Input, 
  InputNumber,
  Button, 
  Form, 
  Select, 
  DatePicker, 
  TimePicker, 
  Checkbox, 
  Radio, 
  Switch, 
  Slider, 
  Rate, 
  Upload, 
  Cascader, 
  AutoComplete,
  TreeSelect,
  Transfer,
  Mentions,
  ColorPicker,
  Space,
  Divider,
  Row,
  Col,
  message,
  Alert,
  Tooltip
} from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  InfoCircleOutlined,
  PhoneOutlined,
  MailOutlined,
  HomeOutlined,
  BankOutlined,
  DollarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Paragraph } = Typography;
const { TextArea, Password } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TreeNode } = TreeSelect;
const { Dragger } = Upload;

const DataEntryPage = () => {
  const [form] = Form.useForm();
  const [advancedForm] = Form.useForm();
  const [inputValue, setInputValue] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [targetKeys, setTargetKeys] = useState(['1', '3']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  // Enhanced mock data for components
  const selectOptions = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
  ];

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'jp', label: 'Japan' },
    { value: 'cn', label: 'China' },
  ];

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
  ];

  const skillOptions = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'react', label: 'React' },
    { value: 'angular', label: 'Angular' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'aws', label: 'AWS' },
  ];

  const cascaderOptions = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            { value: 'xihu', label: 'West Lake' },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            { value: 'zhonghuamen', label: 'Zhong Hua Men' },
          ],
        },
      ],
    },
  ];

  const transferData = Array.from({ length: 20 }, (_, i) => ({
    key: i.toString(),
    title: `Content ${i + 1}`,
    description: `Description of content ${i + 1}`,
  }));

  const handleAutoCompleteSearch = (value) => {
    setInputValue(value);
    setAutoCompleteOptions(
      !value ? [] : [
        { value },
        { value: value + value },
        { value: value + value + value },
      ]
    );
  };

  // Custom validation functions
  const validatePhone = (_, value) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!value) {
      return Promise.resolve();
    }
    if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return Promise.reject(new Error('Please enter a valid phone number'));
    }
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }
    const minLength = value.length >= 8;
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    
    if (!minLength) {
      return Promise.reject(new Error('Password must be at least 8 characters long'));
    }
    if (!hasLower || !hasUpper) {
      return Promise.reject(new Error('Password must contain both uppercase and lowercase letters'));
    }
    if (!hasNumber) {
      return Promise.reject(new Error('Password must contain at least one number'));
    }
    if (!hasSpecial) {
      return Promise.reject(new Error('Password must contain at least one special character'));
    }
    return Promise.resolve();
  };

  const validateAge = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }
    if (value < 16 || value > 100) {
      return Promise.reject(new Error('Age must be between 16 and 100'));
    }
    return Promise.resolve();
  };

  const validateSalary = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }
    if (value < 20000 || value > 1000000) {
      return Promise.reject(new Error('Salary must be between $20,000 and $1,000,000'));
    }
    return Promise.resolve();
  };

  const validateWebsite = (_, value) => {
    if (!value) {
      return Promise.resolve();
    }
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(value)) {
      return Promise.reject(new Error('Please enter a valid website URL'));
    }
    return Promise.resolve();
  };

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    beforeUpload: (file) => {
      const isValidSize = file.size / 1024 / 1024 < 5;
      if (!isValidSize) {
        message.error('File must be smaller than 5MB!');
      }
      return isValidSize;
    },
  };

  const onFinish = (values) => {
    console.log('Basic form values:', values);
    message.success('Form submitted successfully!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fix the form errors before submitting.');
  };

  const onAdvancedFormFinish = async (values) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Advanced form values:', values);
      message.success('Employee registration completed successfully!');
      advancedForm.resetFields();
    } catch (error) {
      message.error('Failed to submit form. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onAdvancedFormFinishFailed = (errorInfo) => {
    console.log('Advanced form failed:', errorInfo);
    message.error('Please correct all validation errors before submitting.');
  };

  const onReset = () => {
    form.resetFields();
    message.info('Form has been reset.');
  };

  const onAdvancedReset = () => {
    advancedForm.resetFields();
    message.info('Advanced form has been reset.');
  };

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Data Entry Components</Title>
        <Paragraph>
          Components for collecting user input and data entry including forms, inputs, 
          selectors, and upload controls.
        </Paragraph>
      </div>

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>Input</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          A basic widget for getting the user input is a text field.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Input</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <Input placeholder="Basic input" size="small" />
              <Input 
                placeholder="Input with icon" 
                prefix={<UserOutlined />} 
                size="small"
              />
              <Input 
                placeholder="Input with suffix" 
                suffix={<SearchOutlined />} 
                size="small"
              />
              <Input 
                addonBefore="Http://" 
                addonAfter=".com" 
                defaultValue="mysite" 
                size="small"
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Input Sizes</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <Input placeholder="Default input" />
              <Input size="small" placeholder="Small input" />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>TextArea</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <TextArea rows={2} placeholder="Basic textarea" />
              <TextArea 
                showCount 
                maxLength={100} 
                placeholder="TextArea with count"
                style={{ height: 60, resize: 'none' }}
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Password Input</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <Password placeholder="Input password" size="small" />
              <Password
                placeholder="Input password with icon"
                size="small"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>Form Validation & Complex Forms</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          High performance subscription-based form state management with comprehensive validation.
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Basic Form with Enhanced Validation" size="small">
              <Form
                form={form}
                name="basic"
                size="small"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="horizontal"
              >
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    { required: true, message: 'Please input your username!' },
                    { min: 3, message: 'Username must be at least 3 characters' },
                    { max: 20, message: 'Username cannot exceed 20 characters' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: 'Username can only contain letters, numbers, and underscores' }
                  ]}
                >
                  <Input prefix={<UserOutlined />} placeholder="Enter username" />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please input your email!' },
                    { type: 'email', message: 'Please enter a valid email address!' }
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Enter email address" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                    { validator: validatePassword }
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Enter password" />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPassword"
                  dependencies={['password']}
                  rules={[
                    { required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Confirm password" />
                </Form.Item>

                <Form.Item
                  label="Phone"
                  name="phone"
                  rules={[
                    { required: true, message: 'Please input your phone number!' },
                    { validator: validatePhone }
                  ]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
                </Form.Item>

                <Form.Item
                  label="Age"
                  name="age"
                  rules={[
                    { required: true, message: 'Please input your age!' },
                    { validator: validateAge }
                  ]}
                >
                  <InputNumber 
                    style={{ width: '100%' }} 
                    placeholder="Enter age" 
                    min={16} 
                    max={100}
                  />
                </Form.Item>

                <Form.Item 
                  name="remember" 
                  valuePropName="checked" 
                  wrapperCol={{ offset: 8, span: 16 }}
                >
                  <Checkbox>I agree to the terms and conditions</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Space>
                    <Button type="primary" htmlType="submit" size="small">
                      Submit
                    </Button>
                    <Button htmlType="button" onClick={onReset} size="small">
                      Reset
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={12}>
            <Card title="Advanced Employee Registration Form" size="small">
              <Alert
                message="Comprehensive Validation"
                description="This form demonstrates advanced validation patterns including conditional fields, custom validators, and real-time feedback."
                type="info"
                showIcon
                style={{ marginBottom: 16 }}
              />
              
              <Form
                form={advancedForm}
                name="advanced"
                size="small"
                layout="vertical"
                onFinish={onAdvancedFormFinish}
                onFinishFailed={onAdvancedFormFinishFailed}
                autoComplete="off"
                scrollToFirstError
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="First Name"
                      name="firstName"
                      rules={[
                        { required: true, message: 'Please input first name!' },
                        { min: 2, message: 'First name must be at least 2 characters' },
                        { pattern: /^[a-zA-Z\s]+$/, message: 'First name can only contain letters' }
                      ]}
                    >
                      <Input placeholder="First name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        { required: true, message: 'Please input last name!' },
                        { min: 2, message: 'Last name must be at least 2 characters' },
                        { pattern: /^[a-zA-Z\s]+$/, message: 'Last name can only contain letters' }
                      ]}
                    >
                      <Input placeholder="Last name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label="Email Address"
                  name="employeeEmail"
                  rules={[
                    { required: true, message: 'Please input email address!' },
                    { type: 'email', message: 'Please enter a valid email address!' }
                  ]}
                >
                  <Input 
                    prefix={<MailOutlined />} 
                    placeholder="employee@company.com"
                    addonAfter=".com"
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Department"
                      name="department"
                      rules={[{ required: true, message: 'Please select department!' }]}
                    >
                      <Select placeholder="Select department" options={departmentOptions} />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Job Title"
                      name="jobTitle"
                      rules={[
                        { required: true, message: 'Please input job title!' },
                        { min: 3, message: 'Job title must be at least 3 characters' }
                      ]}
                    >
                      <Input placeholder="e.g. Senior Developer" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Start Date"
                      name="startDate"
                      rules={[{ required: true, message: 'Please select start date!' }]}
                    >
                      <DatePicker 
                        style={{ width: '100%' }} 
                        placeholder="Select start date"
                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Employment Type"
                      name="employmentType"
                      rules={[{ required: true, message: 'Please select employment type!' }]}
                    >
                      <Radio.Group>
                        <Radio value="fulltime">Full-time</Radio>
                        <Radio value="parttime">Part-time</Radio>
                        <Radio value="contract">Contract</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  label={
                    <span>
                      Annual Salary (USD)
                      <Tooltip title="Base salary excluding bonuses and benefits">
                        <InfoCircleOutlined style={{ marginLeft: 4 }} />
                      </Tooltip>
                    </span>
                  }
                  name="salary"
                  rules={[
                    { required: true, message: 'Please input salary!' },
                    { validator: validateSalary }
                  ]}
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    placeholder="e.g. 75000"
                    prefix={<DollarOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  label="Skills & Technologies"
                  name="skills"
                  rules={[
                    { required: true, message: 'Please select at least one skill!' },
                    { type: 'array', min: 1, message: 'Please select at least one skill!' }
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select relevant skills"
                    options={skillOptions}
                    maxTagCount={3}
                    maxTagTextLength={10}
                  />
                </Form.Item>

                <Form.Item
                  label="Office Location"
                  name="location"
                  rules={[{ required: true, message: 'Please select office location!' }]}
                >
                  <Cascader 
                    options={cascaderOptions} 
                    placeholder="Select location" 
                    style={{ width: '100%' }}
                  />
                </Form.Item>

                <Form.Item
                  label="Personal Website/Portfolio"
                  name="website"
                  rules={[{ validator: validateWebsite }]}
                >
                  <Input 
                    placeholder="https://yourwebsite.com"
                    prefix={<HomeOutlined />}
                  />
                </Form.Item>

                <Form.Item
                  label="Resume/CV Upload"
                  name="resume"
                  valuePropName="fileList"
                  getValueFromEvent={(e) => {
                    if (Array.isArray(e)) {
                      return e;
                    }
                    return e && e.fileList;
                  }}
                >
                  <Upload
                    {...uploadProps}
                    listType="text"
                    maxCount={1}
                    accept=".pdf,.doc,.docx"
                  >
                    <Button icon={<UploadOutlined />} size="small">
                      Upload Resume (PDF/DOC)
                    </Button>
                  </Upload>
                </Form.Item>

                <Form.Item
                  label="Additional Notes"
                  name="notes"
                  rules={[{ max: 500, message: 'Notes cannot exceed 500 characters' }]}
                >
                  <Input.TextArea
                    rows={3}
                    placeholder="Any additional information or special requirements..."
                    showCount
                    maxLength={500}
                  />
                </Form.Item>

                <Form.Item name="terms" valuePropName="checked" rules={[
                  { validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject(new Error('Please accept the terms and conditions'))
                  }
                ]}>
                  <Checkbox>
                    I acknowledge that all information provided is accurate and complete
                  </Checkbox>
                </Form.Item>

                <Form.Item>
                  <Space>
                    <Button 
                      type="primary" 
                      htmlType="submit" 
                      loading={loading}
                      size="small"
                    >
                      Register Employee
                    </Button>
                    <Button 
                      htmlType="button" 
                      onClick={onAdvancedReset} 
                      size="small"
                    >
                      Clear Form
                    </Button>
                  </Space>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>Validation Patterns & Examples</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          Common validation patterns and real-time feedback examples.
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card title="Input Validation Examples" size="small">
              <Form layout="vertical" size="small">
                <Form.Item
                  label="Email Validation"
                  name="emailDemo"
                  rules={[
                    { required: true, message: 'Email is required!' },
                    { type: 'email', message: 'Invalid email format!' }
                  ]}
                  validateTrigger="onBlur"
                >
                  <Input placeholder="test@example.com" />
                </Form.Item>

                <Form.Item
                  label="Phone Number"
                  name="phoneDemo"
                  rules={[{ validator: validatePhone }]}
                  validateTrigger="onBlur"
                >
                  <Input placeholder="+1 (555) 123-4567" />
                </Form.Item>

                <Form.Item
                  label="Website URL"
                  name="websiteDemo"
                  rules={[{ validator: validateWebsite }]}
                  validateTrigger="onBlur"
                >
                  <Input placeholder="https://example.com" />
                </Form.Item>

                <Form.Item
                  label="Age (16-100)"
                  name="ageDemo"
                  rules={[{ validator: validateAge }]}
                  validateTrigger="onBlur"
                >
                  <InputNumber 
                    style={{ width: '100%' }} 
                    placeholder="25" 
                  />
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Password Strength Validation" size="small">
              <Form layout="vertical" size="small">
                <Form.Item
                  label="Strong Password"
                  name="passwordDemo"
                  rules={[{ validator: validatePassword }]}
                  validateTrigger="onChange"
                  help="Must include: 8+ chars, uppercase, lowercase, number, special character"
                >
                  <Input.Password placeholder="Enter a strong password" />
                </Form.Item>

                <Form.Item
                  label="Confirm Password"
                  name="confirmPasswordDemo"
                  dependencies={['passwordDemo']}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('passwordDemo') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Passwords must match!'));
                      },
                    }),
                  ]}
                  validateTrigger="onChange"
                >
                  <Input.Password placeholder="Confirm password" />
                </Form.Item>

                <Form.Item
                  label="Salary Range"
                  name="salaryDemo"
                  rules={[{ validator: validateSalary }]}
                  validateTrigger="onBlur"
                  help="$20,000 - $1,000,000"
                >
                  <InputNumber
                    style={{ width: '100%' }}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    placeholder="75000"
                  />
                </Form.Item>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Conditional & Dynamic Validation" size="small">
              <Form layout="vertical" size="small">
                <Form.Item
                  label="Country"
                  name="countryDemo"
                  rules={[{ required: true, message: 'Please select country!' }]}
                >
                  <Select placeholder="Select country" options={countryOptions} />
                </Form.Item>

                <Form.Item
                  label="Required if US selected"
                  name="ssnDemo"
                  dependencies={['countryDemo']}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const country = getFieldValue('countryDemo');
                        if (country === 'us' && !value) {
                          return Promise.reject(new Error('SSN is required for US residents'));
                        }
                        if (value && !/^\d{3}-\d{2}-\d{4}$/.test(value)) {
                          return Promise.reject(new Error('SSN format: XXX-XX-XXXX'));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input placeholder="123-45-6789" disabled={false} />
                </Form.Item>

                <Form.Item
                  label="Skills (min 2)"
                  name="skillsDemo"
                  rules={[
                    { required: true, message: 'Please select skills!' },
                    { type: 'array', min: 2, message: 'Select at least 2 skills!' }
                  ]}
                >
                  <Select
                    mode="multiple"
                    placeholder="Select skills"
                    options={skillOptions.slice(0, 5)}
                  />
                </Form.Item>

                <Form.Item
                  label="Agreement"
                  name="agreementDemo"
                  valuePropName="checked"
                  rules={[
                    { 
                      validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Must agree to continue'))
                    }
                  ]}
                >
                  <Checkbox>I accept the terms and conditions</Checkbox>
                </Form.Item>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Select & Cascader</Title>
        <Paragraph>
          Select component to select value from options and Cascader for hierarchical data.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Select</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Select
                defaultValue="engineering"
                style={{ width: '100%' }}
                options={departmentOptions}
                placeholder="Select department"
              />
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select multiple skills"
                options={skillOptions}
              />
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                options={countryOptions}
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>AutoComplete</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <AutoComplete
                value={inputValue}
                options={autoCompleteOptions}
                style={{ width: '100%' }}
                onSearch={handleAutoCompleteSearch}
                placeholder="Try to type 'b'"
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Cascader</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Cascader 
                options={cascaderOptions} 
                placeholder="Please select" 
                style={{ width: '100%' }}
              />
              <Cascader
                options={cascaderOptions}
                multiple
                placeholder="Multiple selection"
                style={{ width: '100%' }}
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>TreeSelect</Title>
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value="leaf1"
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
            >
              <TreeNode value="parent 1" title="parent 1">
                <TreeNode value="parent 1-0" title="parent 1-0">
                  <TreeNode value="leaf1" title="leaf1" />
                  <TreeNode value="leaf2" title="leaf2" />
                </TreeNode>
                <TreeNode value="parent 1-1" title="parent 1-1">
                  <TreeNode value="leaf3" title="leaf3" />
                </TreeNode>
              </TreeNode>
            </TreeSelect>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>Date & Time</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          Components for selecting dates, times, and date ranges.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>DatePicker</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <DatePicker style={{ width: '100%' }} size="small" />
              <DatePicker 
                style={{ width: '100%' }} 
                defaultValue={dayjs('2015-01-01', 'YYYY-MM-DD')} 
                size="small"
              />
              <RangePicker style={{ width: '100%' }} size="small" />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>TimePicker</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <TimePicker style={{ width: '100%' }} size="small" />
              <TimePicker.RangePicker style={{ width: '100%' }} size="small" />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Date Formats</Title>
            <Space direction="vertical" style={{ width: '100%' }} size="small">
              <DatePicker 
                format="YYYY-MM-DD HH:mm:ss" 
                showTime 
                style={{ width: '100%' }}
                size="small"
              />
              <DatePicker picker="week" style={{ width: '100%' }} size="small" />
              <DatePicker picker="month" style={{ width: '100%' }} size="small" />
              <DatePicker picker="year" style={{ width: '100%' }} size="small" />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>ColorPicker</Title>
            <Space size="small">
              <ColorPicker defaultValue="#1677ff" size="small" />
              <ColorPicker defaultValue="#52c41a" size="small" />
              <ColorPicker defaultValue="#1677ff" disabled size="small" />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Input Controls</Title>
        <Paragraph>
          Various input controls including checkboxes, radio buttons, switches, and sliders.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Checkbox</Title>
            <Space direction="vertical">
              <Checkbox>Checkbox</Checkbox>
              <Checkbox disabled>Disabled Checkbox</Checkbox>
              <Checkbox defaultChecked disabled>
                Disabled Checked
              </Checkbox>
              <Checkbox.Group 
                options={['Apple', 'Pear', 'Orange']} 
                defaultValue={['Apple']}
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Radio</Title>
            <Space direction="vertical">
              <Radio.Group defaultValue="a">
                <Radio value="a">A</Radio>
                <Radio value="b">B</Radio>
                <Radio value="c">C</Radio>
                <Radio value="d">D</Radio>
              </Radio.Group>
              <Radio.Group defaultValue="apple">
                <Radio.Button value="apple">Apple</Radio.Button>
                <Radio.Button value="orange">Orange</Radio.Button>
                <Radio.Button value="banana">Banana</Radio.Button>
              </Radio.Group>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Switch</Title>
            <Space direction="vertical">
              <Switch defaultChecked />
              <Switch size="small" defaultChecked />
              <Switch disabled defaultChecked />
              <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Slider</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Slider defaultValue={30} />
              <Slider range defaultValue={[20, 50]} />
              <Slider 
                marks={{
                  0: '0°C',
                  26: '26°C',
                  37: '37°C',
                  100: {
                    style: { color: '#f50' },
                    label: <strong>100°C</strong>,
                  },
                }}
                defaultValue={37}
              />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Other Controls</Title>
        <Paragraph>
          Additional input controls including rate, upload, transfer, and more.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Rate</Title>
            <Space direction="vertical">
              <Rate />
              <Rate allowHalf defaultValue={2.5} />
              <Rate disabled defaultValue={2} />
              <Rate character="🤍" allowHalf defaultValue={2.5} style={{ fontSize: 36 }} />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>InputNumber</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <InputNumber min={1} max={10} defaultValue={3} style={{ width: '100%' }} />
              <InputNumber 
                min={0} 
                max={100} 
                step={0.1} 
                defaultValue={1} 
                style={{ width: '100%' }}
              />
              <InputNumber 
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                defaultValue={1000}
                style={{ width: '100%' }}
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Upload</Title>
            <Space direction="vertical">
              <Upload {...uploadProps}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
              <Dragger {...uploadProps}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data.
                </p>
              </Dragger>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>ColorPicker</Title>
            <Space>
              <ColorPicker defaultValue="#1677ff" />
              <ColorPicker defaultValue="#1677ff" size="small" />
              <ColorPicker defaultValue="#1677ff" disabled />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Advanced Controls</Title>
        <Paragraph>
          Advanced input controls for complex data entry scenarios.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Transfer</Title>
            <Transfer
              dataSource={transferData}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onChange={(nextTargetKeys) => setTargetKeys(nextTargetKeys)}
              onSelectChange={(sourceSelectedKeys, targetSelectedKeys) => {
                setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
              }}
              render={(item) => item.title}
              style={{ marginBottom: 16 }}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Mentions</Title>
            <Mentions
              style={{ width: '100%' }}
              placeholder="You can use @ to mention others"
              prefix="@"
              options={[
                { value: 'afc163', label: 'afc163' },
                { value: 'zombieJ', label: 'zombieJ' },
                { value: 'yesmeck', label: 'yesmeck' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEntryPage;

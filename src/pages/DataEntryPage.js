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
  Divider
} from 'antd';
import {
  UploadOutlined,
  InboxOutlined,
  SearchOutlined,
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
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
  const [inputValue, setInputValue] = useState('');
  const [autoCompleteOptions, setAutoCompleteOptions] = useState([]);
  const [targetKeys, setTargetKeys] = useState(['1', '3']);
  const [selectedKeys, setSelectedKeys] = useState([]);

  // Mock data for components
  const selectOptions = [
    { value: 'jack', label: 'Jack' },
    { value: 'lucy', label: 'Lucy' },
    { value: 'tom', label: 'Tom' },
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

  const uploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status === 'done') {
        console.log(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.log(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
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
        <Title level={3} style={{ fontSize: '16px' }}>Form</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          High performance subscription-based form state management for React.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Form</Title>
            <Form
              form={form}
              name="basic"
              size="small"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 6, span: 18 }}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                <Button type="primary" htmlType="submit" size="small">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>

          <div className="demo-item">
            <Title level={4}>Vertical Form</Title>
            <Form layout="vertical" size="small">
              <Form.Item label="Name">
                <Input placeholder="Input your name" />
              </Form.Item>
              <Form.Item label="Email">
                <Input placeholder="Input your email" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="small">Submit</Button>
              </Form.Item>
            </Form>
          </div>

          <div className="demo-item">
            <Title level={4}>Inline Form</Title>
            <Form layout="inline" size="small">
              <Form.Item>
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item>
                <Input placeholder="Password" type="password" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" size="small">Log in</Button>
              </Form.Item>
            </Form>
          </div>

          <div className="demo-item">
            <Title level={4}>Form Validation</Title>
            <Form size="small">
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'Please enter a valid email!' }
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Age"
                name="age"
                rules={[{ type: 'number', min: 0, max: 99 }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Form>
          </div>
        </div>
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
                defaultValue="lucy"
                style={{ width: '100%' }}
                options={selectOptions}
              />
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                options={selectOptions}
              />
              <Select
                mode="tags"
                style={{ width: '100%' }}
                placeholder="Tags Mode"
                options={selectOptions}
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

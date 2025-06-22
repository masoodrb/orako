import React, { useState, useRef } from 'react';
import { Card, Typography, Button, Space, FloatButton, Divider, QRCode, Tour, Segmented } from 'antd';
import {
  SearchOutlined,
  DownloadOutlined,
  PoweroffOutlined,
  LeftOutlined,
  RightOutlined,
  ReloadOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  CommentOutlined,
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

const GeneralPage = () => {
  const [segmentedValue, setSegmentedValue] = useState('List');
  const [tourOpen, setTourOpen] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const tourSteps = [
    {
      title: 'Welcome to Ant Design Demo',
      description: 'This is a comprehensive showcase of Ant Design components.',
      target: () => ref1.current,
    },
    {
      title: 'Buttons',
      description: 'Various types of buttons with different styles and states.',
      target: () => ref2.current,
    },
    {
      title: 'QR Code',
      description: 'Generate QR codes for sharing information.',
      target: () => ref3.current,
    },
  ];

  const handleButtonClick = (type) => {
    console.log(`${type} button clicked!`);
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <div>
        <div className="page-header" ref={ref1}>
          <Title level={1}>General Components</Title>
          <Paragraph>
            Basic components that are commonly used across applications including buttons, 
            typography, icons, floating action buttons, QR codes, tours, watermarks, and segmented controls.
          </Paragraph>
          <Space>
            <Button type="primary" size="small" onClick={() => setTourOpen(true)}>
              Start Tour
            </Button>
            <Tour
              open={tourOpen}
              onClose={() => setTourOpen(false)}
              steps={tourSteps}
            />
          </Space>
        </div>

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>Button</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          To trigger an operation with different types, sizes, and states.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Button Types</Title>
            <Space wrap size="small">
              <Button type="primary" size="small">Primary</Button>
              <Button size="small">Default</Button>
              <Button type="dashed" size="small">Dashed</Button>
              <Button type="text" size="small">Text</Button>
              <Button type="link" size="small">Link</Button>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Button Sizes</Title>
            <Space wrap size="small">
              <Button type="primary">Default</Button>
              <Button type="primary" size="small">Small</Button>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Button States</Title>
            <Space wrap size="small">
              <Button type="primary" loading size="small">Loading</Button>
              <Button type="primary" disabled size="small">Disabled</Button>
              <Button type="primary" danger size="small">Danger</Button>
              <Button type="primary" ghost size="small">Ghost</Button>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Icon Buttons</Title>
            <Space wrap size="small">
              <Button type="primary" icon={<SearchOutlined />} size="small">Search</Button>
              <Button type="primary" icon={<DownloadOutlined />} size="small" />
              <Button type="primary" icon={<PoweroffOutlined />} loading size="small" />
              <Button icon={<LeftOutlined />} size="small">Back</Button>
              <Button type="primary" icon={<RightOutlined />} size="small">Forward</Button>
              <Button icon={<ReloadOutlined />} size="small">Reload</Button>
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>Typography</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          Basic text writing, including headings, body text, lists and more.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Headings</Title>
            <Title level={4} style={{ fontSize: '16px', margin: '2px 0' }}>h4. Ant Design</Title>
            <Title level={5} style={{ fontSize: '14px', margin: '2px 0' }}>h5. Ant Design</Title>
            <Text style={{ fontSize: '12px' }}>Regular text</Text>
          </div>

          <div className="demo-item">
            <Title level={4}>Text Variants</Title>
            <Space direction="vertical" size="small">
              <Text style={{ fontSize: '12px' }}>Ant Design (default)</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>Ant Design (secondary)</Text>
              <Text type="success" style={{ fontSize: '12px' }}>Ant Design (success)</Text>
              <Text type="warning" style={{ fontSize: '12px' }}>Ant Design (warning)</Text>
              <Text type="danger" style={{ fontSize: '12px' }}>Ant Design (danger)</Text>
              <Text disabled style={{ fontSize: '12px' }}>Ant Design (disabled)</Text>
              <Text mark style={{ fontSize: '12px' }}>Ant Design (mark)</Text>
              <Text code style={{ fontSize: '11px' }}>Ant Design (code)</Text>
              <Text strong style={{ fontSize: '12px' }}>Ant Design (strong)</Text>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Interactive Text</Title>
            <Space direction="vertical" size="small">
              <Text copyable style={{ fontSize: '12px' }}>Copyable text</Text>
              <Text editable={{ onChange: (str) => console.log('Content change:', str) }} style={{ fontSize: '12px' }}>
                Editable text
              </Text>
              <Text 
                ellipsis={{ tooltip: 'I am ellipsis now!' }}
                style={{ width: 150, fontSize: '12px' }}
              >
                This text will be truncated with ellipsis
              </Text>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Paragraphs</Title>
            <Paragraph style={{ fontSize: '11px', margin: '4px 0' }}>
              Ant Design interprets the color system into two levels.
            </Paragraph>
            <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }} style={{ fontSize: '11px' }}>
              Ant Design, a design language for background applications, is refined by Ant UED Team. 
              This is a long content that will show ellipsis after 2 rows.
            </Paragraph>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>Icons</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          Ant Design provides a set of common icons for web applications.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Direction Icons</Title>
            <Space wrap size="small">
              <LeftOutlined style={{ fontSize: '16px' }} />
              <RightOutlined style={{ fontSize: '16px' }} />
              <ReloadOutlined style={{ fontSize: '16px' }} />
              <DownloadOutlined style={{ fontSize: '16px' }} />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Action Icons</Title>
            <Space wrap size="small">
              <QuestionCircleOutlined style={{ fontSize: '16px' }} />
              <SearchOutlined style={{ fontSize: '16px' }} />
              <SettingOutlined style={{ fontSize: '16px' }} />
              <EditOutlined style={{ fontSize: '16px' }} />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Colored Icons</Title>
            <Space wrap size="small">
              <QuestionCircleOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
              <SearchOutlined style={{ fontSize: '16px', color: '#52c41a' }} />
              <SettingOutlined style={{ fontSize: '16px', color: '#faad14' }} />
              <EditOutlined style={{ fontSize: '16px', color: '#f5222d' }} />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Icon Sizes</Title>
            <Space wrap size="small" align="center">
              <SearchOutlined style={{ fontSize: '12px' }} />
              <SearchOutlined style={{ fontSize: '16px' }} />
              <SearchOutlined style={{ fontSize: '20px' }} />
              <SearchOutlined style={{ fontSize: '24px' }} />
            </Space>
          </div>
        </div>
      </div>

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>FloatButton</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          FloatButton is used for global functionality that can be triggered from anywhere.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Float Button</Title>
            <Space size="small">
              <FloatButton 
                icon={<QuestionCircleOutlined />}
                type="primary"
                size="small"
                style={{ position: 'relative', right: 'auto' }}
                onClick={() => handleButtonClick('Help')}
              />
              <FloatButton 
                icon={<CustomerServiceOutlined />}
                size="small"
                style={{ position: 'relative', right: 'auto' }}
                onClick={() => handleButtonClick('Support')}
              />
            </Space>
            <Paragraph type="secondary" style={{ marginTop: '8px', fontSize: '10px' }}>
              Float buttons (simulation shown above)
            </Paragraph>
          </div>

          <div className="demo-item">
            <Title level={4}>Float Button Shapes</Title>
            <Space direction="vertical" size="small">
              <FloatButton 
                shape="circle"
                type="primary"
                icon={<QuestionCircleOutlined />}
                size="small"
                style={{ position: 'relative', right: 'auto' }}
              />
              <FloatButton 
                shape="square"
                type="primary"
                icon={<CustomerServiceOutlined />}
                size="small"
                style={{ position: 'relative', right: 'auto' }}
              />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>Segmented</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          Segmented Controls. This component is available since antd@4.20.0.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Segmented</Title>
            <Space direction="vertical">
              <Segmented
                value={segmentedValue}
                onChange={setSegmentedValue}
                options={['List', 'Kanban', 'Calendar']}
                size="small"
              />
              <Segmented
                options={[
                  { label: 'List', value: 'List' },
                  { label: 'Kanban', value: 'Kanban' },
                  { label: 'Calendar', value: 'Calendar' },
                ]}
                size="small"
                disabled
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>With Icons</Title>
            <Segmented
              options={[
                {
                  value: 'List',
                  icon: <SearchOutlined />,
                },
                {
                  value: 'Kanban',
                  icon: <EditOutlined />,
                },
                {
                  value: 'Calendar',
                  icon: <SettingOutlined />,
                },
              ]}
              size="small"
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={3} style={{ fontSize: '16px' }}>QRCode</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0 12px 0' }}>
          QR code generation component. This component is available since antd@5.1.0.
        </Paragraph>

        <div className="demo-grid"></div>
          <div className="demo-item" ref={ref3}>
            <Title level={4}>Basic QRCode</Title>
            <Space direction="vertical" align="center">
              <QRCode value="https://ant.design/" size={80} />
              <Text style={{ fontSize: '11px' }}>Ant Design</Text>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Custom QRCode</Title>
            <Space direction="vertical" align="center">
              <QRCode
                value="https://ant.design/"
                size={80}
                color="#1890ff"
                bgColor="#f0f2f5"
                bordered={false}
              />
              <Text style={{ fontSize: '11px' }}>Custom Colors</Text>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>QRCode with Logo</Title>
            <Space direction="vertical" align="center">
              <QRCode
                value="https://ant.design/"
                size={80}
                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              />
              <Text style={{ fontSize: '11px' }}>With Logo</Text>
            </Space>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralPage;

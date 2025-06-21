import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Menu, 
  Breadcrumb, 
  Pagination, 
  Steps, 
  Dropdown, 
  Affix, 
  Anchor,
  BackTop,
  Space,
  Button,
  Divider
} from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  DownOutlined,
  HomeOutlined,
  PlusOutlined,
  SmileOutlined,
  SolutionOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const NavigationPage = () => {
  const [current, setCurrent] = useState('mail');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentStep, setCurrentStep] = useState(0);

  const handleMenuClick = (e) => {
    setCurrent(e.key);
  };

  const items = [
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <MailOutlined />,
    },
    {
      label: 'Navigation Two',
      key: 'app',
      icon: <AppstoreOutlined />,
      disabled: true,
    },
    {
      label: 'Navigation Three - Submenu',
      key: 'SubMenu',
      icon: <SettingOutlined />,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      label: (
        <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
          Navigation Four - Link
        </a>
      ),
      key: 'alipay',
    },
  ];

  const dropdownItems = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          3rd menu item
        </a>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Navigation Components</Title>
        <Paragraph>
          Components for navigating through pages and content including menus, breadcrumbs, 
          pagination, and more.
        </Paragraph>
      </div>

      <div className="demo-section">
        <Title level={2}>Menu</Title>
        <Paragraph>
          A versatile menu for navigation with support for submenus and different modes.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Horizontal Menu</Title>
            <Menu 
              onClick={handleMenuClick} 
              selectedKeys={[current]} 
              mode="horizontal" 
              items={items} 
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Vertical Menu</Title>
            <Menu
              style={{ width: 256 }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={[
                {
                  key: '1',
                  icon: <MailOutlined />,
                  label: 'Navigation One',
                },
                {
                  key: '2',
                  icon: <AppstoreOutlined />,
                  label: 'Navigation Two',
                },
                {
                  key: 'sub1',
                  label: 'Navigation Three',
                  icon: <SettingOutlined />,
                  children: [
                    { key: '3', label: 'Option 3' },
                    { key: '4', label: 'Option 4' },
                    { key: '5', label: 'Option 5' },
                    { key: '6', label: 'Option 6' },
                  ],
                },
              ]}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Collapsed Menu</Title>
            <Menu
              style={{ width: 80 }}
              defaultSelectedKeys={['1']}
              mode="inline"
              inlineCollapsed={true}
              items={[
                { key: '1', icon: <MailOutlined />, label: 'Navigation One' },
                { key: '2', icon: <AppstoreOutlined />, label: 'Navigation Two' },
                { key: '3', icon: <SettingOutlined />, label: 'Navigation Three' },
              ]}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Breadcrumb</Title>
        <Paragraph>
          Display the current page's location within a navigational hierarchy.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Breadcrumb</Title>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">Application Center</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="">Application List</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="demo-item">
            <Title level={4}>With Icons</Title>
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <UserOutlined />
                <span>Application List</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Application</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="demo-item">
            <Title level={4}>With Separator</Title>
            <Breadcrumb separator=">">
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
              <Breadcrumb.Item href="">Application List</Breadcrumb.Item>
              <Breadcrumb.Item>An Application</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="demo-item">
            <Title level={4}>Custom Separator</Title>
            <Breadcrumb separator={<span style={{ color: '#1890ff' }}>/</span>}>
              <Breadcrumb.Item>Location</Breadcrumb.Item>
              <Breadcrumb.Item href="">Application Center</Breadcrumb.Item>
              <Breadcrumb.Item>Application List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Pagination</Title>
        <Paragraph>
          A long list can be divided into several pages using pagination.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Pagination</Title>
            <Pagination 
              current={currentPage}
              total={50} 
              onChange={(page) => setCurrentPage(page)}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>More Pages</Title>
            <Pagination 
              defaultCurrent={6} 
              total={500} 
              showSizeChanger={false}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Changer</Title>
            <Pagination
              showSizeChanger
              defaultCurrent={3}
              total={500}
              pageSizeOptions={['10', '20', '50', '100']}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Jumper</Title>
            <Pagination
              showQuickJumper
              defaultCurrent={2}
              total={500}
              showSizeChanger={false}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Steps</Title>
        <Paragraph>
          Guide users through a process by showing progress and next steps.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item demo-item-wide">
            <Title level={4}>Basic Steps</Title>
            <Steps current={currentStep}>
              <Step title="Finished" description="This is a description." />
              <Step title="In Progress" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
            <div style={{ marginTop: '16px' }}>
              <Space>
                <Button 
                  disabled={currentStep === 0} 
                  onClick={() => setCurrentStep(currentStep - 1)}
                >
                  Previous
                </Button>
                <Button 
                  type="primary"
                  disabled={currentStep === 2}
                  onClick={() => setCurrentStep(currentStep + 1)}
                >
                  Next
                </Button>
              </Space>
            </div>
          </div>

          <div className="demo-item">
            <Title level={4}>Small Steps</Title>
            <Steps size="small" current={1}>
              <Step title="Finished" />
              <Step title="In Progress" />
              <Step title="Waiting" />
            </Steps>
          </div>

          <div className="demo-item">
            <Title level={4}>With Icons</Title>
            <Steps>
              <Step status="finish" title="Login" icon={<UserOutlined />} />
              <Step status="finish" title="Verification" icon={<SolutionOutlined />} />
              <Step status="process" title="Pay" icon={<LoadingOutlined />} />
              <Step status="wait" title="Done" icon={<SmileOutlined />} />
            </Steps>
          </div>

          <div className="demo-item">
            <Title level={4}>Vertical Steps</Title>
            <Steps direction="vertical" current={1}>
              <Step title="Finished" description="This is a description." />
              <Step title="In Progress" description="This is a description." />
              <Step title="Waiting" description="This is a description." />
            </Steps>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Dropdown</Title>
        <Paragraph>
          A dropdown list triggered by clicking or hovering.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Dropdown</Title>
            <Dropdown menu={{ items: dropdownItems }}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Hover me
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          <div className="demo-item">
            <Title level={4}>Click Dropdown</Title>
            <Dropdown menu={{ items: dropdownItems }} trigger={['click']}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Click me
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>

          <div className="demo-item">
            <Title level={4}>Button Dropdown</Title>
            <Space>
              <Dropdown menu={{ items: dropdownItems }}>
                <Button>
                  Button <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown menu={{ items: dropdownItems }}>
                <Button type="primary">
                  Primary <DownOutlined />
                </Button>
              </Dropdown>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Placement</Title>
            <Space>
              <Dropdown menu={{ items: dropdownItems }} placement="bottomLeft">
                <Button>bottomLeft</Button>
              </Dropdown>
              <Dropdown menu={{ items: dropdownItems }} placement="bottomCenter">
                <Button>bottomCenter</Button>
              </Dropdown>
              <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
                <Button>bottomRight</Button>
              </Dropdown>
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Affix & BackTop</Title>
        <Paragraph>
          Make elements stick during scrolling and provide quick navigation back to top.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Affix</Title>
            <Affix offsetTop={120}>
              <Button type="primary">Affixed Button</Button>
            </Affix>
            <Paragraph style={{ marginTop: '16px' }}>
              The button above will stick to the top when scrolling.
            </Paragraph>
          </div>

          <div className="demo-item">
            <Title level={4}>BackTop</Title>
            <BackTop style={{ right: 24, bottom: 24 }} />
            <Paragraph>
              Scroll down to see the back-to-top button. (Note: This is a simulation)
            </Paragraph>
            <div style={{ height: '100px', overflow: 'auto', border: '1px solid #ccc' }}>
              <div style={{ height: '300px', padding: '16px' }}>
                Scroll this area to see BackTop in action
                <br />
                <br />
                Content...
                <br />
                Content...
                <br />
                Content...
                <br />
                Content...
                <br />
                Content...
                <br />
                <BackTop target={() => document.querySelector('.demo-item')} />
              </div>
            </div>
          </div>

          <div className="demo-item">
            <Title level={4}>Anchor</Title>
            <Anchor
              items={[
                {
                  key: 'part-1',
                  href: '#components-anchor-demo-basic',
                  title: 'Basic demo',
                },
                {
                  key: 'part-2',
                  href: '#components-anchor-demo-static',
                  title: 'Static demo',
                },
                {
                  key: 'part-3',
                  href: '#api',
                  title: 'API',
                  children: [
                    {
                      key: 'part-4',
                      href: '#anchor-props',
                      title: 'Anchor Props',
                    },
                    {
                      key: 'part-5',
                      href: '#link-props',
                      title: 'Link Props',
                    },
                  ],
                },
              ]}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Horizontal Anchor</Title>
            <Anchor
              direction="horizontal"
              items={[
                {
                  key: 'part-1',
                  href: '#components-anchor-demo-horizontal',
                  title: 'Basic demo',
                },
                {
                  key: 'part-2',
                  href: '#components-anchor-demo-static',
                  title: 'Static demo',
                },
                {
                  key: 'part-3',
                  href: '#api',
                  title: 'API',
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;

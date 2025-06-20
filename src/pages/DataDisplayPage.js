import React, { useState } from 'react';
import { 
  Card, 
  Typography, 
  Table, 
  List, 
  Avatar, 
  Badge, 
  Tag, 
  Tooltip, 
  Popover, 
  Timeline, 
  Tree, 
  Collapse, 
  Carousel, 
  Tabs, 
  Calendar, 
  Image, 
  Statistic, 
  Descriptions, 
  Empty,
  Space,
  Button,
  Divider,
  Watermark
} from 'antd';
import {
  UserOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  DownOutlined,
  SearchOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
const { Panel } = Collapse;
const { TabPane } = Tabs;

const DataDisplayPage = () => {
  const [activeTab, setActiveTab] = useState('1');

  // Mock data for components
  const tableColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const tableData = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  const listData = [
    {
      title: 'Ant Design Title 1',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    },
    {
      title: 'Ant Design Title 2',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    },
    {
      title: 'Ant Design Title 3',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
      content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    },
  ];

  const treeData = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
              disableCheckbox: true,
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
      ],
    },
  ];

  const onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  const content = (
    <div>
      <p>Content</p>
      <p>And more content</p>
    </div>
  );

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Data Display Components</Title>
        <Paragraph>
          Components for displaying and organizing data including tables, lists, cards, 
          and various visualization elements.
        </Paragraph>
      </div>

      <div className="demo-section">
        <Title level={2}>Table</Title>
        <Paragraph>
          A table displays rows of data with sorting, filtering, and pagination capabilities.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item" style={{ gridColumn: 'span 2' }}>
            <Title level={4}>Basic Table</Title>
            <Table columns={tableColumns} dataSource={tableData} />
          </div>

          <div className="demo-item">
            <Title level={4}>Bordered Table</Title>
            <Table 
              columns={tableColumns.slice(0, 3)} 
              dataSource={tableData} 
              bordered 
              size="small"
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Table with Selection</Title>
            <Table 
              rowSelection={{
                type: 'checkbox',
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log('selectedRowKeys: ', selectedRowKeys, 'selectedRows: ', selectedRows);
                },
              }}
              columns={tableColumns.slice(0, 3)} 
              dataSource={tableData} 
              size="small"
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>List</Title>
        <Paragraph>
          A simple list component that can contain any content.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic List</Title>
            <List
              itemLayout="horizontal"
              dataSource={listData}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>List with Actions</Title>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={listData}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <Space key="list-vertical-star-o">
                      <StarOutlined />
                      156
                    </Space>,
                    <Space key="list-vertical-like-o">
                      <LikeOutlined />
                      156
                    </Space>,
                    <Space key="list-vertical-message">
                      <MessageOutlined />
                      2
                    </Space>,
                  ]}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                  {item.content}
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Card</Title>
        <Paragraph>
          Simple rectangular container with various content and actions.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Card</Title>
            <Card title="Default size card" extra={<a href="#">More</a>} style={{ width: 300 }}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </div>

          <div className="demo-item">
            <Title level={4}>Card with Cover</Title>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
          </div>

          <div className="demo-item">
            <Title level={4}>Loading Card</Title>
            <Card style={{ width: 300, marginTop: 16 }} loading>
              <Meta
                avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                title="Card title"
                description="This is the description"
              />
            </Card>
          </div>

          <div className="demo-item">
            <Title level={4}>Grid Card</Title>
            <Card title="Card Title">
              <Card.Grid style={{ width: '25%', textAlign: 'center' }}>Content</Card.Grid>
              <Card.Grid hoverable={false} style={{ width: '25%', textAlign: 'center' }}>
                Content
              </Card.Grid>
              <Card.Grid style={{ width: '25%', textAlign: 'center' }}>Content</Card.Grid>
              <Card.Grid style={{ width: '25%', textAlign: 'center' }}>Content</Card.Grid>
            </Card>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Tags & Badges</Title>
        <Paragraph>
          Small components for labeling and status indication.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Tags</Title>
            <Space wrap>
              <Tag>Tag 1</Tag>
              <Tag>
                <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
              </Tag>
              <Tag closable onClose={() => console.log('Closing tag')}>
                Closeable
              </Tag>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Badges</Title>
            <Space direction="vertical">
              <Badge count={5}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge count={0} showZero>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge count={99}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge count={100}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge count={99} overflowCount={10}>
                <Avatar shape="square" size="large" />
              </Badge>
              <Badge count={1000} overflowCount={999}>
                <Avatar shape="square" size="large" />
              </Badge>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Badge Status</Title>
            <Space direction="vertical">
              <Badge status="success" text="Success" />
              <Badge status="error" text="Error" />
              <Badge status="default" text="Default" />
              <Badge status="processing" text="Processing" />
              <Badge status="warning" text="Warning" />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Avatar</Title>
            <Space>
              <Avatar size={64} icon={<UserOutlined />} />
              <Avatar size="large" icon={<UserOutlined />} />
              <Avatar icon={<UserOutlined />} />
              <Avatar size="small" icon={<UserOutlined />} />
            </Space>
            <br />
            <Space style={{ marginTop: 16 }}>
              <Avatar shape="square" size={64} icon={<UserOutlined />} />
              <Avatar shape="square" size="large" icon={<UserOutlined />} />
              <Avatar shape="square" icon={<UserOutlined />} />
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Navigation Elements</Title>
        <Paragraph>
          Components for organizing and navigating content.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Tabs</Title>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Tab 1" key="1">
                Content of Tab Pane 1
              </TabPane>
              <TabPane tab="Tab 2" key="2">
                Content of Tab Pane 2
              </TabPane>
              <TabPane tab="Tab 3" key="3">
                Content of Tab Pane 3
              </TabPane>
            </Tabs>
          </div>

          <div className="demo-item">
            <Title level={4}>Collapse</Title>
            <Collapse defaultActiveKey={['1']}>
              <Panel header="This is panel header 1" key="1">
                <p>Panel content 1</p>
              </Panel>
              <Panel header="This is panel header 2" key="2">
                <p>Panel content 2</p>
              </Panel>
              <Panel header="This is panel header 3" key="3">
                <p>Panel content 3</p>
              </Panel>
            </Collapse>
          </div>

          <div className="demo-item">
            <Title level={4}>Timeline</Title>
            <Timeline>
              <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
              <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
              <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
                Technical testing 2015-09-01
              </Timeline.Item>
              <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
            </Timeline>
          </div>

          <div className="demo-item">
            <Title level={4}>Tree</Title>
            <Tree
              checkable
              defaultExpandedKeys={['0-0-0', '0-0-1']}
              defaultSelectedKeys={['0-0-0', '0-0-1']}
              defaultCheckedKeys={['0-0-0', '0-0-1']}
              onSelect={onSelect}
              onCheck={onCheck}
              treeData={treeData}
            />
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Interactive Elements</Title>
        <Paragraph>
          Components that provide additional information or interactions.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Tooltip</Title>
            <Space>
              <Tooltip title="prompt text">
                <span>Tooltip will show on mouse enter.</span>
              </Tooltip>
              <Tooltip title="prompt text" placement="topLeft">
                <Button>TL</Button>
              </Tooltip>
              <Tooltip title="prompt text" placement="top">
                <Button>Top</Button>
              </Tooltip>
              <Tooltip title="prompt text" placement="topRight">
                <Button>TR</Button>
              </Tooltip>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Popover</Title>
            <Space>
              <Popover content={content} title="Title">
                <Button type="primary">Hover me</Button>
              </Popover>
              <Popover content={content} title="Title" trigger="click">
                <Button>Click me</Button>
              </Popover>
              <Popover content={content} title="Title" trigger="focus">
                <Button>Focus me</Button>
              </Popover>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Image</Title>
            <Image
              width={200}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              preview={{
                src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
              }}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Carousel</Title>
            <Carousel autoplay style={{ textAlign: 'center' }}>
              <div>
                <div style={{ height: '160px', color: '#fff', lineHeight: '160px', background: '#364d79' }}>
                  1
                </div>
              </div>
              <div>
                <div style={{ height: '160px', color: '#fff', lineHeight: '160px', background: '#364d79' }}>
                  2
                </div>
              </div>
              <div>
                <div style={{ height: '160px', color: '#fff', lineHeight: '160px', background: '#364d79' }}>
                  3
                </div>
              </div>
              <div>
                <div style={{ height: '160px', color: '#fff', lineHeight: '160px', background: '#364d79' }}>
                  4
                </div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Data Visualization</Title>
        <Paragraph>
          Components for displaying statistics and data visualization.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Statistic</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Statistic title="Active Users" value={112893} />
              <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
              <Statistic 
                title="Active Users" 
                value={11.28} 
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%" 
              />
              <Statistic 
                title="Idle Users" 
                value={9.3} 
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%" 
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Descriptions</Title>
            <Descriptions title="User Info" bordered>
              <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
              <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
              <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
              <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
              <Descriptions.Item label="Usage Time" span={2}>
                2019-04-24 18:00:00
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text="Running" />
              </Descriptions.Item>
              <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
              <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
              <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
            </Descriptions>
          </div>

          <div className="demo-item">
            <Title level={4}>Calendar</Title>
            <Calendar 
              fullscreen={false} 
              onPanelChange={(value, mode) => {
                console.log(value.format('YYYY-MM-DD'), mode);
              }}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Empty</Title>
            <Empty 
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <span>
                  Customize <a href="#API">Description</a>
                </span>
              }
            >
              <Button type="primary">Create Now</Button>
            </Empty>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDisplayPage;

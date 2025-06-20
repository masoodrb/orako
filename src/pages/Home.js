import React from 'react';
import { Card, Typography, Row, Col, Statistic, Button } from 'antd';
import { 
  AppstoreOutlined, 
  FormOutlined, 
  AlertOutlined, 
  SettingOutlined,
  BlockOutlined,
  CompassOutlined 
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: 'General',
      description: 'Basic components like Button, Icon, Typography',
      icon: <SettingOutlined style={{ fontSize: '24px', color: '#1890ff' }} />,
      count: 4,
      path: '/general'
    },
    {
      title: 'Layout',
      description: 'Components for page layout and structure',
      icon: <BlockOutlined style={{ fontSize: '24px', color: '#52c41a' }} />,
      count: 4,
      path: '/layout'
    },
    {
      title: 'Navigation',
      description: 'Navigation and menu components',
      icon: <CompassOutlined style={{ fontSize: '24px', color: '#722ed1' }} />,
      count: 8,
      path: '/navigation'
    },
    {
      title: 'Data Entry',
      description: 'Form controls and input components',
      icon: <FormOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />,
      count: 17,
      path: '/data-entry'
    },
    {
      title: 'Data Display',
      description: 'Components for displaying data',
      icon: <AppstoreOutlined style={{ fontSize: '24px', color: '#13c2c2' }} />,
      count: 17,
      path: '/data-display'
    },
    {
      title: 'Feedback',
      description: 'User feedback and interaction components',
      icon: <AlertOutlined style={{ fontSize: '24px', color: '#f5222d' }} />,
      count: 10,
      path: '/feedback'
    }
  ];

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Ant Design Components Demo</Title>
        <Paragraph>
          Welcome to the comprehensive showcase of Ant Design components. This demo application 
          demonstrates all the major components available in Ant Design 5.x with React 18.
        </Paragraph>
      </div>

      <Row gutter={[12, 12]} style={{ marginBottom: '20px' }}>
        <Col xs={24} sm={12} md={8}>
          <Card size="small">
            <Statistic
              title="Total Components"
              value={60}
              valueStyle={{ color: '#1890ff', fontSize: '18px' }}
              suffix="+"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size="small">
            <Statistic
              title="Categories"
              value={6}
              valueStyle={{ color: '#52c41a', fontSize: '18px' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card size="small">
            <Statistic
              title="React Version"
              value="18.2"
              valueStyle={{ color: '#722ed1', fontSize: '18px' }}
            />
          </Card>
        </Col>
      </Row>

      <Title level={3} style={{ marginBottom: '16px', fontSize: '16px' }}>Component Categories</Title>
      <Row gutter={[12, 12]}>
        {categories.map((category, index) => (
          <Col xs={24} sm={12} lg={8} key={index}>
            <Card
              hoverable
              size="small"
              style={{ height: '100%' }}
              onClick={() => navigate(category.path)}
            >
              <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                {React.cloneElement(category.icon, { style: { fontSize: '20px', color: category.icon.props.style.color } })}
              </div>
              <Card.Meta
                title={
                  <div style={{ textAlign: 'center' }}>
                    <Title level={5} style={{ margin: '4px 0', fontSize: '14px' }}>
                      {category.title}
                    </Title>
                    <Paragraph type="secondary" style={{ fontSize: '10px', margin: 0 }}>
                      {category.count} components
                    </Paragraph>
                  </div>
                }
                description={
                  <div style={{ textAlign: 'center' }}>
                    <Paragraph style={{ fontSize: '11px', margin: '4px 0' }}>{category.description}</Paragraph>
                    <Button type="primary" size="small" style={{ fontSize: '10px', height: '24px' }}>
                      Explore
                    </Button>
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card style={{ marginTop: '20px' }} size="small">
        <Title level={4} style={{ fontSize: '14px' }}>About This Demo</Title>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0' }}>
          This application showcases the complete set of Ant Design components organized by category. 
          Each component includes interactive examples demonstrating different states, configurations, 
          and use cases.
        </Paragraph>
        <Paragraph style={{ fontSize: '12px', margin: '4px 0' }}>
          <strong>Technologies used:</strong>
        </Paragraph>
        <ul style={{ fontSize: '11px', margin: '4px 0', paddingLeft: '16px' }}>
          <li>React 18.2.0</li>
          <li>Ant Design 5.12.8</li>
          <li>React Router DOM 6.20.1</li>
          <li>Ant Design Icons 5.2.6</li>
        </ul>
      </Card>
    </div>
  );
};

export default Home;

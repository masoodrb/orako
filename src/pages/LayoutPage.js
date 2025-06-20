import React from 'react';
import { Card, Typography, Layout, Row, Col, Divider, Space, Grid } from 'antd';

const { Title, Paragraph } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

const LayoutPage = () => {
  const screens = useBreakpoint();

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Layout Components</Title>
        <Paragraph>
          Components for arranging page layout and creating responsive designs.
        </Paragraph>
      </div>

      <div className="demo-section">
        <Title level={2}>Grid System</Title>
        <Paragraph>
          24 columns grid system for responsive layouts.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Grid</Title>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ background: '#1890ff', color: 'white', padding: '16px', textAlign: 'center' }}>
                  col-12
                </div>
              </Col>
              <Col span={12}>
                <div style={{ background: '#52c41a', color: 'white', padding: '16px', textAlign: 'center' }}>
                  col-12
                </div>
              </Col>
            </Row>
          </div>

          <div className="demo-item">
            <Title level={4}>Gutter</Title>
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <div style={{ background: '#1890ff', color: 'white', padding: '16px', textAlign: 'center' }}>
                  col-6
                </div>
              </Col>
              <Col span={6}>
                <div style={{ background: '#52c41a', color: 'white', padding: '16px', textAlign: 'center' }}>
                  col-6
                </div>
              </Col>
              <Col span={6}>
                <div style={{ background: '#faad14', color: 'white', padding: '16px', textAlign: 'center' }}>
                  col-6
                </div>
              </Col>
              <Col span={6}>
                <div style={{ background: '#f5222d', color: 'white', padding: '16px', textAlign: 'center' }}>
                  col-6
                </div>
              </Col>
            </Row>
          </div>

          <div className="demo-item">
            <Title level={4}>Offset</Title>
            <Row>
              <Col span={8}>
                <div style={{ background: '#1890ff', color: 'white', padding: '16px', textAlign: 'center' }}>
                  col-8
                </div>
              </Col>
              <Col span={8} offset={8}>
                <div style={{ background: '#52c41a', color: 'white', padding: '16px', textAlign: 'center' }}>
                  col-8 offset-8
                </div>
              </Col>
            </Row>
          </div>

          <div className="demo-item">
            <Title level={4}>Responsive</Title>
            <Row>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div style={{ background: '#1890ff', color: 'white', padding: '16px', textAlign: 'center' }}>
                  Responsive
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div style={{ background: '#52c41a', color: 'white', padding: '16px', textAlign: 'center' }}>
                  Responsive
                </div>
              </Col>
              <Col xs={24} sm={12} md={8} lg={6} xl={4}>
                <div style={{ background: '#faad14', color: 'white', padding: '16px', textAlign: 'center' }}>
                  Responsive
                </div>
              </Col>
            </Row>
            <Paragraph type="secondary" style={{ marginTop: '8px' }}>
              Current breakpoint: {Object.keys(screens).filter(key => screens[key]).join(', ')}
            </Paragraph>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Layout</Title>
        <Paragraph>
          Handling the overall layout of a page with header, content, footer and sidebar.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Layout</Title>
            <Layout style={{ minHeight: '200px' }}>
              <Header style={{ background: '#1890ff', color: 'white', textAlign: 'center' }}>
                Header
              </Header>
              <Content style={{ background: '#f0f2f5', padding: '24px', textAlign: 'center' }}>
                Content
              </Content>
              <Footer style={{ background: '#001529', color: 'white', textAlign: 'center' }}>
                Footer
              </Footer>
            </Layout>
          </div>

          <div className="demo-item">
            <Title level={4}>Layout with Sidebar</Title>
            <Layout style={{ minHeight: '200px' }}>
              <Sider width="25%" style={{ background: '#001529' }}>
                <div style={{ color: 'white', padding: '24px', textAlign: 'center' }}>
                  Sider
                </div>
              </Sider>
              <Layout>
                <Header style={{ background: '#1890ff', color: 'white', textAlign: 'center' }}>
                  Header
                </Header>
                <Content style={{ background: '#f0f2f5', padding: '24px', textAlign: 'center' }}>
                  Content
                </Content>
                <Footer style={{ background: '#001529', color: 'white', textAlign: 'center' }}>
                  Footer
                </Footer>
              </Layout>
            </Layout>
          </div>

          <div className="demo-item">
            <Title level={4}>Top-Side Layout</Title>
            <Layout style={{ minHeight: '200px' }}>
              <Header style={{ background: '#1890ff', color: 'white', textAlign: 'center' }}>
                Header
              </Header>
              <Layout>
                <Sider width="30%" style={{ background: '#001529' }}>
                  <div style={{ color: 'white', padding: '24px', textAlign: 'center' }}>
                    Sider
                  </div>
                </Sider>
                <Content style={{ background: '#f0f2f5', padding: '24px', textAlign: 'center' }}>
                  Content
                </Content>
              </Layout>
            </Layout>
          </div>

          <div className="demo-item">
            <Title level={4}>Complex Layout</Title>
            <Layout style={{ minHeight: '200px' }}>
              <Header style={{ background: '#1890ff', color: 'white', textAlign: 'center' }}>
                Header
              </Header>
              <Layout>
                <Sider width="25%" style={{ background: '#001529' }}>
                  <div style={{ color: 'white', padding: '12px', textAlign: 'center' }}>
                    Left Sider
                  </div>
                </Sider>
                <Content style={{ background: '#f0f2f5', padding: '24px', textAlign: 'center' }}>
                  Content
                </Content>
                <Sider width="25%" style={{ background: '#001529' }}>
                  <div style={{ color: 'white', padding: '12px', textAlign: 'center' }}>
                    Right Sider
                  </div>
                </Sider>
              </Layout>
              <Footer style={{ background: '#001529', color: 'white', textAlign: 'center' }}>
                Footer
              </Footer>
            </Layout>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Space</Title>
        <Paragraph>
          Set components spacing with consistent design language.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Space</Title>
            <Space>
              <div style={{ background: '#1890ff', color: 'white', padding: '8px 16px' }}>
                Item 1
              </div>
              <div style={{ background: '#52c41a', color: 'white', padding: '8px 16px' }}>
                Item 2
              </div>
              <div style={{ background: '#faad14', color: 'white', padding: '8px 16px' }}>
                Item 3
              </div>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Vertical Space</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div style={{ background: '#1890ff', color: 'white', padding: '8px 16px', textAlign: 'center' }}>
                Item 1
              </div>
              <div style={{ background: '#52c41a', color: 'white', padding: '8px 16px', textAlign: 'center' }}>
                Item 2
              </div>
              <div style={{ background: '#faad14', color: 'white', padding: '8px 16px', textAlign: 'center' }}>
                Item 3
              </div>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Space Sizes</Title>
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Paragraph>Small:</Paragraph>
                <Space size="small">
                  <div style={{ background: '#1890ff', color: 'white', padding: '4px 8px' }}>1</div>
                  <div style={{ background: '#52c41a', color: 'white', padding: '4px 8px' }}>2</div>
                  <div style={{ background: '#faad14', color: 'white', padding: '4px 8px' }}>3</div>
                </Space>
              </div>
              <div>
                <Paragraph>Middle:</Paragraph>
                <Space size="middle">
                  <div style={{ background: '#1890ff', color: 'white', padding: '4px 8px' }}>1</div>
                  <div style={{ background: '#52c41a', color: 'white', padding: '4px 8px' }}>2</div>
                  <div style={{ background: '#faad14', color: 'white', padding: '4px 8px' }}>3</div>
                </Space>
              </div>
              <div>
                <Paragraph>Large:</Paragraph>
                <Space size="large">
                  <div style={{ background: '#1890ff', color: 'white', padding: '4px 8px' }}>1</div>
                  <div style={{ background: '#52c41a', color: 'white', padding: '4px 8px' }}>2</div>
                  <div style={{ background: '#faad14', color: 'white', padding: '4px 8px' }}>3</div>
                </Space>
              </div>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Space Wrap</Title>
            <Space wrap>
              {Array.from({ length: 20 }, (_, i) => (
                <div 
                  key={i}
                  style={{ 
                    background: '#1890ff', 
                    color: 'white', 
                    padding: '8px 16px',
                    borderRadius: '4px'
                  }}
                >
                  Item {i + 1}
                </div>
              ))}
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Divider</Title>
        <Paragraph>
          A divider line separates different content areas.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Horizontal Divider</Title>
            <div>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Paragraph>
              <Divider />
              <Paragraph>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Paragraph>
              <Divider dashed />
              <Paragraph>
                Ut enim ad minim veniam, quis nostrud exercitation.
              </Paragraph>
            </div>
          </div>

          <div className="demo-item">
            <Title level={4}>Divider with Text</Title>
            <div>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Paragraph>
              <Divider>Text</Divider>
              <Paragraph>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Paragraph>
              <Divider orientation="left">Left Text</Divider>
              <Paragraph>
                Ut enim ad minim veniam, quis nostrud exercitation.
              </Paragraph>
              <Divider orientation="right">Right Text</Divider>
              <Paragraph>
                Duis aute irure dolor in reprehenderit in voluptate.
              </Paragraph>
            </div>
          </div>

          <div className="demo-item">
            <Title level={4}>Vertical Divider</Title>
            <div>
              <span>Text</span>
              <Divider type="vertical" />
              <span>Link</span>
              <Divider type="vertical" />
              <span>Link</span>
              <Divider type="vertical" />
              <span>Link</span>
            </div>
          </div>

          <div className="demo-item">
            <Title level={4}>Divider Styles</Title>
            <div>
              <Paragraph>Plain divider</Paragraph>
              <Divider plain>Plain text</Divider>
              <Paragraph>Dashed divider</Paragraph>
              <Divider dashed>Dashed text</Divider>
              <Paragraph>Custom style</Paragraph>
              <Divider style={{ borderColor: '#7cb305' }}>Custom Color</Divider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutPage;

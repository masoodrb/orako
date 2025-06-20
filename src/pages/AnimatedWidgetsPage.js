import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Space, 
  Progress, 
  Statistic, 
  Avatar, 
  Badge, 
  Tag, 
  List, 
  Timeline,
  Switch,
  Slider,
  Select,
  Tooltip,
  Divider,
  Rate,
  Alert,
  Spin,
  FloatButton
} from 'antd';
import {
  RocketOutlined,
  TrophyOutlined,
  DollarOutlined,
  UserOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  LineChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  DashboardOutlined,
  StarOutlined,
  HeartOutlined,
  LikeOutlined,
  FireOutlined,
  ThunderboltOutlined,
  CrownOutlined,
  GiftOutlined,
  BellOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  LoadingOutlined,
  RiseOutlined,
  FallOutlined,
  EyeOutlined,
  CommentOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  UploadOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Countdown } = Statistic;

const AnimatedWidgetsPage = () => {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [currentMetric, setCurrentMetric] = useState(0);
  const [pulseActive, setPulseActive] = useState(true);
  const [rotateActive, setRotateActive] = useState(true);
  const [floatActive, setFloatActive] = useState(true);

  // Animated counter values
  const [counters, setCounters] = useState({
    users: 0,
    sales: 0,
    revenue: 0,
    projects: 0
  });

  // Target values for counters
  const targetValues = {
    users: 12540,
    sales: 8750,
    revenue: 234567,
    projects: 156
  };

  // Chart data for animated charts
  const [chartData, setChartData] = useState([]);
  const [progressValues, setProgressValues] = useState({
    performance: 0,
    satisfaction: 0,
    efficiency: 0,
    quality: 0
  });

  // Animate counters on mount
  useEffect(() => {
    if (!animationsEnabled) {
      setCounters(targetValues);
      return;
    }

    const duration = 2000 / animationSpeed;
    const steps = 60;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setCounters({
        users: Math.floor(targetValues.users * progress),
        sales: Math.floor(targetValues.sales * progress),
        revenue: Math.floor(targetValues.revenue * progress),
        projects: Math.floor(targetValues.projects * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setCounters(targetValues);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [animationsEnabled, animationSpeed]);

  // Animate progress bars
  useEffect(() => {
    if (!animationsEnabled) {
      setProgressValues({
        performance: 92,
        satisfaction: 87,
        efficiency: 94,
        quality: 89
      });
      return;
    }

    const targets = {
      performance: 92,
      satisfaction: 87,
      efficiency: 94,
      quality: 89
    };

    const duration = 1500 / animationSpeed;
    const steps = 30;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setProgressValues({
        performance: Math.floor(targets.performance * progress),
        satisfaction: Math.floor(targets.satisfaction * progress),
        efficiency: Math.floor(targets.efficiency * progress),
        quality: Math.floor(targets.quality * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setProgressValues(targets);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [animationsEnabled, animationSpeed]);

  // Cycling metrics for rotating display
  const metrics = [
    { label: 'Daily Active Users', value: '12.5K', icon: <UserOutlined />, color: '#1890ff' },
    { label: 'Revenue Growth', value: '+23%', icon: <RiseOutlined />, color: '#52c41a' },
    { label: 'Customer Rating', value: '4.8★', icon: <StarOutlined />, color: '#faad14' },
    { label: 'Response Time', value: '2.3s', icon: <ThunderboltOutlined />, color: '#722ed1' }
  ];

  useEffect(() => {
    if (!animationsEnabled) return;

    const timer = setInterval(() => {
      setCurrentMetric((prev) => (prev + 1) % metrics.length);
    }, 3000 / animationSpeed);

    return () => clearInterval(timer);
  }, [animationsEnabled, animationSpeed]);

  // Sample notification data for animated list
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registration', time: 'Just now', type: 'success' },
    { id: 2, message: 'Payment received', time: '2m ago', type: 'info' },
    { id: 3, message: 'Server maintenance completed', time: '5m ago', type: 'success' }
  ]);

  // Add new notification every few seconds
  useEffect(() => {
    if (!animationsEnabled) return;

    const timer = setInterval(() => {
      const newNotification = {
        id: Date.now(),
        message: `System update ${Math.floor(Math.random() * 1000)}`,
        time: 'Just now',
        type: ['success', 'info', 'warning'][Math.floor(Math.random() * 3)]
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    }, 4000 / animationSpeed);

    return () => clearInterval(timer);
  }, [animationsEnabled, animationSpeed]);

  const AnimatedCard = ({ children, animation = 'none', ...props }) => {
    const getAnimationStyle = () => {
      if (!animationsEnabled) return {};
      
      const baseStyle = {
        transition: 'all 0.3s ease',
        transformOrigin: 'center'
      };

      switch (animation) {
        case 'pulse':
          return {
            ...baseStyle,
            animation: pulseActive ? `pulse 2s infinite ${2 / animationSpeed}s` : 'none'
          };
        case 'rotate':
          return {
            ...baseStyle,
            animation: rotateActive ? `rotate 8s linear infinite` : 'none',
            animationDuration: `${8 / animationSpeed}s`
          };
        case 'float':
          return {
            ...baseStyle,
            animation: floatActive ? `float 3s ease-in-out infinite` : 'none',
            animationDuration: `${3 / animationSpeed}s`
          };
        case 'bounce':
          return {
            ...baseStyle,
            animation: animationsEnabled ? `bounce 2s infinite` : 'none',
            animationDuration: `${2 / animationSpeed}s`
          };
        case 'glow':
          return {
            ...baseStyle,
            animation: animationsEnabled ? `glow 2s ease-in-out infinite` : 'none',
            animationDuration: `${2 / animationSpeed}s`
          };
        default:
          return baseStyle;
      }
    };

    return (
      <Card 
        {...props} 
        style={{ 
          ...props.style, 
          ...getAnimationStyle(),
          borderRadius: 12,
          overflow: 'hidden'
        }}
        className={`animated-card ${props.className || ''}`}
      >
        {children}
      </Card>
    );
  };

  const AnimatedIcon = ({ icon, animation = 'none', ...props }) => {
    const getIconAnimationStyle = () => {
      if (!animationsEnabled) return {};
      
      switch (animation) {
        case 'spin':
          return {
            animation: `spin 2s linear infinite`,
            animationDuration: `${2 / animationSpeed}s`
          };
        case 'wiggle':
          return {
            animation: `wiggle 1s ease-in-out infinite`,
            animationDuration: `${1 / animationSpeed}s`
          };
        case 'heartbeat':
          return {
            animation: `heartbeat 1.5s ease-in-out infinite`,
            animationDuration: `${1.5 / animationSpeed}s`
          };
        default:
          return {};
      }
    };

    return React.cloneElement(icon, {
      ...props,
      style: { 
        ...props.style, 
        ...getIconAnimationStyle() 
      }
    });
  };

  const BouncingNumber = ({ value, suffix = '', prefix = '' }) => (
    <div 
      key={value} 
      style={{ 
        animation: animationsEnabled ? `bounceIn 0.6s ease-out` : 'none',
        animationDuration: `${0.6 / animationSpeed}s`
      }}
    >
      {prefix}{value.toLocaleString()}{suffix}
    </div>
  );

  return (
    <div className="page-container">
      {/* Animation Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        
        @keyframes glow {
          0%, 100% { box-shadow: 0 4px 20px rgba(24, 144, 255, 0.3); }
          50% { box-shadow: 0 8px 40px rgba(24, 144, 255, 0.6); }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); opacity: 1; }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        
        @keyframes slideInRight {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        .animated-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        
        .notification-item {
          animation: slideInRight 0.5s ease-out;
        }
      `}</style>

      {/* Page Header */}
      <div className="page-header">
        <div style={{ flex: 1 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--oracle-text-primary)' }}>
            <AnimatedIcon icon={<RocketOutlined />} animation="heartbeat" style={{ marginRight: 12 }} />
            Animated Widgets
          </Title>
          <Text style={{ color: 'var(--oracle-text-secondary)', fontSize: '16px' }}>
            Interactive and animated components with smooth transitions and engaging visuals
          </Text>
        </div>
        
        <Space>
          <Text>Animations:</Text>
          <Switch 
            checked={animationsEnabled} 
            onChange={setAnimationsEnabled}
            checkedChildren="ON"
            unCheckedChildren="OFF"
          />
          <Text>Speed:</Text>
          <Slider
            style={{ width: 100 }}
            min={0.5}
            max={2}
            step={0.1}
            value={animationSpeed}
            onChange={setAnimationSpeed}
            disabled={!animationsEnabled}
          />
        </Space>
      </div>

      {/* Animated Counter Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <AnimatedCard animation="pulse" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#e6f7ff' }}>
                <AnimatedIcon icon={<UserOutlined />} animation="wiggle" style={{ color: '#1890ff' }} />
              </div>
              <div>
                <div className="stats-number">
                  <BouncingNumber value={counters.users} />
                </div>
                <div className="stats-label">Active Users</div>
              </div>
            </div>
          </AnimatedCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <AnimatedCard animation="float" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#f6ffed' }}>
                <AnimatedIcon icon={<ShoppingCartOutlined />} animation="spin" style={{ color: '#52c41a' }} />
              </div>
              <div>
                <div className="stats-number">
                  <BouncingNumber value={counters.sales} />
                </div>
                <div className="stats-label">Total Sales</div>
              </div>
            </div>
          </AnimatedCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <AnimatedCard animation="glow" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#fff7e6' }}>
                <AnimatedIcon icon={<DollarOutlined />} animation="heartbeat" style={{ color: '#faad14' }} />
              </div>
              <div>
                <div className="stats-number">
                  <BouncingNumber value={counters.revenue} prefix="$" />
                </div>
                <div className="stats-label">Revenue</div>
              </div>
            </div>
          </AnimatedCard>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <AnimatedCard animation="bounce" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#f9f0ff' }}>
                <AnimatedIcon icon={<TrophyOutlined />} animation="wiggle" style={{ color: '#722ed1' }} />
              </div>
              <div>
                <div className="stats-number">
                  <BouncingNumber value={counters.projects} />
                </div>
                <div className="stats-label">Projects</div>
              </div>
            </div>
          </AnimatedCard>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Animated Progress Cards */}
        <Col xs={24} lg={12}>
          <AnimatedCard 
            title="Performance Metrics" 
            animation="pulse"
            extra={
              <Space>
                <Button size="small" onClick={() => setPulseActive(!pulseActive)}>
                  {pulseActive ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                </Button>
              </Space>
            }
          >
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <Progress
                    type="circle"
                    percent={progressValues.performance}
                    strokeColor={{
                      '0%': '#108ee9',
                      '100%': '#87d068',
                    }}
                    size={100}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text strong>Performance</Text>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center', marginBottom: 16 }}>
                  <Progress
                    type="circle"
                    percent={progressValues.satisfaction}
                    strokeColor={{
                      '0%': '#fa541c',
                      '100%': '#faad14',
                    }}
                    size={100}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text strong>Satisfaction</Text>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <Progress
                    type="circle"
                    percent={progressValues.efficiency}
                    strokeColor={{
                      '0%': '#722ed1',
                      '100%': '#eb2f96',
                    }}
                    size={100}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text strong>Efficiency</Text>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: 'center' }}>
                  <Progress
                    type="circle"
                    percent={progressValues.quality}
                    strokeColor={{
                      '0%': '#13c2c2',
                      '100%': '#52c41a',
                    }}
                    size={100}
                  />
                  <div style={{ marginTop: 8 }}>
                    <Text strong>Quality</Text>
                  </div>
                </div>
              </Col>
            </Row>
          </AnimatedCard>
        </Col>

        {/* Rotating Metric Display */}
        <Col xs={24} lg={12}>
          <AnimatedCard 
            title="Dynamic Metrics" 
            animation="float"
            extra={
              <Space>
                <Button size="small" onClick={() => setFloatActive(!floatActive)}>
                  {floatActive ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                </Button>
              </Space>
            }
          >
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 20px',
              minHeight: 200,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <div style={{
                fontSize: 48,
                color: metrics[currentMetric].color,
                marginBottom: 16,
                transition: 'all 0.5s ease'
              }}>
                <AnimatedIcon 
                  icon={metrics[currentMetric].icon} 
                  animation="heartbeat"
                />
              </div>
              <Title 
                level={1} 
                style={{ 
                  margin: 0, 
                  marginBottom: 8,
                  color: metrics[currentMetric].color,
                  transition: 'color 0.5s ease'
                }}
              >
                {metrics[currentMetric].value}
              </Title>
              <Text 
                style={{ 
                  fontSize: 16,
                  color: 'var(--oracle-text-secondary)'
                }}
              >
                {metrics[currentMetric].label}
              </Text>
              
              <div style={{ marginTop: 20 }}>
                {metrics.map((_, index) => (
                  <Badge
                    key={index}
                    color={index === currentMetric ? metrics[index].color : '#d9d9d9'}
                    style={{ margin: '0 4px' }}
                  />
                ))}
              </div>
            </div>
          </AnimatedCard>
        </Col>

        {/* Live Notifications */}
        <Col xs={24} lg={8}>
          <AnimatedCard title="Live Notifications" animation="glow">
            <List
              dataSource={notifications}
              renderItem={(item, index) => (
                <List.Item 
                  className="notification-item"
                  style={{ 
                    padding: '12px 0',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <List.Item.Meta
                    avatar={
                      <Badge 
                        color={
                          item.type === 'success' ? '#52c41a' :
                          item.type === 'warning' ? '#faad14' : '#1890ff'
                        }
                      />
                    }
                    title={<Text style={{ fontSize: '14px' }}>{item.message}</Text>}
                    description={
                      <Text style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
                        {item.time}
                      </Text>
                    }
                  />
                </List.Item>
              )}
            />
          </AnimatedCard>
        </Col>

        {/* Animated Team Cards */}
        <Col xs={24} lg={8}>
          <AnimatedCard title="Team Activity" animation="float">
            <Space direction="vertical" style={{ width: '100%' }}>
              {[
                { name: 'Sarah Johnson', action: 'completed task', time: '2m ago', avatar: 'S' },
                { name: 'Michael Brown', action: 'joined meeting', time: '5m ago', avatar: 'M' },
                { name: 'Emily Davis', action: 'uploaded file', time: '8m ago', avatar: 'E' }
              ].map((activity, index) => (
                <div 
                  key={index}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    padding: '8px 0',
                    animation: animationsEnabled ? `slideInRight 0.6s ease-out ${index * 0.2}s both` : 'none'
                  }}
                >
                  <Avatar 
                    style={{ 
                      backgroundColor: 'var(--oracle-primary)',
                      marginRight: 12
                    }}
                  >
                    {activity.avatar}
                  </Avatar>
                  <div style={{ flex: 1 }}>
                    <Text strong style={{ fontSize: '13px' }}>
                      {activity.name}
                    </Text>
                    <Text style={{ fontSize: '13px', color: 'var(--oracle-text-secondary)' }}>
                      {' '}{activity.action}
                    </Text>
                    <br />
                    <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
                      {activity.time}
                    </Text>
                  </div>
                </div>
              ))}
            </Space>
          </AnimatedCard>
        </Col>

        {/* Rotating Chart Widget */}
        <Col xs={24} lg={8}>
          <AnimatedCard 
            title="Analytics Dashboard" 
            animation="rotate"
            extra={
              <Space>
                <Button size="small" onClick={() => setRotateActive(!rotateActive)}>
                  {rotateActive ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                </Button>
              </Space>
            }
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ 
                width: 80, 
                height: 80, 
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #1890ff, #52c41a)',
                margin: '0 auto 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <AnimatedIcon 
                  icon={<BarChartOutlined />} 
                  style={{ color: 'white', fontSize: 32 }}
                />
              </div>
              <Title level={4} style={{ margin: 0, marginBottom: 8 }}>
                Live Analytics
              </Title>
              <Text style={{ color: 'var(--oracle-text-secondary)' }}>
                Real-time data visualization
              </Text>
              
              <Row gutter={16} style={{ marginTop: 20 }}>
                <Col span={8}>
                  <Statistic 
                    title="Views" 
                    value={12543} 
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic 
                    title="Clicks" 
                    value={8765} 
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
                <Col span={8}>
                  <Statistic 
                    title="Rate" 
                    value={23.5} 
                    suffix="%" 
                    valueStyle={{ fontSize: '16px' }}
                  />
                </Col>
              </Row>
            </div>
          </AnimatedCard>
        </Col>
      </Row>

      {/* Floating Action Buttons */}
      <FloatButton.Group
        trigger="hover"
        type="primary"
        style={{ right: 24 }}
        icon={<SettingOutlined />}
      >
        <FloatButton 
          icon={<PlayCircleOutlined />} 
          tooltip="Play All Animations"
          onClick={() => {
            setAnimationsEnabled(true);
            setPulseActive(true);
            setRotateActive(true);
            setFloatActive(true);
          }}
        />
        <FloatButton 
          icon={<PauseCircleOutlined />} 
          tooltip="Pause All Animations"
          onClick={() => {
            setPulseActive(false);
            setRotateActive(false);
            setFloatActive(false);
          }}
        />
        <FloatButton 
          icon={<SyncOutlined />} 
          tooltip="Reset Animations"
          onClick={() => {
            setAnimationsEnabled(false);
            setTimeout(() => setAnimationsEnabled(true), 100);
          }}
        />
      </FloatButton.Group>
    </div>
  );
};

export default AnimatedWidgetsPage;

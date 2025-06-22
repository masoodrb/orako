import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Select,
  Typography,
  Statistic,
  Space,
  Tag,
  Badge,
  Form,
  InputNumber,
  Modal,
  List,
  Avatar,
  Divider,
  message,
  Tabs
} from 'antd';
import {
  ShoppingCartOutlined,
  PlusOutlined,
  MinusOutlined,
  DeleteOutlined,
  CreditCardOutlined,
  DollarOutlined,
  BarcodeOutlined,
  SearchOutlined,
  UserOutlined,
  PrinterOutlined,
  CalculatorOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  HistoryOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;

const POSSalesPage = () => {
  const [cart, setCart] = useState([]);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [activeTab, setActiveTab] = useState('products');

  // Sample product data
  const products = [
    {
      id: '1',
      name: 'Premium Coffee Beans',
      price: 24.99,
      category: 'Beverages',
      stock: 150,
      barcode: '123456789',
      image: '☕'
    },
    {
      id: '2',
      name: 'Organic Green Tea',
      price: 18.50,
      category: 'Beverages',
      stock: 85,
      barcode: '123456790',
      image: '🍃'
    },
    {
      id: '3',
      name: 'Chocolate Croissant',
      price: 4.75,
      category: 'Bakery',
      stock: 32,
      barcode: '123456791',
      image: '🥐'
    },
    {
      id: '4',
      name: 'Fresh Sandwich',
      price: 8.99,
      category: 'Food',
      stock: 25,
      barcode: '123456792',
      image: '🥪'
    },
    {
      id: '5',
      name: 'Protein Bar',
      price: 3.25,
      category: 'Snacks',
      stock: 120,
      barcode: '123456793',
      image: '🍫'
    },
    {
      id: '6',
      name: 'Bottled Water',
      price: 1.99,
      category: 'Beverages',
      stock: 200,
      barcode: '123456794',
      image: '💧'
    }
  ];

  // Sample recent transactions
  const recentTransactions = [
    {
      id: 'TXN-001',
      time: '10:30 AM',
      amount: 28.74,
      items: 3,
      customer: 'John Doe',
      paymentMethod: 'Credit Card'
    },
    {
      id: 'TXN-002',
      time: '10:15 AM',
      amount: 12.50,
      items: 2,
      customer: 'Walk-in Customer',
      paymentMethod: 'Cash'
    },
    {
      id: 'TXN-003',
      time: '09:45 AM',
      amount: 45.80,
      items: 6,
      customer: 'Sarah Wilson',
      paymentMethod: 'Credit Card'
    }
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    message.success(`${product.name} added to cart`);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      message.warning('Cart is empty');
      return;
    }
    setPaymentModalVisible(true);
  };

  const processPayment = (paymentMethod) => {
    message.success(`Payment of $${calculateTotal().toFixed(2)} processed via ${paymentMethod}`);
    setCart([]);
    setPaymentModalVisible(false);
  };

  const productColumns = [
    {
      title: 'Product',
      key: 'product',
      render: (_, product) => (
        <Space>
          <Avatar size="large">{product.image}</Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{product.name}</div>
            <Text type="secondary">{product.category}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => <Text strong>${price}</Text>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      render: (stock) => (
        <Badge 
          count={stock} 
          style={{ 
            backgroundColor: stock > 50 ? 'var(--oracle-success)' : 
                           stock > 20 ? 'var(--oracle-warning)' : 'var(--oracle-error)' 
          }} 
        />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, product) => (
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          Add to Cart
        </Button>
      ),
    },
  ];

  const cartColumns = [
    {
      title: 'Item',
      key: 'item',
      render: (_, item) => (
        <Space>
          <Avatar>{item.image}</Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{item.name}</div>
            <Text type="secondary">${item.price}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Quantity',
      key: 'quantity',
      render: (_, item) => (
        <Space>
          <Button 
            size="small" 
            icon={<MinusOutlined />}
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          />
          <InputNumber 
            min={0} 
            value={item.quantity}
            onChange={(value) => updateQuantity(item.id, value)}
            style={{ width: 60 }}
          />
          <Button 
            size="small" 
            icon={<PlusOutlined />}
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          />
        </Space>
      ),
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, item) => (
        <Text strong>${(item.price * item.quantity).toFixed(2)}</Text>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item) => (
        <Button 
          size="small" 
          danger 
          icon={<DeleteOutlined />}
          onClick={() => removeFromCart(item.id)}
        />
      ),
    },
  ];

  const tabItems = [
    {
      key: 'products',
      label: (
        <Space>
          <ShoppingCartOutlined />
          Products
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
            <Col span={12}>
              <Input 
                placeholder="Search products..." 
                prefix={<SearchOutlined />}
              />
            </Col>
            <Col span={6}>
              <Select placeholder="Category" style={{ width: '100%' }}>
                <Option value="all">All Categories</Option>
                <Option value="beverages">Beverages</Option>
                <Option value="food">Food</Option>
                <Option value="bakery">Bakery</Option>
                <Option value="snacks">Snacks</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Input 
                placeholder="Scan barcode..." 
                prefix={<BarcodeOutlined />}
              />
            </Col>
          </Row>
          <Table 
            dataSource={products} 
            columns={productColumns} 
            pagination={false}
            size="middle"
          />
        </div>
      ),
    },
    {
      key: 'transactions',
      label: (
        <Space>
          <HistoryOutlined />
          Recent Sales
        </Space>
      ),
      children: (
        <List
          itemLayout="horizontal"
          dataSource={recentTransactions}
          renderItem={(transaction) => (
            <List.Item
              actions={[
                <Button size="small" icon={<PrinterOutlined />}>
                  Reprint
                </Button>
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar icon={<DollarOutlined />} />}
                title={`${transaction.id} - $${transaction.amount}`}
                description={
                  <Space direction="vertical" size="small">
                    <Text type="secondary">
                      {transaction.time} • {transaction.items} items • {transaction.customer}
                    </Text>
                    <Tag color="blue">{transaction.paymentMethod}</Tag>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <Title level={1}>POS Sales Terminal</Title>
        <Text type="secondary">
          Point of Sale system for quick and efficient transactions
        </Text>
      </div>

      {/* Sales Statistics */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Today's Sales"
              value={1247.50}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--oracle-success)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Transactions"
              value={23}
              valueStyle={{ color: 'var(--oracle-primary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Sale"
              value={54.24}
              prefix="$"
              precision={2}
              valueStyle={{ color: 'var(--oracle-secondary)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Items Sold"
              value={89}
              valueStyle={{ color: 'var(--oracle-warning)' }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        {/* Products & Sales History */}
        <Col xs={24} lg={16}>
          <Card title="Sales Terminal">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
            />
          </Card>
        </Col>

        {/* Cart & Checkout */}
        <Col xs={24} lg={8}>
          <Card 
            title="Shopping Cart" 
            extra={
              <Button 
                size="small" 
                onClick={clearCart}
                disabled={cart.length === 0}
              >
                Clear Cart
              </Button>
            }
          >
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <ShoppingCartOutlined style={{ fontSize: '48px', color: 'var(--oracle-text-secondary)' }} />
                <div style={{ marginTop: '16px' }}>
                  <Text type="secondary">Cart is empty</Text>
                </div>
              </div>
            ) : (
              <>
                <Table 
                  dataSource={cart} 
                  columns={cartColumns} 
                  pagination={false}
                  size="small"
                />
                
                <Divider />
                
                <Space direction="vertical" style={{ width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Subtotal:</Text>
                    <Text>${calculateSubtotal().toFixed(2)}</Text>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text>Tax (8%):</Text>
                    <Text>${calculateTax().toFixed(2)}</Text>
                  </div>
                  <Divider style={{ margin: '8px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Text strong>Total:</Text>
                    <Text strong style={{ fontSize: '18px', color: 'var(--oracle-primary)' }}>
                      ${calculateTotal().toFixed(2)}
                    </Text>
                  </div>
                </Space>
                
                <Button 
                  type="primary" 
                  size="large" 
                  block 
                  style={{ marginTop: '16px' }}
                  onClick={handleCheckout}
                  icon={<CreditCardOutlined />}
                >
                  Checkout
                </Button>
              </>
            )}
          </Card>
        </Col>
      </Row>

      {/* Payment Modal */}
      <Modal
        title="Process Payment"
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
        width={500}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={3}>Total: ${calculateTotal().toFixed(2)}</Title>
        </div>
        
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Button 
              type="primary" 
              size="large" 
              block 
              icon={<DollarOutlined />}
              onClick={() => processPayment('Cash')}
            >
              Cash Payment
            </Button>
          </Col>
          <Col span={12}>
            <Button 
              type="primary" 
              size="large" 
              block 
              icon={<CreditCardOutlined />}
              onClick={() => processPayment('Credit Card')}
            >
              Card Payment
            </Button>
          </Col>
          <Col span={24}>
            <Button 
              size="large" 
              block 
              icon={<CalculatorOutlined />}
              onClick={() => processPayment('Split Payment')}
            >
              Split Payment
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default POSSalesPage;

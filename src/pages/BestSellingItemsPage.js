import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Tag,
  Button,
  Input,
  Select,
  DatePicker,
  Statistic,
  Progress,
  Avatar,
  Space,
  Tooltip,
  Modal,
  Form,
  InputNumber,
  Upload,
  message,
  Typography,
  Divider,
  List,
  Badge,
  Drawer,
  Tabs,
  Rate,
  Image,
  Alert
} from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  DownloadOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  TrophyOutlined,
  FireOutlined,
  RiseOutlined,
  FallOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  BarChartOutlined,
  LineChartOutlined,
  PieChartOutlined,
  CalendarOutlined,
  TagOutlined,
  StarOutlined,
  UserOutlined,
  TeamOutlined,
  ShopOutlined,
  InboxOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const BestSellingItemsPage = () => {
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsDrawerVisible, setDetailsDrawerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [form] = Form.useForm();

  // Sample data for best selling items
  const bestSellingItems = [
    {
      id: 1,
      rank: 1,
      name: 'MacBook Pro 16" M3',
      sku: 'MBP-16-M3-001',
      category: 'Electronics',
      brand: 'Apple',
      image: 'https://via.placeholder.com/60x60?text=MBA',
      unitsSold: 2847,
      revenue: 5694000,
      unitPrice: 2000,
      profitMargin: 18.5,
      stockLevel: 156,
      rating: 4.9,
      reviews: 1284,
      growth: 15.3,
      lastSaleDate: '2025-06-22',
      tags: ['Premium', 'Hot'],
      status: 'active',
      supplier: 'Apple Inc.',
      description: 'Latest MacBook Pro with M3 chip, 16GB RAM, 512GB SSD'
    },
    {
      id: 2,
      rank: 2,
      name: 'iPhone 15 Pro Max',
      sku: 'IPH-15PM-001',
      category: 'Electronics',
      brand: 'Apple',
      image: 'https://via.placeholder.com/60x60?text=IPH',
      unitsSold: 2156,
      revenue: 2586200,
      unitPrice: 1200,
      profitMargin: 22.3,
      stockLevel: 89,
      rating: 4.8,
      reviews: 987,
      growth: 8.7,
      lastSaleDate: '2025-06-22',
      tags: ['New', 'Trending'],
      status: 'active',
      supplier: 'Apple Inc.',
      description: 'Latest iPhone with titanium design and advanced camera system'
    },
    {
      id: 3,
      rank: 3,
      name: 'Samsung Galaxy S24 Ultra',
      sku: 'SGS-24U-001',
      category: 'Electronics',
      brand: 'Samsung',
      image: 'https://via.placeholder.com/60x60?text=SGS',
      unitsSold: 1834,
      revenue: 2017400,
      unitPrice: 1100,
      profitMargin: 19.8,
      stockLevel: 234,
      rating: 4.7,
      reviews: 756,
      growth: -2.1,
      lastSaleDate: '2025-06-21',
      tags: ['Android'],
      status: 'active',
      supplier: 'Samsung Electronics',
      description: 'Premium Android smartphone with S Pen and AI features'
    },
    {
      id: 4,
      rank: 4,
      name: 'AirPods Pro (3rd Gen)',
      sku: 'APP-3G-001',
      category: 'Audio',
      brand: 'Apple',
      image: 'https://via.placeholder.com/60x60?text=APP',
      unitsSold: 3421,
      revenue: 855250,
      unitPrice: 250,
      profitMargin: 28.4,
      stockLevel: 567,
      rating: 4.6,
      reviews: 2145,
      growth: 12.8,
      lastSaleDate: '2025-06-22',
      tags: ['Wireless', 'Premium'],
      status: 'active',
      supplier: 'Apple Inc.',
      description: 'Advanced wireless earbuds with active noise cancellation'
    },
    {
      id: 5,
      rank: 5,
      name: 'Dell XPS 13 Plus',
      sku: 'DXP-13P-001',
      category: 'Electronics',
      brand: 'Dell',
      image: 'https://via.placeholder.com/60x60?text=DXP',
      unitsSold: 1456,
      revenue: 1746200,
      unitPrice: 1200,
      profitMargin: 16.2,
      stockLevel: 78,
      rating: 4.5,
      reviews: 432,
      growth: 6.4,
      lastSaleDate: '2025-06-21',
      tags: ['Business'],
      status: 'active',
      supplier: 'Dell Technologies',
      description: 'Ultra-thin laptop with InfinityEdge display'
    },
    {
      id: 6,
      rank: 6,
      name: 'Sony WH-1000XM5',
      sku: 'SWH-1000XM5',
      category: 'Audio',
      brand: 'Sony',
      image: 'https://via.placeholder.com/60x60?text=SWH',
      unitsSold: 2187,
      revenue: 656100,
      unitPrice: 300,
      profitMargin: 24.7,
      stockLevel: 145,
      rating: 4.8,
      reviews: 1098,
      growth: 18.9,
      lastSaleDate: '2025-06-22',
      tags: ['Noise Cancelling'],
      status: 'active',
      supplier: 'Sony Corporation',
      description: 'Industry-leading noise canceling headphones'
    },
    {
      id: 7,
      rank: 7,
      name: 'iPad Air (M2)',
      sku: 'IPA-M2-001',
      category: 'Tablets',
      brand: 'Apple',
      image: 'https://via.placeholder.com/60x60?text=IPA',
      unitsSold: 1698,
      revenue: 1018800,
      unitPrice: 600,
      profitMargin: 21.5,
      stockLevel: 201,
      rating: 4.7,
      reviews: 876,
      growth: 4.2,
      lastSaleDate: '2025-06-21',
      tags: ['Creative'],
      status: 'active',
      supplier: 'Apple Inc.',
      description: 'Powerful tablet with M2 chip for creative professionals'
    },
    {
      id: 8,
      rank: 8,
      name: 'Nintendo Switch OLED',
      sku: 'NSW-OLED-001',
      category: 'Gaming',
      brand: 'Nintendo',
      image: 'https://via.placeholder.com/60x60?text=NSW',
      unitsSold: 2834,
      revenue: 850200,
      unitPrice: 300,
      profitMargin: 15.8,
      stockLevel: 89,
      rating: 4.6,
      reviews: 1543,
      growth: 22.1,
      lastSaleDate: '2025-06-22',
      tags: ['Gaming', 'Family'],
      status: 'low_stock',
      supplier: 'Nintendo Co.',
      description: 'Handheld gaming console with vibrant OLED screen'
    }
  ];

  // Calculate statistics
  const totalRevenue = bestSellingItems.reduce((sum, item) => sum + item.revenue, 0);
  const totalUnitsSold = bestSellingItems.reduce((sum, item) => sum + item.unitsSold, 0);
  const avgProfitMargin = bestSellingItems.reduce((sum, item) => sum + item.profitMargin, 0) / bestSellingItems.length;
  const topCategories = [...new Set(bestSellingItems.map(item => item.category))];

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: 80,
      render: (rank) => (
        <div style={{ textAlign: 'center' }}>
          {rank <= 3 ? (
            <Badge count={rank} style={{ backgroundColor: rank === 1 ? '#f5222d' : rank === 2 ? '#fa8c16' : '#52c41a' }}>
              <TrophyOutlined style={{ fontSize: '20px', color: rank === 1 ? '#f5222d' : rank === 2 ? '#fa8c16' : '#52c41a' }} />
            </Badge>
          ) : (
            <Text strong>{rank}</Text>
          )}
        </div>
      )
    },
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar 
            src={record.image} 
            size={50}
            shape="square"
            style={{ backgroundColor: 'var(--oracle-color-bg-container)' }}
          />
          <div>
            <div style={{ fontWeight: 600, color: 'var(--oracle-color-text)' }}>{name}</div>
            <div style={{ fontSize: '12px', color: 'var(--oracle-color-text-secondary)' }}>
              SKU: {record.sku}
            </div>
            <div style={{ marginTop: '4px' }}>
              {record.tags.map(tag => (
                <Tag 
                  key={tag} 
                  size="small" 
                  color={tag === 'Hot' ? 'red' : tag === 'New' ? 'green' : tag === 'Trending' ? 'orange' : 'blue'}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => (
        <Tag color="blue">{category}</Tag>
      )
    },
    {
      title: 'Units Sold',
      dataIndex: 'unitsSold',
      key: 'unitsSold',
      sorter: (a, b) => a.unitsSold - b.unitsSold,
      render: (unitsSold) => (
        <Text strong style={{ color: 'var(--oracle-color-primary)' }}>
          {unitsSold.toLocaleString()}
        </Text>
      )
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      sorter: (a, b) => a.revenue - b.revenue,
      render: (revenue) => (
        <Text strong style={{ color: 'var(--oracle-color-success)' }}>
          ${revenue.toLocaleString()}
        </Text>
      )
    },
    {
      title: 'Unit Price',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      sorter: (a, b) => a.unitPrice - b.unitPrice,
      render: (unitPrice) => `$${unitPrice.toLocaleString()}`
    },
    {
      title: 'Profit Margin',
      dataIndex: 'profitMargin',
      key: 'profitMargin',
      sorter: (a, b) => a.profitMargin - b.profitMargin,
      render: (profitMargin) => (
        <div>
          <Text>{profitMargin}%</Text>
          <Progress 
            percent={profitMargin} 
            size="small" 
            showInfo={false}
            strokeColor={profitMargin > 20 ? '#52c41a' : profitMargin > 15 ? '#faad14' : '#ff4d4f'}
          />
        </div>
      )
    },
    {
      title: 'Growth',
      dataIndex: 'growth',
      key: 'growth',
      sorter: (a, b) => a.growth - b.growth,
      render: (growth) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {growth > 0 ? (
            <RiseOutlined style={{ color: '#52c41a' }} />
          ) : (
            <FallOutlined style={{ color: '#ff4d4f' }} />
          )}
          <Text style={{ color: growth > 0 ? '#52c41a' : '#ff4d4f' }}>
            {growth > 0 ? '+' : ''}{growth}%
          </Text>
        </div>
      )
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating, record) => (
        <div>
          <Rate disabled value={rating} style={{ fontSize: '14px' }} />
          <div style={{ fontSize: '12px', color: 'var(--oracle-color-text-secondary)' }}>
            {rating} ({record.reviews} reviews)
          </div>
        </div>
      )
    },
    {
      title: 'Stock',
      dataIndex: 'stockLevel',
      key: 'stockLevel',
      render: (stockLevel, record) => (
        <div>
          <Text style={{ color: stockLevel < 100 ? '#ff4d4f' : '#52c41a' }}>
            {stockLevel}
          </Text>
          {record.status === 'low_stock' && (
            <div>
              <Tag color="red" size="small">Low Stock</Tag>
            </div>
          )}
        </div>
      )
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 120,
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => {
                setSelectedItem(record);
                setDetailsDrawerVisible(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => {
                setSelectedItem(record);
                form.setFieldsValue(record);
                setModalVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  const handleModalOk = () => {
    form.validateFields().then(values => {
      console.log('Form values:', values);
      setModalVisible(false);
      form.resetFields();
      message.success('Item updated successfully!');
    });
  };

  return (
    <div style={{ padding: '24px', backgroundColor: 'var(--oracle-color-bg-layout)' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: 'var(--oracle-color-text)' }}>
          <FireOutlined style={{ marginRight: '12px', color: 'var(--oracle-color-primary)' }} />
          Best Selling Items
        </Title>
        <Text type="secondary">Track and analyze your top performing products</Text>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined style={{ color: 'var(--oracle-color-success)' }} />}
              valueStyle={{ color: 'var(--oracle-color-success)' }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Units Sold"
              value={totalUnitsSold}
              prefix={<ShoppingCartOutlined style={{ color: 'var(--oracle-color-primary)' }} />}
              valueStyle={{ color: 'var(--oracle-color-primary)' }}
              formatter={(value) => value.toLocaleString()}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Profit Margin"
              value={avgProfitMargin}
              prefix={<BarChartOutlined style={{ color: 'var(--oracle-color-warning)' }} />}
              suffix="%"
              precision={1}
              valueStyle={{ color: 'var(--oracle-color-warning)' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Categories"
              value={topCategories.length}
              prefix={<TagOutlined style={{ color: 'var(--oracle-color-info)' }} />}
              valueStyle={{ color: 'var(--oracle-color-info)' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters and Actions */}
      <Card style={{ marginBottom: '16px' }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search items..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Category"
              style={{ width: '100%' }}
              allowClear
            >
              {topCategories.map(category => (
                <Option key={category} value={category}>{category}</Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Status"
              style={{ width: '100%' }}
              value={filterStatus}
              onChange={setFilterStatus}
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active</Option>
              <Option value="low_stock">Low Stock</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col xs={24} md={4}>
            <Space>
              <Button icon={<FilterOutlined />}>
                Filter
              </Button>
              <Button icon={<DownloadOutlined />}>
                Export
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Alert for low stock items */}
      <Alert
        message="Stock Alert"
        description="Some items are running low on stock. Consider restocking soon to avoid stockouts."
        type="warning"
        showIcon
        closable
        style={{ marginBottom: '16px' }}
        action={
          <Button size="small" type="primary">
            View Low Stock
          </Button>
        }
      />

      {/* Main Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={bestSellingItems}
          rowKey="id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
          }}
          scroll={{ x: 1200 }}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
          }}
          summary={(pageData) => (
            <Table.Summary.Row style={{ backgroundColor: 'var(--oracle-color-bg-container)' }}>
              <Table.Summary.Cell colSpan={3}>
                <Text strong>Page Total</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text strong>{pageData.reduce((sum, item) => sum + item.unitsSold, 0).toLocaleString()}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text strong>${pageData.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={5}></Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </Card>

      {/* Edit Modal */}
      <Modal
        title="Edit Best Selling Item"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        width={800}
        okText="Save Changes"
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="sku" label="SKU" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                <Select>
                  {topCategories.map(category => (
                    <Option key={category} value={category}>{category}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="brand" label="Brand">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item name="unitPrice" label="Unit Price" rules={[{ required: true }]}>
                <InputNumber
                  style={{ width: '100%' }}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="profitMargin" label="Profit Margin (%)">
                <InputNumber
                  style={{ width: '100%' }}
                  min={0}
                  max={100}
                  formatter={value => `${value}%`}
                  parser={value => value.replace('%', '')}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="stockLevel" label="Stock Level">
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="description" label="Description">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item name="image" label="Product Image">
            <Upload
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Details Drawer */}
      <Drawer
        title="Product Details"
        placement="right"
        width={600}
        visible={detailsDrawerVisible}
        onClose={() => setDetailsDrawerVisible(false)}
      >
        {selectedItem && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Image
                width={120}
                height={120}
                src={selectedItem.image}
                style={{ borderRadius: '8px' }}
              />
              <Title level={4} style={{ marginTop: '16px', marginBottom: '8px' }}>
                {selectedItem.name}
              </Title>
              <Text type="secondary">SKU: {selectedItem.sku}</Text>
            </div>

            <Tabs defaultActiveKey="1">
              <TabPane tab="Overview" key="1">
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Statistic title="Rank" value={selectedItem.rank} prefix="#" />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Units Sold" value={selectedItem.unitsSold} />
                  </Col>
                  <Col span={12}>
                    <Statistic 
                      title="Revenue" 
                      value={selectedItem.revenue} 
                      formatter={(value) => `$${value.toLocaleString()}`} 
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic 
                      title="Unit Price" 
                      value={selectedItem.unitPrice} 
                      formatter={(value) => `$${value}`} 
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic 
                      title="Profit Margin" 
                      value={selectedItem.profitMargin} 
                      suffix="%" 
                      precision={1}
                    />
                  </Col>
                  <Col span={12}>
                    <Statistic title="Stock Level" value={selectedItem.stockLevel} />
                  </Col>
                </Row>

                <Divider />

                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Rating & Reviews</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Rate disabled value={selectedItem.rating} />
                    <Text style={{ marginLeft: '8px' }}>
                      {selectedItem.rating} ({selectedItem.reviews} reviews)
                    </Text>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Text strong>Growth</Text>
                  <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {selectedItem.growth > 0 ? (
                      <RiseOutlined style={{ color: '#52c41a' }} />
                    ) : (
                      <FallOutlined style={{ color: '#ff4d4f' }} />
                    )}
                    <Text style={{ color: selectedItem.growth > 0 ? '#52c41a' : '#ff4d4f' }}>
                      {selectedItem.growth > 0 ? '+' : ''}{selectedItem.growth}%
                    </Text>
                  </div>
                </div>

                <div>
                  <Text strong>Tags</Text>
                  <div style={{ marginTop: '8px' }}>
                    {selectedItem.tags.map(tag => (
                      <Tag 
                        key={tag} 
                        color={tag === 'Hot' ? 'red' : tag === 'New' ? 'green' : tag === 'Trending' ? 'orange' : 'blue'}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </div>
              </TabPane>

              <TabPane tab="Details" key="2">
                <List>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<ShopOutlined />}
                      title="Category"
                      description={selectedItem.category}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<TagOutlined />}
                      title="Brand"
                      description={selectedItem.brand}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<UserOutlined />}
                      title="Supplier"
                      description={selectedItem.supplier}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={<CalendarOutlined />}
                      title="Last Sale Date"
                      description={selectedItem.lastSaleDate}
                    />
                  </List.Item>
                </List>

                <Divider />

                <div>
                  <Text strong>Description</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text>{selectedItem.description}</Text>
                  </div>
                </div>
              </TabPane>

              <TabPane tab="Performance" key="3">
                <div style={{ textAlign: 'center', padding: '40px' }}>
                  <BarChartOutlined style={{ fontSize: '48px', color: 'var(--oracle-color-text-secondary)' }} />
                  <div style={{ marginTop: '16px' }}>
                    <Text type="secondary">Performance charts and analytics would be displayed here</Text>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default BestSellingItemsPage;

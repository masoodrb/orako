import React, { useState } from 'react';
import { Typography, Card, Row, Col, Select, DatePicker, Space, Button, Table, Tag, Input, Modal } from 'antd';
import { 
  FileTextOutlined, 
  DownloadOutlined,
  EyeOutlined,
  PrinterOutlined,
  ShareAltOutlined,
  SearchOutlined,
  CalendarOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;
const { RangePicker } = DatePicker;

const ReportsPage = () => {
  const [selectedReportType, setSelectedReportType] = useState('financial');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // Sample reports data
  const reportsData = [
    {
      key: '1',
      name: 'Monthly Financial Report',
      type: 'Financial',
      status: 'Completed',
      date: '2025-06-20',
      size: '2.4 MB',
      format: 'PDF',
      description: 'Comprehensive monthly financial overview including P&L, balance sheet, and cash flow'
    },
    {
      key: '2',
      name: 'User Activity Analysis',
      type: 'Analytics',
      status: 'Completed',
      date: '2025-06-19',
      size: '1.8 MB',
      format: 'PDF',
      description: 'Detailed analysis of user activity patterns and engagement metrics'
    },
    {
      key: '3',
      name: 'Sales Performance Report',
      type: 'Sales',
      status: 'Processing',
      date: '2025-06-21',
      size: '3.1 MB',
      format: 'Excel',
      description: 'Sales team performance, targets vs achievements, and pipeline analysis'
    },
    {
      key: '4',
      name: 'Inventory Management Report',
      type: 'Operations',
      status: 'Completed',
      date: '2025-06-18',
      size: '2.9 MB',
      format: 'PDF',
      description: 'Stock levels, turnover rates, and inventory optimization recommendations'
    },
    {
      key: '5',
      name: 'HR Analytics Report',
      type: 'Human Resources',
      status: 'Scheduled',
      date: '2025-06-22',
      size: '-',
      format: 'PDF',
      description: 'Employee performance, retention rates, and workforce analytics'
    },
    {
      key: '6',
      name: 'Security Audit Report',
      type: 'Security',
      status: 'Completed',
      date: '2025-06-17',
      size: '1.2 MB',
      format: 'PDF',
      description: 'System security assessment, vulnerabilities, and compliance status'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'green';
      case 'Processing': return 'blue';
      case 'Scheduled': return 'orange';
      case 'Failed': return 'red';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Report Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{text}</div>
          <div style={{ fontSize: '12px', color: 'var(--orako-text-secondary)' }}>
            {record.description}
          </div>
        </div>
      )
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      filters: [
        { text: 'Financial', value: 'Financial' },
        { text: 'Analytics', value: 'Analytics' },
        { text: 'Sales', value: 'Sales' },
        { text: 'Operations', value: 'Operations' },
        { text: 'Human Resources', value: 'Human Resources' },
        { text: 'Security', value: 'Security' }
      ],
      onFilter: (value, record) => record.type.includes(value),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
      filters: [
        { text: 'Completed', value: 'Completed' },
        { text: 'Processing', value: 'Processing' },
        { text: 'Scheduled', value: 'Scheduled' },
        { text: 'Failed', value: 'Failed' }
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: 'Format',
      dataIndex: 'format',
      key: 'format',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            icon={<EyeOutlined />} 
            size="small"
            onClick={() => {
              setSelectedReport(record);
              setIsModalVisible(true);
            }}
            disabled={record.status !== 'Completed'}
          >
            View
          </Button>
          <Button 
            icon={<DownloadOutlined />} 
            size="small"
            disabled={record.status !== 'Completed'}
          >
            Download
          </Button>
          <Button 
            icon={<ShareAltOutlined />} 
            size="small"
            disabled={record.status !== 'Completed'}
          >
            Share
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div className="page-header">
        <Title level={1}>Reports</Title>
        <Paragraph>
          Generate, view, and manage comprehensive business reports for your Orako Cloud ERP system.
          Access financial reports, analytics, compliance documents, and custom reports.
        </Paragraph>
      </div>

      {/* Report Generation Controls */}
      <Card title="Generate New Report" style={{ marginBottom: '24px' }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={6}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Report Type:</label>
            <Select
              value={selectedReportType}
              onChange={setSelectedReportType}
              style={{ width: '100%' }}
              options={[
                { value: 'financial', label: 'Financial Report' },
                { value: 'analytics', label: 'Analytics Report' },
                { value: 'sales', label: 'Sales Report' },
                { value: 'operations', label: 'Operations Report' },
                { value: 'hr', label: 'HR Report' },
                { value: 'security', label: 'Security Report' }
              ]}
            />
          </Col>
          <Col xs={24} md={6}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Date Range:</label>
            <RangePicker style={{ width: '100%' }} />
          </Col>
          <Col xs={24} md={6}>
            <label style={{ display: 'block', marginBottom: '8px' }}>Format:</label>
            <Select
              defaultValue="pdf"
              style={{ width: '100%' }}
              options={[
                { value: 'pdf', label: 'PDF' },
                { value: 'excel', label: 'Excel' },
                { value: 'csv', label: 'CSV' },
                { value: 'word', label: 'Word' }
              ]}
            />
          </Col>
          <Col xs={24} md={6}>
            <label style={{ display: 'block', marginBottom: '8px' }}>&nbsp;</label>
            <Space>
              <Button type="primary" icon={<FileTextOutlined />}>
                Generate Report
              </Button>
              <Button icon={<CalendarOutlined />}>
                Schedule
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Reports Table */}
      <Card title="Report History" className="reports-table">
        <div style={{ marginBottom: '16px' }}>
          <Input
            placeholder="Search reports..."
            prefix={<SearchOutlined />}
            style={{ width: 300 }}
          />
        </div>
        <Table
          dataSource={reportsData}
          columns={columns}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} reports`
          }}
          size="middle"
        />
      </Card>

      {/* Report Preview Modal */}
      <Modal
        title={selectedReport?.name}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="print" icon={<PrinterOutlined />}>
            Print
          </Button>,
          <Button key="download" type="primary" icon={<DownloadOutlined />}>
            Download
          </Button>,
        ]}
        width={800}
      >
        {selectedReport && (
          <div>
            <div style={{ marginBottom: '16px' }}>
              <strong>Type:</strong> {selectedReport.type}<br />
              <strong>Generated:</strong> {selectedReport.date}<br />
              <strong>Size:</strong> {selectedReport.size}<br />
              <strong>Format:</strong> {selectedReport.format}
            </div>
            <div style={{ 
              height: '400px', 
              background: 'var(--orako-bg-secondary)', 
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--orako-border)'
            }}>
              <div style={{ textAlign: 'center', color: 'var(--orako-text-secondary)' }}>
                <FileTextOutlined style={{ fontSize: '64px', marginBottom: '16px' }} />
                <div style={{ fontSize: '18px', marginBottom: '8px' }}>Report Preview</div>
                <div>In a real application, this would show the actual report content</div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ReportsPage;

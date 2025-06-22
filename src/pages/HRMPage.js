import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Table,
  Button,
  Input,
  Select,
  DatePicker,
  Statistic,
  Tag,
  Avatar,
  Progress,
  Tabs,
  Space,
  Badge,
  Timeline,
  Rate,
  Typography,
  Tooltip,
  Calendar
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  DollarOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  SafetyCertificateOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  StarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Title } = Typography;

const HRMPage = () => {
  const [selectedTab, setSelectedTab] = useState('employees');

  // Sample employee data
  const employeesData = [
    {
      key: '1',
      employeeId: 'EMP001',
      name: 'Sarah Johnson',
      position: 'Senior Software Engineer',
      department: 'Engineering',
      manager: 'John Smith',
      hireDate: '2023-01-15',
      salary: 95000,
      status: 'Active',
      email: 'sarah.johnson@company.com',
      phone: '+1-555-0123',
      location: 'San Francisco, CA',
      performance: 4.5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
    },
    {
      key: '2',
      employeeId: 'EMP002',
      name: 'Mike Wilson',
      position: 'Product Manager',
      department: 'Product',
      manager: 'Lisa Park',
      hireDate: '2022-08-10',
      salary: 105000,
      status: 'Active',
      email: 'mike.wilson@company.com',
      phone: '+1-555-0456',
      location: 'New York, NY',
      performance: 4.2,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      key: '3',
      employeeId: 'EMP003',
      name: 'Lisa Park',
      position: 'VP of Engineering',
      department: 'Engineering',
      manager: 'CEO',
      hireDate: '2021-03-22',
      salary: 145000,
      status: 'Active',
      email: 'lisa.park@company.com',
      phone: '+1-555-0789',
      location: 'Austin, TX',
      performance: 4.8,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    }
  ];

  // Sample recruitment data
  const recruitmentData = [
    {
      key: '1',
      position: 'Senior Frontend Developer',
      department: 'Engineering',
      status: 'Active',
      applicants: 45,
      interviews: 8,
      offers: 2,
      hired: 0,
      recruiter: 'HR Team',
      posted: '2025-06-01'
    },
    {
      key: '2',
      position: 'Product Designer',
      department: 'Design',
      status: 'Active',
      applicants: 32,
      interviews: 5,
      offers: 1,
      hired: 1,
      recruiter: 'Sarah Chen',
      posted: '2025-05-15'
    },
    {
      key: '3',
      position: 'DevOps Engineer',
      department: 'Engineering',
      status: 'Closed',
      applicants: 28,
      interviews: 6,
      offers: 2,
      hired: 1,
      recruiter: 'Mike Davis',
      posted: '2025-04-20'
    }
  ];

  // Sample attendance data
  const attendanceData = [
    {
      key: '1',
      employee: 'Sarah Johnson',
      department: 'Engineering',
      workingDays: 22,
      present: 21,
      absent: 1,
      late: 0,
      overtime: 15,
      attendanceRate: 95.5
    },
    {
      key: '2',
      employee: 'Mike Wilson',
      department: 'Product',
      workingDays: 22,
      present: 22,
      absent: 0,
      late: 2,
      overtime: 8,
      attendanceRate: 100
    },
    {
      key: '3',
      employee: 'Lisa Park',
      department: 'Engineering',
      workingDays: 22,
      present: 20,
      absent: 2,
      late: 1,
      overtime: 25,
      attendanceRate: 90.9
    }
  ];

  // Sample payroll data
  const payrollData = [
    {
      key: '1',
      employee: 'Sarah Johnson',
      basicSalary: 95000,
      allowances: 5000,
      overtime: 3200,
      grossSalary: 103200,
      deductions: 18576,
      netSalary: 84624,
      payPeriod: 'June 2025'
    },
    {
      key: '2',
      employee: 'Mike Wilson',
      basicSalary: 105000,
      allowances: 8000,
      overtime: 1800,
      grossSalary: 114800,
      deductions: 20664,
      netSalary: 94136,
      payPeriod: 'June 2025'
    },
    {
      key: '3',
      employee: 'Lisa Park',
      basicSalary: 145000,
      allowances: 12000,
      overtime: 5500,
      grossSalary: 162500,
      deductions: 29250,
      netSalary: 133250,
      payPeriod: 'June 2025'
    }
  ];

  const employeeColumns = [
    {
      title: 'Employee',
      key: 'employee',
      render: (_, record) => (
        <Space>
          <Avatar 
            size="large" 
            src={record.avatar}
            style={{ backgroundColor: record.avatar ? 'transparent' : 'var(--oracle-primary)' }}
          >
            {!record.avatar && record.name.split(' ').map(n => n[0]).join('')}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600 }}>{record.name}</div>
            <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
              {record.employeeId}
            </div>
          </div>
        </Space>
      ),
    },
    {
      title: 'Position',
      key: 'position',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 500 }}>{record.position}</div>
          <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
            {record.department}
          </div>
        </div>
      ),
    },
    {
      title: 'Contact',
      key: 'contact',
      render: (_, record) => (
        <div>
          <div><MailOutlined /> {record.email}</div>
          <div><PhoneOutlined /> {record.phone}</div>
          <div><EnvironmentOutlined /> {record.location}</div>
        </div>
      ),
    },
    {
      title: 'Manager',
      dataIndex: 'manager',
      key: 'manager',
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => `$${salary.toLocaleString()}`,
    },
    {
      title: 'Performance',
      dataIndex: 'performance',
      key: 'performance',
      render: (rating) => (
        <div>
          <Rate disabled defaultValue={rating} allowHalf />
          <div style={{ fontSize: '12px' }}>{rating}/5.0</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'green' : 'red'}>{status}</Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const recruitmentColumns = [
    {
      title: 'Position',
      key: 'position',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.position}</div>
          <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
            {record.department}
          </div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'Active' ? 'blue' : 'green'}>{status}</Tag>
      ),
    },
    {
      title: 'Applicants',
      dataIndex: 'applicants',
      key: 'applicants',
      render: (count) => <Badge count={count} style={{ backgroundColor: 'var(--oracle-secondary)' }} />,
    },
    {
      title: 'Interviews',
      dataIndex: 'interviews',
      key: 'interviews',
    },
    {
      title: 'Offers',
      dataIndex: 'offers',
      key: 'offers',
    },
    {
      title: 'Hired',
      dataIndex: 'hired',
      key: 'hired',
      render: (count) => <span style={{ color: 'var(--oracle-success)' }}>{count}</span>,
    },
    {
      title: 'Recruiter',
      dataIndex: 'recruiter',
      key: 'recruiter',
    },
    {
      title: 'Posted',
      dataIndex: 'posted',
      key: 'posted',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const attendanceColumns = [
    {
      title: 'Employee',
      key: 'employee',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 600 }}>{record.employee}</div>
          <div style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
            {record.department}
          </div>
        </div>
      ),
    },
    {
      title: 'Working Days',
      dataIndex: 'workingDays',
      key: 'workingDays',
    },
    {
      title: 'Present',
      dataIndex: 'present',
      key: 'present',
      render: (days) => <span style={{ color: 'var(--oracle-success)' }}>{days}</span>,
    },
    {
      title: 'Absent',
      dataIndex: 'absent',
      key: 'absent',
      render: (days) => days > 0 ? <span style={{ color: 'var(--oracle-error)' }}>{days}</span> : days,
    },
    {
      title: 'Late',
      dataIndex: 'late',
      key: 'late',
      render: (days) => days > 0 ? <span style={{ color: 'var(--oracle-warning)' }}>{days}</span> : days,
    },
    {
      title: 'Overtime (hrs)',
      dataIndex: 'overtime',
      key: 'overtime',
    },
    {
      title: 'Attendance Rate',
      dataIndex: 'attendanceRate',
      key: 'attendanceRate',
      render: (rate) => (
        <Progress 
          percent={rate} 
          size="small" 
          strokeColor={rate >= 95 ? 'var(--oracle-success)' : rate >= 90 ? 'var(--oracle-warning)' : 'var(--oracle-error)'}
          format={percent => `${percent}%`}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const payrollColumns = [
    {
      title: 'Employee',
      dataIndex: 'employee',
      key: 'employee',
      render: (name) => <span style={{ fontWeight: 600 }}>{name}</span>,
    },
    {
      title: 'Basic Salary',
      dataIndex: 'basicSalary',
      key: 'basicSalary',
      render: (amount) => `$${amount.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Allowances',
      dataIndex: 'allowances',
      key: 'allowances',
      render: (amount) => `$${amount.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Overtime',
      dataIndex: 'overtime',
      key: 'overtime',
      render: (amount) => `$${amount.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Gross Salary',
      dataIndex: 'grossSalary',
      key: 'grossSalary',
      render: (amount) => <span style={{ fontWeight: 600 }}>`$${amount.toLocaleString()}`</span>,
      align: 'right',
    },
    {
      title: 'Deductions',
      dataIndex: 'deductions',
      key: 'deductions',
      render: (amount) => <span style={{ color: 'var(--oracle-error)' }}>`$${amount.toLocaleString()}`</span>,
      align: 'right',
    },
    {
      title: 'Net Salary',
      dataIndex: 'netSalary',
      key: 'netSalary',
      render: (amount) => <span style={{ color: 'var(--oracle-success)', fontWeight: 600 }}>`$${amount.toLocaleString()}`</span>,
      align: 'right',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<FileTextOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const recentActivities = [
    {
      time: '1 hour ago',
      activity: 'New employee onboarding completed',
      user: 'Sarah Johnson',
      type: 'onboarding'
    },
    {
      time: '3 hours ago',
      activity: 'Performance review scheduled',
      user: 'Mike Wilson',
      type: 'review'
    },
    {
      time: '5 hours ago',
      activity: 'Leave request approved',
      user: 'Lisa Park',
      type: 'leave'
    },
    {
      time: '1 day ago',
      activity: 'New job posting published',
      user: 'HR Team',
      type: 'recruitment'
    }
  ];

  const tabItems = [
    {
      key: 'employees',
      label: (
        <Space>
          <TeamOutlined />
          <span>Employees</span>
          <Badge count={employeesData.length} />
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Search placeholder="Search employees..." enterButton />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Select placeholder="Department" style={{ width: '100%' }}>
                <Option value="engineering">Engineering</Option>
                <Option value="product">Product</Option>
                <Option value="design">Design</Option>
                <Option value="sales">Sales</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder="Status" style={{ width: '100%' }}>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={6}>
              <Button type="primary" icon={<PlusOutlined />} block>
                Add Employee
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={employeesData} 
            columns={employeeColumns} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1200 }}
          />
        </div>
      ),
    },
    {
      key: 'recruitment',
      label: (
        <Space>
          <UserOutlined />
          <span>Recruitment</span>
          <Badge count={recruitmentData.filter(r => r.status === 'Active').length} style={{ backgroundColor: 'var(--oracle-secondary)' }} />
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Search placeholder="Search positions..." enterButton />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Select placeholder="Department" style={{ width: '100%' }}>
                <Option value="engineering">Engineering</Option>
                <Option value="product">Product</Option>
                <Option value="design">Design</Option>
                <Option value="sales">Sales</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder="Status" style={{ width: '100%' }}>
                <Option value="active">Active</Option>
                <Option value="closed">Closed</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={6}>
              <Button type="primary" icon={<PlusOutlined />} block>
                New Position
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={recruitmentData} 
            columns={recruitmentColumns} 
            pagination={{ pageSize: 10 }}
            scroll={{ x: 800 }}
          />
        </div>
      ),
    },
    {
      key: 'attendance',
      label: (
        <Space>
          <ClockCircleOutlined />
          <span>Attendance</span>
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Search placeholder="Search employees..." enterButton />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={8}>
              <Select placeholder="Department" style={{ width: '100%' }}>
                <Option value="engineering">Engineering</Option>
                <Option value="product">Product</Option>
                <Option value="design">Design</Option>
              </Select>
            </Col>
            <Col span={8}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={8}>
              <Button icon={<FileTextOutlined />} block>
                Export Report
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={attendanceData} 
            columns={attendanceColumns} 
            pagination={{ pageSize: 15 }}
            scroll={{ x: 800 }}
          />
        </div>
      ),
    },
    {
      key: 'payroll',
      label: (
        <Space>
          <DollarOutlined />
          <span>Payroll</span>
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '16px' }}>
            <Col span={8}>
              <Search placeholder="Search employees..." enterButton />
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Select placeholder="Pay Period" style={{ width: '100%' }}>
                <Option value="june-2025">June 2025</Option>
                <Option value="may-2025">May 2025</Option>
                <Option value="april-2025">April 2025</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Select placeholder="Department" style={{ width: '100%' }}>
                <Option value="engineering">Engineering</Option>
                <Option value="product">Product</Option>
                <Option value="design">Design</Option>
              </Select>
            </Col>
            <Col span={6}>
              <Button type="primary" icon={<DollarOutlined />} block>
                Process Payroll
              </Button>
            </Col>
            <Col span={6}>
              <Button icon={<FileTextOutlined />} block>
                Export
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={payrollData} 
            columns={payrollColumns} 
            pagination={{ pageSize: 15 }}
            scroll={{ x: 1000 }}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0}>
                    <strong>Total</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={1}>
                    <strong>$345,000</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={2}>
                    <strong>$25,000</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={3}>
                    <strong>$10,500</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    <strong>$380,500</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <strong>$68,490</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6}>
                    <strong>$312,010</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={7} />
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>Human Resource Management</h1>
        <p>Complete HR solution for employee management, recruitment, attendance tracking, and payroll processing</p>
      </div>

      {/* HR KPI Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Employees"
              value={156}
              prefix={<TeamOutlined />}
              valueStyle={{ color: 'var(--oracle-primary)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-success)' }}>
                +12 new hires this month
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Open Positions"
              value={8}
              prefix={<UserOutlined />}
              valueStyle={{ color: 'var(--oracle-secondary)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                125 total applicants
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg. Attendance"
              value={95.5}
              suffix="%"
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: 'var(--oracle-success)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-success)' }}>
                +2.1% from last month
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Payroll"
              value={312010}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: 'var(--oracle-warning)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                3 employees
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={18}>
          {/* Main HRM Tabs */}
          <Card>
            <Tabs
              activeKey={selectedTab}
              onChange={setSelectedTab}
              items={tabItems}
              size="large"
            />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          {/* Recent HR Activities */}
          <Card title="Recent HR Activities" size="small">
            <Timeline
              items={recentActivities.map((activity, index) => ({
                children: (
                  <div key={index}>
                    <div style={{ fontWeight: 500, fontSize: '13px' }}>
                      {activity.activity}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: 'var(--oracle-text-secondary)',
                      marginTop: '4px'
                    }}>
                      {activity.user} • {activity.time}
                    </div>
                  </div>
                ),
                color: activity.type === 'onboarding' ? 'green' : 
                       activity.type === 'review' ? 'blue' :
                       activity.type === 'leave' ? 'orange' : 'purple'
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HRMPage;

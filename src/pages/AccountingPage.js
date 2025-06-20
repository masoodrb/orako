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
  Tabs,
  Form,
  Space,
  Badge,
  Progress,
  Divider,
  Typography,
  Modal,
  InputNumber
} from 'antd';
import {
  DollarOutlined,
  BankOutlined,
  FileTextOutlined,
  CalendarOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  DownloadOutlined,
  PrinterOutlined,
  SearchOutlined,
  RiseOutlined,
  FallOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { Search } = Input;
const { Title } = Typography;

const AccountingPage = () => {
  const [selectedTab, setSelectedTab] = useState('general-ledger');
  const [modalVisible, setModalVisible] = useState(false);

  // Sample data for General Ledger
  const generalLedgerData = [
    {
      key: '1',
      date: '2025-06-21',
      reference: 'INV-2025-001',
      description: 'Sales Invoice - Oracle Corporation',
      account: 'Revenue',
      debit: 125000,
      credit: 0,
      balance: 125000
    },
    {
      key: '2',
      date: '2025-06-21',
      reference: 'INV-2025-001',
      description: 'Sales Invoice - Oracle Corporation',
      account: 'Accounts Receivable',
      debit: 0,
      credit: 125000,
      balance: 125000
    },
    {
      key: '3',
      date: '2025-06-20',
      reference: 'BILL-2025-045',
      description: 'Office Supplies Purchase',
      account: 'Office Expenses',
      debit: 2500,
      credit: 0,
      balance: 2500
    },
    {
      key: '4',
      date: '2025-06-20',
      reference: 'BILL-2025-045',
      description: 'Office Supplies Purchase',
      account: 'Accounts Payable',
      debit: 0,
      credit: 2500,
      balance: 2500
    }
  ];

  // Sample data for Accounts Receivable
  const accountsReceivableData = [
    {
      key: '1',
      customer: 'Oracle Corporation',
      invoiceNumber: 'INV-2025-001',
      invoiceDate: '2025-06-21',
      dueDate: '2025-07-21',
      amount: 125000,
      outstanding: 125000,
      overdue: 0,
      status: 'Outstanding'
    },
    {
      key: '2',
      customer: 'Microsoft Corp',
      invoiceNumber: 'INV-2025-002',
      invoiceDate: '2025-06-15',
      dueDate: '2025-07-15',
      amount: 89000,
      outstanding: 89000,
      overdue: 0,
      status: 'Outstanding'
    },
    {
      key: '3',
      customer: 'Salesforce Inc',
      invoiceNumber: 'INV-2025-003',
      invoiceDate: '2025-05-28',
      dueDate: '2025-06-28',
      amount: 156000,
      outstanding: 0,
      overdue: 0,
      status: 'Paid'
    }
  ];

  // Sample data for Accounts Payable
  const accountsPayableData = [
    {
      key: '1',
      vendor: 'Office Depot',
      billNumber: 'BILL-2025-045',
      billDate: '2025-06-20',
      dueDate: '2025-07-20',
      amount: 2500,
      outstanding: 2500,
      overdue: 0,
      status: 'Outstanding'
    },
    {
      key: '2',
      vendor: 'Tech Solutions Ltd',
      billNumber: 'BILL-2025-046',
      billDate: '2025-06-18',
      dueDate: '2025-07-18',
      amount: 15000,
      outstanding: 15000,
      overdue: 0,
      status: 'Outstanding'
    },
    {
      key: '3',
      vendor: 'Cloud Services Inc',
      billNumber: 'BILL-2025-047',
      billDate: '2025-05-25',
      dueDate: '2025-06-25',
      amount: 8500,
      outstanding: 0,
      overdue: 0,
      status: 'Paid'
    }
  ];

  // Balance Sheet Data
  const balanceSheetData = {
    assets: {
      currentAssets: {
        cash: 500000,
        accountsReceivable: 214000,
        inventory: 150000,
        prepaidExpenses: 25000
      },
      fixedAssets: {
        equipment: 200000,
        accumulatedDepreciation: -50000,
        buildingAndLand: 800000
      }
    },
    liabilities: {
      currentLiabilities: {
        accountsPayable: 17500,
        accrued: 15000,
        shortTermDebt: 50000
      },
      longTermLiabilities: {
        longTermDebt: 300000,
        deferredTax: 25000
      }
    },
    equity: {
      capital: 1000000,
      retainedEarnings: 481500
    }
  };

  // Profit & Loss Data
  const profitLossData = {
    revenue: {
      salesRevenue: 2500000,
      serviceRevenue: 500000,
      otherRevenue: 50000
    },
    expenses: {
      costOfGoodsSold: 1200000,
      salaries: 600000,
      rent: 120000,
      utilities: 36000,
      marketing: 80000,
      depreciation: 25000,
      otherExpenses: 45000
    }
  };

  const generalLedgerColumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Reference',
      dataIndex: 'reference',
      key: 'reference',
      render: (ref) => <span style={{ fontFamily: 'monospace' }}>{ref}</span>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
      render: (account) => <Tag color="blue">{account}</Tag>,
    },
    {
      title: 'Debit',
      dataIndex: 'debit',
      key: 'debit',
      render: (amount) => amount > 0 ? `$${amount.toLocaleString()}` : '-',
      align: 'right',
    },
    {
      title: 'Credit',
      dataIndex: 'credit',
      key: 'credit',
      render: (amount) => amount > 0 ? `$${amount.toLocaleString()}` : '-',
      align: 'right',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (amount) => `$${amount.toLocaleString()}`,
      align: 'right',
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

  const receivableColumns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      render: (customer) => <span style={{ fontWeight: 600 }}>{customer}</span>,
    },
    {
      title: 'Invoice #',
      dataIndex: 'invoiceNumber',
      key: 'invoiceNumber',
      render: (invoice) => <span style={{ fontFamily: 'monospace' }}>{invoice}</span>,
    },
    {
      title: 'Invoice Date',
      dataIndex: 'invoiceDate',
      key: 'invoiceDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => {
        const isOverdue = dayjs(date).isBefore(dayjs());
        return (
          <span style={{ color: isOverdue ? 'var(--oracle-error)' : 'inherit' }}>
            {dayjs(date).format('MMM DD, YYYY')}
          </span>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Outstanding',
      dataIndex: 'outstanding',
      key: 'outstanding',
      render: (amount) => `$${amount.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          'Outstanding': 'orange',
          'Paid': 'green',
          'Overdue': 'red'
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<DownloadOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const payableColumns = [
    {
      title: 'Vendor',
      dataIndex: 'vendor',
      key: 'vendor',
      render: (vendor) => <span style={{ fontWeight: 600 }}>{vendor}</span>,
    },
    {
      title: 'Bill #',
      dataIndex: 'billNumber',
      key: 'billNumber',
      render: (bill) => <span style={{ fontFamily: 'monospace' }}>{bill}</span>,
    },
    {
      title: 'Bill Date',
      dataIndex: 'billDate',
      key: 'billDate',
      render: (date) => dayjs(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => {
        const isOverdue = dayjs(date).isBefore(dayjs());
        return (
          <span style={{ color: isOverdue ? 'var(--oracle-error)' : 'inherit' }}>
            {dayjs(date).format('MMM DD, YYYY')}
          </span>
        );
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Outstanding',
      dataIndex: 'outstanding',
      key: 'outstanding',
      render: (amount) => `$${amount.toLocaleString()}`,
      align: 'right',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = {
          'Outstanding': 'orange',
          'Paid': 'green',
          'Overdue': 'red'
        };
        return <Tag color={colors[status]}>{status}</Tag>;
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" />
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<DownloadOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  const renderBalanceSheetItem = (label, amount, level = 0) => (
    <Row justify="space-between" style={{ 
      paddingLeft: level * 20, 
      marginBottom: '8px',
      fontSize: level === 0 ? '16px' : '14px',
      fontWeight: level === 0 ? 600 : 400
    }}>
      <Col>{label}</Col>
      <Col style={{ fontFamily: 'monospace' }}>
        {amount < 0 ? `(${Math.abs(amount).toLocaleString()})` : amount.toLocaleString()}
      </Col>
    </Row>
  );

  const totalCurrentAssets = Object.values(balanceSheetData.assets.currentAssets).reduce((a, b) => a + b, 0);
  const totalFixedAssets = Object.values(balanceSheetData.assets.fixedAssets).reduce((a, b) => a + b, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  const totalCurrentLiabilities = Object.values(balanceSheetData.liabilities.currentLiabilities).reduce((a, b) => a + b, 0);
  const totalLongTermLiabilities = Object.values(balanceSheetData.liabilities.longTermLiabilities).reduce((a, b) => a + b, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = Object.values(balanceSheetData.equity).reduce((a, b) => a + b, 0);

  const totalRevenue = Object.values(profitLossData.revenue).reduce((a, b) => a + b, 0);
  const totalExpenses = Object.values(profitLossData.expenses).reduce((a, b) => a + b, 0);
  const netIncome = totalRevenue - totalExpenses;

  const tabItems = [
    {
      key: 'general-ledger',
      label: (
        <Space>
          <FileTextOutlined />
          <span>General Ledger</span>
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Search placeholder="Search transactions..." enterButton />
            </Col>
            <Col span={4}>
              <Select placeholder="Account" style={{ width: '100%' }}>
                <Option value="revenue">Revenue</Option>
                <Option value="expenses">Expenses</Option>
                <Option value="assets">Assets</Option>
                <Option value="liabilities">Liabilities</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={4}>
              <Button type="primary" icon={<PlusOutlined />} block>
                New Entry
              </Button>
            </Col>
            <Col span={4}>
              <Button icon={<DownloadOutlined />} block>
                Export
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={generalLedgerData} 
            columns={generalLedgerColumns} 
            pagination={{ pageSize: 20 }}
            scroll={{ x: 800 }}
            summary={() => (
              <Table.Summary fixed>
                <Table.Summary.Row>
                  <Table.Summary.Cell index={0} colSpan={4}>
                    <strong>Total</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={4}>
                    <strong>$127,500</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={5}>
                    <strong>$127,500</strong>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell index={6} />
                  <Table.Summary.Cell index={7} />
                </Table.Summary.Row>
              </Table.Summary>
            )}
          />
        </div>
      ),
    },
    {
      key: 'accounts-receivable',
      label: (
        <Space>
          <RiseOutlined />
          <span>Accounts Receivable</span>
          <Badge count="$214K" style={{ backgroundColor: 'var(--oracle-secondary)' }} />
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Search placeholder="Search customers..." enterButton />
            </Col>
            <Col span={4}>
              <Select placeholder="Status" style={{ width: '100%' }}>
                <Option value="outstanding">Outstanding</Option>
                <Option value="paid">Paid</Option>
                <Option value="overdue">Overdue</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={4}>
              <Button type="primary" icon={<PlusOutlined />} block>
                New Invoice
              </Button>
            </Col>
            <Col span={4}>
              <Button icon={<PrinterOutlined />} block>
                Print Report
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={accountsReceivableData} 
            columns={receivableColumns} 
            pagination={{ pageSize: 15 }}
            scroll={{ x: 800 }}
          />
        </div>
      ),
    },
    {
      key: 'accounts-payable',
      label: (
        <Space>
          <FallOutlined />
          <span>Accounts Payable</span>
          <Badge count="$17.5K" style={{ backgroundColor: 'var(--oracle-warning)' }} />
        </Space>
      ),
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Search placeholder="Search vendors..." enterButton />
            </Col>
            <Col span={4}>
              <Select placeholder="Status" style={{ width: '100%' }}>
                <Option value="outstanding">Outstanding</Option>
                <Option value="paid">Paid</Option>
                <Option value="overdue">Overdue</Option>
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker style={{ width: '100%' }} />
            </Col>
            <Col span={4}>
              <Button type="primary" icon={<PlusOutlined />} block>
                New Bill
              </Button>
            </Col>
            <Col span={4}>
              <Button icon={<PrinterOutlined />} block>
                Print Report
              </Button>
            </Col>
          </Row>
          <Table 
            dataSource={accountsPayableData} 
            columns={payableColumns} 
            pagination={{ pageSize: 15 }}
            scroll={{ x: 800 }}
          />
        </div>
      ),
    },
    {
      key: 'balance-sheet',
      label: (
        <Space>
          <BankOutlined />
          <span>Balance Sheet</span>
        </Space>
      ),
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Assets" className="oracle-shadow-md">
              <div style={{ marginBottom: '16px' }}>
                <Title level={5}>Current Assets</Title>
                {renderBalanceSheetItem('Cash', balanceSheetData.assets.currentAssets.cash, 1)}
                {renderBalanceSheetItem('Accounts Receivable', balanceSheetData.assets.currentAssets.accountsReceivable, 1)}
                {renderBalanceSheetItem('Inventory', balanceSheetData.assets.currentAssets.inventory, 1)}
                {renderBalanceSheetItem('Prepaid Expenses', balanceSheetData.assets.currentAssets.prepaidExpenses, 1)}
                <Divider />
                {renderBalanceSheetItem('Total Current Assets', totalCurrentAssets, 0)}
              </div>
              
              <div>
                <Title level={5}>Fixed Assets</Title>
                {renderBalanceSheetItem('Equipment', balanceSheetData.assets.fixedAssets.equipment, 1)}
                {renderBalanceSheetItem('Accumulated Depreciation', balanceSheetData.assets.fixedAssets.accumulatedDepreciation, 1)}
                {renderBalanceSheetItem('Building & Land', balanceSheetData.assets.fixedAssets.buildingAndLand, 1)}
                <Divider />
                {renderBalanceSheetItem('Total Fixed Assets', totalFixedAssets, 0)}
              </div>
              
              <Divider style={{ borderColor: 'var(--oracle-primary)' }} />
              {renderBalanceSheetItem('TOTAL ASSETS', totalAssets, 0)}
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card title="Liabilities & Equity" className="oracle-shadow-md">
              <div style={{ marginBottom: '16px' }}>
                <Title level={5}>Current Liabilities</Title>
                {renderBalanceSheetItem('Accounts Payable', balanceSheetData.liabilities.currentLiabilities.accountsPayable, 1)}
                {renderBalanceSheetItem('Accrued Expenses', balanceSheetData.liabilities.currentLiabilities.accrued, 1)}
                {renderBalanceSheetItem('Short-term Debt', balanceSheetData.liabilities.currentLiabilities.shortTermDebt, 1)}
                <Divider />
                {renderBalanceSheetItem('Total Current Liabilities', totalCurrentLiabilities, 0)}
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <Title level={5}>Long-term Liabilities</Title>
                {renderBalanceSheetItem('Long-term Debt', balanceSheetData.liabilities.longTermLiabilities.longTermDebt, 1)}
                {renderBalanceSheetItem('Deferred Tax', balanceSheetData.liabilities.longTermLiabilities.deferredTax, 1)}
                <Divider />
                {renderBalanceSheetItem('Total Long-term Liabilities', totalLongTermLiabilities, 0)}
              </div>
              
              <div>
                <Title level={5}>Equity</Title>
                {renderBalanceSheetItem('Capital', balanceSheetData.equity.capital, 1)}
                {renderBalanceSheetItem('Retained Earnings', balanceSheetData.equity.retainedEarnings, 1)}
                <Divider />
                {renderBalanceSheetItem('Total Equity', totalEquity, 0)}
              </div>
              
              <Divider style={{ borderColor: 'var(--oracle-primary)' }} />
              {renderBalanceSheetItem('TOTAL LIAB. & EQUITY', totalLiabilities + totalEquity, 0)}
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: 'profit-loss',
      label: (
        <Space>
          <DollarOutlined />
          <span>Profit & Loss</span>
        </Space>
      ),
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={12}>
            <Card title="Revenue" className="oracle-shadow-md">
              {renderBalanceSheetItem('Sales Revenue', profitLossData.revenue.salesRevenue, 1)}
              {renderBalanceSheetItem('Service Revenue', profitLossData.revenue.serviceRevenue, 1)}
              {renderBalanceSheetItem('Other Revenue', profitLossData.revenue.otherRevenue, 1)}
              <Divider />
              {renderBalanceSheetItem('Total Revenue', totalRevenue, 0)}
            </Card>
          </Col>
          
          <Col xs={24} lg={12}>
            <Card title="Expenses" className="oracle-shadow-md">
              {renderBalanceSheetItem('Cost of Goods Sold', profitLossData.expenses.costOfGoodsSold, 1)}
              {renderBalanceSheetItem('Salaries & Benefits', profitLossData.expenses.salaries, 1)}
              {renderBalanceSheetItem('Rent', profitLossData.expenses.rent, 1)}
              {renderBalanceSheetItem('Utilities', profitLossData.expenses.utilities, 1)}
              {renderBalanceSheetItem('Marketing', profitLossData.expenses.marketing, 1)}
              {renderBalanceSheetItem('Depreciation', profitLossData.expenses.depreciation, 1)}
              {renderBalanceSheetItem('Other Expenses', profitLossData.expenses.otherExpenses, 1)}
              <Divider />
              {renderBalanceSheetItem('Total Expenses', totalExpenses, 0)}
            </Card>
          </Col>
          
          <Col span={24}>
            <Card className="oracle-shadow-md">
              <Row justify="center">
                <Col>
                  <Statistic
                    title="Net Income"
                    value={netIncome}
                    prefix={<DollarOutlined />}
                    precision={0}
                    valueStyle={{ 
                      color: netIncome > 0 ? 'var(--oracle-success)' : 'var(--oracle-error)',
                      fontSize: '32px',
                      fontWeight: 700
                    }}
                  />
                  <div style={{ textAlign: 'center', marginTop: '8px' }}>
                    <span style={{ 
                      color: 'var(--oracle-text-secondary)',
                      fontSize: '14px'
                    }}>
                      For the period ending {dayjs().format('MMMM YYYY')}
                    </span>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <h1>Accounting & Finance</h1>
        <p>Complete financial management with double-entry bookkeeping, receivables, payables, and financial reporting</p>
      </div>

      {/* Financial KPI Cards */}
      <Row gutter={[24, 24]} style={{ marginBottom: '32px' }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: 'var(--oracle-success)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <RiseOutlined style={{ color: 'var(--oracle-success)' }} />
              <span style={{ color: 'var(--oracle-success)', marginLeft: '4px' }}>
                +15.2% YoY
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Net Income"
              value={netIncome}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: 'var(--oracle-primary)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                Profit Margin: {((netIncome / totalRevenue) * 100).toFixed(1)}%
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Accounts Receivable"
              value={214000}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: 'var(--oracle-secondary)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                3 outstanding invoices
              </span>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Accounts Payable"
              value={17500}
              prefix={<DollarOutlined />}
              precision={0}
              valueStyle={{ color: 'var(--oracle-warning)' }}
            />
            <div style={{ marginTop: '8px' }}>
              <span style={{ color: 'var(--oracle-text-secondary)' }}>
                2 bills due soon
              </span>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Main Accounting Tabs */}
      <Card>
        <Tabs
          activeKey={selectedTab}
          onChange={setSelectedTab}
          items={tabItems}
          size="large"
        />
      </Card>
    </div>
  );
};

export default AccountingPage;

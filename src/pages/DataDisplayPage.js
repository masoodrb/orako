import React, { useState, useEffect } from "react";
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
  Watermark,
  Modal,
  Input,
  Select,
  Form,
  message,
} from "antd";
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
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Title, Paragraph, Text } = Typography;
const { Meta } = Card;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const { Search } = Input;

const DataDisplayPage = () => {
  const [form] = Form.useForm();
  const [activeTab, setActiveTab] = useState("1");
  const [searchText, setSearchText] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [comprehensiveData, setComprehensiveData] = useState([
    {
      key: "1",
      id: "EMP001",
      name: "John Brown",
      email: "john.brown@company.com",
      age: 32,
      department: "Engineering",
      position: "Senior Developer",
      salary: 95000,
      joinDate: "2020-03-15",
      status: "Active",
      address: "New York No. 1 Lake Park",
      phone: "+1-234-567-8901",
      skills: ["React", "Node.js", "TypeScript"],
      performance: "Excellent",
    },
    {
      key: "2",
      id: "EMP002",
      name: "Jim Green",
      email: "jim.green@company.com",
      age: 42,
      department: "Marketing",
      position: "Marketing Manager",
      salary: 85000,
      joinDate: "2019-07-22",
      status: "Active",
      address: "London No. 1 Lake Park",
      phone: "+44-207-123-4567",
      skills: ["SEO", "Analytics", "Strategy"],
      performance: "Good",
    },
    {
      key: "3",
      id: "EMP003",
      name: "Joe Black",
      email: "joe.black@company.com",
      age: 32,
      department: "Engineering",
      position: "Frontend Developer",
      salary: 75000,
      joinDate: "2021-01-10",
      status: "Active",
      address: "Sidney No. 1 Lake Park",
      phone: "+61-2-9876-5432",
      skills: ["Vue.js", "CSS", "JavaScript"],
      performance: "Good",
    },
    {
      key: "4",
      id: "EMP004",
      name: "Alice Johnson",
      email: "alice.johnson@company.com",
      age: 28,
      department: "HR",
      position: "HR Specialist",
      salary: 65000,
      joinDate: "2022-05-18",
      status: "Active",
      address: "Paris No. 2 Lake Park",
      phone: "+33-1-23-45-67-89",
      skills: ["Recruitment", "Training", "Policy"],
      performance: "Excellent",
    },
    {
      key: "5",
      id: "EMP005",
      name: "Bob Wilson",
      email: "bob.wilson@company.com",
      age: 35,
      department: "Sales",
      position: "Sales Director",
      salary: 120000,
      joinDate: "2018-11-30",
      status: "Active",
      address: "Tokyo No. 3 Lake Park",
      phone: "+81-3-1234-5678",
      skills: ["Negotiation", "CRM", "Leadership"],
      performance: "Excellent",
    },
    {
      key: "6",
      id: "EMP006",
      name: "Sarah Davis",
      email: "sarah.davis@company.com",
      age: 29,
      department: "Finance",
      position: "Financial Analyst",
      salary: 70000,
      joinDate: "2021-09-12",
      status: "On Leave",
      address: "Berlin No. 4 Lake Park",
      phone: "+49-30-12345678",
      skills: ["Excel", "SQL", "Budgeting"],
      performance: "Good",
    },
    {
      key: "7",
      id: "EMP007",
      name: "Mike Chen",
      email: "mike.chen@company.com",
      age: 31,
      department: "Engineering",
      position: "DevOps Engineer",
      salary: 90000,
      joinDate: "2020-08-25",
      status: "Active",
      address: "Singapore No. 5 Lake Park",
      phone: "+65-6123-4567",
      skills: ["Docker", "Kubernetes", "AWS"],
      performance: "Excellent",
    },
    {
      key: "8",
      id: "EMP008",
      name: "Emma Taylor",
      email: "emma.taylor@company.com",
      age: 26,
      department: "Design",
      position: "UI/UX Designer",
      salary: 68000,
      joinDate: "2022-02-14",
      status: "Active",
      address: "Melbourne No. 6 Lake Park",
      phone: "+61-3-9876-5432",
      skills: ["Figma", "Sketch", "Prototyping"],
      performance: "Good",
    },
  ]);

  const [containerWidth, setContainerWidth] = useState(1800);

  // Handle container resize for responsive table
  useEffect(() => {
    const handleResize = () => {
      // Calculate available width based on content area, not full viewport
      const contentArea = document.querySelector('.main-content-area');
      if (contentArea) {
        const availableWidth = contentArea.offsetWidth - 80; // Account for padding
        setContainerWidth(Math.max(800, availableWidth)); // Minimum 800px
      }
    };

    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle search functionality
  const handleSearch = (value) => {
    setSearchText(value);
  };

  // Filter data based on search
  const filteredData = comprehensiveData.filter((item) =>
    Object.values(item).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Handle edit modal
  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleDelete = (record) => {
    setComprehensiveData((prev) =>
      prev.filter((item) => item.key !== record.key)
    );
    message.success(`Deleted ${record.name} successfully`);
  };

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Update the record in the data
        setComprehensiveData((prev) =>
          prev.map((item) =>
            item.key === editingRecord.key ? { ...item, ...values } : item
          )
        );
        message.success("Employee updated successfully");
        setEditModalVisible(false);
        setEditingRecord(null);
        form.resetFields();
      })
      .catch((error) => {
        console.log("Validation failed:", error);
      });
  };

  const handleModalCancel = () => {
    setEditModalVisible(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if (tag === "loser") {
              color = "volcano";
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
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edit</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
    },
  ];

  const tableData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  const sortableTableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      sorter: (a, b) => a.score - b.score,
      sortDirections: ["ascend", "descend"],
      defaultSortOrder: "descend",
    },
  ];

  const sortableTableData = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      score: 98,
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      score: 85,
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      score: 92,
    },
    {
      key: "4",
      name: "Alice Johnson",
      age: 28,
      address: "Paris No. 2 Lake Park",
      score: 96,
    },
    {
      key: "5",
      name: "Bob Wilson",
      age: 35,
      address: "Tokyo No. 3 Lake Park",
      score: 88,
    },
  ];

  const listData = [
    {
      title: "Ant Design Title 1",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    },
    {
      title: "Ant Design Title 2",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    },
    {
      title: "Ant Design Title 3",
      description:
        "Ant Design, a design language for background applications, is refined by Ant UED Team.",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
    },
  ];

  const treeData = [
    {
      title: "parent 1",
      key: "0-0",
      children: [
        {
          title: "parent 1-0",
          key: "0-0-0",
          disabled: true,
          children: [
            {
              title: "leaf",
              key: "0-0-0-0",
              disableCheckbox: true,
            },
            {
              title: "leaf",
              key: "0-0-0-1",
            },
          ],
        },
        {
          title: "parent 1-1",
          key: "0-0-1",
          children: [
            {
              title: "leaf",
              key: "0-0-1-0",
            },
          ],
        },
      ],
    },
  ];

  const onSelect = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
  };

  const onCheck = (checkedKeys, info) => {
    console.log("onCheck", checkedKeys, info);
  };

  const content = (
    <div>
      <p>Content</p>
      <p>And more content</p>
    </div>
  );

  // Comprehensive table columns with all features
  const comprehensiveTableColumns = [
    {
      title: "Employee ID",
      dataIndex: "id",
      key: "id",
      width: 100,
      sorter: (a, b) => a.id.localeCompare(b.id),
      fixed: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      sorter: (a, b) => a.name.localeCompare(b.name),
      fixed: "left",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      width: 80,
      sorter: (a, b) => a.age - b.age,
      align: "center",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      width: 120,
      sorter: (a, b) => a.department.localeCompare(b.department),
      filters: [
        { text: "Engineering", value: "Engineering" },
        { text: "Marketing", value: "Marketing" },
        { text: "HR", value: "HR" },
        { text: "Sales", value: "Sales" },
        { text: "Finance", value: "Finance" },
        { text: "Design", value: "Design" },
      ],
      onFilter: (value, record) => record.department === value,
      render: (text) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 150,
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: "Salary",
      dataIndex: "salary",
      key: "salary",
      width: 120,
      sorter: (a, b) => a.salary - b.salary,
      align: "right",
      render: (value) => `$${value.toLocaleString()}`,
    },
    {
      title: "Join Date",
      dataIndex: "joinDate",
      key: "joinDate",
      width: 120,
      sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      filters: [
        { text: "Active", value: "Active" },
        { text: "On Leave", value: "On Leave" },
        { text: "Inactive", value: "Inactive" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => (
        <Badge
          status={
            status === "Active"
              ? "success"
              : status === "On Leave"
              ? "warning"
              : "error"
          }
          text={status}
        />
      ),
    },
    {
      title: "Performance",
      dataIndex: "performance",
      key: "performance",
      width: 120,
      sorter: (a, b) => a.performance.localeCompare(b.performance),
      filters: [
        { text: "Excellent", value: "Excellent" },
        { text: "Good", value: "Good" },
        { text: "Average", value: "Average" },
        { text: "Poor", value: "Poor" },
      ],
      onFilter: (value, record) => record.performance === value,
      render: (performance) => {
        const color =
          performance === "Excellent"
            ? "green"
            : performance === "Good"
            ? "blue"
            : performance === "Average"
            ? "orange"
            : "red";
        return <Tag color={color}>{performance}</Tag>;
      },
    },
    {
      title: "Skills",
      dataIndex: "skills",
      key: "skills",
      width: 200,
      render: (skills) => (
        <div>
          {skills.slice(0, 2).map((skill) => (
            <Tag key={skill} color="purple" style={{ marginBottom: 2 }}>
              {skill}
            </Tag>
          ))}
          {skills.length > 2 && (
            <Tooltip title={skills.slice(2).join(", ")}>
              <Tag color="default">+{skills.length - 2} more</Tag>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      fixed: "right",
      render: (_, record) => (
        <Space size="small">
          <Button
            type="primary"
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="default"
            size="small"
            onClick={() => message.info(`Viewing ${record.name}`)}
          >
            View
          </Button>
          <Button
            type="default"
            danger
            size="small"
            onClick={() => {
              Modal.confirm({
                title: "Are you sure?",
                content: `Do you want to delete ${record.name}?`,
                onOk: () => handleDelete(record),
              });
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Data Display Components</Title>
        <Paragraph>
          Components for displaying and organizing data including tables, lists,
          cards, and various visualization elements.
        </Paragraph>
      </div>

      <div className="demo-section">
        <Title level={2}>Table</Title>
        <Paragraph>
          A table displays rows of data with sorting, filtering, and pagination
          capabilities.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item" style={{ gridColumn: "span 2" }}>
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
                type: "checkbox",
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log(
                    "selectedRowKeys: ",
                    selectedRowKeys,
                    "selectedRows: ",
                    selectedRows
                  );
                },
              }}
              columns={tableColumns.slice(0, 3)}
              dataSource={tableData}
              size="small"
            />
          </div>

          <div className="demo-item demo-item-wide">
            <Title level={4}>Sortable Table</Title>
            <Table
              columns={sortableTableColumns}
              dataSource={sortableTableData}
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
              onChange={(pagination, filters, sorter, extra) => {
                console.log(
                  "Table params: ",
                  pagination,
                  filters,
                  sorter,
                  extra
                );
              }}
            />
          </div>

          <div className="demo-item demo-item-extra-wide">
            <div style={{ 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "flex-start", 
                marginBottom: 16
              }}>
              <div>
                <Title level={4} style={{ margin: 0 }}>
                  Comprehensive Employee Management Table
                </Title>
                <Paragraph style={{ margin: "8px 0 0 0" }}>
                  Advanced table with search, sorting, filtering, pagination,
                  and modal actions.
                </Paragraph>
              </div>
              <Button type="primary" icon={<UserOutlined />}>
                Add Employee
              </Button>
            </div>

            <div style={{ 
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center'
            }}>
              <Search placeholder="Search employees..."
               style={{ width: 300, marginRight: 16 }}
               />
            </div>

            <Table
              columns={comprehensiveTableColumns}
              dataSource={filteredData}
              rowKey="key"
              scroll={{ x: containerWidth, y: 400 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} of ${total} employees`,
                pageSizeOptions: ["5", "10", "20", "50"],
              }}
              onChange={(pagination, filters, sorter, extra) => {
                console.log("Table change:", {
                  pagination,
                  filters,
                  sorter,
                  extra,
                });
              }}
              size="small"
              bordered
              rowSelection={{
                type: "checkbox",
                onChange: (selectedRowKeys, selectedRows) => {
                  console.log("Selected:", selectedRowKeys, selectedRows);
                },
              }}
            />

            <Modal
              title={`Edit Employee: ${editingRecord?.name || ""}`}
              open={editModalVisible}
              onOk={handleModalOk}
              onCancel={handleModalCancel}
              width={700}
              footer={[
                <Button key="cancel" onClick={handleModalCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handleModalOk}>
                  Save Changes
                </Button>,
              ]}
            >
              <Form form={form} layout="vertical" initialValues={editingRecord}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "16px",
                  }}
                >
                  <Form.Item
                    label="Employee ID"
                    name="id"
                    rules={[
                      { required: true, message: "Please input employee ID!" },
                    ]}
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: "Please input name!" }]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                    style={{ gridColumn: "span 2" }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Age"
                    name="age"
                    rules={[{ required: true, message: "Please input age!" }]}
                  >
                    <Input type="number" min="18" max="100" />
                  </Form.Item>

                  <Form.Item
                    label="Department"
                    name="department"
                    rules={[
                      { required: true, message: "Please select department!" },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Engineering">
                        Engineering
                      </Select.Option>
                      <Select.Option value="Marketing">Marketing</Select.Option>
                      <Select.Option value="HR">HR</Select.Option>
                      <Select.Option value="Sales">Sales</Select.Option>
                      <Select.Option value="Finance">Finance</Select.Option>
                      <Select.Option value="Design">Design</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Position"
                    name="position"
                    rules={[
                      { required: true, message: "Please input position!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Salary"
                    name="salary"
                    rules={[
                      { required: true, message: "Please input salary!" },
                    ]}
                  >
                    <Input type="number" min="0" prefix="$" />
                  </Form.Item>

                  <Form.Item
                    label="Join Date"
                    name="joinDate"
                    rules={[
                      { required: true, message: "Please input join date!" },
                    ]}
                  >
                    <Input type="date" />
                  </Form.Item>

                  <Form.Item
                    label="Status"
                    name="status"
                    rules={[
                      { required: true, message: "Please select status!" },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Active">Active</Select.Option>
                      <Select.Option value="On Leave">On Leave</Select.Option>
                      <Select.Option value="Inactive">Inactive</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Performance"
                    name="performance"
                    rules={[
                      { required: true, message: "Please select performance!" },
                    ]}
                  >
                    <Select>
                      <Select.Option value="Excellent">Excellent</Select.Option>
                      <Select.Option value="Good">Good</Select.Option>
                      <Select.Option value="Average">Average</Select.Option>
                      <Select.Option value="Poor">Poor</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Address"
                    name="address"
                    style={{ gridColumn: "span 2" }}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Phone"
                    name="phone"
                    style={{ gridColumn: "span 2" }}
                  >
                    <Input />
                  </Form.Item>
                </div>
              </Form>
            </Modal>
          </div>

          <div className="demo-item">
            <Title level={4}>Sortable Table</Title>
            <Table
              columns={sortableTableColumns}
              dataSource={sortableTableData}
              pagination={false}
              rowKey="key"
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
          <div className="demo-item demo-item-extra-wide">
            <Title level={4}>Basic List</Title>
            <List
              itemLayout="horizontal"
              dataSource={listData}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.title}</a>}
                    description={item.description}
                  />
                </List.Item>
              )}
            />
          </div>

          <div className="demo-item demo-item-extra-wide">
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
                      <MessageOutlined />2
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
                    avatar={
                      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                    }
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
            <Card
              title="Default size card"
              extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
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
              cover={
                <img
                  alt="example"
                  src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                title="Europe Street beat"
                description="www.instagram.com"
              />
            </Card>
          </div>

          <div className="demo-item">
            <Title level={4}>Loading Card</Title>
            <Card style={{ width: 300, marginTop: 16 }} loading>
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          </div>

          <div className="demo-item">
            <Title level={4}>Grid Card</Title>
            <Card title="Card Title">
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                Content
              </Card.Grid>
              <Card.Grid
                hoverable={false}
                style={{ width: "25%", textAlign: "center" }}
              >
                Content
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                Content
              </Card.Grid>
              <Card.Grid style={{ width: "25%", textAlign: "center" }}>
                Content
              </Card.Grid>
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
                <a href="https://github.com/ant-design/ant-design/issues/1862">
                  Link
                </a>
              </Tag>
              <Tag closable onClose={() => console.log("Closing tag")}>
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
        <Paragraph>Components for organizing and navigating content.</Paragraph>

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
            <Collapse defaultActiveKey={["1"]}>
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
              <Timeline.Item>
                Solve initial network problems 2015-09-01
              </Timeline.Item>
              <Timeline.Item
                dot={<ClockCircleOutlined className="timeline-clock-icon" />}
                color="red"
              >
                Technical testing 2015-09-01
              </Timeline.Item>
              <Timeline.Item>
                Network problems being solved 2015-09-01
              </Timeline.Item>
            </Timeline>
          </div>

          <div className="demo-item">
            <Title level={4}>Tree</Title>
            <Tree
              checkable
              defaultExpandedKeys={["0-0-0", "0-0-1"]}
              defaultSelectedKeys={["0-0-0", "0-0-1"]}
              defaultCheckedKeys={["0-0-0", "0-0-1"]}
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
                src: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
              }}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Carousel</Title>
            <Carousel autoplay style={{ textAlign: "center" }}>
              <div>
                <div
                  style={{
                    height: "160px",
                    color: "#fff",
                    lineHeight: "160px",
                    background: "#364d79",
                  }}
                >
                  1
                </div>
              </div>
              <div>
                <div
                  style={{
                    height: "160px",
                    color: "#fff",
                    lineHeight: "160px",
                    background: "#364d79",
                  }}
                >
                  2
                </div>
              </div>
              <div>
                <div
                  style={{
                    height: "160px",
                    color: "#fff",
                    lineHeight: "160px",
                    background: "#364d79",
                  }}
                >
                  3
                </div>
              </div>
              <div>
                <div
                  style={{
                    height: "160px",
                    color: "#fff",
                    lineHeight: "160px",
                    background: "#364d79",
                  }}
                >
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
            <Space direction="vertical" style={{ width: "100%" }}>
              <Statistic title="Active Users" value={112893} />
              <Statistic
                title="Account Balance (CNY)"
                value={112893}
                precision={2}
              />
              <Statistic
                title="Active Users"
                value={11.28}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
              <Statistic
                title="Idle Users"
                value={9.3}
                precision={2}
                valueStyle={{ color: "#cf1322" }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Space>
          </div>

          <div className="demo-item demo-item-extra-wide">
            <Title level={4}>Descriptions</Title>
            <Descriptions title="User Info" bordered>
              <Descriptions.Item label="Product">
                Cloud Database
              </Descriptions.Item>
              <Descriptions.Item label="Billing Mode">
                Prepaid
              </Descriptions.Item>
              <Descriptions.Item label="Automatic Renewal">
                YES
              </Descriptions.Item>
              <Descriptions.Item label="Order time">
                2018-04-24 18:00:00
              </Descriptions.Item>
              <Descriptions.Item label="Usage Time" span={2}>
                2019-04-24 18:00:00
              </Descriptions.Item>
              <Descriptions.Item label="Status" span={3}>
                <Badge status="processing" text="Running" />
              </Descriptions.Item>
              <Descriptions.Item label="Negotiated Amount">
                $80.00
              </Descriptions.Item>
              <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
              <Descriptions.Item label="Official Receipts">
                $60.00
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div className="demo-item">
            <Title level={4}>Calendar</Title>
            <Calendar
              fullscreen={false}
              onPanelChange={(value, mode) => {
                console.log(value.format("YYYY-MM-DD"), mode);
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

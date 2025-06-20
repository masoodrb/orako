import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Avatar, 
  Badge, 
  Button, 
  Input, 
  List, 
  Space, 
  Tag, 
  Dropdown, 
  Modal, 
  Form, 
  message,
  Divider,
  Tooltip,
  Checkbox,
  Select,
  Upload,
  Popover,
  Switch
} from 'antd';
import {
  MailOutlined,
  InboxOutlined,
  SendOutlined,
  FileTextOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  SearchOutlined,
  PlusOutlined,
  PaperClipOutlined,
  ReloadOutlined,
  SettingOutlined,
  FilterOutlined,
  MoreOutlined,
  UserOutlined,
  ClockCircleOutlined,
  FlagOutlined,
  TagOutlined,
  ArrowLeftOutlined,
  ForwardOutlined,
  RollbackOutlined,
  EditOutlined,
  ContainerOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  FileOutlined,
  TeamOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Search } = Input;

const MailboxPage = () => {
  const [selectedFolder, setSelectedFolder] = useState('inbox');
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [composeVisible, setComposeVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [form] = Form.useForm();

  // Sample email data
  const folders = [
    { key: 'inbox', label: 'Inbox', icon: <InboxOutlined />, count: 12, color: '#1890ff' },
    { key: 'sent', label: 'Sent', icon: <SendOutlined />, count: 45, color: '#52c41a' },
    { key: 'drafts', label: 'Drafts', icon: <FileTextOutlined />, count: 3, color: '#faad14' },
    { key: 'starred', label: 'Starred', icon: <StarFilled />, count: 8, color: '#fa8c16' },
    { key: 'archive', label: 'Archive', icon: <ContainerOutlined />, count: 156, color: '#722ed1' },
    { key: 'trash', label: 'Trash', icon: <DeleteOutlined />, count: 23, color: '#ff4d4f' }
  ];

  const [emails] = useState([
    {
      id: '1',
      from: { name: 'Sarah Johnson', email: 'sarah.johnson@oracle.com', avatar: null },
      to: [{ name: 'John Smith', email: 'john.smith@oracle.com' }],
      subject: 'Q4 Financial Report Review',
      preview: 'Hi John, I\'ve completed the initial review of the Q4 financial report. Please find my comments and suggestions attached...',
      body: `Hi John,

I've completed the initial review of the Q4 financial report. The overall numbers look good, but I have a few comments and suggestions:

1. Revenue Growth: The 15% YoY growth is impressive, particularly in our cloud services division
2. Cost Management: I noticed some unusual spikes in operational costs in October
3. Forecast Accuracy: Our predictions were quite accurate, with only 2% variance

Please review the attached detailed analysis and let me know if you have any questions.

Best regards,
Sarah`,
      date: '2024-02-08T10:30:00',
      isRead: false,
      isStarred: true,
      priority: 'high',
      folder: 'inbox',
      attachments: [
        { name: 'Q4_Financial_Analysis.pdf', size: '2.4 MB', type: 'pdf' },
        { name: 'Revenue_Charts.xlsx', size: '1.8 MB', type: 'excel' }
      ],
      tags: ['finance', 'quarterly', 'urgent']
    },
    {
      id: '2',
      from: { name: 'Michael Brown', email: 'michael.brown@oracle.com', avatar: null },
      to: [{ name: 'John Smith', email: 'john.smith@oracle.com' }],
      subject: 'Project Alpha - Design System Update',
      preview: 'The new design system components are ready for review. I\'ve updated the figma file with the latest components...',
      body: `Hi John,

The new design system components are ready for review. Here's what's been updated:

- Button variants and states
- Form input components
- Navigation elements
- Color palette refinements
- Typography scale

The Figma file has been updated with all the latest components. Please review and provide feedback by Friday.

Thanks,
Michael`,
      date: '2024-02-08T09:15:00',
      isRead: true,
      isStarred: false,
      priority: 'medium',
      folder: 'inbox',
      attachments: [],
      tags: ['design', 'project-alpha']
    },
    {
      id: '3',
      from: { name: 'Emily Davis', email: 'emily.davis@oracle.com', avatar: null },
      to: [{ name: 'John Smith', email: 'john.smith@oracle.com' }],
      subject: 'Security Audit Results',
      preview: 'The security audit has been completed. I\'m pleased to report that no critical vulnerabilities were found...',
      body: `Hi John,

The security audit has been completed. Here's a summary of the findings:

SUMMARY:
- No critical vulnerabilities found
- 2 medium-risk issues identified and resolved
- Security score: 9.2/10

RECOMMENDATIONS:
1. Update password policies
2. Enable two-factor authentication for all users
3. Regular security training for staff

Full report is attached.

Best regards,
Emily`,
      date: '2024-02-07T16:45:00',
      isRead: false,
      isStarred: true,
      priority: 'high',
      folder: 'inbox',
      attachments: [
        { name: 'Security_Audit_Report.pdf', size: '3.2 MB', type: 'pdf' }
      ],
      tags: ['security', 'audit', 'compliance']
    },
    {
      id: '4',
      from: { name: 'David Wilson', email: 'david.wilson@oracle.com', avatar: null },
      to: [{ name: 'John Smith', email: 'john.smith@oracle.com' }],
      subject: 'Team Meeting Minutes - Feb 7th',
      preview: 'Please find attached the meeting minutes from yesterday\'s team meeting. Key decisions and action items are highlighted...',
      body: `Hi John,

Please find attached the meeting minutes from yesterday's team meeting.

KEY DECISIONS:
- Approved budget for Q2 marketing campaign
- Selected vendor for new CRM system
- Postponed office relocation to Q3

ACTION ITEMS:
- Sarah: Finalize marketing materials (Due: Feb 15)
- Michael: Complete design review (Due: Feb 12)
- Emily: Security assessment (Due: Feb 20)

Next meeting: Feb 14th at 2:00 PM

Best,
David`,
      date: '2024-02-07T14:20:00',
      isRead: true,
      isStarred: false,
      priority: 'normal',
      folder: 'inbox',
      attachments: [
        { name: 'Meeting_Minutes_Feb7.docx', size: '245 KB', type: 'word' }
      ],
      tags: ['meeting', 'team', 'minutes']
    },
    {
      id: '5',
      from: { name: 'Lisa Garcia', email: 'lisa.garcia@oracle.com', avatar: null },
      to: [{ name: 'John Smith', email: 'john.smith@oracle.com' }],
      subject: 'Server Maintenance Notification',
      preview: 'Scheduled maintenance window this weekend. All services will be temporarily unavailable...',
      body: `Hi John,

This is to notify you about the scheduled server maintenance this weekend.

MAINTENANCE WINDOW:
- Date: Saturday, February 10th
- Time: 2:00 AM - 6:00 AM EST
- Duration: Approximately 4 hours

AFFECTED SERVICES:
- Email services
- File sharing
- Database access
- Web applications

All services will be restored by 6:00 AM. We apologize for any inconvenience.

IT Support Team`,
      date: '2024-02-07T11:30:00',
      isRead: true,
      isStarred: false,
      priority: 'normal',
      folder: 'inbox',
      attachments: [],
      tags: ['maintenance', 'system', 'notification']
    }
  ]);

  const priorityConfig = {
    high: { color: '#ff4d4f', label: 'High Priority' },
    medium: { color: '#faad14', label: 'Medium Priority' },
    normal: { color: '#52c41a', label: 'Normal Priority' }
  };

  const getFilteredEmails = () => {
    return emails.filter(email => {
      const matchesFolder = email.folder === selectedFolder || 
        (selectedFolder === 'starred' && email.isStarred);
      
      const matchesSearch = !searchTerm || 
        email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.from.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        email.preview.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesFolder && matchesSearch;
    });
  };

  const handleEmailSelect = (email) => {
    setSelectedEmail(email);
  };

  const handleCompose = () => {
    form.resetFields();
    setComposeVisible(true);
  };

  const handleSendEmail = (values) => {
    console.log('Sending email:', values);
    message.success('Email sent successfully');
    setComposeVisible(false);
  };

  const handleStarToggle = (emailId) => {
    // In a real app, this would update the email's starred status
    message.info('Email starred status updated');
  };

  const handleArchive = (emailIds) => {
    message.success(`${emailIds.length} email(s) archived`);
    setSelectedEmails([]);
  };

  const handleDelete = (emailIds) => {
    Modal.confirm({
      title: 'Delete Email(s)',
      content: `Are you sure you want to delete ${emailIds.length} email(s)?`,
      onOk: () => {
        message.success(`${emailIds.length} email(s) deleted`);
        setSelectedEmails([]);
      }
    });
  };

  const EmailList = () => (
    <List
      itemLayout="horizontal"
      dataSource={getFilteredEmails()}
      renderItem={(email) => (
        <List.Item
          className={`email-item ${selectedEmail?.id === email.id ? 'selected' : ''} ${!email.isRead ? 'unread' : ''}`}
          style={{
            padding: '16px 20px',
            cursor: 'pointer',
            borderBottom: '1px solid var(--oracle-border)',
            backgroundColor: selectedEmail?.id === email.id ? 'var(--oracle-primary-light)' : 'transparent'
          }}
          onClick={() => handleEmailSelect(email)}
          actions={[
            <Checkbox
              checked={selectedEmails.includes(email.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedEmails([...selectedEmails, email.id]);
                } else {
                  setSelectedEmails(selectedEmails.filter(id => id !== email.id));
                }
              }}
              onClick={(e) => e.stopPropagation()}
            />,
            <Button
              type="text"
              icon={email.isStarred ? <StarFilled style={{ color: '#fa8c16' }} /> : <StarOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                handleStarToggle(email.id);
              }}
            />
          ]}
        >
          <List.Item.Meta
            avatar={
              <Avatar 
                icon={<UserOutlined />}
                style={{ backgroundColor: 'var(--oracle-primary)' }}
              >
                {email.from.name.charAt(0)}
              </Avatar>
            }
            title={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Text strong={!email.isRead} style={{ fontSize: '14px' }}>
                    {email.from.name}
                  </Text>
                  {email.priority === 'high' && (
                    <ExclamationCircleOutlined style={{ color: '#ff4d4f', fontSize: '12px' }} />
                  )}
                  {email.attachments.length > 0 && (
                    <PaperClipOutlined style={{ color: 'var(--oracle-text-secondary)', fontSize: '12px' }} />
                  )}
                </div>
                <Text style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
                  {dayjs(email.date).format('MMM DD')}
                </Text>
              </div>
            }
            description={
              <div>
                <Text strong={!email.isRead} style={{ 
                  display: 'block', 
                  marginBottom: 4,
                  fontSize: '13px',
                  lineHeight: '18px'
                }}>
                  {email.subject}
                </Text>
                <Text style={{ 
                  color: 'var(--oracle-text-secondary)', 
                  fontSize: '12px',
                  lineHeight: '16px'
                }}>
                  {email.preview}
                </Text>
                {email.tags && email.tags.length > 0 && (
                  <div style={{ marginTop: 6 }}>
                    {email.tags.slice(0, 2).map(tag => (
                      <Tag key={tag} size="small" style={{ fontSize: '10px', margin: '0 4px 0 0' }}>
                        {tag}
                      </Tag>
                    ))}
                    {email.tags.length > 2 && (
                      <Tag size="small" style={{ fontSize: '10px' }}>
                        +{email.tags.length - 2}
                      </Tag>
                    )}
                  </div>
                )}
              </div>
            }
          />
        </List.Item>
      )}
    />
  );

  const EmailDetail = () => {
    if (!selectedEmail) {
      return (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          flexDirection: 'column',
          color: 'var(--oracle-text-secondary)'
        }}>
          <MailOutlined style={{ fontSize: 64, marginBottom: 16 }} />
          <Title level={4} style={{ color: 'var(--oracle-text-secondary)' }}>
            Select an email to read
          </Title>
        </div>
      );
    }

    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Email Header */}
        <div style={{ 
          padding: '20px 24px', 
          borderBottom: '1px solid var(--oracle-border)',
          backgroundColor: 'var(--oracle-surface)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <Title level={4} style={{ margin: 0, marginBottom: 8 }}>
                {selectedEmail.subject}
              </Title>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <Space>
                  <Avatar icon={<UserOutlined />} style={{ backgroundColor: 'var(--oracle-primary)' }}>
                    {selectedEmail.from.name.charAt(0)}
                  </Avatar>
                  <div>
                    <Text strong>{selectedEmail.from.name}</Text>
                    <br />
                    <Text style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
                      {selectedEmail.from.email}
                    </Text>
                  </div>
                </Space>
                <Divider type="vertical" />
                <div>
                  <Text style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }}>
                    {dayjs(selectedEmail.date).format('MMM DD, YYYY [at] h:mm A')}
                  </Text>
                </div>
              </div>
              {selectedEmail.tags && selectedEmail.tags.length > 0 && (
                <div>
                  {selectedEmail.tags.map(tag => (
                    <Tag key={tag} style={{ marginBottom: 4, marginRight: 4 }}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
            
            <Space>
              <Button
                type="text"
                icon={selectedEmail.isStarred ? <StarFilled style={{ color: '#fa8c16' }} /> : <StarOutlined />}
                onClick={() => handleStarToggle(selectedEmail.id)}
              />
              <Dropdown
                menu={{
                  items: [
                    { key: 'reply', icon: <RollbackOutlined />, label: 'Reply' },
                    { key: 'forward', icon: <ForwardOutlined />, label: 'Forward' },
                    { key: 'archive', icon: <ContainerOutlined />, label: 'Archive' },
                    { type: 'divider' },
                    { key: 'delete', icon: <DeleteOutlined />, label: 'Delete', danger: true }
                  ],
                  onClick: ({ key }) => {
                    if (key === 'archive') handleArchive([selectedEmail.id]);
                    else if (key === 'delete') handleDelete([selectedEmail.id]);
                    else message.info(`${key} action clicked`);
                  }
                }}
              >
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            </Space>
          </div>
        </div>

        {/* Email Body */}
        <div style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          <div style={{ 
            whiteSpace: 'pre-wrap', 
            lineHeight: '24px',
            fontSize: '14px',
            marginBottom: 24
          }}>
            {selectedEmail.body}
          </div>

          {/* Attachments */}
          {selectedEmail.attachments && selectedEmail.attachments.length > 0 && (
            <div>
              <Title level={5} style={{ marginBottom: 12 }}>
                Attachments ({selectedEmail.attachments.length})
              </Title>
              <Row gutter={[12, 12]}>
                {selectedEmail.attachments.map((attachment, index) => (
                  <Col key={index} xs={24} sm={12} md={8}>
                    <Card 
                      size="small"
                      style={{ 
                        borderRadius: 6,
                        border: '1px solid var(--oracle-border)'
                      }}
                      bodyStyle={{ padding: 12 }}
                    >
                      <Space>
                        <FileTextOutlined style={{ fontSize: 20, color: 'var(--oracle-primary)' }} />
                        <div>
                          <Text strong style={{ fontSize: '12px', display: 'block' }}>
                            {attachment.name}
                          </Text>
                          <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
                            {attachment.size}
                          </Text>
                        </div>
                      </Space>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </div>

        {/* Reply Actions */}
        <div style={{ 
          padding: '16px 24px', 
          borderTop: '1px solid var(--oracle-border)',
          backgroundColor: 'var(--oracle-surface)'
        }}>
          <Space>
            <Button type="primary" icon={<RollbackOutlined />}>
              Reply
            </Button>
            <Button icon={<ForwardOutlined />}>
              Forward
            </Button>
            <Button icon={<ContainerOutlined />} onClick={() => handleArchive([selectedEmail.id])}>
              Archive
            </Button>
          </Space>
        </div>
      </div>
    );
  };

  return (
    <div className="page-container" style={{ height: 'calc(100vh - 140px)' }}>
      {/* Page Header */}
      <div className="page-header" style={{ marginBottom: 0 }}>
        <div style={{ flex: 1 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--oracle-text-primary)' }}>
            Mailbox
          </Title>
          <Text style={{ color: 'var(--oracle-text-secondary)', fontSize: '16px' }}>
            Manage your business communications efficiently
          </Text>
        </div>
        
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => message.info('Refreshing emails...')}>
            Refresh
          </Button>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCompose}>
            Compose
          </Button>
        </Space>
      </div>

      {/* Main Content */}
      <div style={{ height: 'calc(100% - 80px)', display: 'flex', gap: 0 }}>
        {/* Sidebar */}
        <div className="mailbox-sidebar" style={{ 
          width: 260, 
          borderRight: '1px solid var(--oracle-border)',
          backgroundColor: 'var(--oracle-surface)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Search */}
          <div className="mailbox-search-container" style={{ padding: '16px 14px', borderBottom: '1px solid var(--oracle-border)' }}>
            <Search
              placeholder="Search emails..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>

          {/* Folders */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            <div style={{ padding: '16px 0' }}>
              {folders.map(folder => (
                <div
                  key={folder.key}
                  className={`folder-item ${selectedFolder === folder.key ? 'active' : ''}`}
                  style={{
                    padding: '8px 20px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: selectedFolder === folder.key ? 'var(--oracle-primary-light)' : 'transparent',
                    borderLeft: selectedFolder === folder.key ? '3px solid var(--oracle-primary)' : '3px solid transparent'
                  }}
                  onClick={() => setSelectedFolder(folder.key)}
                >
                  <Space>
                    {folder.icon}
                    <Text style={{ fontWeight: selectedFolder === folder.key ? 600 : 400 }}>
                      {folder.label}
                    </Text>
                  </Space>
                  {folder.count > 0 && (
                    <Badge 
                      count={folder.count} 
                      size="small"
                      style={{ backgroundColor: folder.color }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Compose Button for Mobile */}
          <div style={{ padding: 16, borderTop: '1px solid var(--oracle-border)' }}>
            <Button type="primary" block icon={<PlusOutlined />} onClick={handleCompose}>
              Compose Email
            </Button>
          </div>
        </div>

        {/* Email List */}
        <div style={{ 
          width: 400, 
          borderRight: '1px solid var(--oracle-border)',
          backgroundColor: 'var(--oracle-background)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* List Header */}
          <div style={{ 
            padding: '16px 20px', 
            borderBottom: '1px solid var(--oracle-border)',
            backgroundColor: 'var(--oracle-surface)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <Text strong>
                {folders.find(f => f.key === selectedFolder)?.label || 'Emails'}
              </Text>
              <Text style={{ marginLeft: 8, color: 'var(--oracle-text-secondary)' }}>
                ({getFilteredEmails().length})
              </Text>
            </div>
            
            <Space>
              {selectedEmails.length > 0 && (
                <>
                  <Button 
                    size="small" 
                    icon={<ContainerOutlined />}
                    onClick={() => handleArchive(selectedEmails)}
                  >
                    Archive
                  </Button>
                  <Button 
                    size="small" 
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(selectedEmails)}
                  >
                    Delete
                  </Button>
                </>
              )}
              <Dropdown
                menu={{
                  items: [
                    { key: 'markRead', label: 'Mark as Read' },
                    { key: 'markUnread', label: 'Mark as Unread' },
                    { type: 'divider' },
                    { key: 'selectAll', label: 'Select All' },
                    { key: 'selectNone', label: 'Select None' }
                  ]
                }}
              >
                <Button size="small" icon={<MoreOutlined />} />
              </Dropdown>
            </Space>
          </div>

          {/* Email List */}
          <div style={{ flex: 1, overflow: 'auto' }}>
            {getFilteredEmails().length > 0 ? (
              <EmailList />
            ) : (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: '100%',
                flexDirection: 'column',
                color: 'var(--oracle-text-secondary)'
              }}>
                <InboxOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                <Text>No emails found</Text>
              </div>
            )}
          </div>
        </div>

        {/* Email Detail */}
        <div style={{ 
          flex: 1, 
          backgroundColor: 'var(--oracle-background)'
        }}>
          <EmailDetail />
        </div>
      </div>

      {/* Compose Modal */}
      <Modal
        title="Compose Email"
        open={composeVisible}
        onCancel={() => setComposeVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSendEmail}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="To"
            name="to"
            rules={[{ required: true, message: 'Please enter recipient email' }]}
          >
            <Select
              mode="tags"
              placeholder="Enter email addresses"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="CC" name="cc">
                <Select
                  mode="tags"
                  placeholder="CC recipients"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="BCC" name="bcc">
                <Select
                  mode="tags"
                  placeholder="BCC recipients"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please enter email subject' }]}
          >
            <Input placeholder="Enter email subject" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="body"
            rules={[{ required: true, message: 'Please enter email message' }]}
          >
            <TextArea 
              rows={12} 
              placeholder="Type your message here..."
            />
          </Form.Item>

          <Form.Item label="Attachments" name="attachments">
            <Upload.Dragger
              name="files"
              multiple
              action="/upload"
              beforeUpload={() => false}
            >
              <p className="ant-upload-drag-icon">
                <PaperClipOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to attach</p>
            </Upload.Dragger>
          </Form.Item>

          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <Space>
              <Button onClick={() => setComposeVisible(false)}>
                Cancel
              </Button>
              <Button onClick={() => message.info('Saved to drafts')}>
                Save Draft
              </Button>
              <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                Send Email
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default MailboxPage;

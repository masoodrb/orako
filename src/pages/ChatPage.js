import React, { useState } from 'react';
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Avatar,
  List,
  Badge,
  Typography,
  Space,
  Divider,
  Tooltip,
  Tag,
  Dropdown,
  Upload,
  Popover,
  Tabs
} from 'antd';
import {
  SendOutlined,
  SmileOutlined,
  PaperClipOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
  MoreOutlined,
  SearchOutlined,
  UserOutlined,
  TeamOutlined,
  BellOutlined,
  ClockCircleOutlined,
  CheckOutlined,
  DoubleRightOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  FileOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Search } = Input;
const { Text, Title } = Typography;

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState('1');
  const [messageText, setMessageText] = useState('');
  const [activeTab, setActiveTab] = useState('chats');
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Popular emojis for the picker
  const popularEmojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
    '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
    '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜',
    '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏',
    '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣',
    '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠',
    '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨',
    '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥',
    '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧',
    '👍', '👎', '👌', '🤞', '✌️', '🤟', '🤘', '👊',
    '✊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝',
    '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂',
    '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍',
    '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖',
    '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️'
  ];

  const handleEmojiClick = (emoji) => {
    setMessageText(prev => prev + emoji);
    setEmojiPickerVisible(false);
  };

  const EmojiPicker = () => (
    <div className="emoji-picker-container">
      <div className="emoji-grid">
        {popularEmojis.map((emoji, index) => (
          <button
            key={index}
            className="emoji-button"
            onClick={() => handleEmojiClick(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );

  // Sample chat data
  const chats = [
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Hey, can we discuss the Q3 budget proposal?',
      time: '2 min ago',
      unread: 2,
      online: true,
      type: 'direct'
    },
    {
      id: '2',
      name: 'Product Team',
      avatar: null,
      lastMessage: 'Mike: The new feature is ready for testing',
      time: '15 min ago',
      unread: 5,
      online: false,
      type: 'group',
      members: 8
    },
    {
      id: '3',
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for the meeting notes!',
      time: '1 hour ago',
      unread: 0,
      online: true,
      type: 'direct'
    },
    {
      id: '4',
      name: 'Engineering',
      avatar: null,
      lastMessage: 'Robert: Deploy scheduled for Friday',
      time: '2 hours ago',
      unread: 1,
      online: false,
      type: 'group',
      members: 15
    },
    {
      id: '5',
      name: 'Mike Wilson',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Can you review the design mockups?',
      time: 'Yesterday',
      unread: 0,
      online: false,
      type: 'direct'
    }
  ];

  // Sample messages for selected chat
  const messages = [
    {
      id: '1',
      sender: 'Sarah Johnson',
      content: 'Hey! How are you doing?',
      time: '09:30 AM',
      isMine: false,
      status: 'read'
    },
    {
      id: '2',
      sender: 'You',
      content: 'Hi Sarah! I\'m doing great, thanks for asking. How about you?',
      time: '09:32 AM',
      isMine: true,
      status: 'read'
    },
    {
      id: '3',
      sender: 'Sarah Johnson',
      content: 'I\'m good! Can we discuss the Q3 budget proposal? I have some ideas to share.',
      time: '09:35 AM',
      isMine: false,
      status: 'read'
    },
    {
      id: '4',
      sender: 'You',
      content: 'Absolutely! I\'d love to hear your thoughts. Should we schedule a meeting or discuss it here?',
      time: '09:37 AM',
      isMine: true,
      status: 'delivered'
    },
    {
      id: '5',
      sender: 'Sarah Johnson',
      content: 'Let\'s start here and see if we need a formal meeting. I think we can optimize our cloud infrastructure costs by 20%.',
      time: '09:40 AM',
      isMine: false,
      status: 'read'
    }
  ];

  // Sample team members
  const teamMembers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Product Manager',
      online: true,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Mike Wilson',
      role: 'Senior Developer',
      online: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'Lisa Park',
      role: 'UX Designer',
      online: false,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: '4',
      name: 'Robert Chen',
      role: 'DevOps Engineer',
      online: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Add message logic here
      setMessageText('');
    }
  };

  const renderMessage = (message) => {
    const currentChat = chats.find(chat => chat.id === selectedChat);
    
    return (
      <div
        key={message.id}
        style={{
          display: 'flex',
          justifyContent: message.isMine ? 'flex-end' : 'flex-start',
          marginBottom: '16px',
          alignItems: 'flex-start'
        }}
      >
        {!message.isMine && (
          <Avatar 
            src={currentChat?.avatar}
            size="small"
            style={{ 
              backgroundColor: 'var(--orako-primary)', 
              marginRight: '5px',
              marginTop: '10px',
              flexShrink: 0
            }}
            icon={!currentChat?.avatar ? <UserOutlined /> : undefined}
          >
            {!currentChat?.avatar && currentChat?.name?.charAt(0)}
          </Avatar>
        )}
        <div
          style={{
            maxWidth: '70%',
            padding: '8px 8px',
            borderRadius: message.isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
            backgroundColor: message.isMine ? 'var(--orako-primary)' : 'var(--orako-surface-secondary)',
            color: message.isMine ? 'white' : 'var(--orako-text-primary)',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ marginBottom: '4px' }}>{message.content}</div>
          <div
            style={{
              fontSize: '11px',
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '4px',
              marginTop: 'auto'
            }}
          >
            {message.time}
            {message.isMine && (
              <span>
                {message.status === 'delivered' ? <CheckOutlined /> : <DoubleRightOutlined />}
              </span>
            )}
          </div>
        </div>
        {message.isMine && (
          <Avatar 
            size="small"
            style={{ 
              backgroundColor: 'var(--orako-secondary)', 
              marginLeft: '8px',
              marginTop: '2px',
              flexShrink: 0
            }}
            icon={<UserOutlined />}
          >
            You
          </Avatar>
        )}
      </div>
    );
  };

  const chatMenuItems = [
    {
      key: 'profile',
      label: 'View Profile',
      icon: <UserOutlined />
    },
    {
      key: 'mute',
      label: 'Mute Notifications',
      icon: <BellOutlined />
    },
    {
      key: 'star',
      label: 'Star Conversation',
      icon: <StarOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: 'delete',
      label: 'Delete Chat',
      icon: <DeleteOutlined />,
      danger: true
    }
  ];

  const tabItems = [
    {
      key: 'chats',
      label: (
        <Space>
          <TeamOutlined />
          <span>Chats</span>
          <Badge count={8} size="small" />
        </Space>
      ),
      children: (
        <List
          dataSource={chats}
          renderItem={(chat) => (
            <List.Item
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                backgroundColor: selectedChat === chat.id ? 'var(--orako-surface-secondary)' : 'transparent',
                borderRadius: 'var(--orako-radius-sm)',
                margin: '4px 0'
              }}
              onClick={() => setSelectedChat(chat.id)}
            >
              <List.Item.Meta
                avatar={
                  <Badge dot={chat.online} color="green">
                    <Avatar 
                      src={chat.type === 'direct' ? chat.avatar : undefined}
                      style={{ backgroundColor: 'var(--orako-primary)' }}
                      icon={chat.type === 'group' ? <TeamOutlined /> : (!chat.avatar ? <UserOutlined /> : undefined)}
                    >
                      {chat.type === 'direct' && !chat.avatar && chat.name.charAt(0)}
                    </Avatar>
                  </Badge>
                }
                title={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <Text strong>{chat.name}</Text>
                      {chat.type === 'group' && (
                        <Tag size="small" style={{ marginLeft: '8px' }}>
                          {chat.members} members
                        </Tag>
                      )}
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--orako-text-secondary)' }}>
                      {chat.time}
                    </div>
                  </div>
                }
                description={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text ellipsis style={{ flex: 1, color: 'var(--orako-text-secondary)' }}>
                      {chat.lastMessage}
                    </Text>
                    {chat.unread > 0 && (
                      <Badge count={chat.unread} size="small" />
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ),
    },
    {
      key: 'teams',
      label: (
        <Space>
          <UserOutlined />
          <span>Team</span>
        </Space>
      ),
      children: (
        <List
          dataSource={teamMembers}
          renderItem={(member) => (
            <List.Item style={{ padding: '12px 16px' }}>
              <List.Item.Meta
                avatar={
                  <Badge dot={member.online} color={member.online ? 'green' : 'default'}>
                    <Avatar 
                      src={member.avatar}
                      style={{ backgroundColor: 'var(--orako-secondary)' }}
                      icon={!member.avatar ? <UserOutlined /> : undefined}
                    >
                      {!member.avatar && member.name.charAt(0)}
                    </Avatar>
                  </Badge>
                }
                title={<Text strong>{member.name}</Text>}
                description={
                  <div>
                    <Text type="secondary">{member.role}</Text>
                    <br />
                    <Tag color={member.online ? 'green' : 'default'} size="small">
                      {member.online ? 'Online' : 'Offline'}
                    </Tag>
                  </div>
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
        <h1>Enterprise Chat & Collaboration</h1>
        <p>Real-time messaging and team collaboration platform with enterprise-grade security</p>
      </div>

      <Row gutter={[24, 24]} style={{ height: 'calc(100vh - 200px)' }}>
        {/* Sidebar - Chats and Teams */}
        <Col xs={24} md={8}>
          <Card 
            style={{ height: '100%' }}
            bodyStyle={{ padding: 0 }}
            title={
              <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <span>Messages</span>
                <div style={{ marginLeft: '16px', minWidth: '180px' }}>
                  <Search
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%' }}
                  />
                </div>
              </div>
            }
          >
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems}
              size="small"
              style={{ height: '100%' }}
              tabBarStyle={{ marginLeft: '20px' }}
            />
          </Card>
        </Col>

        {/* Main Chat Area */}
        <Col xs={24} md={16}>
          <Card 
            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            bodyStyle={{ padding: 0, display: 'flex', flexDirection: 'column', height: '100%' }}
            title={
              selectedChat && (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Space>
                    <Badge dot color="green">
                      <Avatar 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face"
                        style={{ backgroundColor: 'var(--orako-primary)' }}
                        icon={<UserOutlined />}
                      />
                    </Badge>
                    <div>
                      <Text strong>Sarah Johnson</Text>
                      <br />
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        Online • Last seen 2 min ago
                      </Text>
                    </div>
                  </Space>
                  <Space>
                    <Tooltip title="Voice Call">
                      <Button icon={<PhoneOutlined />} type="text" />
                    </Tooltip>
                    <Tooltip title="Video Call">
                      <Button icon={<VideoCameraOutlined />} type="text" />
                    </Tooltip>
                    <Dropdown menu={{ items: chatMenuItems }} trigger={['click']}>
                      <Button icon={<MoreOutlined />} type="text" />
                    </Dropdown>
                  </Space>
                </div>
              )
            }
          >
            {/* Messages Area */}
            <div 
              style={{ 
                flex: 1, 
                padding: '16px', 
                overflowY: 'auto',
                backgroundColor: 'var(--orako-background)'
              }}
            >
              {messages.map(renderMessage)}
            </div>

            {/* Message Input */}
            <div style={{ padding: '16px', borderTop: '1px solid var(--orako-border)' }}>
              <Space.Compact style={{ width: '100%' }}>
                <TextArea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  autoSize={{ minRows: 1, maxRows: 4 }}
                  onPressEnter={(e) => {
                    if (!e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  style={{ flex: 1 }}
                />
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Tooltip title="Attach File">
                    <Button icon={<PaperClipOutlined />} type="text" />
                  </Tooltip>
                  <Popover
                    content={<EmojiPicker />}
                    title="Choose an emoji"
                    trigger="click"
                    open={emojiPickerVisible}
                    onOpenChange={setEmojiPickerVisible}
                    placement="topRight"
                    overlayClassName="emoji-picker-popover"
                  >
                    <Tooltip title="Emoji">
                      <Button icon={<SmileOutlined />} type="text" />
                    </Tooltip>
                  </Popover>
                  <Button 
                    type="primary" 
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    className="chat-send-button"
                    style={{ color: 'white' }}
                  >
                    Send
                  </Button>
                </div>
              </Space.Compact>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChatPage;

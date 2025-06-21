import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Avatar, 
  Tag, 
  Progress, 
  Dropdown, 
  Space, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  message,
  Popover,
  Tooltip,
  Divider,
  Badge,
  Timeline
} from 'antd';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDroppable,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  PlusOutlined,
  MoreOutlined,
  UserOutlined,
  CalendarOutlined,
  FlagOutlined,
  CommentOutlined,
  PaperClipOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ArrowRightOutlined,
  SyncOutlined,
  StarOutlined,
  BugOutlined,
  RocketOutlined,
  SettingOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const KanbanPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [form] = Form.useForm();
  const [selectedBoard, setSelectedBoard] = useState('project-alpha');
  const [activeId, setActiveId] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Sample board data
  const boards = [
    { key: 'project-alpha', label: 'Project Alpha - ERP Implementation', color: '#1890ff' },
    { key: 'product-dev', label: 'Product Development Q4', color: '#52c41a' },
    { key: 'customer-support', label: 'Customer Support', color: '#faad14' },
    { key: 'marketing-campaign', label: 'Marketing Campaign', color: '#722ed1' }
  ];

  const teamMembers = [
    { id: '1', name: 'John Smith', avatar: null, role: 'Project Manager' },
    { id: '2', name: 'Sarah Johnson', avatar: null, role: 'Developer' },
    { id: '3', name: 'Michael Brown', avatar: null, role: 'Designer' },
    { id: '4', name: 'Emily Davis', avatar: null, role: 'QA Engineer' },
    { id: '5', name: 'David Wilson', avatar: null, role: 'Business Analyst' },
    { id: '6', name: 'Lisa Garcia', avatar: null, role: 'DevOps Engineer' }
  ];

  const [kanbanData, setKanbanData] = useState({
    'to-do': {
      title: 'To Do',
      color: '#1890ff',
      tasks: [
        {
          id: '1',
          title: 'Design System Architecture',
          description: 'Create comprehensive system architecture for the new ERP module',
          priority: 'high',
          type: 'feature',
          assignee: { id: '1', name: 'John Smith', avatar: null },
          dueDate: '2024-02-15',
          tags: ['architecture', 'design'],
          comments: 3,
          attachments: 2,
          progress: 0,
          estimatedHours: 40
        },
        {
          id: '2',
          title: 'User Research Study',
          description: 'Conduct user interviews and usability testing',
          priority: 'medium',
          type: 'research',
          assignee: { id: '3', name: 'Michael Brown', avatar: null },
          dueDate: '2024-02-20',
          tags: ['research', 'ux'],
          comments: 1,
          attachments: 0,
          progress: 0,
          estimatedHours: 24
        },
        {
          id: '3',
          title: 'API Documentation Update',
          description: 'Update API documentation for v2.0 endpoints',
          priority: 'low',
          type: 'documentation',
          assignee: { id: '2', name: 'Sarah Johnson', avatar: null },
          dueDate: '2024-02-25',
          tags: ['documentation', 'api'],
          comments: 0,
          attachments: 1,
          progress: 0,
          estimatedHours: 16
        }
      ]
    },
    'in-progress': {
      title: 'In Progress',
      color: '#faad14',
      tasks: [
        {
          id: '4',
          title: 'Database Migration Script',
          description: 'Develop migration scripts for customer data transfer',
          priority: 'high',
          type: 'development',
          assignee: { id: '2', name: 'Sarah Johnson', avatar: null },
          dueDate: '2024-02-12',
          tags: ['database', 'migration'],
          comments: 5,
          attachments: 3,
          progress: 65,
          estimatedHours: 32,
          timeSpent: 21
        },
        {
          id: '5',
          title: 'UI Component Library',
          description: 'Build reusable UI components for the dashboard',
          priority: 'medium',
          type: 'development',
          assignee: { id: '4', name: 'Emily Davis', avatar: null },
          dueDate: '2024-02-18',
          tags: ['ui', 'components'],
          comments: 2,
          attachments: 1,
          progress: 45,
          estimatedHours: 28,
          timeSpent: 13
        }
      ]
    },
    'review': {
      title: 'In Review',
      color: '#722ed1',
      tasks: [
        {
          id: '6',
          title: 'Security Audit Report',
          description: 'Complete security audit and vulnerability assessment',
          priority: 'high',
          type: 'security',
          assignee: { id: '6', name: 'Lisa Garcia', avatar: null },
          dueDate: '2024-02-10',
          tags: ['security', 'audit'],
          comments: 8,
          attachments: 5,
          progress: 90,
          estimatedHours: 20,
          timeSpent: 18
        }
      ]
    },
    'done': {
      title: 'Done',
      color: '#52c41a',
      tasks: [
        {
          id: '7',
          title: 'Authentication Module',
          description: 'Implement OAuth 2.0 authentication system',
          priority: 'high',
          type: 'feature',
          assignee: { id: '5', name: 'David Wilson', avatar: null },
          dueDate: '2024-02-05',
          tags: ['authentication', 'security'],
          comments: 12,
          attachments: 4,
          progress: 100,
          estimatedHours: 36,
          timeSpent: 38,
          completedDate: '2024-02-05'
        },
        {
          id: '8',
          title: 'Logo and Branding Guidelines',
          description: 'Finalize company logo and create branding guidelines',
          priority: 'medium',
          type: 'design',
          assignee: { id: '3', name: 'Michael Brown', avatar: null },
          dueDate: '2024-02-03',
          tags: ['branding', 'design'],
          comments: 6,
          attachments: 8,
          progress: 100,
          estimatedHours: 16,
          timeSpent: 15,
          completedDate: '2024-02-02'
        }
      ]
    }
  });

  const priorityConfig = {
    high: { color: '#ff4d4f', icon: <ExclamationCircleOutlined />, label: 'High' },
    medium: { color: '#faad14', icon: <FlagOutlined />, label: 'Medium' },
    low: { color: '#52c41a', icon: <ArrowRightOutlined />, label: 'Low' }
  };

  const typeConfig = {
    feature: { color: '#1890ff', icon: <RocketOutlined />, label: 'Feature' },
    bug: { color: '#ff4d4f', icon: <BugOutlined />, label: 'Bug' },
    research: { color: '#722ed1', icon: <EyeOutlined />, label: 'Research' },
    documentation: { color: '#52c41a', icon: <EditOutlined />, label: 'Documentation' },
    development: { color: '#faad14', icon: <SettingOutlined />, label: 'Development' },
    design: { color: '#eb2f96', icon: <StarOutlined />, label: 'Design' },
    security: { color: '#fa541c', icon: <ExclamationCircleOutlined />, label: 'Security' }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    form.setFieldsValue({
      ...task,
      dueDate: task.dueDate ? dayjs(task.dueDate) : null,
      assigneeId: task.assignee?.id
    });
    setIsModalVisible(true);
  };

  const handleSaveTask = (values) => {
    const newTask = {
      id: editingTask?.id || Date.now().toString(),
      ...values,
      dueDate: values.dueDate ? values.dueDate.format('YYYY-MM-DD') : null,
      assignee: teamMembers.find(member => member.id === values.assigneeId),
      comments: editingTask?.comments || 0,
      attachments: editingTask?.attachments || 0,
      progress: editingTask?.progress || 0,
      timeSpent: editingTask?.timeSpent || 0
    };

    setKanbanData(prev => {
      const newData = { ...prev };
      
      if (editingTask) {
        // Remove from old column
        Object.keys(newData).forEach(columnKey => {
          newData[columnKey].tasks = newData[columnKey].tasks.filter(task => task.id !== editingTask.id);
        });
      }
      
      // Add to new column
      const targetColumn = values.status || 'to-do';
      newData[targetColumn].tasks.push(newTask);
      
      return newData;
    });

    setIsModalVisible(false);
    message.success(editingTask ? 'Task updated successfully' : 'Task created successfully');
  };

  // Drag and drop handlers
  const handleDragStart = (event) => {
    const { active } = event;
    setActiveId(active.id);
    
    // Find the dragged task
    Object.values(kanbanData).forEach(column => {
      const task = column.tasks.find(t => t.id === active.id);
      if (task) {
        setDraggedTask(task);
      }
    });
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    
    if (!over) return;
    
    const activeId = active.id;
    const overId = over.id;
    
    // Find the containers
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId) || overId;
    
    if (!activeContainer || !overContainer || activeContainer === overContainer) {
      return;
    }
    
    setKanbanData((prev) => {
      const activeItems = prev[activeContainer].tasks;
      const overItems = prev[overContainer].tasks;
      
      // Find the indexes for the items
      const activeIndex = activeItems.findIndex(item => item.id === activeId);
      const overIndex = overItems.findIndex(item => item.id === overId);
      
      let newIndex;
      if (overId in prev) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem = over && overIndex < overItems.length - 1;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }
      
      return {
        ...prev,
        [activeContainer]: {
          ...prev[activeContainer],
          tasks: prev[activeContainer].tasks.filter(item => item.id !== activeId)
        },
        [overContainer]: {
          ...prev[overContainer],
          tasks: [
            ...prev[overContainer].tasks.slice(0, newIndex),
            activeItems[activeIndex],
            ...prev[overContainer].tasks.slice(newIndex, prev[overContainer].tasks.length)
          ]
        }
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      setDraggedTask(null);
      return;
    }
    
    const activeId = active.id;
    const overId = over.id;
    
    const activeContainer = findContainer(activeId);
    const overContainer = findContainer(overId) || overId;
    
    if (!activeContainer || !overContainer) {
      setActiveId(null);
      setDraggedTask(null);
      return;
    }
    
    const activeIndex = kanbanData[activeContainer].tasks.findIndex(item => item.id === activeId);
    const overIndex = kanbanData[overContainer].tasks.findIndex(item => item.id === overId);
    
    if (activeContainer === overContainer) {
      setKanbanData((prev) => ({
        ...prev,
        [overContainer]: {
          ...prev[overContainer],
          tasks: arrayMove(prev[overContainer].tasks, activeIndex, overIndex)
        }
      }));
    }
    
    setActiveId(null);
    setDraggedTask(null);
    
    // Show success message if task moved to different column
    if (activeContainer !== overContainer) {
      message.success(`Task moved to ${kanbanData[overContainer].title}`);
    }
  };

  const findContainer = (id) => {
    if (id in kanbanData) {
      return id;
    }
    
    return Object.keys(kanbanData).find((key) =>
      kanbanData[key].tasks.some(item => item.id === id)
    );
  };

  const getTaskCardActions = (task) => [
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: 'View Details',
      onClick: () => message.info('View task details')
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'Edit Task',
      onClick: () => handleEditTask(task)
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'Delete Task',
      danger: true,
      onClick: () => {
        Modal.confirm({
          title: 'Delete Task',
          content: 'Are you sure you want to delete this task?',
          onOk: () => {
            setKanbanData(prev => {
              const newData = { ...prev };
              Object.keys(newData).forEach(columnKey => {
                newData[columnKey].tasks = newData[columnKey].tasks.filter(t => t.id !== task.id);
              });
              return newData;
            });
            message.success('Task deleted successfully');
          }
        });
      }
    }
  ];

  const TaskCard = ({ task }) => (
    <Card
      size="small"
      className="task-card"
      style={{ 
        marginBottom: 12,
        borderRadius: 8,
        boxShadow: 'var(--oracle-shadow-sm)',
        border: '1px solid var(--oracle-border)',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      bodyStyle={{ padding: 16 }}
      hoverable
      extra={
        <Dropdown 
          menu={{ items: getTaskCardActions(task) }}
          trigger={['click']}
          placement="bottomRight"
        >
          <Button type="text" size="small" icon={<MoreOutlined />} />
        </Dropdown>
      }
    >
      <div style={{ marginBottom: 8 }}>
        <Space>
          <Tag 
            color={priorityConfig[task.priority].color}
            icon={priorityConfig[task.priority].icon}
            style={{ fontSize: '11px', fontWeight: 500 }}
          >
            {priorityConfig[task.priority].label}
          </Tag>
          <Tag 
            color={typeConfig[task.type].color}
            icon={typeConfig[task.type].icon}
            style={{ fontSize: '11px' }}
          >
            {typeConfig[task.type].label}
          </Tag>
        </Space>
      </div>
      
      <Title level={5} style={{ marginBottom: 8, fontSize: '14px', lineHeight: '20px' }}>
        {task.title}
      </Title>
      
      <Paragraph 
        style={{ 
          marginBottom: 12, 
          fontSize: '12px', 
          color: 'var(--oracle-text-secondary)',
          lineHeight: '16px'
        }}
        ellipsis={{ rows: 2 }}
      >
        {task.description}
      </Paragraph>

      {task.progress > 0 && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
              Progress
            </Text>
            <Text style={{ fontSize: '11px', fontWeight: 500 }}>
              {task.progress}%
            </Text>
          </div>
          <Progress 
            percent={task.progress} 
            size="small" 
            strokeColor="var(--oracle-primary)"
            showInfo={false}
          />
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Space size={8}>
          <Tooltip title={task.assignee?.name}>
            <Avatar 
              size={24} 
              icon={<UserOutlined />}
              style={{ 
                backgroundColor: 'var(--oracle-primary)',
                fontSize: '12px'
              }}
            >
              {task.assignee?.name?.charAt(0)}
            </Avatar>
          </Tooltip>
          
          {task.dueDate && (
            <Tooltip title={`Due: ${dayjs(task.dueDate).format('MMM DD, YYYY')}`}>
              <Tag 
                icon={<CalendarOutlined />}
                color={dayjs(task.dueDate).isBefore(dayjs()) ? 'red' : 'blue'}
                style={{ fontSize: '10px', margin: 0 }}
              >
                {dayjs(task.dueDate).format('MMM DD')}
              </Tag>
            </Tooltip>
          )}
        </Space>

        <Space size={12}>
          {task.comments > 0 && (
            <Tooltip title={`${task.comments} comments`}>
              <Space size={2}>
                <CommentOutlined style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }} />
                <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
                  {task.comments}
                </Text>
              </Space>
            </Tooltip>
          )}
          
          {task.attachments > 0 && (
            <Tooltip title={`${task.attachments} attachments`}>
              <Space size={2}>
                <PaperClipOutlined style={{ fontSize: '12px', color: 'var(--oracle-text-secondary)' }} />
                <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
                  {task.attachments}
                </Text>
              </Space>
            </Tooltip>
          )}
        </Space>
      </div>

      {task.timeSpent && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--oracle-border)' }}>
          <Space>
            <ClockCircleOutlined style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }} />
            <Text style={{ fontSize: '11px', color: 'var(--oracle-text-secondary)' }}>
              {task.timeSpent}h / {task.estimatedHours}h
            </Text>
          </Space>
        </div>
      )}

      {task.tags && task.tags.length > 0 && (
        <div style={{ marginTop: 8 }}>
          {task.tags.map(tag => (
            <Tag 
              key={tag} 
              size="small" 
              style={{ 
                fontSize: '10px', 
                margin: '2px 4px 2px 0',
                borderRadius: 10 
              }}
            >
              {tag}
            </Tag>
          ))}
        </div>
      )}
    </Card>
  );

  const SortableTaskCard = ({ task }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: task.id });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.5 : 1,
      cursor: isDragging ? 'grabbing' : 'grab',
    };

    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <TaskCard task={task} />
      </div>
    );
  };

  const DroppableColumn = ({ columnKey, column }) => {
    const { setNodeRef, isOver } = useDroppable({
      id: columnKey,
    });

    return (
      <div 
        ref={setNodeRef}
        style={{ 
          flex: '0 0 300px',
          backgroundColor: isOver ? 'rgba(24, 144, 255, 0.05)' : 'var(--oracle-background)',
          borderRadius: 8,
          padding: 16,
          border: isOver ? '2px solid #1890ff' : '1px solid var(--oracle-border)',
          minHeight: 500,
          transition: 'all 0.2s ease',
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 16
        }}>
          <Space>
            <div 
              style={{ 
                width: 12, 
                height: 12, 
                borderRadius: '50%', 
                backgroundColor: column.color 
              }} 
            />
            <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
              {column.title}
            </Title>
            <Badge 
              count={column.tasks.length} 
              style={{ backgroundColor: column.color }}
            />
          </Space>
          
          <Button 
            type="text" 
            size="small" 
            icon={<PlusOutlined />}
            onClick={handleAddTask}
            style={{ color: 'var(--oracle-text-secondary)' }}
          />
        </div>

        <SortableContext 
          items={column.tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          <div style={{ minHeight: 400 }}>
            {column.tasks.map(task => (
              <SortableTaskCard key={task.id} task={task} />
            ))}
            
            {column.tasks.length === 0 && (
              <div style={{ 
                textAlign: 'center', 
                color: 'var(--oracle-text-secondary)',
                padding: '40px 20px',
                backgroundColor: 'var(--oracle-surface)',
                borderRadius: 8,
                border: '2px dashed var(--oracle-border)'
              }}>
                <Text>No tasks in this column</Text>
                <br />
                <Text style={{ fontSize: '12px' }}>
                  Drag tasks here or{' '}
                  <Button 
                    type="link" 
                    size="small" 
                    onClick={handleAddTask}
                    style={{ padding: 0, height: 'auto', fontSize: '12px' }}
                  >
                    add a new task
                  </Button>
                </Text>
              </div>
            )}
          </div>
        </SortableContext>
      </div>
    );
  };

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div style={{ flex: 1 }}>
          <Title level={2} style={{ margin: 0, color: 'var(--oracle-text-primary)' }}>
            Kanban Board
          </Title>
          <Text style={{ color: 'var(--oracle-text-secondary)', fontSize: '16px' }}>
            Manage your projects with visual task boards and workflows - Drag and drop to organize tasks
          </Text>
        </div>
        
        <Space>
          <Select
            value={selectedBoard}
            onChange={setSelectedBoard}
            style={{ minWidth: 200 }}
            options={boards.map(board => ({
              value: board.key,
              label: (
                <Space>
                  <div 
                    style={{ 
                      width: 8, 
                      height: 8, 
                      borderRadius: '50%', 
                      backgroundColor: board.color 
                    }} 
                  />
                  {board.label}
                </Space>
              )
            }))}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTask}>
            Add Task
          </Button>
        </Space>
      </div>

      {/* Board Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#e6f7ff' }}>
                <TeamOutlined style={{ color: '#1890ff' }} />
              </div>
              <div>
                <div className="stats-number">
                  {Object.values(kanbanData).reduce((total, column) => total + column.tasks.length, 0)}
                </div>
                <div className="stats-label">Total Tasks</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#fff7e6' }}>
                <SyncOutlined style={{ color: '#faad14' }} />
              </div>
              <div>
                <div className="stats-number">
                  {kanbanData['in-progress']?.tasks.length || 0}
                </div>
                <div className="stats-label">In Progress</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#f6ffed' }}>
                <CheckCircleOutlined style={{ color: '#52c41a' }} />
              </div>
              <div>
                <div className="stats-number">
                  {kanbanData.done?.tasks.length || 0}
                </div>
                <div className="stats-label">Completed</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small" className="stats-card">
            <div className="stats-content">
              <div className="stats-icon" style={{ backgroundColor: '#fff2e8' }}>
                <ExclamationCircleOutlined style={{ color: '#fa541c' }} />
              </div>
              <div>
                <div className="stats-number">
                  {Object.values(kanbanData).reduce((count, column) => 
                    count + column.tasks.filter(task => task.priority === 'high').length, 0
                  )}
                </div>
                <div className="stats-label">High Priority</div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div style={{ overflowX: 'auto', paddingBottom: 20 }}>
          <div style={{ display: 'flex', gap: 16, minWidth: 800 }}>
            {Object.entries(kanbanData).map(([columnKey, column]) => (
              <DroppableColumn key={columnKey} columnKey={columnKey} column={column} />
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeId && draggedTask ? (
            <div style={{ transform: 'rotate(5deg)', opacity: 0.8 }}>
              <TaskCard task={draggedTask} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Modal */}
      <Modal
        title={editingTask ? 'Edit Task' : 'Create New Task'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveTask}
          style={{ marginTop: 20 }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                label="Task Title"
                name="title"
                rules={[{ required: true, message: 'Please enter task title' }]}
              >
                <Input placeholder="Enter task title" />
              </Form.Item>
            </Col>
            
            <Col span={24}>
              <Form.Item
                label="Description"
                name="description"
              >
                <TextArea 
                  rows={3} 
                  placeholder="Enter task description"
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Priority"
                name="priority"
                rules={[{ required: true, message: 'Please select priority' }]}
              >
                <Select placeholder="Select priority">
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <Select.Option key={key} value={key}>
                      <Space>
                        {config.icon}
                        {config.label}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: 'Please select type' }]}
              >
                <Select placeholder="Select type">
                  {Object.entries(typeConfig).map(([key, config]) => (
                    <Select.Option key={key} value={key}>
                      <Space>
                        {config.icon}
                        {config.label}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Assignee"
                name="assigneeId"
              >
                <Select placeholder="Select assignee">
                  {teamMembers.map(member => (
                    <Select.Option key={member.id} value={member.id}>
                      <Space>
                        <Avatar size={20} icon={<UserOutlined />}>
                          {member.name.charAt(0)}
                        </Avatar>
                        {member.name}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Due Date"
                name="dueDate"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  {Object.entries(kanbanData).map(([key, column]) => (
                    <Select.Option key={key} value={key}>
                      <Space>
                        <div 
                          style={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            backgroundColor: column.color 
                          }} 
                        />
                        {column.title}
                      </Space>
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Estimated Hours"
                name="estimatedHours"
              >
                <Input 
                  type="number" 
                  placeholder="Enter estimated hours"
                  min={0}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Tags"
                name="tags"
              >
                <Select
                  mode="tags"
                  placeholder="Add tags"
                  style={{ width: '100%' }}
                  tokenSeparators={[',']}
                />
              </Form.Item>
            </Col>
          </Row>

          <div style={{ textAlign: 'right', marginTop: 20 }}>
            <Space>
              <Button onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {editingTask ? 'Update Task' : 'Create Task'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default KanbanPage;

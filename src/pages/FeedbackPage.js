import React, { useState } from "react";
import {
  Card,
  Typography,
  Alert,
  Button,
  Modal,
  Drawer,
  Popconfirm,
  Progress,
  Spin,
  Skeleton,
  Result,
  notification,
  message,
  Space,
  Divider,
} from "antd";
import {
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  SmileOutlined,
  CloseOutlined,
  ReloadOutlined,
  PrinterOutlined,
  CloudServerOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const FeedbackPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const showConfirmModal = () => {
    setConfirmModalVisible(true);
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const handleSpin = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };

  const openNotification = (type) => {
    notification[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
    });
  };

  const showMessage = (type) => {
    message[type]("This is a message of " + type);
  };

  const confirm = () => {
    Modal.confirm({
      title: "Do you Want to delete these items?",
      icon: <ExclamationCircleOutlined />,
      content: "Some descriptions",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const info = () => {
    Modal.info({
      title: "This is a notification message",
      content: (
        <div>
          <p>some messages...some messages...</p>
          <p>some messages...some messages...</p>
        </div>
      ),
      onOk() {},
    });
  };

  const success = () => {
    Modal.success({
      content: "some messages...some messages...",
    });
  };

  const error = () => {
    Modal.error({
      title: "This is an error message",
      content: "some messages...some messages...",
    });
  };

  const warning = () => {
    Modal.warning({
      title: "This is a warning message",
      content: "some messages...some messages...",
    });
  };

  return (
    <div>
      <div className="page-header">
        <Title level={1}>Feedback Components</Title>
        <Paragraph>
          Components for providing feedback to users including alerts, modals,
          notifications, and loading states.
        </Paragraph>
      </div>

      <div className="demo-section">
        <Title level={2}>Alert</Title>
        <Paragraph>
          Alert component for feedback such as success, warning, error and info.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Alerts</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert message="Success Tips" type="success" showIcon />
              <Alert message="Informational Notes" type="info" showIcon />
              <Alert message="Warning" type="warning" showIcon />
              <Alert message="Error" type="error" showIcon />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Closable Alerts</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert
                message="Warning Text Warning Text Warning TextW arning Text Warning Text Warning TextWarning Text"
                type="warning"
                closable
                onClose={() => console.log("Alert closed")}
              />
              <Alert
                message="Error Text"
                description="Error Description Error Description Error Description Error Description Error Description Error Description"
                type="error"
                closable
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Alert with Description</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert
                message="Success"
                description="Detailed description and advice about successful copywriting."
                type="success"
                showIcon
              />
              <Alert
                message="Info"
                description="Additional description and information about copywriting."
                type="info"
                showIcon
              />
              <Alert
                message="Warning"
                description="This is a warning notice about copywriting."
                type="warning"
                showIcon
                closable
              />
              <Alert
                message="Error"
                description="This is an error message about copywriting."
                type="error"
                showIcon
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Alert with Action</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Alert
                message="Success Tips"
                type="success"
                showIcon
                action={
                  <Button size="small" type="text">
                    UNDO
                  </Button>
                }
                closable
              />
              <Alert
                message="Error Text"
                showIcon
                description="Error Description Error Description Error Description Error Description"
                type="error"
                action={
                  <Button size="small" danger>
                    Detail
                  </Button>
                }
              />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Modal</Title>
        <Paragraph>Modal dialogs for user feedback and confirmation.</Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Modal</Title>
            <Space wrap>
              <Button type="primary" onClick={showModal}>
                Open Modal
              </Button>
              <Modal
                title="Basic Modal"
                visible={modalVisible}
                onOk={() => setModalVisible(false)}
                onCancel={() => setModalVisible(false)}
              >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
              </Modal>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Confirmation Modal</Title>
            <Space wrap>
              <Button onClick={confirm}>Confirm</Button>
              <Button onClick={info}>Info</Button>
              <Button onClick={success}>Success</Button>
              <Button onClick={error}>Error</Button>
              <Button onClick={warning}>Warning</Button>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Custom Modal</Title>
            <Button type="primary" onClick={showConfirmModal}>
              Open Modal with customized footer
            </Button>
            <Modal
              title="Title"
              visible={confirmModalVisible}
              onCancel={() => setConfirmModalVisible(false)}
              footer={[
                <Button
                  key="back"
                  onClick={() => setConfirmModalVisible(false)}
                >
                  Return
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={false}
                  onClick={() => setConfirmModalVisible(false)}
                >
                  Submit
                </Button>,
              ]}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Modal>
          </div>

          <div className="demo-item">
            <Title level={4}>Popconfirm</Title>
            <Space>
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => message.success("Clicked on Yes.")}
                onCancel={() => message.error("Clicked on No.")}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
              <Popconfirm
                title="Are you sure？"
                icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                onConfirm={() => message.success("Confirmed")}
              >
                <Button>Confirm</Button>
              </Popconfirm>
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Drawer</Title>
        <Paragraph>
          A panel that slides in from the edge of the screen.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Basic Drawer</Title>
            <Button type="primary" onClick={showDrawer}>
              Open Drawer
            </Button>
            <Drawer
              title="Basic Drawer"
              placement="right"
              onClose={() => setDrawerVisible(false)}
              visible={drawerVisible}
            >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
            </Drawer>
          </div>

          <div className="demo-item">
            <Title level={4}>Drawer Placements</Title>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setDrawerVisible(true);
                }}
              >
                Right
              </Button>
              <Button
                onClick={() => {
                  // For demo, using same drawer but with different placement
                  setDrawerVisible(true);
                }}
              >
                Left
              </Button>
              <Button
                onClick={() => {
                  setDrawerVisible(true);
                }}
              >
                Top
              </Button>
              <Button
                onClick={() => {
                  setDrawerVisible(true);
                }}
              >
                Bottom
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Progress</Title>
        <Paragraph>
          Display the current progress of an operation flow.
        </Paragraph>

        <div
          className="demo-grid"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <div className="demo-item">
            <Title level={4}>Progress Bar</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Progress percent={30} />
              <Progress percent={50} status="active" />
              <Progress percent={70} status="exception" />
              <Progress percent={100} />
              <Progress percent={50} showInfo={false} />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Circular Progress</Title>
            <Space>
              <Progress type="circle" percent={75} />
              <Progress type="circle" percent={70} status="exception" />
              <Progress type="circle" percent={100} />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Mini Progress</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Progress size="small" percent={30} />
              <Progress size="small" percent={50} status="active" />
              <Progress size="small" percent={70} status="exception" />
              <Progress size="small" percent={100} />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Dashboard Progress</Title>
            <Space>
              <Progress type="dashboard" percent={75} />
              <Progress type="dashboard" percent={75} gapDegree={30} />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Loading States</Title>
        <Paragraph>
          Components for indicating loading states and placeholder content.
        </Paragraph>

        <div
          className="demo-grid"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <div className="demo-item">
            <Title level={4}>Spin</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
              <Button onClick={handleSpin}>Start Spinning</Button>
              <Spin spinning={spinning} tip="Loading...">
                <div
                  style={{ padding: "50px", background: "rgba(0, 0, 0, 0.05)" }}
                >
                  Content here will be covered by the spinning indicator when
                  loading.
                </div>
              </Spin>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Custom Spin</Title>
            <Space direction="vertical">
              <Spin
                indicator={<ReloadOutlined style={{ fontSize: 24 }} spin />}
              />
              <Spin
                indicator={
                  <CloudServerOutlined style={{ fontSize: 24 }} spin />
                }
              />
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Skeleton</Title>
            <Skeleton active />
          </div>

          <div className="demo-item">
            <Title level={4}>Skeleton Variants</Title>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Skeleton avatar paragraph={{ rows: 4 }} />
              <Skeleton.Button active size="large" shape="round" />
              <Skeleton.Button active size="small" />
              <Skeleton.Input active size="large" />
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Notifications & Messages</Title>
        <Paragraph>
          Global feedback components for displaying messages and notifications.
        </Paragraph>

        <div
          className="demo-grid"
          style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          <div className="demo-item">
            <Title level={4}>Notification</Title>
            <Space wrap>
              <Button onClick={() => openNotification("success")}>
                Success
              </Button>
              <Button onClick={() => openNotification("info")}>Info</Button>
              <Button onClick={() => openNotification("warning")}>
                Warning
              </Button>
              <Button onClick={() => openNotification("error")}>Error</Button>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Message</Title>
            <Space wrap>
              <Button onClick={() => showMessage("success")}>Success</Button>
              <Button onClick={() => showMessage("info")}>Info</Button>
              <Button onClick={() => showMessage("warning")}>Warning</Button>
              <Button onClick={() => showMessage("error")}>Error</Button>
              <Button onClick={() => showMessage("loading")}>Loading</Button>
            </Space>
          </div>

          <div className="demo-item">
            <Title level={4}>Custom Notification</Title>
            <Button
              type="primary"
              onClick={() => {
                notification.open({
                  message: "Custom Notification",
                  description:
                    "This is a custom notification with icon and action.",
                  icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                  btn: (
                    <Button type="primary" size="small">
                      Confirm
                    </Button>
                  ),
                });
              }}
            >
              Custom Notification
            </Button>
          </div>

          <div className="demo-item">
            <Title level={4}>Message Duration</Title>
            <Space wrap>
              <Button
                onClick={() =>
                  message.success(
                    "This success message will last 10 seconds",
                    10
                  )
                }
              >
                Long Success
              </Button>
              <Button
                onClick={() => message.loading("Action in progress..", 0)}
              >
                Loading (No auto close)
              </Button>
            </Space>
          </div>
        </div>
      </div>

      <Divider />

      <div className="demo-section">
        <Title level={2}>Result</Title>
        <Paragraph>
          Used to feedback the result of a series of operational tasks.
        </Paragraph>

        <div className="demo-grid">
          <div className="demo-item">
            <Title level={4}>Success Result</Title>
            <Result
              status="success"
              title="Successfully Purchased Cloud Server ECS!"
              subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
              extra={[
                <Button type="primary" key="console">
                  Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
              ]}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Error Result</Title>
            <Result
              status="error"
              title="Submission Failed"
              subTitle="Please check and modify the following information before resubmitting."
              extra={[
                <Button type="primary" key="console">
                  Go Console
                </Button>,
                <Button key="buy">Buy Again</Button>,
              ]}
            />
          </div>

          <div className="demo-item">
            <Title level={4}>Warning Result</Title>
            <Result
              status="warning"
              title="There are some problems with your operation."
              extra={
                <Button type="primary" key="console">
                  Go Console
                </Button>
              }
            />
          </div>

          <div className="demo-item">
            <Title level={4}>404 Result</Title>
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Button type="primary">Back Home</Button>}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;

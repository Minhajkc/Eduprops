import React, { useState, useEffect } from 'react';
import { Button, Breadcrumb, Layout, Menu, Modal } from 'antd';
import { DesktopOutlined, FileOutlined, PieChartOutlined, TeamOutlined, LogoutOutlined } from '@ant-design/icons';
import ScheduleMeetingModal from '../Components/Layout/ScheduleMeetingModal';
import { fetchScheduledMeets, logoutMentor, getProfile } from '../../Services/mentorService';
import { useNavigate } from 'react-router-dom';
import ScheduledMeetings from '../Components/Layout/ScheduledMeetings';
import MentorChat from '../Components/Layout/MentorChat';
import StudentCard from '../Components/Layout/StudentCard';
import CoursePageMentor from '../Components/Layout/CoursePageMentor'; // Import Course component

const { Header, Content, Footer, Sider } = Layout;
const { confirm } = Modal;

const MentorDashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1');
  const [mentor, setMentor] = useState(null);
  const [assignedCourses, setAssignedCourses] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [scheduledMeets, setScheduledMeets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [meetingToEdit, setMeetingToEdit] = useState(null);

  const navigate = useNavigate();

  const handleEdit = (meeting) => {
    setMeetingToEdit(meeting);
    setIsModalVisible(true);
  };

  useEffect(() => {
    const loadScheduledMeets = async () => {
      setLoading(true);
      const result = await fetchScheduledMeets(courseId);
      if (result.success) {
        setScheduledMeets(result.meets);
      }
      setLoading(false);
    };

    if (courseId) {
      loadScheduledMeets();
    }
  }, [courseId]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setMeetingToEdit(null);
  };

  const handleScheduleSuccess = async () => {
    const result = await fetchScheduledMeets(courseId);
    if (result.success) {
      setScheduledMeets(result.meets);
    }
  };

  const handleDeleteSuccess = async () => {
    const result = await fetchScheduledMeets(courseId);
    if (result.success) {
      setScheduledMeets(result.meets);
    }
  };

  const showLogoutConfirm = () => {
    confirm({
      title: 'Are you sure you want to logout?',
      icon: <LogoutOutlined style={{ color: '#ff4d4f' }} />,
      content: 'You will need to log in again to access your account.',
      okText: 'Yes, Logout',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await logoutMentor();
          navigate('/mentor');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      },
      onCancel() {
        console.log('Logout canceled');
      },
    });
  };

  useEffect(() => {
    const fetchMentorProfile = async () => {
      try {
        const data = await getProfile();
        setMentor(data.mentor);
        setAssignedCourses(data.mentor.assignedCourses);
        setCourseId(data.mentor.assignedCourses[0]._id);
      } catch (error) {
        console.error('Error fetching mentor profile:', error);
      }
    };

    fetchMentorProfile();
  }, []);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          onClick={(e) => setSelectedMenuKey(e.key)}
          items={[
            { label: 'Dashboard', key: '1', icon: <PieChartOutlined /> },
            { label: 'Chat', key: 'chat', icon: <TeamOutlined /> },
            { label: 'Course', key: '9', icon: <FileOutlined /> },
            {
              label: 'Logout',
              key: '10',
              icon: <LogoutOutlined />,
              onClick: showLogoutConfirm,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
            borderBottom: '1px solid #f0f0f0',
          }}
        >
          <h1 style={{ margin: 0 }}>
            Welcome, <span style={{ color: '#1890ff' }}>{mentor?.username}</span>{' '}
            | Assigned Course: <span style={{ color: '#52c41a' }}>{assignedCourses[0]?.title}</span>
          </h1>
          <Button type="primary" icon={<LogoutOutlined />} onClick={showLogoutConfirm} danger>
            Logout
          </Button>
        </Header>

        <Content style={{ padding: '24px', minHeight: '360px', background: '#fff' }}>
          <Breadcrumb style={{ marginBottom: '16px' }}>
            <Breadcrumb.Item>Mentor Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>
              {selectedMenuKey === 'chat'
                ? 'Chat'
                : selectedMenuKey === '9'
                ? 'Course'
                : 'Meetings'}
            </Breadcrumb.Item>
          </Breadcrumb>

          <div>
            {selectedMenuKey === 'chat' ? (
              <MentorChat courseId={courseId} userName={mentor?.username} />
            ) : selectedMenuKey === '9' ? (
              <CoursePageMentor courseId={courseId} /> // Show Course component when selected
            ) : (
              <>
                <Button type="primary" onClick={showModal} style={{ marginBottom: '16px' }}>
                  Schedule a Meeting
                </Button>
                <ScheduleMeetingModal
                  isVisible={isModalVisible}
                  onClose={handleClose}
                  courseId={courseId}
                  meetingToEdit={meetingToEdit}
                  onScheduleSuccess={handleScheduleSuccess}
                />
                <ScheduledMeetings
                  scheduledMeets={scheduledMeets}
                  loading={loading}
                  onEdit={handleEdit}
                  courseId={courseId}
                  handleDeleteSuccess={handleDeleteSuccess}
                />
                <StudentCard />
              </>
            )}
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
          EduProps ©{new Date().getFullYear()} Created by Minhaj KC
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MentorDashboardPage;

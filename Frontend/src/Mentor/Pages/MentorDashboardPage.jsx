import  { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logoutMentor } from '../../Services/mentorService';
import MentorChat from '../Components/Layout/MentorChat'; // Import the MentorChat component

const { Header, Content, Footer, Sider } = Layout;
const { confirm } = Modal;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Chat', 'chat', <TeamOutlined />), // Chat key set as 'chat'
  getItem('Files', '9', <FileOutlined />),
  getItem('Logout', '10', <LogoutOutlined />), // Logout Menu Item
];

const MentorDashboardPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuKey, setSelectedMenuKey] = useState('1'); // Track selected menu key
  const navigate = useNavigate();
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Function to show confirmation modal before logout
  const showLogoutConfirm = () => {
    confirm({
      title: 'Are you sure you want to log out?',
      icon: <LogoutOutlined />,
      content: 'You will be redirected to the login page after logging out.',
      okText: 'Yes, Logout',
      okType: 'danger',
      cancelText: 'Cancel',
      onOk: async () => {
        try {
          await logoutMentor(); // Call the logout service
          navigate('/mentor'); // Redirect to login page after logout
        } catch (error) {
          console.error('Error logging out:', error);
        }
      },
      onCancel() {
        console.log('Logout canceled');
      },
    });
  };

  const handleMenuClick = (e) => {
    if (e.key === '10') {
      showLogoutConfirm(); // Show confirmation before logging out
    } else {
      setSelectedMenuKey(e.key); // Set selected menu key for rendering content
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar (Sider) */}
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={handleMenuClick} // Handle menu clicks
        />
      </Sider>

      {/* Main Layout (Content Area) */}
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {/* Logout Button in Header */}
          <div style={{ paddingLeft: '16px', textAlign: 'left' }} className='text-center'>
            <h1>Hello, Teacher</h1>
          </div>
        </Header>

        <Content style={{ margin: '0 16px' }}>
          {/* Breadcrumb Navigation */}
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Mentor Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>{selectedMenuKey === 'chat' ? 'Chat' : 'Bill'}</Breadcrumb.Item>
          </Breadcrumb>

          {/* Main Content */}
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {/* Render Chat Component when "Chat" is selected */}
            {selectedMenuKey === 'chat' ? (
              <MentorChat courseId="12345" userName="mentorName" /> // Pass necessary props
            ) : (
              'Bill is a cat.'
            )}
          </div>
        </Content>

        {/* Footer */}
        <Footer style={{ textAlign: 'center' }}>
          EduProps©{new Date().getFullYear()} Created by Minhaj Kc
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MentorDashboardPage;

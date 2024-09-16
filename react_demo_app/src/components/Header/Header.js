import React from 'react';
import { Menu, Dropdown, Avatar, Layout } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import './Header.css'; // Import styles
import logo from '../../assets/TodoLogo.png'

const { Header: AntHeader } = Layout;

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser'); // Clear the user from local storage
    navigate('/'); // Redirect to the login page
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings">
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader className="header">
      <div className="logo">
        <Link to="/todo">
          <img src={logo} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
        <Menu.Item key="home">
          <Link to="/todo">Home</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="contact">
          <Link to="/contact">Contact</Link>
        </Menu.Item>
      </Menu>
      <div className="user-dropdown">
        <Dropdown overlay={menu} trigger={['click']}>
          <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Avatar icon={<UserOutlined />} />
            <span className="username" style={{ marginLeft: '8px' }}>User</span>
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;

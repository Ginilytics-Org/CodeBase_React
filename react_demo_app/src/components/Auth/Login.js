import React from 'react';
import { Form, Input, Button } from 'antd';
import Swal from 'sweetalert2';
import './Login.css'; // Import the new CSS

const Login = ({ onLoginSuccess }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const registeredUsers = JSON.parse(localStorage.getItem('users')) || [];
    const user = registeredUsers.find(
      (user) => user.email === values.email && user.password === values.password
    );

    if (user) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      Swal.fire('Success', 'Login successful!', 'success').then(() => {
        if (onLoginSuccess) onLoginSuccess();
      });
    } else {
      Swal.fire('Error', 'Invalid credentials', 'error');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
          <div className="extra-links">
            <a href="/register">Register</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;

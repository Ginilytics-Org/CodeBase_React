import React from 'react';
import { Form, Input, Button } from 'antd';
import Swal from 'sweetalert2';
import './Register.css'; // Import the new CSS

const Register = ({ onRegisterSuccess }) => {
  const [form] = Form.useForm();
  

  const onFinish = (values) => {
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const isUserExist = existingUsers.some((user) => user.email === values.email);

    if (isUserExist) {
      Swal.fire('Error', 'User already exists', 'error');
    } else {
      const newUser = { ...values };
      localStorage.setItem('users', JSON.stringify([...existingUsers, newUser]));
      Swal.fire('Success', 'Registration successful', 'success').then(() => {
        if (onRegisterSuccess) onRegisterSuccess();
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>
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
            Register
          </Button>
          <div className="extra-links">
            <a href="/">Back to Login</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;

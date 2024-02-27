import React from 'react';
import { Form, Input, Button, Card, Select  } from 'antd';
import { LockTwoTone,UserOutlined } from '@ant-design/icons';
const { Option } = Select;

const LoginForm = () => {
  const onFinish = (value) => {
    if( value.username === 'root' && value.password === 'admin'){
         localStorage.setItem('token', 'token123');
         localStorage.setItem('VehicleSize', value.VehicleSize);
         window.location.reload()
    }else{
        alert("Invalid")
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card style={{ width: 400 }} title="Login" >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          style={{ textAlign: 'center' }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password size="large" prefix={<LockTwoTone />} placeholder="Password" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: 'Please select you Vehicle Size!' }]}
            name="VehicleSize"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select placeholder="Select an Vehicle Size">
              <Option value="S">Small</Option>
              <Option value="M">Medium</Option>
              <Option value="L">Large</Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ span: 24 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;

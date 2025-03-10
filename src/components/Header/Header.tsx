import React from "react";
import { Layout, Menu, Button } from "antd";
import { HomeOutlined, AppstoreOutlined, ShoppingCartOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "./Header.module.css";

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Header className="header">
      {/* Logo */}
      <div className="logo">CycWorld</div>

      {/* Navigation Menu */}
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]} className="menu">
        <Menu.Item key="1" icon={<HomeOutlined />}>Home</Menu.Item>
        <Menu.Item key="2" icon={<AppstoreOutlined />}>Services</Menu.Item>
        <Menu.Item key="3" icon={<ShoppingCartOutlined />}>Bicycles</Menu.Item>
        <Menu.Item key="4" icon={<InfoCircleOutlined />}>Accessories</Menu.Item>
        <Menu.Item key="5">About</Menu.Item>
      </Menu>

      {/* Auth Buttons */}
      <div className="auth-buttons">
        <Button type="primary" className="register">Register</Button>
        <Button type="default" className="login">Login</Button>
      </div>
    </Header>
  );
};

export default AppHeader;

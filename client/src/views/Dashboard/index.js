import React, { useState } from "react";
import { Layout, Menu, Avatar, Dropdown, DropdownToggle, Button } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ROUTES, { RenderRoutes } from "../../navigation/routes";
import { displayRouteMenu } from "../../utils/displayRouteMenu";
import { Redirect, useLocation, useHistory } from "react-router-dom";
import jwtDecode from "jwt-decode";

const { Header, Content, Sider } = Layout;

const Dashboard = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem("eBook-token");
  const { role } = jwtDecode(token);

  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const toggleSide = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.clear();
    props.history.push("/");
  };

  if (!token || (token && role === "user")) return <Redirect to="/" />;
  return (
    <Layout>
      <Sider
        collapsible
        trigger={null}
        collapsed={collapsed}
        style={{ minHeight: "100vh" }}
      >
        <div className="logo">
          <img src="" width={"50%"} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["dashboard"]}>
          {displayRouteMenu(ROUTES[11].routes)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <div className="header-dashboard">
            <Button onClick={handleLogout} style={{ border: "none" }}>
              <LogoutOutlined style={{ fontSize: "17px" }} />
            </Button>
          </div>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggleSide,
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
          }}
        >
          <RenderRoutes routes={ROUTES[11].routes} />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

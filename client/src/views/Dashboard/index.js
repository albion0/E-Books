import React, { useState } from 'react';
import { Layout, Menu, Avatar, Dropdown, DropdownToggle } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ROUTES, { RenderRoutes } from '../../navigation/routes';
import { displayRouteMenu } from '../../utils/displayRouteMenu';
import { Redirect, useLocation, useHistory } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const Dashboard = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const token = localStorage.getItem('eBook-token');

  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();

  const toggleSide = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.clear();
    props.history.push('/');
  };

  
  return (
    <Layout>
      <Sider collapsible trigger={null} collapsed={collapsed} style={{ minHeight: '100vh' }}>
        <div className="logo">
          <img src="" width={'50%'} />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          {/* {displayRouteMenu(ROUTES[userRole === 'admin' ? 3 : 9].routes)} */}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background">
          <div className="header-dashboard">
            <ul className="navbar-nav ml-auto" style={{ height: '50px' }}>
             
                <>
                  <li className="nav-item" style={{ height: '50px' }}>
                    <div className="btn-group" style={{ height: '50px' }}>
                      <a
                        className="nav-link user dropdown-toggle mr-5"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span style={{ color: 'black' }}>Admin</span>
                      </a>
                      <div className="dropdown-menu mt-0 mr-5" style={{ lineHeight: '20px' }}>
                        <a className="dropdown-item" onClick={handleLogout}>
                          <LogoutOutlined style={{ paddingRight: '10px', fontSize: '12px' }} />
                         Log Out
                        </a>
                      </div>
                    </div>
                  </li>
                </>
            </ul>
          </div>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggleSide,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
          }}
        >
          {/* <RenderRoutes routes={ROUTES[userRole === 'admin' ? 3 : 9].routes} /> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;

// Icons
import React from 'react';
import {
  UserOutlined,
  UsergroupDeleteOutlined,
  DesktopOutlined,
  ApartmentOutlined,
  BlockOutlined,
  BookOutlined,
  PicCenterOutlined,
  SlidersOutlined,
  BankOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  ReadOutlined,
  DatabaseOutlined,
  CalendarOutlined,
  UsergroupAddOutlined,
  PieChartOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import { Route, Switch } from 'react-router-dom';


import { Loading } from '../components/Loading';
import { PageNotFound } from '../components/PageNotFound';

// Routes Lazy
const Home = React.lazy(() => import('../components/Home/Home'));
const Login = React.lazy(() => import('../components/Login/Login'));
const Register = React.lazy(() => import('../components/Register/Register'));
const ForgotPassword = React.lazy(() => import('../components/ForgotPassword/ForgotPassword'));
const Dashboard = React.lazy(() => import('../views/Dashboard'));

const ROUTES = [
  {
    path: '/',
    key: 'ROOT',
    exact: true,
    component: (props) => <Home {...props} />,
  },
  {
    path: '/login',
    key: 'AUTH',
    exact: true,
    component: (props) => <Login {...props} />,
  },
  {
    path: '/register',
    key: 'AUTH',
    exact: true,
    component: (props) => <Register {...props} />,
  },
  {
    path: '/dashboard',
    key: 'Main',
    component: (props) => <Dashboard {...props} />,
    routes: [
      {
        path: '/dashboard',
        key: 'dashboard',
        exact: true,
        role: 'admin',
        categoryName: 'Dashboard',
        icon: DesktopOutlined,
        shouldShow: true,
        // component: (props) => <StatisticPage {...props} />,
      },
      {
        path: '/dashboard/users',
        key: 'users',
        exact: true,
        role: 'admin',
        categoryName: 'Users',
        icon: UsergroupDeleteOutlined,
        shouldShow: true,
        // component: (props) => < {...props} />,
      },
      {
        path: '/dashboard/books',
        key: 'books',
        exact: true,
        role: 'admin',
        categoryName: 'Books',
        icon: BarChartOutlined,
        shouldShow: true,
        // component: (props) => < {...props} />,
      },
      {
        path: '/dashboard/authors',
        key: 'authors',
        exact: true,
        role: 'admin',
        categoryName: 'Authors',
        icon: ApartmentOutlined,
        shouldShow: true,
        // component: (props) => < {...props} role="admin" />,
      },
      {
        path: '/dashboard/genres',
        key: 'genres',
        exact: true,
        role: 'admin',
        categoryName: 'Genres',
        icon: DatabaseOutlined,
        shouldShow: true,
        // component: (props) => < {...props} />,
      },
    ],
  },
  
  {
    path: '/forgot-password',
    key: 'AUTH',
    exact: true,
    component: (props) => <ForgotPassword {...props} />,
  },
];
export default ROUTES;

export const RenderRoutes = ({ routes }) => {
  return (
    <React.Suspense fallback={<Loading />}>
      <Switch>
        {routes.map((route) => {
          return <RouteWithSubRoutes key={route.key} {...route} />;
        })}
        <Route component={(props) => <PageNotFound {...props} />} />
      </Switch>
    </React.Suspense>
  );
};

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

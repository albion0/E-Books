// Icons
import React from "react";
import {
  UsergroupDeleteOutlined,
  DesktopOutlined,
  ApartmentOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  QuestionOutlined,
  DollarCircleOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { Route, Switch } from "react-router-dom";

import { Loading } from "../components/Loading";
import { PageNotFound } from "../components/PageNotFound";
import AddTopic from "../components/Forum/AddTopic/AddTopic";

// Routes Lazy
const UserContainer = React.lazy(() =>
  import("../views/Dashboard/Users/UserContainer")
);
const Home = React.lazy(() => import("../components/Home/Home"));
const Login = React.lazy(() => import("../components/Login/Login"));
const Register = React.lazy(() => import("../components/Register/Register"));
const ForgotPassword = React.lazy(() =>
  import("../components/ForgotPassword/ForgotPassword")
);
const ResetPassword = React.lazy(() =>
  import("../components/ResetPassword/ResetPassword")
);
const Profile = React.lazy(() => import("../components/Profile/Profile"));
const Dashboard = React.lazy(() => import("../views/Dashboard"));
const Books = React.lazy(() => import("../components/Books/Books"));
const MyBooks = React.lazy(() => import("../components/MyBooks/MyBooks"));
const Payments = React.lazy(() => import("../components/Payments/Payments"));
const Forum = React.lazy(() => import("../components/Forum/Forum"));
const Topic = React.lazy(() => import("../components/Forum/Topic/Topic"));
//const ContactUs = React.lazy(() => import("../components/ContactUs/ContactUs"));
const About = React.lazy(() => import("../components/About/About"));
const Navbar = React.lazy(() => import("../components/Navbar/Navbar"));
const ViewBook = React.lazy(() =>
  import("../components/Books/ViewBook/ViewBook")
);
const Genres = React.lazy(() => import("../views/Dashboard/Genres"));
const Authors = React.lazy(() => import("../views/Dashboard/Authors"));
const BooksDashboard = React.lazy(() => import("../views/Dashboard/Books"));
const StatisticPage = React.lazy(() => import("../views/Dashboard/Statistics"));
const PaypalPayment = React.lazy(() => import("../views/Home/Paypal"));
const ForumTopics = React.lazy(() => import("../views/Dashboard/Forum"));
const DashboardPayments = React.lazy(() =>
  import("../views/Dashboard/Payments")
);

const ROUTES = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <Home {...props} />
      </>
    ),
  },
  {
    path: "/login",
    key: "AUTH",
    exact: true,
    component: (props) => <Login {...props} />,
  },
  {
    path: "/register",
    key: "AUTH",
    exact: true,
    component: (props) => <Register {...props} />,
  },
  {
    path: "/books",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <Books {...props} />
      </>
    ),
  },
  {
    path: "/books/:id",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <ViewBook {...props} />
      </>
    ),
  },
  {
    path: "/my-books",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <MyBooks {...props} />
      </>
    ),
  },
  {
    path: "/forum",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <Forum {...props} />
      </>
    ),
  },
  {
    path: "/forum/add-topic",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <AddTopic {...props} />
      </>
    ),
  },
  {
    path: "/forum/:id",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <Topic {...props} />
      </>
    ),
  },
  {
    path: "/about",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <About {...props} />
      </>
    ),
  },
  {
    path: "/dashboard",
    key: "Main",
    component: (props) => <Dashboard {...props} />,
    routes: [
      {
        path: "/dashboard",
        key: "dashboard",
        exact: true,
        role: "admin",
        categoryName: "Dashboard",
        icon: DesktopOutlined,
        shouldShow: true,
        component: (props) => <StatisticPage {...props} />,
      },
      {
        path: "/dashboard/users",
        key: "users",
        exact: true,
        role: "admin",
        categoryName: "Users",
        icon: UsergroupDeleteOutlined,
        shouldShow: true,
        component: (props) => <UserContainer {...props} />,
      },
      {
        path: "/dashboard/books",
        key: "books",
        exact: true,
        role: "admin",
        categoryName: "Books",
        icon: BookOutlined,
        shouldShow: true,
        component: (props) => <BooksDashboard {...props} />,
      },
      {
        path: "/dashboard/authors",
        key: "authors",
        exact: true,
        role: "admin",
        categoryName: "Authors",
        icon: ApartmentOutlined,
        shouldShow: true,
        component: (props) => <Authors {...props} />,
      },
      {
        path: "/dashboard/genres",
        key: "genres",
        exact: true,
        role: "admin",
        categoryName: "Genres",
        icon: DatabaseOutlined,
        shouldShow: true,
        component: (props) => <Genres {...props} />,
      },
      {
        path: "/dashboard/forum",
        key: "forum",
        exact: true,
        role: "admin",
        categoryName: "Forum",
        icon: QuestionOutlined,
        shouldShow: true,
        component: (props) => <ForumTopics {...props} />,
      },
      {
        path: "/dashboard/payments",
        key: "payments",
        exact: true,
        role: "admin",
        categoryName: "Payments",
        icon: DollarCircleOutlined,
        shouldShow: true,
        component: (props) => <DashboardPayments {...props} />,
      },
    ],
  },
  {
    path: "/forgot-password",
    key: "AUTH",
    exact: true,
    component: (props) => <ForgotPassword {...props} />,
  },
  {
    path: "/resetUserPassword",
    key: "AUTH",
    exact: true,
    component: (props) => <ResetPassword {...props} />,
  },
  {
    path: "/profile",
    key: "AUTH",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <Profile {...props} />,
      </>
    ),
  },
  {
    path: "/payments",
    key: "ROOT",
    exact: true,
    component: (props) => (
      <>
        <Navbar />
        <PaypalPayment {...props} />
      </>
    ),
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

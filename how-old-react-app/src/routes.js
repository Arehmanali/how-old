// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Login from "@material-ui/icons/LockOpen";
import Register from "@material-ui/icons/GroupAdd";
import Settings from "@material-ui/icons/Settings";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import NotificationsPage from "views/Notifications/Notifications.jsx";
import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from "views/Pages/RegisterPage.jsx";
import SettingsPage from "./views/Settings/Settings";
import Customers from "./views/Customers/Customers";
// core components/views for Auth layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/customers",
    name: "Customers",
    icon: "people_outline",
    component: Customers,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/settings",
    name: "Settings",
    icon: Settings,
    component: SettingsPage,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/admin",
    sidebar: true,
  },
  {
    path: "/login-page",
    name: "Login Page",
    icon: Login,
    component: LoginPage,
    layout: "/auth",
    sidebar: false,
  },
  {
    path: "/register-page",
    name: "Register Page",
    icon: Register,
    component: RegisterPage,
    layout: "/auth",
    sidebar: false,
  },
];

export default dashboardRoutes;

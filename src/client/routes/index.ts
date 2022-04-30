// import loadable from "@loadable/component";
import loadable from "@loadable/component";
import React from "react";

const Home = React.lazy(
  () => import(/* webpackChunkName: "pages-Home" */ "../pages/Home")
);
const About = React.lazy(
  () => import(/* webpackChunkName: "pages-About" */ "../pages/About")
);

const Admin = loadable(
  () => import(/* webpackChunkName: "pages-Admin" */ "../pages/Admin"),
  { ssr: false }
);

const NotFoundError = React.lazy(
  () => import(/* webpackChunkName: "pages-404" */ "../pages/404")
);

export default [
  {
    path: "/",
    element: Home,
    exact: true,
    protected: false,
  },
  {
    path: "/about",
    element: About,
    exact: true,
    protected: false,
  },
  {
    path: "/admin",
    element: Admin,
    exact: true,
    protected: true,
  },
  {
    path: "*",
    element: NotFoundError,
    exact: true,
    protected: false,
  },
];

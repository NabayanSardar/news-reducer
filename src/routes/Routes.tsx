import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AdminWrapper from "../layout/AdminWrapper";
import Dashbaord from "../pages/admin/Dashbaord";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";
import ErrorBoundry from "../components/ErrorBoundry";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import AdminProtected from "../components/AdminProtected";
// import News from "../pages/admin/News";
// import Category from "../pages/admin/Category";
// import Users from "../pages/admin/Users";
const News = lazy(() => import("../pages/admin/News"));
const Category = lazy(() => import("../pages/admin/Category"));
const Users = lazy(() => import("../pages/admin/Users"));

const Routes = createBrowserRouter([
    {
    path: "/",
    element: <Home />,
    errorElement: <ErrorBoundry />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundry />,
  },
  {
    path: "/signup",
    element: <Signup />,
    errorElement: <ErrorBoundry />,
  },
  {
    path: "/admin",
    element: <AdminProtected/>,
    children:[
      {
        path: "",
    element: <AdminWrapper />,
    children: [
      {
        path: "dashbaord",
        element: <Dashbaord />,
        errorElement: <ErrorBoundry />,
      },
      {
        path: "news",
        // element: <News/>
        element: (
          <Suspense fallback={<Loading />}>
            <News />
          </Suspense>
        ),
        errorElement: <ErrorBoundry />,
      },
      {
        path: "category",
        // element: <Category/>,
        element: (
          <Suspense fallback={<Loading />}>
            <Category />
          </Suspense>
        ),
        errorElement: <ErrorBoundry />,
      },
      {
        path: "users",
        // element: <Users/>
        element: (
          <Suspense fallback={<Loading />}>
            <Users />
          </Suspense>
        ),
        errorElement: <ErrorBoundry />,
      },
    ],
      }
    ]
  },
  {
    path: "*",
    element: <NotFound/>
  }
]);
export default Routes;

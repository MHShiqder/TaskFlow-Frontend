import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Layout/Home/Home';
import AuthProvider from './Provider/AuthProvider';
import Login from './Pages/Login';
import PrivateRoute from './Provider/PrivateRoute';
import ErrorPage from './Pages/ErrorPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><Home></Home></PrivateRoute>,
    errorElement:<ErrorPage></ErrorPage>,
  },
  {
    path:"/login",
    element:<Login></Login>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

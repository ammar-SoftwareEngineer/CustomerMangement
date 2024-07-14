import Home from "@pages/Home";
import MainLayout from "@layouts/MainLayout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Customers from "@components/Customers/Customers";
import CustomersDetails from "@components/Customer Details/CustomersDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "customers", element: <Customers /> },
      { path: "customers/:id", element: <CustomersDetails /> },
    ],
  },
]);
function AppRouter() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default AppRouter;

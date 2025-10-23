import { createBrowserRouter } from "react-router-dom";
import App from "../app";
import Catalog from "../pages/catalog";
import Product from "../pages/product";
import Cart from "../pages/cart";
import Checkout from "../pages/checkout";
import OrderStatusPage from "../pages/order-status";
import AdminDashboard from "../pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Catalog /> },
      { path: "/p/:id", element: <Product /> },
      { path: "/cart", element: <Cart /> },
      { path: "/checkout", element: <Checkout /> },

      // ✅ handle both static and dynamic routes
      { path: "/order-status", element: <OrderStatusPage /> },
      { path: "/order/:id", element: <OrderStatusPage /> },

      { path: "/admin", element: <AdminDashboard /> },
    ],
  },
]);

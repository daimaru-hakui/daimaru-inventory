import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

import ProductNew from "./pages/products/ProductNew.tsx";
import Products from "./pages/products/Products.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import Login from "./pages/Login.tsx";
import Product from "./pages/products/Product.tsx";
import QrCodeReader from "./pages/qr/QrCodeReader.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "products",
    element: <Products />,
  },
  {
    path:"products/:slug",
    element: <Product />,
  },
  {
    path: "products/new",
    element: <ProductNew />,
  },
  {
    path: "qr-code",
    element: <QrCodeReader />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

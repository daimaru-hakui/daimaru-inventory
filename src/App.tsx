/* eslint-disable @typescript-eslint/no-explicit-any */
import "./App.css";
import { useState, useEffect } from "react";
import { supabase } from "./utils/supabaseClient";
import { Session } from "@supabase/supabase-js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout, InvestoryControl, Login, Product, ProductNew, Products, Skus } from "./pages";
import Sku from "./pages/skus/Sku";

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);
  console.log(session);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "skus",
          element: <Skus />,
        },
        {
          path: "skus/:slug",
          element: <Sku />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/:slug",
          element: <Product />,
        },
        {
          path: "products/new",
          element: <ProductNew />,
        },
        {
          path: "investroy-control",
          element: <InvestoryControl />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

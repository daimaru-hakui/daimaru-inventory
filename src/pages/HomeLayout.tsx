import { Outlet, useLocation } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const HomeLayout = () => {
  const { pathname } = useLocation();
  console.log('path', pathname);
  return (
    pathname === '/' ? (
      <Layout>home</Layout>
    ) : (
      <Outlet />
    )
  );
};

export default HomeLayout;

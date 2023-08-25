import { Outlet } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const HomeLayout = () => {
  return (
    <Layout>
        <Outlet />
    </Layout>
  );
};

export default HomeLayout;

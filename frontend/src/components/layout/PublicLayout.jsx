import { Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import Footer from "../Footer";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Outlet />
      <Footer/>
    </>
  );
};

export default PublicLayout;
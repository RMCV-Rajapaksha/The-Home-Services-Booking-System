import { Outlet } from "react-router-dom";
import PublicNavbar from "../PublicNavbar";
import Footer from "../Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <PublicNavbar />
 
        <Outlet />
 
      <Footer />
    </div>
  );
};

export default PublicLayout;
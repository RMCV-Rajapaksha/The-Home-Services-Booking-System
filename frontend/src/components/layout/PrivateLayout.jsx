import { Navigate, Outlet } from "react-router-dom";
import PrivateNavbar from "../PrivateNavbar";
import { useAuth } from "../context/AuthContext";
import Footer from "../Footer";

const PrivateLayout = () => {
  const { auth } = useAuth();

  if (!auth) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <PrivateNavbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PrivateLayout;
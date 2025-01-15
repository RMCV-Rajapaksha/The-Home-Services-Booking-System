import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/context/AuthContext";

const PrivateNavbar = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("blogData");
    toast.success("Logout successful", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: true,
    });
    navigate("/login");
  };

  return (
    <nav className="primary-link">
      <NavLink to="/admin">Posts</NavLink>
      <NavLink to="/create-post">Profile</NavLink>
      <NavLink to="/login" onClick={handleLogout}>
        Logout
      </NavLink>
    </nav>
  );
};

export default PrivateNavbar;
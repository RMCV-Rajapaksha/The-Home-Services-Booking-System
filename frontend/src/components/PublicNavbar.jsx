import { NavLink } from "react-router-dom";

const PublicNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">MyApp</div>
        <div className="space-x-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive
                ? "text-white border-b-2 border-white"
                : "text-gray-400 hover:text-white"
            }
          >
            Signup
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;
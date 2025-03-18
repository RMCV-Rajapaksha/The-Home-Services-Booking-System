import { Route, Routes } from "react-router-dom";
import "./index.css";
import PublicLayout from "./components/layout/PublicLayout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Service from "./pages/Service";
import PrivateLayout from "./components/layout/PrivateLayout";
import Profile from "./pages/Profile";
import CreatePost from "./pages/CreatePost";
import ServicePage from "./pages/ServicePage";
import TermsConditions from "./pages/Terms-Conditions";
import AdminPost from "./pages/AdminPost";
import EditPost from "./pages/EditPost";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
          },
        }}
      />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="service" element={<Service />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
          <Route path="/" element={<Home />} />
          <Route path="/service/:id" element={<ServicePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="create-post" element={<CreatePost />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
          <Route path="/admin-post" element={<AdminPost />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;





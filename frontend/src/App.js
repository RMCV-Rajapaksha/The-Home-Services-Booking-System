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
import UpdatePost from "./pages/UpdatePost";

import ServicePage from "./pages/ServicePage";

import TermsConditions from "./pages/Terms-Conditions";
import AdminPost from "./pages/AdminPost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="service" element={<Service />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
          <Route path="/" element={<Home />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/service/:id" element={<ServicePage />} />
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

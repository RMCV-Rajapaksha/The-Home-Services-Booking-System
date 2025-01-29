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

function App() {
  return (
    <>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="service" element={<Service />} />
          <Route path="/" element={<Home />} />
          <Route path="admin" element={<Profile />} />
          <Route path="create-post" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<PrivateLayout />}>
          <Route path="create-post" element={<CreatePost />} />
          <Route path="create-post" element={<UpdatePost />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

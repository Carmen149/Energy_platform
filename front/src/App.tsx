import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { BrowserRouter, Route, Routes as Switch } from "react-router-dom";
import Device from "./components/admin/pages/device";
import UserCrud from "./components/admin/pages/user/user";
import Analytics from "./components/admin/pages/analytics";
import "./App.css";
import Login from "./components/login/login";
import SignupForm from "./components/login/signupForm";
import Home from "./components/client/clientHome";
import Energy from "./components/client/clientEnergy";
import Devices from "./components/client/clientDevices";
import PermissionDenied from "./components/routes/permissionDenied";
import ProtectedRouteClient from "./components/routes/protectedRouteClient";
import ProtectedRouteAdmin from "./components/routes/protectedRouteAdmin";
import ChatAdmin from "./components/chat/ChatAdmin";
import ChatClient from "./components/chat/ChatClient";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<ProtectedRouteAdmin />}>
          <Route path="/device" element={<Device />} />
          <Route path="/user" element={<UserCrud />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/chatAdmin" element={<ChatAdmin />} />
        </Route>
        <Route path="/" element={<ProtectedRouteClient />}>
          <Route path="/home" element={<Home />} />
          <Route path="/statistics" element={<Energy />} />
          <Route path="/devices-user" element={<Devices />} />
          <Route path="/chatClient" element={<ChatClient />} />
        </Route>
        <Route path="/denied" element={<PermissionDenied />} />
        <Route path="/register" element={<SignupForm />} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;

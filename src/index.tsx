import { render } from "solid-js/web";

import "./index.css";
import App from "./screens/App";
import { Provider, useStore } from "./store/";
import { Router, Route, Routes, useNavigate } from "solid-app-router";
import Auth from "./screens/Auth";
import Channel from "./components/Channel";
import Welcome from "./components/Welcome";
import DirectChat from "./components/DirectChat";
//import { createComputed } from "solid-js";

const AppWithAuth = () => {
  const nav = useNavigate();
  const [{ token }] = useStore();
  if (!token?.length) {
    nav("/auth");
  }

  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="channel/:name" element={<Channel />} />
        <Route
          path="user/:email"
          data={(route) => {
            // TODO : fetch chats => route.query.email
            return [];
          }}
          element={<DirectChat />}
        />
        <Route path="*" element={<Welcome />} />
      </Route>
      <Route path="auth" element={<Auth />} />
    </Routes>
  );
};

render(
  () => (
    <Provider>
      <Router>
        <AppWithAuth />
      </Router>
    </Provider>
  ),
  document.getElementById("root") as HTMLElement
);

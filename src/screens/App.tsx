import { Outlet } from "solid-app-router";
import { Component } from "solid-js";
import styles from "./styles/App.module.css";
import Sidebar from "../components/Sidebar";

const App: Component = () => {
  return (
    <div class={styles.App}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default App;

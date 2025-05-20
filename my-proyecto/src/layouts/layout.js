import React from "react";
import { Menu } from "../components/inicio";
import { Footer } from "../page/Footer";
import "./layout.scss";

export function Layout({ children }) {
  return (
    <div className="layout-container">
      <div className="menu">
        <Menu />
      </div>
      <div className="body">{children}</div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

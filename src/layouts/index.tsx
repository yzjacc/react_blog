import React, { FC } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./index.less";

const Layout: FC = ({ children }) => {
  return (
    <div>
      <Header></Header>
      <div className="content">{children}</div>
      <Footer></Footer>
    </div>
  );
};
export default Layout;

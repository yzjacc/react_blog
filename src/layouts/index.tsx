import React, { FC, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./index.less";

const Layout: FC = (e) => {
  const [isRender, setRender] = useState(false);
  useEffect(() => {
    setRender(true);
  }, []);
  return (
    <div>
      <Header></Header>
      {isRender && (
        <>
          <div className="content">{e.children}</div>
          <Footer></Footer>
        </>
      )}
    </div>
  );
};
export default Layout;

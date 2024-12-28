import React, { useEffect } from "react";
import Header from "../components/Header";
import "../index.css";

function Layout({ children }): React.FC {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export { Layout };

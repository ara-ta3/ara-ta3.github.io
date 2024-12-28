import React, { useEffect } from "react";
import Header from "../components/Header";
import "../index.css";

function Layout({ children }): React.FC {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtm.js?id=GTM-W5LM9X33";
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "gtm.js",
      "gtm.start": new Date().getTime(),
    });

    return () => {
      document.head.removeChild(script);
    };
  }, []);
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export { Layout };

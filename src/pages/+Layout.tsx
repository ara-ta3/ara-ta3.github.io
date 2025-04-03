import Header from "../components/Header";
import "../index.css";

function Layout({ children }): FC {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export { Layout };

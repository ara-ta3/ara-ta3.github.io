import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">ara-ta3の物置</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/#tools">Tools</Navbar.Link>
        <Navbar.Link href="https://github.com/ara-ta3/ara-ta3.github.io">
          GitHub
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

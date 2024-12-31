import { MegaMenu, Navbar } from "flowbite-react";
import React from "react";

const Header: React.FC = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">ara-ta3の物置</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <MegaMenu.Dropdown toggle={<>Tools</>}>
          <ul className="grid grid-cols-3">
            <div className="space-y-4 p-4">
              <li>
                <a
                  href="/cat/calorie"
                  className="hover:text-primary-600 dark:hover:text-primary-500"
                >
                  猫のカロリー計算
                </a>
              </li>
            </div>
          </ul>
        </MegaMenu.Dropdown>
        <Navbar.Link href="https://github.com/ara-ta3/ara-ta3.github.io">
          GitHub
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

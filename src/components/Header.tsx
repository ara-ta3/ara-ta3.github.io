import React from "react";
import { MegaMenu, Navbar } from "flowbite-react";

const MenuListItem: React.FC<{ href: string; title: string }> = (props) => {
  return (
    <li>
      <a
        href={props.href}
        className="hover:text-secondary-500 hover:font-bold text-primary-500"
      >
        {props.title}
      </a>
    </li>
  );
};

const SubMenuListItem: React.FC<{ href: string; title: string }> = (props) => {
  return (
    <li>
      <a
        href={props.href}
        className="text-primary-700 hover:text-secondary-700 ml-4 hover:font-bold"
      >
        {props.title}
      </a>
    </li>
  );
};

const Header: React.FC = () => {
  return (
    <Navbar fluid rounded className="bg-base text-primary-500">
      <Navbar.Brand href="/">ara-ta3の物置</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <MegaMenu.Dropdown toggle={<>Tools</>}>
          <ul className="grid grid-cols-3">
            <div className="space-y-4 p-4">
              <MenuListItem
                href="https://nekometry.web.app/"
                title="猫のカロリー計算"
              />
              <SubMenuListItem
                href="https://nekometry.web.app/calorie/foods/"
                title="対応フード一覧"
              />
              <SubMenuListItem
                href="https://nekometry.web.app/calorie/transition/"
                title="フード切り替えプラン"
              />
              <SubMenuListItem
                href="https://nekometry.web.app/calorie/reference/"
                title="参考文献"
              />
            </div>
          </ul>
        </MegaMenu.Dropdown>
        <Navbar.Link
          href="https://github.com/ara-ta3/ara-ta3.github.io"
          target="_blank"
          className="text-primary-500 hover:text-secondary-500"
        >
          GitHub
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default Header;

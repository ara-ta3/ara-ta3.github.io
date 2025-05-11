import { MegaMenu, Navbar } from "flowbite-react";
import React from "react";

const MenuListItem: React.FC<{ href: string; title: string }> = (props) => {
  return (
    <li>
      <a
        href={props.href}
        className="hover:text-primary-600 dark:hover:text-primary-500 hover:font-bold"
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
        className="hover:text-primary-600 dark:hover:text-primary-500 ml-4 hover:font-bold"
      >
        {props.title}
      </a>
    </li>
  );
};

const Header: React.FC = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">ara-ta3の物置</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <MegaMenu.Dropdown toggle={<>Tools</>}>
          <ul className="grid grid-cols-3">
            <div className="space-y-4 p-4">
              <MenuListItem href="/cat/calorie/" title="猫のカロリー計算" />
              <SubMenuListItem href="/cat/calorie/foods/" title="フード一覧" />
              <SubMenuListItem
                href="/cat/calorie/transition/"
                title="切り替えプラン"
              />
              <SubMenuListItem
                href="/cat/calorie/reference/"
                title="参考文献"
              />
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

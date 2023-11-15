import { NavLink, useNavigate } from "react-router-dom";

import { Brand } from "@/components/brand/brand";
import { UserTypes } from "@/lib/userTypes";
import { useState } from "react";

interface Menu {
  name: string;
  path: string;
}

interface Props {
  role: UserTypes;
}

export function Navbar(props: Props) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const adminMenus: Menu[] = [
    {
      name: "Subscriptions",
      path: "/subscriptions",
    },
    {
      name: "Approvals",
      path: "/approvals",
    },
  ];

  const pengajarMenus: Menu[] = [
    {
      name: "Courses",
      path: "/courses",
    },
  ];

  const navItemStyle =
  "flex w-full w-full flex-row items-center rounded-sm bg-white px-5 py-2 text-base text-black hover:bg-gray-100 md:mr-3 md:w-auto";

  function logoutAction() {
    localStorage.removeItem("token");
    navigate("/login");
    return;
  }

  return (
    <nav className="fixed flex h-16 w-full flex-row flex-wrap items-center justify-between bg-white text-white">
      <div className="mx-5 flex h-full w-full flex-row items-center justify-between md:w-auto">
        <Brand size="small" clickable={true} />

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
          >
            <path
              d="M0 1.33333C0 0.595833 0.638393 0 1.42857 0H18.5714C19.3616 0 20 0.595833 20 1.33333C20 2.07083 19.3616 2.66667 18.5714 2.66667H1.42857C0.638393 2.66667 0 2.07083 0 1.33333ZM0 8C0 7.2625 0.638393 6.66667 1.42857 6.66667H18.5714C19.3616 6.66667 20 7.2625 20 8C20 8.7375 19.3616 9.33333 18.5714 9.33333H1.42857C0.638393 9.33333 0 8.7375 0 8ZM20 14.6667C20 15.4042 19.3616 16 18.5714 16H1.42857C0.638393 16 0 15.4042 0 14.6667C0 13.9292 0.638393 13.3333 1.42857 13.3333H18.5714C19.3616 13.3333 20 13.9292 20 14.6667Z"
              fill="black"
            />
          </svg>
        </button>
      </div>

      <div
        className={
          "w-full items-center md:flex md:w-auto" +
          (isOpen ? " flex" : " hidden")
        }
      >
        <div className="flex w-full flex-col items-center md:flex-row">
          {props.role === UserTypes.admin &&
            adminMenus.map((menu) => (
              <NavLink key={menu.name} to={menu.path} className={navItemStyle}>
                <p className="text-black">{menu.name}</p>
              </NavLink>
            ))}
          {props.role === UserTypes.pengajar &&
            pengajarMenus.map((menu) => (
              <NavLink key={menu.name} to={menu.path} className={navItemStyle}>
                <p className="text-black">{menu.name}</p>
              </NavLink>
            ))}
          <button
            onClick={logoutAction}
            className={navItemStyle}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

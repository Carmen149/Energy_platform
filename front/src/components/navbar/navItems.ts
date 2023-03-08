import { IconType } from "react-icons";
import { AiFillHome, AiFillPieChart } from "react-icons/ai";
import { MdOutlineDevices } from "react-icons/md";
import { IoNotificationsSharp } from "react-icons/io5";
import { BsChatDotsFill } from "react-icons/bs";
export type ItemNav = {
  id: number;
  title: string;
  path: string;
  cName: string;
  icon: IconType;
};
export const navItems: ItemNav[] = [
  {
    id: 1,
    title: "Home",
    path: "/home",
    cName: "nav-item",
    icon: AiFillHome,
  },
  {
    id: 2,
    title: "Devicies",
    path: "/devices-user",
    cName: "nav-item",
    icon: MdOutlineDevices,
  },
  {
    id: 3,
    title: "Statistics",
    path: "/statistics",
    cName: "nav-item",
    icon: AiFillPieChart,
  },
  {
    id: 4,
    title: "Chat",
    path: "/chatClient",
    cName: "nav-item",
    icon: BsChatDotsFill,
  },
  // {
  //   id: 4,
  //   title: "Notifications",
  //   path: "/notif",
  //   cName: "nav-item",
  //   icon: IoNotificationsSharp,
  // },
];

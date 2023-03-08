import { IconType } from "react-icons";
import { FaUserAlt, FaRegChartBar } from "react-icons/fa";
import { MdOutlineDevices } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { BsChatDotsFill } from "react-icons/bs";
export type Item = {
  path: string;
  name: string;
  icon: IconType;
};
export const menuItem: Item[] = [
  {
    path: "/user",
    name: "User",
    icon: FaUserAlt,
  },
  {
    path: "/device",
    name: "Device",
    icon: MdOutlineDevices,
  },
  // {
  //   path: "/analytics",
  //   name: "Analytics",
  //   icon: FaRegChartBar,
  // },
  {
    path: "/",
    name: "LogOut",
    icon: BiLogOut,
  },
  {
    path: "/chatAdmin",
    name: "Chat",
    icon: BsChatDotsFill,
  },
];

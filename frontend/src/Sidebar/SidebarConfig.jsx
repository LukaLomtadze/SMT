import { MdTerminal } from "react-icons/md";
import { IoLogoBuffer } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { RiAdminFill } from "react-icons/ri";

export const SidebarItems = [
  {
    icon: <MdTerminal />,
    label: "Playground",
    rotateItems: ["History", "Starred", "MetroMan"],
    forAdmin:false
    
  },
  {
    icon: <IoLogoBuffer />,
    label: "Models",
    rotateItems: ["Genesis", "Explorer", "Quantum"],
    forAdmin: false
  },
  {
    icon: <IoBookOutline />,
    label: "Documentation",
    rotateItems: ["Introduction", "Get Started", "Tutorials"],
    forAdmin: false
  },
  {
    icon: <LuSettings2 />,
    label: "Settings",
    rotateItems: ["Account Settings", "General Settings"],
    forAdmin: false
  },
  {
    icon: <RiAdminFill />,
    label: "Admin",
    rotateItems: ["Control Panel", "Analytics"],
    forAdmin: true,
  }
];
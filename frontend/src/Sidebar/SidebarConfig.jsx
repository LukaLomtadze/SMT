import { MdTerminal } from "react-icons/md";
import { IoLogoBuffer } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";

export const SidebarItems = [
  {
    icon: <MdTerminal />,
    label: "Playground",
    rotateItems: ["History", "Starred", "MetroMan"],
    
  },
  {
    icon: <IoLogoBuffer />,
    label: "Models",
    rotateItems: ["Genesis", "Explorer", "Quantum"],
    
  },
  {
    icon: <IoBookOutline />,
    label: "Documentation",
    rotateItems: ["Introduction", "Get Started", "Tutorials"],
    
  },
  {
    icon: <LuSettings2 />,
    label: "Settings",
    rotateItems: ["Account Settings", "General Settings", "Control Panel"],
    
  },
];
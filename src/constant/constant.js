import { MdOutlineAnalytics } from "react-icons/md";
import { TbUserSquare } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

//backend link 
// export const api = "https://visualize-dashboard.vercel.app/api"
export const api = "https://dashbord-backend.onrender.com/api"
export const baseUrl = "https://dashbord-alpha.vercel.app/analytics";

export const links = [
    { label: "Dashboard", href: "/analytics", icon: MdOutlineAnalytics },
    { label: "Profile", href: "/profile", icon: TbUserSquare },
    { label: "Settings", href: "/settings", icon: IoSettingsOutline },
  ];
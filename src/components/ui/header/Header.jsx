import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../../global/SearchBar";
import { FiSearch } from "react-icons/fi";
import { MdOutlineLightMode, MdOutlineNightsStay, MdNotificationsNone } from "react-icons/md";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearUserPreferences } from "../../../services/CookieManager";
import { logout } from "../../../redux/slices/userSlice";
import { logoutUser } from "../../../services/Logout";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  const handleOnLogout = async () => {
    const response = await logoutUser();
    if (response) {
      clearUserPreferences();
      dispatch(logout());
      toast.success(response.data.message);
      navigate('/login');
    }
  };

  return (
    <header className="w-full bg-gradient-to-b from-blue-700 to-blue-700 shadow-md px-4 py-3 flex items-center justify-end lg:justify-between lg:rounded-md">
      {/* Left: Brand Name */}
      <div className="hidden lg:flex text-lg font-bold text-white">
        Dashboard
      </div>

      {/* Right: Two Divisions */}
      <div className="flex items-center space-x-4">
        {/* Division 1: Search Bar (Responsive) */}
        <div className={`relative ${showSearch ? "block" : "hidden"} md:block transition-all`}>
          <SearchBar
            customStyles="outline-none"
            icon={<FiSearch size={18} />}
          />
        </div>
        <button
          onClick={() => setShowSearch((prev) => !prev)}
          className="p-2 hidden rounded-full text-white dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          aria-label="Toggle Search"
        >
          <FaSearch size={18} />
        </button>

        {/* Division 2: Icons */}
        <div className="flex items-center space-x-4">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-white hover:bg-gray-900 transition"
            aria-label="Toggle Dark Mode"
          >
            {darkMode ? (
              <MdOutlineLightMode size={18} />
            ) : (
              <MdOutlineNightsStay size={18} />
            )}
          </button>

          {/* Notification Icon */}
          <div className="relative">
            <button
              className="p-2 rounded-full text-white hover:bg-gray-900 transition"
              aria-label="Notifications"
            >
              <MdNotificationsNone size={18} />
            </button>
            {/* <div className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-md">
              Notification
            </div> */}
          </div>

          {/* Logout Button */}
          <div className="relative">
            <button
              className="p-2 rounded-full text-white hover:bg-gray-900 transition"
              aria-label="Logout"
              onClick={handleOnLogout}
            >
              <AiOutlineLogout size={18} />
            </button>
            {/* <div className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white text-sm px-2 py-1 rounded-md">
              Logout
            </div> */}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

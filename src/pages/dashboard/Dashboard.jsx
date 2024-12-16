import Sidebar from '../../components/ui/Sidebar'
import { links } from '../../constant/constant'
import logo from "../../assets/react.svg";
import Header from '../../components/ui/header/Header';

import { Outlet } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="flex">
      {/* SIDEBAR  */}
      <Sidebar
        links={links}
        logo={logo}
        footer={<p className="text-sm text-gray-400">© 2024 Visualize Dashboard</p>}
      />
      {/* MAIN  */}
      <main className="flex-1 m-0 lg:m-2">
        {/* HEADER  */}
        <Header />
        
        {/* Nested route content will be rendered here */}
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";

import { FiBell, FiMenu, FiUser } from "react-icons/fi";
import  logo  from "../../assets/logo.png"

const AdminHeader = () => {
  const [ openMenue, SetOpenMeue ] = useState(false)

  const handleOpen = () => {
    SetOpenMeue(!openMenue)
  }

  return (
    <header className="bg-background shadow-md">
      <div className=" px-4 lg:px-[8rem] py-3 flex items-center justify-between">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center space-x-6">
      
       

          {/* Logo */}
        <img src={logo} alt="logo" className="w-[100px] h-[30px] lg:h-[50px] object-contain" />
       
        </div>

  
        <nav className="hidden lg:flex space-x-12 text-secondary text-[18px] font-semibold">
          <a href="/dashboard" className="hover:text-primary ">
            Dashboard
          </a>

          <a href="/users" className="hover:text-primary ">
            Users
          </a>

          <a href="/skills" className="hover:text-primary ">
  Skills
          </a>
    


          <a href="/bookings" className="hover:text-primary ">
            Bookings
          </a>
          <a href="/reports" className="hover:text-primary ">
      Communities
          </a>

 
        </nav>

        {/* Right Section: Notifications and Profile */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative text-xl text-gray-600 hover:text-blue-500">
            <FiBell />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button className="text-xl text-gray-600 hover:text-blue-500">
              <FiUser />
            </button>
      
         
          </div>
          <button onClick={handleOpen} className="text-[1.5rem] lg:hidden">
            <FiMenu  />
          </button>
        </div>
      </div>
      <div className={`${openMenue ? "fixed w-full z-50 h-[13rem] bg-secondary" : "hidden"}  `}>


      <nav className=" text-white  text-[18px] font-semibold p-3 pt-[1rem] space-y-3">
          <a href="/dashboard" className="hover:text-primary block ">
            Dashboard
          </a>

          <a href="/users" className="hover:text-primary  block ">
            Users
          </a>

          <a href="/skills" className="hover:text-primary   block">
  Skills
          </a>
    


          <a href="/bookings" className="hover:text-primary  block ">
            Bookings
          </a>
          <a href="/reports" className="hover:text-primary   block">
      Communities
          </a>

 
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;

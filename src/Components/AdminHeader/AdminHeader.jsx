import React from "react";
import { FiBell, FiMenu, FiUser } from "react-icons/fi";
import  logo  from "../../assets/logo.png"

const AdminHeader = () => {
  return (
    <header className="bg-background shadow-md">
      <div className=" px-4 lg:px-[8rem] py-3 flex items-center justify-between">
        {/* Left Section: Logo and Navigation */}
        <div className="flex items-center space-x-6">
          {/* Hamburger Menu for Mobile */}
       

          {/* Logo */}
        <img src={logo} alt="logo" className="w-[100px] h-[30px] lg:h-[50px] object-contain" />
       
        </div>

        {/* Center Section: (Optional) Add Search Bar or Tabs */}
        <nav className="hidden lg:flex space-x-12 text-secondary text-[18px] font-semibold">
          <a href="/dashboard" className="hover:text-primary ">
            Dashboard
          </a>

          <a href="/skills" className="hover:text-primary ">
  Skills
          </a>
          <a href="/users" className="hover:text-primary ">
            Users
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
          <button className="text-[1.5rem] lg:hidden">
            <FiMenu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, ChevronDown } from 'lucide-react';
import Layout from '../../Components/Layout/Layout';

const Skills = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  
  
  const users = [
    {
      id: 1,
      fullName: "Sarah Johnson",
      email: "sarah.j@example.com",
      state: "California",
      address: "123 Tech Lane, San Francisco",
      phoneNumber: "+1 (555) 123-4567",
      skills: ["React", "Node.js", "UI/UX"],
      gender: "Female",
      verified: true
    },
    {
      id: 2,
      fullName: "Michael Chen",
      email: "m.chen@example.com",
      state: "New York",
      address: "456 Innovation Ave, Brooklyn",
      phoneNumber: "+1 (555) 987-6543",
      skills: ["Python", "Data Science", "AWS"],
      gender: "Male",
      verified: false
    },
    // Add more sample users as needed
  ];

  return (
    <Layout>

 
    <div className="min-h-screen ">
      {/* Header Section */}
      <div className="">
        <div className="px-4 lg:px-[8rem] py-6">
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
          <p className="text-gray-600 mt-1">View and manage all registered users</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="px-4 lg:px-[8rem] py-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
        
         
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{user.fullName}</h3>
                  <p className="text-gray-500 text-sm mt-1">{user.email}</p>
                </div>
                {user.verified ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex gap-2 items-start">
                  <span className="text-gray-600 font-medium min-w-[80px]">State:</span>
                  <span className="text-gray-800">{user.state}</span>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-gray-600 font-medium min-w-[80px]">Address:</span>
                  <span className="text-gray-800">{user.address}</span>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-gray-600 font-medium min-w-[80px]">Phone:</span>
                  <span className="text-gray-800">{user.phoneNumber}</span>
                </div>
                <div className="flex gap-2 items-start">
                  <span className="text-gray-600 font-medium min-w-[80px]">Gender:</span>
                  <span className="text-gray-800">{user.gender}</span>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-gray-600 font-medium">Skills:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {user.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100">
                  Approve
                </button>
                <button className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default Skills;
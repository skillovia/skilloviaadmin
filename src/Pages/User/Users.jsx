import React, { useState, useRef, useEffect } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, CheckCircle, XCircle, MoreVertical } from 'lucide-react';
import Layout from '../../Components/Layout/Layout';

const Users = () => {
  const [sortField, setSortField] = useState('fullName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sample data - replace with your actual data
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
  ];

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return <ChevronDown className="w-4 h-4 text-gray-400" />;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4 text-blue-500" /> : 
      <ChevronDown className="w-4 h-4 text-blue-500" />;
  };

  const toggleDropdown = (userId) => {
    setOpenDropdownId(openDropdownId === userId ? null : userId);
  };

  return (
    <Layout>
      <div className="min-h-screen ">
        {/* Header Section */}
        <div className="px-4 lg:px-[8rem] py-6">
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
          <p className="text-gray-600 mt-1">View and manage all registered users</p>
        </div>

        {/* Search and Filter Section */}
        <div className="px-4 lg:px-[8rem]">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Add User
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="border border-gray-200 bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full whitespace-nowrap">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th 
                      onClick={() => handleSort('fullName')}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        Full Name
                        <SortIcon field="fullName" />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('email')}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-600 cursor-pointer hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        Email
                        <SortIcon field="email" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">State</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Phone Number</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Skills</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Gender</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr 
                      key={user.id}
                      className="border-b border-gray-200 hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{user.fullName}</div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">{user.state}</td>
                      <td className="px-6 py-4 text-gray-600">{user.phoneNumber}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.gender}</td>
                      <td className="px-6 py-4">
                        {user.verified ? (
                          <div className="flex items-center gap-2 text-green-600">
                            <CheckCircle className="w-4 h-4" />
                            <span>Verified</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-600">
                            <XCircle className="w-4 h-4" />
                            <span>Unverified</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 relative" ref={dropdownRef}>
                        <button 
                          onClick={() => toggleDropdown(user.id)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                        
                        {openDropdownId === user.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  console.log('Edit clicked');
                                  setOpenDropdownId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-blue-600 hover:bg-blue-50"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  console.log('Suspend clicked');
                                  setOpenDropdownId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-yellow-600 hover:bg-yellow-50"
                              >
                                Suspend
                              </button>
                              <button
                                onClick={() => {
                                  console.log('Delete clicked');
                                  setOpenDropdownId(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
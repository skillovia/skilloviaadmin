




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, MoreVertical, Edit, Trash, Mail, UserPlus, Search, Filter, ChevronDown } from 'lucide-react';
import { LuView } from "react-icons/lu";
import Layout from '../../Components/Layout/Layout';

const UserTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const navigate = useNavigate();

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
      verified: true,
      balance: {
        skillToken: 400,
        mainBalance: 200,
      },
      identification: [
        {
          type: "Driver's License",
          id: "DL-98765432",
          expires: "12/2025",
        },
        {
          type: "National ID",
          id: "NIN-123456789",
          issued: "01/2020",
        },
        {
          type: "Passport",
          id: "PP-987654321",
          expires: "06/2027",
        },
        {
          type: "State ID",
          id: "SID-456789123",
          issued: "03/2022",
        },
      ],
    },
    {
      id: 2,
      fullName: "Michael Smith",
      email: "michael.smith@example.com",
      state: "Texas",
      address: "456 Innovation Drive, Austin",
      phoneNumber: "+1 (555) 987-6543",
      skills: ["JavaScript", "Angular", "TypeScript"],
      gender: "Male",
      verified: false,
      balance: {
        skillToken: 350,
        mainBalance: 150,
      },
      identification: [
        {
          type: "Driver's License",
          id: "DL-12345678",
          expires: "11/2026",
        },
        {
          type: "National ID",
          id: "NIN-987654321",
          issued: "02/2021",
        },
      ],
    },
    {
      id: 3,
      fullName: "Emily Davis",
      email: "emily.davis@example.com",
      state: "New York",
      address: "789 Startup Blvd, New York",
      phoneNumber: "+1 (555) 246-1357",
      skills: ["Vue.js", "Python", "Flask"],
      gender: "Female",
      verified: true,
      balance: {
        skillToken: 500,
        mainBalance: 250,
      },
      identification: [
        {
          type: "Driver's License",
          id: "DL-67890123",
          expires: "10/2024",
        },
        {
          type: "National ID",
          id: "NIN-456123789",
          issued: "03/2019",
        },
      ],
    },
    {
      id: 4,
      fullName: "John Doe",
      email: "john.doe@example.com",
      state: "Florida",
      address: "321 Sunshine St, Miami",
      phoneNumber: "+1 (555) 789-0123",
      skills: ["Java", "Spring Boot", "Docker"],
      gender: "Male",
      verified: true,
      balance: {
        skillToken: 600,
        mainBalance: 300,
      },
      identification: [
        {
          type: "Passport",
          id: "PP-123987654",
          expires: "07/2028",
        },
        {
          type: "State ID",
          id: "SID-654987321",
          issued: "05/2022",
        },
      ],
    },
    {
      id: 5,
      fullName: "Sophia Brown",
      email: "sophia.brown@example.com",
      state: "Illinois",
      address: "147 Developer Drive, Chicago",
      phoneNumber: "+1 (555) 369-2581",
      skills: ["React Native", "GraphQL", "Redux"],
      gender: "Female",
      verified: false,
      balance: {
        skillToken: 450,
        mainBalance: 100,
      },
      identification: [
        {
          type: "Driver's License",
          id: "DL-852741963",
          expires: "08/2027",
        },
      ],
    },
    {
      id: 6,
      fullName: "David Wilson",
      email: "david.wilson@example.com",
      state: "Washington",
      address: "159 Code Valley, Seattle",
      phoneNumber: "+1 (555) 741-9632",
      skills: ["Go", "Kubernetes", "Cloud Computing"],
      gender: "Male",
      verified: true,
      balance: {
        skillToken: 800,
        mainBalance: 400,
      },
      identification: [
        {
          type: "National ID",
          id: "NIN-741852963",
          issued: "01/2018",
        },
        {
          type: "Driver's License",
          id: "DL-963852741",
          expires: "05/2026",
        },
      ],
    },
    {
      id: 7,
      fullName: "Olivia Martinez",
      email: "olivia.martinez@example.com",
      state: "Nevada",
      address: "951 Desert Road, Las Vegas",
      phoneNumber: "+1 (555) 258-1479",
      skills: ["UI/UX Design", "Figma", "Adobe XD"],
      gender: "Female",
      verified: false,
      balance: {
        skillToken: 300,
        mainBalance: 200,
      },
      identification: [
        {
          type: "State ID",
          id: "SID-963258741",
          issued: "08/2021",
        },
      ],
    },
  ];
  

  const handleAction = (action, user) => {
    setOpenDropdownId(null);

    switch (action) {
      case 'view':
        navigate(`/user/${user.id}`);
        break;
      case 'edit':
        console.log('Edit user:', user);
        break;
      case 'delete':
        console.log('Delete user:', user);
        break;
      case 'email':
        console.log('Email user:', user);
        break;
      case 'promote':
        console.log('Promote user:', user);
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-full px-3 lg:px-[8rem]">
     

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
      
       
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                    <div className="text-sm text-gray-500">{user.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.phoneNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.state}</div>
                    <div className="text-sm text-gray-500">{user.address}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {user.verified ? (
                      <CheckCircle className="inline-block w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="inline-block w-5 h-5 text-red-500" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center relative">
                    <button
                      onClick={() => setOpenDropdownId(openDropdownId === user.id ? null : user.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openDropdownId === user.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            onClick={() => handleAction('view', user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <LuView className="w-4 h-4 mr-2" /> View User
                          </button>
                          <button
                            onClick={() => handleAction('edit', user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit className="w-4 h-4 mr-2" /> Edit User
                          </button>
                          <button
                            onClick={() => handleAction('email', user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Mail className="w-4 h-4 mr-2" /> Send Email
                          </button>
                          <button
                            onClick={() => handleAction('promote', user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <UserPlus className="w-4 h-4 mr-2" /> Promote
                          </button>
                          <button
                            onClick={() => handleAction('delete', user)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                          >
                            <Trash className="w-4 h-4 mr-2" /> Delete
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

  );
};

export default UserTable;

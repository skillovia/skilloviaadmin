import React, { useState } from 'react';
import { CheckCircle, XCircle, MoreVertical, Edit, Trash, Mail, UserPlus } from 'lucide-react';

const UserTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);

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
    {
      id: 3,
      fullName: "Emma Watson",
      email: "emma.w@example.com",
      state: "Texas",
      address: "789 Oak Street, Austin",
      phoneNumber: "+1 (555) 234-5678",
      skills: ["Vue.js", "PHP", "MySQL"],
      gender: "Female",
      verified: true
    },
    {
      id: 4,
      fullName: "James Smith",
      email: "james.s@example.com",
      state: "Washington",
      address: "321 Pine Road, Seattle",
      phoneNumber: "+1 (555) 345-6789",
      skills: ["Angular", "Java", "Spring"],
      gender: "Male",
      verified: true
    },
    {
      id: 5,
      fullName: "Lisa Rodriguez",
      email: "lisa.r@example.com",
      state: "Florida",
      address: "567 Palm Ave, Miami",
      phoneNumber: "+1 (555) 456-7890",
      skills: ["Flutter", "Dart", "Firebase"],
      gender: "Female",
      verified: false
    },
    {
      id: 6,
      fullName: "David Kim",
      email: "david.k@example.com",
      state: "Illinois",
      address: "890 Lake Street, Chicago",
      phoneNumber: "+1 (555) 567-8901",
      skills: ["Ruby", "Rails", "PostgreSQL"],
      gender: "Male",
      verified: true
    },
    {
      id: 7,
      fullName: "Ana Martinez",
      email: "ana.m@example.com",
      state: "Arizona",
      address: "432 Desert Road, Phoenix",
      phoneNumber: "+1 (555) 678-9012",
      skills: ["TypeScript", "MongoDB", "Express"],
      gender: "Female",
      verified: false
    }
  ];

  const handleAction = (action, user) => {
    setOpenDropdownId(null);
    switch (action) {
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
    <div className="w-full  px-3 lg:px-[8rem]">
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
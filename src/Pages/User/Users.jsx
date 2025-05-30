import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  MoreVertical,
  Edit,
  Trash,
  Mail,
  UserPlus,
  Search,
  Filter,
  ChevronDown,
  Loader,
  X,
} from "lucide-react";
import { LuView } from "react-icons/lu";
import Layout from "../../Components/Layout/Layout";

const UserTable = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createUserError, setCreateUserError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    firstname: "",
    lastname: "",
    gender: "",
    password: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/users/get/all`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch users");
      const responseData = await response.json();

      if (responseData.status === "success" && responseData.data) {
        const transformedUsers = responseData.data.map((user) => ({
          id: user.id,
          fullName: `${user.firstname} ${user.lastname}`,
          gender: user.gender || "Not provided",
          email: user.email,
          phoneNumber: user.phone || "Not provided",
          state: user.location || "Not provided",
          address: user.street || "Not provided",
          skills: ["Not provided"],
          verified: user.is_email_verified === 1,
          photoUrl: user.photourl || "",
          bio: user.bio || "Not provided",
          createdAt: new Date(user.created_at).toLocaleDateString(),
        }));

        setUsers(transformedUsers);
      } else {
        throw new Error("Invalid response format from server");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setCreateUserError(null);
    setIsSubmitting(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/users/create/account`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setIsModalOpen(false);
        fetchUsers(); // Refresh the users list
        setFormData({
          phone: "",
          email: "",
          firstname: "",
          lastname: "",
          gender: "",
          password: "",
        });
      } else {
        throw new Error(data.message || "Failed to create user");
      }
    } catch (err) {
      setCreateUserError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAction = (action, user) => {
    setOpenDropdownId(null);

    switch (action) {
      case "view":
        navigate(`/user/${user.id}`);
        break;
      case "edit":
        console.log("Edit user:", user);
        break;
      case "delete":
        console.log("Delete user:", user);
        break;
      case "email":
        console.log("Email user:", user);
        break;
      case "promote":
        console.log("Promote user:", user);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader className="w-8 h-8 animate-spin text-blue-600" />
            <p className="text-gray-600">Loading users...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="w-full h-screen flex items-center justify-center">
          <div className="text-red-600 text-center">
            <p className="text-xl font-semibold">Error loading users</p>
            <p className="mt-2">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full px-3 lg:px-[8rem]">
        {/* Header section */}
        <div className="px-4 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
          <p className="text-gray-600 mt-1">
            View and manage all registered users
          </p>
        </div>

        {/* Search and Filter Section */}
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
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5" />
              Filters
              <ChevronDown className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <UserPlus className="w-5 h-5" />
              Add User
            </button>
          </div>
        </div>

        {/* Create User Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create New User</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleCreateUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {createUserError && (
                  <div className="text-red-600 text-sm mt-2">
                    {createUserError}
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting && (
                      <Loader className="w-4 h-4 animate-spin" />
                    )}
                    {isSubmitting ? "Creating..." : "Create User"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                  Registration Date
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
                    <div className="text-sm font-medium text-gray-900">
                      {user.fullName}
                    </div>
                    <div className="text-sm text-gray-500">{user.gender}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">
                      {user.phoneNumber}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.state}</div>
                    <div className="text-sm text-gray-500">{user.address}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.createdAt}
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
                      onClick={() =>
                        setOpenDropdownId(
                          openDropdownId === user.id ? null : user.id
                        )
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openDropdownId === user.id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1" role="menu">
                          <button
                            onClick={() => handleAction("view", user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <LuView className="w-4 h-4 mr-2" /> View User
                          </button>
                          <button
                            onClick={() => handleAction("edit", user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Edit className="w-4 h-4 mr-2" /> Edit User
                          </button>
                          <button
                            onClick={() => handleAction("email", user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <Mail className="w-4 h-4 mr-2" /> Send Email
                          </button>
                          <button
                            onClick={() => handleAction("promote", user)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          >
                            <UserPlus className="w-4 h-4 mr-2" /> Promote
                          </button>
                          <button
                            onClick={() => handleAction("delete", user)}
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
    </Layout>
  );
};

export default UserTable;

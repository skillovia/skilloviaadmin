import React, { useState, useEffect } from "react";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("published");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchSkills = async () => {
    setIsFetching(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const endpoint =
        activeTab === "published"
          ? `${baseUrl}/admin/skills/get/published`
          : `${baseUrl}/admin/skills/get/unpublished`;

      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      if (data.status === "success") {
        const processedData = (data.data || []).map((item) => ({
          id: item._id,
          title: item.skill_type || "",
          description: item.description || "",
          thumbnail: item.thumbnail || null,
          status: activeTab,
          created_at: item.created_at,
          updated_at: item.updated_at,
        }));
        setServices(processedData);
      } else {
        setError(`Failed to fetch ${activeTab} skills`);
      }
    } catch (err) {
      console.error(`Error fetching ${activeTab} skills:`, err);
      setError(`Failed to load ${activeTab} skills. Please try again.`);
    } finally {
      setIsFetching(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setIsUpdating(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }
      const baseUrl = import.meta.env.VITE_BASE_URL;

      const endpoint =
        newStatus === "published"
          ? `${baseUrl}/admin/skills/publish/${id}`
          : `${baseUrl}/admin/skills/unpublish/${id}`;
      const response = await fetch(endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        await fetchSkills();
      } else {
        setError(
          `Failed to ${
            newStatus === "published" ? "publish" : "unpublish"
          } skill`
        );
      }
    } catch (err) {
      console.error(`Error updating skill status:`, err);
      setError(`Failed to update skill status. Please try again.`);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddSkill = async () => {
    setIsLoading(true);
    setError("");

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No access token found");
      }

      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description);
      if (formData.thumbnail) {
        formDataObj.append("thumbnail", formData.thumbnail);
      }

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/skills/add/category`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formDataObj,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        await fetchSkills();
        setIsModalOpen(false);
        setFormData({ title: "", description: "", thumbnail: null });
      } else {
        setError(data.message || "Failed to add skill");
      }
    } catch (err) {
      console.error("Error adding skill:", err);
      setError("Failed to add skill. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [activeTab]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const getStatusBadgeClass = (status) => {
    return status === "published"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  const filteredServices = services.filter(
    (service) =>
      (service.title?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      ) ||
      (service.description?.toLowerCase() || "").includes(
        searchQuery.toLowerCase()
      )
  );

  const TableLoader = () => (
    <div className="w-full">
      {[1, 2, 3].map((item) => (
        <div key={item} className="animate-pulse flex space-x-4 p-4 border-b">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="w-[300px]">
            <div className="h-[150px] bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800">Skills Management</h1>
        <p className="text-gray-600 mt-1">View and manage all Skills</p>
      </div>

      {error && !isModalOpen && (
        <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "published"
              ? "bg-secondary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("published")}
          disabled={isFetching}
        >
          {activeTab === "published" && isFetching ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Loading...
            </div>
          ) : (
            "Published Skills"
          )}
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            activeTab === "unpublished"
              ? "bg-secondary text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("unpublished")}
          disabled={isFetching}
        >
          {activeTab === "unpublished" && isFetching ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
              Loading...
            </div>
          ) : (
            "Unpublished Skills"
          )}
        </button>
      </div>

      <div className="lg:flex justify-between lg:space-x-5 space-y-4 lg:space-y-0 items-center mb-6">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="btn w-full lg:w-[20%]">
          <button
            className="px-6 py-3 bg-secondary text-white w-full rounded-md hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Skill
          </button>
        </div>
      </div>

      <div className="border rounded-lg  overflow-x-scroll">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">
                Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">
                Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">
                Thumbnail
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isFetching ? (
              <tr>
                <td colSpan="5">
                  <TableLoader />
                </td>
              </tr>
            ) : filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr
                  key={service.id}
                  className="hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  <td className="px-6 py-4">{service.title}</td>
                  <td className="px-6 py-4">
                    {service.description || "No description"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(
                        service.status
                      )}`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 w-[300px]">
                    {service.thumbnail ? (
                      <img
                        src={service.thumbnail}
                        alt={service.title || "Skill thumbnail"}
                        className="h-[150px] w-[100%] object-cover rounded"
                      />
                    ) : (
                      <div className="h-[150px] w-full bg-gray-200 rounded flex items-center justify-center text-gray-500">
                        No image
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleStatusChange(
                          service.id,
                          service.status === "published"
                            ? "unpublished"
                            : "published"
                        )
                      }
                      disabled={isUpdating}
                      className={`px-4 py-2 rounded-md text-white ${
                        service.status === "published"
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {isUpdating ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Updating...
                        </div>
                      ) : service.status === "published" ? (
                        "Unpublish"
                      ) : (
                        "Publish"
                      )}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-gray-500 italic"
                >
                  No {activeTab} skills found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Add New Skill</h3>

            {error && (
              <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter skill title"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter skill description"
                rows="3"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Thumbnail</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                accept="image/*"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => {
                  setIsModalOpen(false);
                  setError("");
                  setFormData({ title: "", description: "", thumbnail: null });
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
                onClick={handleAddSkill}
                disabled={isLoading || !formData.title || !formData.description}
              >
                {isLoading ? "Adding..." : "Add Skill"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;

import React, { useState, useEffect } from "react";

const ServiceTable = () => {
  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: null
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  // Fetch existing skills
  const fetchSkills = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await fetch('https://testapi.humanserve.net/api/admin/skills/get/categories', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.status === 'success') {
        setServices(data.data || []);
      } else {
        setError('Failed to fetch skills');
      }
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError('Failed to load skills. Please try again.');
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleAddSkill = async () => {
    setIsLoading(true);
    setError("");

    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const formDataObj = new FormData();
      formDataObj.append('title', formData.title);
      formDataObj.append('description', formData.description);
      if (formData.thumbnail) {
        formDataObj.append('thumbnail', formData.thumbnail);
      }

      const response = await fetch('https://testapi.humanserve.net/api/admin/skills/add/category', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formDataObj
      });

      const data = await response.json();

      if (data.status === 'success') {
        await fetchSkills(); // Refresh the skills list
        setIsModalOpen(false);
        setFormData({ title: "", description: "", thumbnail: null });
      } else {
        setError(data.message || 'Failed to add skill');
      }
    } catch (err) {
      console.error('Error adding skill:', err);
      setError('Failed to add skill. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      thumbnail: file
    }));
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

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

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-secondary">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">Thumbnail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredServices.length > 0 ? (
              filteredServices.map((service, index) => (
                <tr key={index} className="hover:bg-secondary hover:text-white transition-all duration-300">
                  <td className="px-6 py-4">{service.title}</td>
                  <td className="px-6 py-4">{service.description}</td>
                  <td className="px-6 py-4 w-[300px]">
                    {service.thumbnail && (
                      <img 
                        src={` https://${service.thumbnail}`} 
                        alt={service.title}
                        className="h-[150px] w-[100%] object-cover rounded"
                      />
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500 italic">
                  No skills found
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
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter skill title"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
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
import React, { useState } from "react";

const initialServices = [
  {
    category: "General Repairs and Maintenance",
    items: [
      "Plumbing",
      "Electrical Repairs",
      "Carpentry",
      "Painting (Interior/Exterior)",
      "Appliance Repair",
      "Furniture Assembly",
      "Handyman Services",
      "Lock Repair and Locksmith Services",
      "Roofing Repairs",
      "Window and Glass Repair",
    ],
  },
  {
    category: "Cleaning and Organization",
    items: [
      "House Cleaning",
      "Deep Cleaning",
      "Carpet Cleaning",
      "Gutter Cleaning",
      "Pressure Washing",
      "Pool Cleaning and Maintenance",
      "Garage Organization",
      "Decluttering Services",
      "Chimney Sweeping",
      "Upholstery Cleaning",
    ],
  },
  {
    category: "Home Improvement and Renovations",
    items: [
      "Tiling (Floor/Wall)",
      "Drywall Installation and Repair",
      "Kitchen Remodeling",
      "Bathroom Remodeling",
      "Flooring Installation",
      "HVAC Repairs and Installation",
      "Cabinet Installation",
      "Home Theater Setup",
      "Smart Home Installation",
      "Insulation Installation",
    ],
  },
  {
    category: "Outdoor and Yard Services",
    items: [
      "Lawn Mowing",
      "Landscaping",
      "Tree Trimming and Removal",
      "Garden Maintenance",
      "Fence Repair and Installation",
      "Deck Maintenance and Repairs",
      "Power Washing",
      "Pest Control Services",
      "Snow Removal",
      "Sprinkler System Installation and Repair",
    ],
  },
];

const mockSkills = [
  "Plumbing",
  "Electrical Repairs",
  "Handyman Services",
  "Pool Cleaning",
  "Kitchen Remodeling",
  "Tree Trimming",
  "Roofing Repairs",
  "Carpet Cleaning",
  "HVAC Repairs",
  "Painting (Interior/Exterior)",
];

const ServiceTable = () => {
  const [services, setServices] = useState(initialServices);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const handleAddSkill = () => {
    if (selectedCategory && selectedSkill) {
      const updatedServices = services.map((service) =>
        service.category === selectedCategory
          ? { ...service, items: [...service.items, selectedSkill] }
          : service
      );
      setServices(updatedServices);
      setSelectedCategory("");
      setSelectedSkill("");
      setIsModalOpen(false);
    }
  };

  const handleAddSkillToCategory = (category) => {
    const skill = prompt(`Add a new skill to "${category}"`);
    if (skill) {
      const updatedServices = services.map((service) =>
        service.category === category
          ? { ...service, items: [...service.items, skill] }
          : service
      );
      setServices(updatedServices);
    }
  };

  const filteredServices = services.map(service => ({
    ...service,
    items: service.items.filter(item =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="p">
        <div className="">
          <h1 className="text-2xl font-bold text-gray-800">Skills Management</h1>
          <p className="text-gray-600 mt-1">View and manage all Skills</p>
        </div>

      <h1 className="text-4xl font-bold text-secondary mb-8">Our Services</h1>
      
      <div className="lg:flex justify-between lg:space-x-5 space-y-4 lg:space-y-0 items-center mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="btn   w-full lg:w-[20%]">

 
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
              <th className="w-1/3 px-6 py-3 text-left text-sm font-semibold text-gray-100">
                Category
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">
                Services
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredServices.map((service, index) => (
              <tr key={index} className="hover:bg-secondary hover:text-white transition-all duration-300" >
                <td className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{service.category}</span>
                    <button
                      className="ml-2 text-blue-500 hover:text-blue-700"
                      onClick={() => handleAddSkillToCategory(service.category)}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {service.items.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                      {service.items.map((item, idx) => (
                        <div key={idx} className="flex items-center">
                          <span className="mr-2 text-blue-500">•</span>
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <span className="text-gray-500 italic">No services found</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Add New Skill</h3>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Select Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select a Category --</option>
                {services.map((service, idx) => (
                  <option key={idx} value={service.category}>
                    {service.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Select Skill</label>
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">-- Select a Skill --</option>
                {mockSkills.map((skill, idx) => (
                  <option key={idx} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={handleAddSkill}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceTable;
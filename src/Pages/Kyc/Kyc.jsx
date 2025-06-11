import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout";

const API_URL = "https://skilloviaapi.vercel.app/api/settings/kyc/admin/all";

const KycList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [approvingId, setApprovingId] = useState(null);
const recordKey = r._id; // always use string _id for consistency

  useEffect(() => {
    fetchRecords();
    // eslint-disable-next-line
  }, []);

  const getAccessToken = () => {
    return localStorage.getItem("accessToken") || "";
  };

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const accessToken = getAccessToken();
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const json = await res.json();
      console.log("Fetched records:", json.data); // Debug log
      setRecords(json.data || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setRecords([]);
    }
    setLoading(false);
  };

  const approveKyc = async (recordId, userId) => {
    if (!recordId) return;
    setApprovingId(recordId); // Use record ID for loading state
    try {
      const accessToken = getAccessToken();
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/admin/kyc/approve/${recordId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (res.ok) {
        const responseData = await res.json();
        console.log("Approval response:", responseData);
        // Show success message with user info if available
        if (responseData.data && responseData.data.userId) {
          alert(`KYC approved successfully for user: ${responseData.data.userId}`);
        } else {
          alert("KYC approved successfully!");
        }
        await fetchRecords(); // Wait for records to refresh
      } else {
        const errorData = await res.json();
        alert(`Approval failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Approval error:", error);
      alert("Approval failed due to network error!");
    } finally {
      // Always reset the approving state, regardless of success or failure
      setApprovingId(null);
    }
  };

  return (
<Layout>




    <div className=" lg:px-[8rem] pt-[4rem]  min-h-screen">
      <h1 className="text-2xl font-bold mb-4">KYC Records</h1>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading KYC records...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-700">User ID</th>
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-700">KYC Method</th>
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-700">KYC Type</th>
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-700">Approval Status</th>
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-700">Document</th>
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-700">Created</th>
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-700">Updated</th>
                <th className="px-4 py-3 border-b text-left font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r._id} className="even:bg-gray-50 hover:bg-gray-100 transition-colors">
                  <td className="px-4 py-3 border-b">
                    <span className="text-sm font-mono text-gray-600">
  {typeof r.userId === "object" && r.userId !== null ? r.userId._id || r.userId.email : r.userId || 'Not Assigned'}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b">{r.kyc_method}</td>
                  <td className="px-4 py-3 border-b">{r.kyc_id_type}</td>
                  <td className="px-4 py-3 border-b">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        r.approval_status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : r.approval_status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {r.approval_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 border-b">
                    {r.document_url ? (
                      <a
                        href={r.document_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline font-medium"
                      >
                        View Document
                      </a>
                    ) : (
                      <span className="text-gray-400">No document</span>
                    )}
                  </td>
                  <td className="px-4 py-3 border-b text-sm text-gray-600">
                    {new Date(r.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 border-b text-sm text-gray-600">
                    {new Date(r.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 border-b">
                    <button
                      className={`px-4 py-2 rounded font-medium transition-all duration-200 ${
                        r.approval_status === "approved"
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : approvingId === r.userId
                          ? "bg-blue-500 text-white cursor-not-allowed"
                          : "bg-green-500 text-white hover:bg-green-600 hover:shadow-md"
                      }`}
                   onClick={() => approveKyc(recordKey)}
disabled={r.approval_status === "approved" || approvingId === recordKey}
                    >
                      {approvingId === (r.userId || r.user_id || r._id) ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Approving...
                        </div>
                      ) : r.approval_status === "approved" ? (
                        "Approved"
                      ) : (
                        "Approve"
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-gray-500">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-lg">No KYC records found</p>
                      <p className="text-sm">Records will appear here when users submit KYC documents</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>

    </Layout>
  );
};

export default KycList;

import React, { useEffect, useState } from "react";
import summaryApi from "../common/summaryApi";
import Axios from "../utils/Axios";
import { useNavigate } from "react-router-dom";

export default function Applicants() {
    const [applicants, setApplicants] = useState([]);
    const navigate = useNavigate();

    // Fetch applicants
    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await Axios({
                    ...summaryApi.getAllApplicants,
                    withCredentials: true,
                });

                // backend returns { success, data }
                setApplicants(response.data.data);
                console.log("Applicants:", response.data.data);

            } catch (err) {
                console.error(err);
            }
        };

        fetchApplicants();
    }, []);

    // Shortlist applicant

    const handleShortlist = async (applicantId) => {
        try {
            await Axios({
                ...summaryApi.shortlistApplicant,
                withCredentials: true,
                url: summaryApi.shortlistApplicant.url.replace(":applicantId", applicantId),
            });
            // Update local state
            setApplicants((prev) =>
                prev.map((app) =>
                    app._id === applicantId ? { ...app, status: "shortlisted" } : app
                )
            );
        }
        catch (err) {
            console.error("Shortlist error:", err);
        }
    };

    //handle reject applicant
    const handleReject = async (applicantId) => {
        try {

            await Axios({
                ...summaryApi.rejectApplicant,
                withCredentials: true,
                url: summaryApi.rejectApplicant.url.replace(
                    ":applicantId",
                    applicantId
                ),
            });

            // update local state
            setApplicants((prev) =>
                prev.map((app) =>
                    app._id === applicantId
                        ? { ...app, status: "rejected" }
                        : app
                )
            );

        } catch (err) {
            console.error("Reject error:", err);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold mb-4">
                Applicants
            </h1>

            <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3">Name</th>
                            <th>Email</th>
                            <th>Job</th>
                            <th>Location</th>
                            <th>Status</th>
                            <th>Resume</th>
                            <th>Cover Letter</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {applicants.map((app) => (
                            <tr key={app._id} className="border-t">

                                <td className="p-3">
                                    {app.applicant?.name}
                                </td>

                                <td>
                                    {app.applicant?.email}
                                </td>

                                <td>
                                    {app.job?.title}
                                </td>

                                <td>
                                    {app.job?.location}
                                </td>

                                <td>
                                    <span
                                        className={`px-2 py-1 rounded text-xs ${app.status === "shortlisted"
                                            ? "bg-green-100 text-green-600"
                                            : app.status === "rejected"
                                                ? "bg-red-100 text-red-600"
                                                : "bg-yellow-100 text-yellow-600"
                                            }`}
                                    >
                                        {app.status}
                                    </span>
                                </td>

                                <td>
                                    <a
                                        href={app.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-blue-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        View Resume
                                    </a>
                                </td>

                                <td>
                                    <a
                                        href={app.coverLetter}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="bg-purple-500 text-white px-2 py-1 rounded text-xs"
                                    >
                                        View Cover Letter
                                    </a>
                                </td>

                                <td>
                                    <div className="flex gap-2">

                                        {app.status !== "shortlisted" ? (
                                            <button
                                                onClick={() => handleShortlist(app._id)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
                                            >
                                                Shortlist
                                            </button>
                                        ):(
                                             <button
                                            onClick={() =>
                                                navigate(
                                                    `/schedule-interview/${app._id}`
                                                )
                                            }
                                            className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                                        >
                                            Schedule Interview
                                        </button>
                                        )}

                                        {app.status !== "rejected" && (
                                            <button
                                                onClick={() => handleReject(app._id)}
                                                className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                                            >
                                                Reject
                                            </button>
                                        )}

                                       

                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
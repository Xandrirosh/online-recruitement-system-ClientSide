import React, {
    useEffect,
    useState,
} from "react";

import { useNavigate, useParams } from "react-router-dom";

import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";

import toast from "react-hot-toast";


export default function ScheduleInterview() {

    const { applicantId } = useParams();
    const navigate = useNavigate();

    const [applicant, setApplicant] =
        useState(null);

    const [formData, setFormData] =
        useState({
            interviewDate: "",
            interviewTime: "",
            status: "Scheduled",
        });

    // FETCH APPLICANT
    useEffect(() => {

        const fetchApplicant = async () => {

            try {

                const response = await Axios({
                    ...summaryApi.getSingleApplicant,
                    url:
                        summaryApi.getSingleApplicant.url.replace(
                            ":applicantId",
                            applicantId
                        ),
                });

                if (response.data.success) {
                    setApplicant(response.data.data);

                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchApplicant();

    }, [applicantId]);

    // HANDLE CHANGE
    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await Axios({
                ...summaryApi.scheduleInterview,

                data: {
                    applicantId:
                        applicant.applicant._id,

                    jobId:
                        applicant.job._id,

                    ...formData,
                },
            });

            if (response.data.success) {

                toast.success(
                    "Interview Scheduled Successfully"
                );

                navigate("/applicants");

            }


        } catch (error) {
            console.log(error);
        }
    };

    if (!applicant) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6">

            <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">

                <h1 className="text-2xl font-bold mb-6">
                    Schedule Interview
                </h1>

                {/* APPLICANT INFO */}

                <div className="mb-6 space-y-2">

                    <p>
                        <strong>Applicant:</strong>{" "}
                        {applicant.applicant?.name}
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        {applicant.applicant?.email}
                    </p>

                    <p>
                        <strong>Job:</strong>{" "}
                        {applicant.job?.title}
                    </p>

                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>

                        <label className="block mb-1">
                            Interview Date
                        </label>

                        <input
                            type="date"
                            name="interviewDate"
                            value={formData.interviewDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-1">
                            Interview Time
                        </label>

                        <input
                            type="time"
                            name="interviewTime"
                            value={formData.interviewTime}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />

                    </div>

                    <div>

                        <label className="block mb-1">
                            Status
                        </label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                        >

                            <option value="Scheduled">
                                Scheduled
                            </option>

                            <option value="Completed">
                                Completed
                            </option>

                            <option value="Cancelled">
                                Cancelled
                            </option>

                        </select>

                    </div>

                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Schedule Interview
                    </button>

                </form>

            </div>

        </div>
    );
}
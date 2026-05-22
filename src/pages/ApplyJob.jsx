import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import summaryApi from "../common/summaryApi";

export default function ApplyJob() {
    const { jobId } = useParams();

    const [file, setFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            toast.error("Please upload your resume");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("resume", file);
            formData.append("coverLetter", coverLetter);

            const response = await Axios({
                ...summaryApi.applyJob,
                url: `api/applicant/apply/${jobId}`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true,
            });

            if (response.data.success) {
                toast.success("Application submitted 🚀");
                setFile(null);
                setCoverLetter(null);
                navigate("/jobs");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            localStorage.setItem("redirectAfterLogin", window.location.pathname);
            navigate("/login");
        }
    }, []);

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Apply for Job</h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                {/* Resume Upload */}
                <label htmlFor="resume">Upload Resume</label>
                <input
                    type="file"
                    accept=".all,.pdf,.doc,.docx"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="border p-2 w-full"
                />

                {/* Cover Letter */}
                <label htmlFor="coverLetter">Upload Cover Letter</label>

                <input
                    type="file"
                    accept=".all,.pdf,.doc,.docx"
                    onChange={(e) => setCoverLetter(e.target.files[0])}
                    className="border p-2 w-full"
                />

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                >
                    {loading ? "Applying..." : "Submit Application"}
                </button>
            </form>
        </div>
    );
}
import { useState } from "react";
import AxiosToastError from '../utils/AxiosToastError';
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import Axios from '../utils/Axios';


export default function JobPostForm({ closeForm }) {
    const [data, setData] = useState({
        title: '',
        description: '',
        location: 'Thika Road Campus',
        type: 'Full-time',
        deadline: ''
    })
    const { title, description, location, type, deadline } = data


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !description || !location || !deadline) {
            alert("Please fill in all required fields");
            return;
        }
        try {
            const response = await Axios({
                ...summaryApi.postJob,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                data: data
            })

            if (!response.data.success) {
                toast.error(response.data.message)
                return
            }

            toast.success(response.data.message)

            if (response.data.success) {
                closeForm()
            }

            setData({
                title: '',
                description: '',
                location: 'Thika Road Campus',
                type: 'Full-time',
                deadline: ''
            })

        } catch (error) {
            console.log(error);
            AxiosToastError(error)
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-neutral-800 bg-opacity-60 z-50 flex items-center justify-center px-4">
            <div className=" relative max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8 mt-10">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a New Job</h2>
                <button
                    onClick={closeForm}
                    className="absolute top-4 right-4 text-gray-500 bg-00 hover:text-gray-700"
                >
                    ✕
                </button>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Job Title */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Job Title *</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                            placeholder="e.g. Mathematics Lecturer"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    {/* Job Description */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Job Description *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            placeholder="Describe the job responsibilities, requirements, etc."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            rows={5}
                            required
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Location </label>
                        <select
                            value={location}
                            onChange={(e) => setData({ ...data, location: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option>Thika Road Campus</option>
                            <option>Nairobi Campus</option>
                            <option>Ongata Rongai Campus</option>
                        </select>
                    </div>

                    {/* Job Type */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Job Type</label>
                        <select
                            value={type}
                            onChange={(e) => setData({ ...data, type: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option>Full-time</option>
                            <option>Part-time</option>
                            <option>Internship</option>
                            <option>Contract</option>
                        </select>
                    </div>

                    {/* Application Deadline */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Application Deadline *</label>
                        <input
                            type="date"
                            value={deadline}
                            onChange={(e) => setData({ ...data, deadline: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Post Job
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
}
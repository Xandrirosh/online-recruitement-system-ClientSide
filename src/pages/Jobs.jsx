import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";


export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const navigate = useNavigate();

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await Axios({
          ...summaryApi.getJobs,
        });
        if (response.data.success) {
          setJobs(response.data.data);
        }
      } catch (error) {
        AxiosToastError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);


  const requireAuth = (jobId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Save where user wanted to go
      localStorage.setItem(
        "redirectAfterLogin",
        `/apply/${jobId}`
      );

      toast.error("Please login first");

      navigate("/login");

      return false;
    }

    return true;
  };

  // Filter logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = location ? job.location === location : true;
    const matchesType = type ? job.type === type : true;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Find Your Dream Job</h1>
        <p className="text-gray-500 text-sm">
          Browse and apply to jobs that match your skills
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-6xl mx-auto bg-white p-4 rounded-xl shadow-sm mb-6 grid md:grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All Locations</option>
          {[...new Set(jobs.map(job => job.location))].map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded-lg"
        >
          <option value="">All Types</option>
          {[...new Set(jobs.map(job => job.type))].map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <button
          onClick={() => {
            setSearch("");
            setLocation("");
            setType("");
          }}
          className="bg-gray-200 hover:bg-gray-300 rounded-lg text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center text-gray-500">Loading jobs...</p>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onApply={() => {

                // check token
                const token = localStorage.getItem("token");

                // user not logged in
                if (!token || token === "undefined") {

                  // save job page user wanted
                  localStorage.setItem(
                    "redirectAfterLogin",
                    `/apply/${job._id}`
                  );

                  toast.error("Please login first");

                  // redirect to login
                  navigate("/login");

                  return;
                }

                // user logged in
                navigate(`/apply/${job._id}`);
              }}


            /*  onSave={async () => {
                if (!requireAuth()) return;

                try {
                  await Axios.post(`/save/${job._id}`);
                  toast.success("Saved!");
                } catch {
                  toast.error("Failed to save");
                }
              }} */
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No jobs found 😢
          </p>
        )}
      </div>
    </div>
  );
}
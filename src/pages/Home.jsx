import { Link } from "react-router-dom";
import Graduation from '../assets/Images/graduation.png'
import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";


export default function Home() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await Axios({
          ...summaryApi.getJobs,

        })

        if (response.data.success) {
          setJobs(response.data.data)
        }

      } catch (error) {
        AxiosToastError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchJobs()
  }, [])
  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

          {/* Text */}
          <div>
            <h1 className="text-4xl font-bold text-gray-800 leading-tight">
              VACANCIES ANNOUNCEMENT
            </h1>
            <p className="text-gray-600 mt-4">
              NIBS Technical College, a prestigious private TVET Institution known for its dedication to exceptional education,
              innovation, and nurturing future leaders, is delighted to announce the availability of this position in our vibrant team.
              As we persistently pursue academic brilliance and meaningful involvement with stakeholders,
              we are eager to welcome highly motivated and outcome-driven individuals to join our staff.
              This position is crucial to our strategic roadmap and presents a remarkable chance to make substantial contributions
              to the expansion and triumph of our Institution.
            </p>

            <div className="mt-6 flex gap-4">
              <Link
                to="/jobs"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Jobs
              </Link>

            </div>
          </div>

          {/* Illustration Placeholder */}
          <div className="bg-blue-100 h-64 rounded-2xl flex items-center justify-center text-blue-600 font-semibold">
            <img className="rounded-2xl" src={Graduation} alt="" />
          </div>
        </div>
      </section>

      {/* OPTIONAL: Recent Jobs Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Job Openings</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Example job cards, can later fetch dynamically */}
            {loading ? (
              <p>Loading jobs...</p>
            ) : jobs.length === 0 ? (
              <p>No jobs available</p>
            ) : (
              jobs.slice(0, 3).map((job) => (
                <JobCard
                  key={job._id}
                  title={job.title}
                  location={job.location}
                  type={job.type}
                  deadline={job.deadline}
                />
              ))
            )}
          </div>

          <div className="text-center mt-6">
            <Link to="/jobs" className="text-blue-600 font-medium hover:underline">
              View All Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">

          <div>
            <h3 className="text-white font-bold">Nibs Recruitment Portal</h3>
            <p className="text-sm mt-2">
              Simplifying recruitment with modern tools.
            </p>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Links</h4>
            <ul className="space-y-1 text-sm">
              <li><Link to="/jobs">Jobs</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/reports">Reports</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-2">Contact</h4>
            <p className="text-sm">info@nibs.ac.ke</p>
            <p className="text-sm">Phone: +254 111 030 100</p>
          </div>

        </div>

        <p className="text-center text-xs mt-6">
          © {new Date().getFullYear()} NIBS Technical College
        </p>
      </footer>
    </div>
  );
}

// Reusable Job Card Component
const JobCard = ({ title, location, type }) => (
  <div className="bg-white p-4 rounded-lg shadow-sm">
    <h3 className="font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mt-1">{location}</p>
    <span className="inline-block bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full mt-2">
      {type}
    </span>
  </div>
);


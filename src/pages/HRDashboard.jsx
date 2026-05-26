import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  BarChart3,
  LogOut,
} from "lucide-react";
import JobPostForm from "../components/Post";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({
    jobs: 0,
    applicants: 0,
    shortlisted: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const [applicants, setApplicants] = useState([]);
  const [recentApplicants, setRecentApplicants] = useState([]);


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const statsRes = await Axios({
          ...summaryApi.getJobStats,
          withCredentials: true,
        });

        const applicantRes = await Axios({
          ...summaryApi.getApplicantStats,
          withCredentials: true,
        });


        const jobStats = statsRes.data?.data || statsRes.data || {};
        const applicantStats = applicantRes.data?.data || applicantRes.data || {};

        setStats({
          jobs: jobStats.jobs || 0,
          applicants: applicantStats.totalApplicants || 0,
          shortlisted: applicantStats.shortlisted || 0,
        });


        setApplicants(applicantStats.recent || []);

      } catch (err) {
        console.error("Dashboard error:", err);
      }
    };

    const fetchRecentApplicants = async () => {
      try {
        const response = await Axios({
          ...summaryApi.getRecentApplicants,
          withCredentials: true,
        });

        const recentApps = response.data?.data || [];
        setRecentApplicants(recentApps);
        console.log("Recent Applicants:", recentApps);
      } catch (err) {
        console.error("Recent applicants error:", err);
      }
    };

    fetchDashboard();
    fetchRecentApplicants();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-6 font-bold text-blue-600 text-lg">
          HR Panel
        </div>

        <nav className="px-4 space-y-2 sticky">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <SidebarItem icon={<Briefcase size={18} />} label="Jobs" to="/jobs" />
          <SidebarItem icon={<Users size={18} />} label="Applicants" to="/applicants" />
          <SidebarItem icon={<BarChart3 size={18} />} label="Reports" to="/reports" />
          <SidebarItem icon={<LogOut size={18} />} label="Logout" onClick={handleLogout} />
        </nav>
      </aside>

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Dashboard
          </h1>

          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-semibold">
            Welcome, {user.name} 👋
          </div>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Jobs" value={stats.jobs} />
          <StatCard title="Applicants" value={stats.applicants} />
          <StatCard title="Shortlisted" value={stats.shortlisted} />
        </div>

        {/* QUICK ACTIONS */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex gap-4 flex-wrap">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg mb-6"
          >
            + {showForm ? "Close Form" : "Post Job"}
          </button>
          {/* Render JobPostForm conditionally */}
          {showForm && <JobPostForm closeForm={() => setShowForm(false)} />}
        </div>

        {/* RECENT APPLICANTS */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-gray-800 mb-4">
            Recent Applicants
          </h2>

          <div className="space-y-3">
            {recentApplicants.map((a) => (
              <div
                key={a._id}
                className="flex justify-between items-center border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">
                    {a.applicant?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {a.applicant?.email}
                  </p>
                </div>

                <span className="text-xs px-2 py-1 rounded bg-gray-100">
                  {a.status}
                </span>
              </div>
            ))}
          </div>

          {/* VIEW ALL LINK */}
          <div className="mt-4 text-right">
            <Link
              to="/applicants"
              className="text-blue-600 text-sm hover:underline"
            >
              View all applicants →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({ icon, label, to }) {
  return (
    <Link to={to}>
      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer text-sm text-gray-700">
        {icon}
        {label}
      </div>
    </Link>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-bold text-gray-800 mt-1">
        {value}
      </h2>
    </div>
  );
}
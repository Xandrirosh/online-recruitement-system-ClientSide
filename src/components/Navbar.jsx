import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo2 from '../assets/Images/nibslogo2.png'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/userSlice";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user);

  // CHECK LOGIN FIRST
  const isLoggedIn = !!user?._id;

  const navLinks = [

    { name: "Home", path: "/" },

    { name: "Jobs", path: "/jobs" },

    // JOB SEEKER INTERVIEWS
    ...(isLoggedIn && user?.role !== "HR"
      ? [
        {
          name: "My Interviews",
          path: "/my-interviews",
        },
      ]
      : []),

    // HR LINKS
    ...(user?.role === "HR"
      ? [
        {
          name: "Dashboard",
          path: "/dashboard",
        },

        {
          name: "Reports",
          path: "/reports",
        },
      ]
      : []),
  ];

  const isActive = (path) => location.pathname === path;



  const handleLogout = () => {
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className='h-10 bg-blue-600'>

      </div>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to='/'>
          <img
            src={Logo2}
            alt=""
            className='h-12'
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium transition ${isActive(link.path)
                ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                : "text-gray-600 hover:text-blue-600"
                }`}
            >
              {link.name}
            </Link>
          ))}

          {/* CTA Button */}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md px-6 pb-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-sm font-medium ${isActive(link.path)
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
                }`}
            >
              {link.name}
            </Link>
          ))}
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          )}

        </div>
      )}
    </nav>
  );
}

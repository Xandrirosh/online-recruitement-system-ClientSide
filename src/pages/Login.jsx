import React from 'react'
import { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link } from 'react-router-dom';
import nibsLogo from '../assets/Images/nibs-logo.jpeg'
import Axios from '../utils/Axios';
import SummaryApi from '../common/summaryApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import AxiosToastError from '../utils/AxiosToastError';


export default function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await Axios({
        ...SummaryApi.login,
        data: data
      })

      if (!response.data.success) {
        toast.error(response.data.message)
        return
      }

      toast.success(response.data.message)

      const userData = response.data.data.user
      const token = response.data.data.token

      // save user and token to localStorage
      localStorage.setItem('user', JSON.stringify(userData))
      localStorage.setItem('token', token)

      // update redux
      dispatch(setUserDetails(userData))

      // reset form
      setData({
        email: '',
        password: ''
      })

      // role-based navigation
      const redirect = localStorage.getItem("redirectAfterLogin");

      if (redirect) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirect);
      } else {
        navigate(userData.role === 'HR' ? '/dashboard' : '/');
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='container mx-auto flex justify-center items-center px-2 bg-white min-h-screen'>
      <div className='bg-gray-50 p-6 rounded-lg shadow-lg max-w-md w-full'>
        <img src={nibsLogo} alt="NIBS Logo" className="w-14 h-14 mx-auto mb-4 bg-gray-50" />
        <h1 className='text-2xl font-bold mb-4 flex justify-center'>Login</h1>
        <form action="" onSubmit={handleSubmit} className='mb-4'>
          <div className='mb-2'>
            <label htmlFor="email">Email: </label>
            <div className='grid gap-1'>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className='border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password:</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="border rounded-lg px-3 pr-10 py-1 outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute inset-y-0 right-2 flex items-center text-gray-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <Link to={'/forgot-password'} className='flex justify-end text-xs hover:text-blue-600'>Forgot password ?</Link>
          </div>
          <button type="submit" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full'>Login</button>
        </form>
        <p className='text-sm'>
          Don't have an account ? <Link to={'/register'}
            className='font-semibold text-blue-500 hover:text-blue-700'>Register</Link>
        </p>
      </div>
    </section>
  )
}

import React from 'react'
import { useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import nibsLogo from '../assets/Images/nibs-logo.jpeg'
import summaryApi from '../common/summaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';

export default function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      toast.error(
        'password and confirm password fields must be same'
      )
      return
    }
    try {
      const response = await Axios({
        ...summaryApi.register,
        withCredentials: true,
        data: {
          name: data.name,
          email: data.email,
          password: data.password
        }
      })

      if (response.data.error) {
        toast.error(response.data.message)
      }
      if (response.data.success) {
        toast.success(response.data.message)
        setData({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        })
      }
      if (response.data.success) {
        navigate('/login')
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }

  return (
    <section className='container mx-auto flex justify-center items-center px-2 bg-white min-h-screen'>
      <div className='bg-gray-50 p-6 rounded-lg shadow-lg max-w-md w-full'>
        <img src={nibsLogo} alt="NIBS Logo" className="w-14 h-14 mx-auto mb-4 bg-gray-50" />
        <h1 className='text-2xl font-bold mb-4 flex justify-center'>Register</h1>
        <form action="" className='mb-4' onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="name">Name: </label>
            <div className='grid gap-1'>
              <input
                type="text"
                id="name"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className='border rounded-lg px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          </div>
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
          <div className="mb-4">
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
            <div className="mb-2">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="border rounded-lg px-3 pr-10 py-1 outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 focus:outline-none"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
          <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg w-full'>Register</button>
        </form>
        <p className='text-sm'>
          Already have an account ? <Link to={'/login'}
            className='font-semibold text-blue-500 hover:text-blue-700'>Login</Link>
        </p>
      </div>
    </section>
  )
}

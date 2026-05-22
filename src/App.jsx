import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import { Toaster } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { setUserDetails } from "./store/userSlice"
import { useEffect, useState } from "react"

export const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch(setUserDetails(user))
    }
    setLoading(false)
  }, [])
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <>
      <main className='lg:min-h-[80vh] min-h-[75vh]'>
        <Navbar />
        <Outlet />
      </main>
      <Toaster />
    </>
  )
}



import { createBrowserRouter } from 'react-router-dom'
import { App } from '../App.jsx'
import Home from '../pages/Home.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Jobs from '../pages/Jobs.jsx'
import HRDashboard from '../pages/HRDashboard.jsx'
import HRRoute from '../layout/HRRoute.jsx'
import Reports from '../pages/Reports.jsx'
import ApplyJob from '../pages/ApplyJob.jsx'
import Applicants from '../pages/Applicants.jsx'
import ScheduleInterview from '../pages/schedule.jsx'
import MyInterview from '../pages/MyInterview.jsx'


export const Route = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            },
            {
                path: 'jobs',
                element: <Jobs />
            },
            {
                path: 'apply/:jobId',
                element: <ApplyJob />
            },
            {
                path: 'my-interviews',
                element: <MyInterview />
            },
            {
                path: 'dashboard',
                element: (
                    <HRRoute>
                        <HRDashboard />
                    </HRRoute>
                )
            },
            {
                path: 'reports',
                element: (
                    <HRRoute>
                        <Reports />
                    </HRRoute>
                )
            },
            {
                path: 'applicants',
                element: (
                    <HRRoute>
                        <Applicants />
                    </HRRoute>
                )
            },
            {
                path: 'schedule-interview/:applicantId',
                element: (
                    <HRRoute>
                        <ScheduleInterview />
                    </HRRoute>
                )
            }

        ],
    }
])
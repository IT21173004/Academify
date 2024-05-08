import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from './admin/AdminDashboard'
import InstructorDashboard from './instructor/InstructorDashboard'
import StudentDashboard from './student/StudentDashboard'

const Dashboard = () => {
    const user_Login = useSelector((state) => state.user_Login); // Get user login info from Redux store
    const { userInfo } = user_Login; // Destructure userInfo from user_Login

    return(
        <div>
            {/* Conditional rendering based on user role */}
            {userInfo.role === 'admin' ? (
                <AdminDashboard /> // Render AdminDashboard component if user role is 'admin'
            ) : userInfo.role === 'learner' ? (
                <StudentDashboard /> // Render StudentDashboard component if user role is 'learner'
            ) : userInfo.role === 'instructor' ? (
                <InstructorDashboard /> // Render InstructorDashboard component if user role is 'instructor'
            ) : (
                <></> // Empty fragment if user role is not defined
            )}
        </div>
    )
}

export default Dashboard;

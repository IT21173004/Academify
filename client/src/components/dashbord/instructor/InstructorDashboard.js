import React, { useState } from 'react';
import UserProfile from '../../../pages/userProfile/UserProfile';
import AddCourse from './AddCourse';// Import CourseList component
import InstructorCourseList from './InstructorCourseList';

const InstructorDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [showMore, setShowMore] = useState(false); // State to control the visibility of the "More" button

    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            setShowMore(tab === 'manage-courses' || tab === 'add-course' || tab === 'courseList'); // Set showMore to true for 'manage-courses', 'add-course', and 'courseList'
        } else {
            setShowMore((prevShowMore) => !prevShowMore);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')} id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                        <a className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')} id="v-pills-profile-tab" data-toggle="pill" href="#profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Profile</a>
                        <a className='nav-link' onClick={() => handleTabClick('manage-courses')}>Manage courses</a>
                        {/* Render "More" button conditionally */}
                        {showMore && (
                            <>
                                <a className={`nav-link ${activeTab === 'manage-courses' ? 'active' : ''}`} onClick={() => handleTabClick('add-course')} href="#add-course" >Add courses</a>
                                <a className={`nav-link ${activeTab === 'courseList' ? 'active' : ''}`} onClick={() => handleTabClick('courseList')} href="#course-list" >Course List</a>
                            </>
                        )}
                        <a className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabClick('settings')} id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">..</div>
                        <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><UserProfile/></div>
                        <div className={`tab-pane fade ${activeTab === 'add-course' ? 'show active' : ''}`} id="v-pills-add-course" role="tabpanel" aria-labelledby="v-pills-add-course-tab"><AddCourse/></div>
                        <div className={`tab-pane fade ${activeTab === 'courseList' ? 'show active' : ''}`} id="v-pills-course-list" role="tabpanel" aria-labelledby="v-pills-course-list-tab"><InstructorCourseList/></div>
                        <div className={`tab-pane fade ${activeTab === 'settings' ? 'show active' : ''}`} id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorDashboard;

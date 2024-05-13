import React, { useState } from 'react';
import UserProfile from '../../../pages/userProfile/UserProfile';
import EnrollCourse from './EnrollCourse'; // Assuming EnrollCourse is equivalent to AddCourse
import StudentCourseList from './StudentCourseList'; // Assuming StudentCourseList is equivalent to InstructorCourseList
import CourseList from './CourseList';

const StudentDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [showMore, setShowMore] = useState(false);

    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
            setShowMore(tab === 'manage-courses' || tab === 'enroll-course' || tab === 'courseList');
        } else {
            setShowMore((prevShowMore) => !prevShowMore);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className={`nav-link ${activeTab === 'home' ? 'active' : ''}`} onClick={() => handleTabClick('home')}>Home</a>
                        <a className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')}>Profile</a>
                        <a className={`nav-link ${activeTab === 'available-courses' ? 'active' : ''}`} onClick={() => handleTabClick('available-courses')} id="v-pills-available-courses-tab" data-toggle="pill" href="#available-courses" role="tab" aria-controls="v-pills-available-courses" aria-selected="false">Available courses</a>
                        <a className='nav-link' onClick={() => handleTabClick('manage-courses')}>Manage courses</a>
                        {showMore && (
                            <>
                                <a className={`nav-link ${activeTab === 'manage-courses' ? 'active' : ''}`} onClick={() => handleTabClick('enroll-course')}>Enroll courses</a>
                                
                            </>
                        )}
                        <a className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => handleTabClick('settings')}>Settings</a>
                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`} id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">..</div>
                        <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><UserProfile/></div>
                        <div className={`tab-pane fade ${activeTab === 'available-courses' ? 'show active' : ''}`} id="v-pills-available-courses" role="tabpanel" aria-labelledby="v-pills-available-courses-tab"><CourseList/></div>
                        <div className={`tab-pane fade ${activeTab === 'enroll-course' ? 'show active' : ''}`} id="v-pills-enroll-course" role="tabpanel" aria-labelledby="v-pills-enroll-course-tab"><EnrollCourse/></div>
                        <div className={`tab-pane fade ${activeTab === 'settings' ? 'show active' : ''}`} id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;

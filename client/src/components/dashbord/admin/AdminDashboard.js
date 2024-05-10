import React, { useState } from 'react';
import LearnersList from './LearnersList';
import InstructorsList from './InstructorList';
import UserProfile from '../../../pages/userProfile/UserProfile';
import CourseList from './CourseList';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = (tab) => {
        if (tab !== activeTab) {
            setActiveTab(tab);
        }
    };

    return (
        <div>
            <div className="row">
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')} id="v-pills-profile-tab" data-toggle="pill" href="#profile" role="tab" aria-controls="v-pills-profile" aria-selected="true">Profile</a>
                        <a className={`nav-link ${activeTab === 'manage-learners' ? 'active' : ''}`} onClick={() => handleTabClick('manage-learners')} id="v-pills-manage-learners-tab" data-toggle="pill" href="#manage-learners" role="tab" aria-controls="v-pills-manage-learners" aria-selected="false">Manage learners</a>
                        <a className={`nav-link ${activeTab === 'manage-instructors' ? 'active' : ''}`} onClick={() => handleTabClick('manage-instructors')} id="v-pills-manage-instructors-tab" data-toggle="pill" href="#manage-instructors" role="tab" aria-controls="v-pills-manage-instructors" aria-selected="false">Manage instructors</a>
                        <a className={`nav-link ${activeTab === 'manage-courses' ? 'active' : ''}`} onClick={() => handleTabClick('manage-courses')} id="v-pills-manage-courses-tab" data-toggle="pill" href="#manage-courses" role="tab" aria-controls="v-pills-manage-courses" aria-selected="false">Manage courses</a>
                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><UserProfile/></div>
                        <div className={`tab-pane fade ${activeTab === 'manage-learners' ? 'show active' : ''}`} id="v-pills-manage-learners" role="tabpanel" aria-labelledby="v-pills-manage-learners-tab"><LearnersList/></div>
                        <div className={`tab-pane fade ${activeTab === 'manage-instructors' ? 'show active' : ''}`} id="v-pills-manage-instructors" role="tabpanel" aria-labelledby="v-pills-manage-instructors-tab"><InstructorsList/></div>
                        <div className={`tab-pane fade ${activeTab === 'manage-courses' ? 'show active' : ''}`} id="v-pills-manage-courses" role="tabpanel" aria-labelledby="v-pills-manage-courses-tab"><CourseList/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard;

// import React, { useState } from 'react';
// import LearnersList from './LearnersList';
// import InstructorsList from './InstructorList';
// import UserProfile from '../../../pages/userProfile/UserProfile';
// import CourseList from './CourseList';

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState('home');

//   const handleTabClick = (tab) => {
//     if (tab === activeTab) {
//       return;
//     }
//     setActiveTab(tab);
//   };

//   return (
//     <div className="container-fluid">
//       <div className="row">
//         <div className=" col-md-3 vh-100 ">
//           <div className="nav flex-column nav-pills pt-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
//             <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">PROFILE</button>
//             <button className={`nav-link ${activeTab === 'Learners' ? 'active' : ''}`} onClick={() => handleTabClick('Learners')} id="v-pills-Learners-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Learners" type="button" role="tab" aria-controls="v-pills-Learners" aria-selected="true">LEARNERS</button>
//             <button className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => handleTabClick('messages')} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">INSTRUCTORS</button>
//             <button className={`nav-link ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => handleTabClick('courses')} id="v-pills-courses-tab" data-bs-toggle="pill" data-bs-target="#v-pills-courses" type="button" role="tab" aria-controls="v-pills-courses" aria-selected="false">COURSES</button>
//           </div>
//         </div>
//         <div className="col-md-9 vh-100 ">
//           <div className="tab-content" id="v-pills-tabContent">
//             <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><UserProfile/></div>
//             <div className={`tab-pane fade ${activeTab === 'Learners' ? 'show active' : ''}`} id="v-pills-Learners" role="tabpanel" aria-labelledby="v-pills-Users-tab"><LearnersList/></div>
//             <div className={`tab-pane fade ${activeTab === 'messages' ? 'show active' : ''}`} id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><InstructorsList/></div>
//             <div className={`tab-pane fade ${activeTab === 'courses' ? 'show active' : ''}`} id="v-pills-courses" role="tabpanel" aria-labelledby="v-pills-courses-tab"><CourseList/></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminDashboard;
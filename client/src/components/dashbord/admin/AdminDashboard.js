import React, { useState } from 'react';
import LearnersList from './LearnersList';
import UserProfile from '../../../pages/userProfile/UserProfile';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const handleTabClick = (tab) => {
    if (tab === activeTab) {
      return;
    }
    setActiveTab(tab);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className=" col-md-3 vh-100 ">
          <div className="nav flex-column nav-pills pt-4" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <button className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => handleTabClick('profile')} id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">PROFILE</button>
            <button className={`nav-link ${activeTab === 'Learners' ? 'active' : ''}`} onClick={() => handleTabClick('Learners')} id="v-pills-Learners-tab" data-bs-toggle="pill" data-bs-target="#v-pills-Learners" type="button" role="tab" aria-controls="v-pills-Learners" aria-selected="true">LEARNERS</button>
            <button className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => handleTabClick('messages')} id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">STUDENTS</button>
          </div>
        </div>
        <div className="col-md-9 vh-100 ">
          <div className="tab-content" id="v-pills-tabContent">
            <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><UserProfile/></div>
            <div className={`tab-pane fade ${activeTab === 'Learners' ? 'show active' : ''}`} id="v-pills-Learners" role="tabpanel" aria-labelledby="v-pills-Users-tab"><LearnersList/></div>
            <div className={`tab-pane fade ${activeTab === 'messages' ? 'show active' : ''}`} id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">STUDENTS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
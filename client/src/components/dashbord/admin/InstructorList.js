import  React, {useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { instructorList } from "../../../actions/authActions/adminActions";
import AdminActionModal from "./AdminActionModal";

const InstructorsList = () =>{

  const { userInfo } = useSelector((state) => state.user_Login);
  const history = useNavigate();

  const dispatch = useDispatch();
  const {  instructors } = useSelector(state => state.instructor_List);

  useEffect(() => {
    dispatch(instructorList());
  }, [dispatch]);

  console.log("instructors", instructors);
  
  return (
    <div className="container py-5">

<div class="row">
                <div class="col">
                    <nav aria-label="breadcrumb" class="bg-body-tertiary rounded-3 p-3 mb-4">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item"><a href="/">Home</a></li>
                        <li class="breadcrumb-item active" aria-current="page">User Profile</li>
                    </ol>
                    </nav>
                </div>
                </div>

      <div className="row">
      <table className="table">

<thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Role</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>

  <tbody>

  {instructors !== null ? (
    Array.isArray(instructors) && instructors.map((instructor) => (
    <tr key={instructor._id}>

      <td>
        <div className="d-flex align-items-center">
        <img
            src="https://banner2.cleanpng.com/20180402/ojw/kisspng-united-states-avatar-organization-information-user-avatar-5ac20804a62b58.8673620215226654766806.jpg"
            alt=""
            style={{ width: '43px', height: '40px' }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{instructor.name}</p>
            <p className="text-muted mb-0">{instructor.email}</p>
          </div>
        </div>
      </td>

      <td>
        <p className="text-muted mb-0">{instructor.role}</p>
      </td>

      <td>
        <button className="btn btn-link btn-sm"><AdminActionModal user={instructor}/></button>
      </td>

    </tr>   
  ))
) : (
  <tr>
    <td colSpan="4">Loading...</td>
  </tr>
)}

  </tbody>
</table>
      </div>
      

    </div>
    
  );
}

export default InstructorsList;
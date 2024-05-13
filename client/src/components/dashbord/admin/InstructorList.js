import  React, {useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { instructorList } from "../../../actions/authActions/adminActions";
import AdminUserActionModal from "./AdminUserActionModal";

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
        <h2><i class="bi bi-person-badge"></i></h2>
          <div className="ms-3">
            <p className="mb-1">{instructor.name}</p>
            <small><p className="text-muted mb-0">{instructor.email}</p></small>
          </div>
        </div>
      </td>

      <td>
        <p className="text-muted mb-0">{instructor.role}</p>
      </td>

      <td>
        <button className="btn btn-link btn-sm"><AdminUserActionModal user={instructor}/></button>
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
import  React, {useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { learnerList } from "../../../actions/authActions/adminActions";
import AdminUserActionModal from "./AdminUserActionModal";

const LearnersList = () =>{

  const { userInfo } = useSelector((state) => state.user_Login);
  const history = useNavigate();

  const dispatch = useDispatch();
  const {  learners } = useSelector(state => state.learner_List);

  useEffect(() => {
    dispatch(learnerList());
  }, [dispatch]);

  console.log("learners", learners);
  
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

  {learners !== null ? (
    Array.isArray(learners) && learners.map((learner) => (
    <tr key={learner._id}>

      <td>
        <div className="d-flex align-items-center">
        <h2><i class="bi bi-person-badge"></i></h2>
          <div className="ms-3">
            <p className="mb-1">{learner.name}</p>
            <small><p className="text-muted mb-0">{learner.email}</p></small>
          </div>
        </div>
      </td>

      <td>
        <p className="text-muted mb-0">{learner.role}</p>
      </td>

      <td>
        <button className="btn btn-link btn-sm"><AdminUserActionModal user={learner}/></button>
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

export default LearnersList;
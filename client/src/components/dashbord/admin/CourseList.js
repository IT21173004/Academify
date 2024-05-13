import  React, {useState, useEffect }  from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getAllCourses } from "../../../actions/courseActions/courseActions"; 
import CourseActionModal from "../common/CourseActionModal"

const CourseList = () =>{

  const { userInfo } = useSelector((state) => state.user_Login);
  const history = useNavigate();

  const dispatch = useDispatch();
  const {  courses } = useSelector(state => state.course_List);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  console.log("courses", courses);
  
  return (
    <div className="container py-5">
      <div className="row">
      <table className="table">

<thead>
    <tr>
      <th scope="col">Course ID | Name</th>
      <th scope="col">Instructor</th>
      <th scope="col">Duration</th>
      <th scope="col">Price</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>

  {courses !== null ? (
    Array.isArray(courses) && courses.map((course) => (
    <tr key={course._id}>

      <td>
        <div className="d-flex align-items-center">
          <h2><i class="bi bi-journal-text"></i></h2>
          <div className="ms-3">
            <small><p className="text-muted mb-0">{course.courseID}</p></small>
            <p className="mb-1 ">{course.courseName}</p>  
          </div>
        </div>
      </td>

      <td>
        <p className="mb-1">{course.courseInstructor}</p>
      </td>

      <td>
        <p className="mb-1">{course.courseDuration}</p>
      </td>

      <td>
        <p className="mb-1">{course.coursePrice}</p>
      </td>

      <td>
        <button className="btn btn-link btn-sm"><CourseActionModal course={course}/></button>
        <Link to={`/view-course/${course._id}`} className="btn btn-outline-primary ms-1"><i class="bi bi-journal-arrow-up"></i> View</Link>
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

export default CourseList;
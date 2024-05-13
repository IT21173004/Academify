import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getCoursesByInstructor } from "../../../actions/courseActions/courseActions";
import CourseActionModal from "../common/CourseActionModal";

const InstructorCourseList = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user_Login);
  const { loading, error, courselist } = useSelector((state) => state.CourseById_List);

  useEffect(() => {
    dispatch(getCoursesByInstructor(userInfo._id));
  }, [dispatch, userInfo._id]);

  console.log("courses", userInfo._id)
  
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
            {loading ? (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="5">{error}</td>
              </tr>
            ) : (
              courselist.map((course) => (
                <tr key={course._id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <h2><i className="bi bi-journal-text"></i></h2>
                      <div className="ms-3">
                        <small><p className="text-muted mb-0">{course.courseID}</p></small>
                        <p className="mb-1">{course.courseName}</p>
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
                    <button className="btn btn-link btn-sm">
                      <CourseActionModal course={course} />
                    </button>
                    <Link to={`/view-course/${course._id}`} className="btn btn-outline-primary ms-1"><i class="bi bi-journal-arrow-up"></i> View</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InstructorCourseList;



// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import CourseActionModal from "../common/CourseActionModal";

// const InstructorCourseList = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [courseList, setCourseList] = useState([]);
  
//   // Retrieve userInfo from local storage
//   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//   const InstructorID = userInfo ? userInfo._id : null;

//   console.log("user", InstructorID);

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5001/course/instructor/get-courses/${InstructorID}`);
//         setCourseList(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch courses by instructor");
//         setLoading(false);
//       }
//     };

//     if (InstructorID) {
//       fetchCourses();
//     } else {
//       setError("InstructorID not found in local storage");
//       setLoading(false);
//     }
//   }, [InstructorID]);

//   return (
//     <div className="container py-5">
//       <div className="row">
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">Course ID | Name</th>
//               <th scope="col">Instructor</th>
//               <th scope="col">Duration</th>
//               <th scope="col">Price</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5">Loading...</td>
//               </tr>
//             ) : error ? (
//               <tr>
//                 <td colSpan="5">{error}</td>
//               </tr>
//             ) : (
//               courseList.map((course) => (
//                 <tr key={course._id}>
//                   <td>
//                     <div className="d-flex align-items-center">
//                       <h2><i className="bi bi-journal-text"></i></h2>
//                       <div className="ms-3">
//                         <small><p className="text-muted mb-0">{course.courseID}</p></small>
//                         <p className="mb-1">{course.courseName}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td>
//                     <p className="mb-1">{course.courseInstructor}</p>
//                   </td>
//                   <td>
//                     <p className="mb-1">{course.courseDuration}</p>
//                   </td>
//                   <td>
//                     <p className="mb-1">{course.coursePrice}</p>
//                   </td>
//                   <td>
//                     <button className="btn btn-link btn-sm">
//                       <CourseActionModal course={course} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default InstructorCourseList;

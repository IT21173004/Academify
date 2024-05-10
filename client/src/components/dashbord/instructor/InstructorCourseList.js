import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesByInstructor } from "../../../actions/courseActions/courseActions";
import CourseActionModal from "../common/CourseActionModal";

const InstructorCourseList = () => {
  const { userInfo } = useSelector((state) => state.user_Login);
  const dispatch = useDispatch();

  const { courselist, loading, error } = useSelector(state => state.CourseById_List);

  

  useEffect(() => {
      dispatch(getCoursesByInstructor(userInfo._id));
  }, [dispatch]);

  console.log("page", courselist)
  
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

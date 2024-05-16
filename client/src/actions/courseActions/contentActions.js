import axios from 'axios';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert';
import { API_ENDPOINT } from "../../config";
import { 
    ADD_CONTENT_REQUEST, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAILURE,
    GET_CONTENT_FOR_COURSE_REQUEST, GET_CONTENT_FOR_COURSE_SUCCESS, GET_CONTENT_FOR_COURSE_FAILURE,
    GET_SPECIFIC_CONTENT_REQUEST, GET_SPECIFIC_CONTENT_SUCCESS, GET_SPECIFIC_CONTENT_FAILURE,
    UPDATE_CONTENT_REQUEST, UPDATE_CONTENT_SUCCESS, UPDATE_CONTENT_FAILURE
 } from '../../constants/courseConstants/contentConstants';



 
  // Action creator to create content 
export const addContent = (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_CONTENT_REQUEST,
      });
  
      // Get user info from state
      const {
        user_Login: { userInfo },
      } = getState();

      // Get course info from state
      const {
        course_View: { course },
      } = getState();
  
      // Configure request headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      // Upload the file to Firebase Storage
      const file = formData.get('file');
      const storageRef = ref(storage, `uploads/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const fileUrl = await getDownloadURL(snapshot.ref);
  
      // Prepare form data with the file URL
      formData.set('fileUrl', fileUrl);
  
      // Make POST request to add content
      const { data } = await axios.post(
        `${API_ENDPOINT}/course/course/content/add-content`,
        formData,
        config
      );
  
      // Dispatch success action and show success message
      dispatch({
        type: ADD_CONTENT_SUCCESS,
        payload: data,
      });
      Swal({
        title: "Success !!!",
        text: "Content Added Successfully.",
        icon: "success",
        timer: 2000,
        button: false,
      });

      // Redirect to course page after a short delay
      setTimeout(function () {
        window.location.href = `/view-course/${course._id}`;
    }, 2000);
  
    } catch (error) {
      // If content addition fails, dispatch failure action and display error message
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      
      dispatch({
        type: ADD_CONTENT_FAILURE,
        payload: message,
      });
      Swal({
        title: "Error !!!",
        text: message || "Failed to add content.",
        icon: "error",
        timer: 2000,
        button: false,
      });
    }
  };



  // Action creator to fetch content for a specific course
export const getContentForCourse = (courseId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CONTENT_FOR_COURSE_REQUEST,
    });

      // Get user info from state
      const {
        user_Login: { userInfo },
      } = getState();

      // Configure request headers
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };    

    const res = await axios.get(`${API_ENDPOINT}/course/course/content/${courseId}/all-content`);
    
    dispatch({
      type: GET_CONTENT_FOR_COURSE_SUCCESS,
      payload: res.data // Assuming the response contains the content data
    });

  } catch (error) {
    // If content addition fails, dispatch failure action and display error message
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      
    dispatch({
      type: GET_CONTENT_FOR_COURSE_FAILURE,
      payload: message,
    });
    
    Swal("Error", error.message || "Failed to load content", "error"); // Display error message with SweetAlert
  }
};



// Action creator to fetch specific content
export const getSpecificContent = (contentId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_SPECIFIC_CONTENT_REQUEST,
    });

    // Get user info from state
    const {
      user_Login: { userInfo },
    } = getState();

    // Configure request headers
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const res = await axios.get(`${API_ENDPOINT}/course/course/content/view-content/${contentId}`);
    
    console.log("content Action", contentId)

    dispatch({
      type: GET_SPECIFIC_CONTENT_SUCCESS,
      payload: res.data // Assuming the response contains the specific content data
    });

  } catch (error) {
    // If content loading fails, dispatch failure action and display error message
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      
    dispatch({
      type: GET_SPECIFIC_CONTENT_FAILURE,
      payload: message,
    });

    // Display error message with SweetAlert
    Swal("Error", message || "Failed to load content", "error");
  }
};


// Action creator to update specific content
export const updateContent = (contentID, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_CONTENT_REQUEST,
    });

    // Get user info from state
    const {
      user_Login: { userInfo },
    } = getState();

    // Configure request headers
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // Upload the file to Firebase Storage if a new file is provided
    const file = formData.get('file');
    let fileUrl = null;
    if (file) {
      const storageRef = ref(storage, `uploads/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(snapshot.ref);
    }

    // Set the file URL in formData
    formData.set('fileUrl', fileUrl);

    // Make PUT request to update content
    const { data } = await axios.put(
      `${API_ENDPOINT}/course/course/content/update-content/${contentID}`,
      formData,
      config
    );

    // Dispatch success action and show success message
    dispatch({
      type: UPDATE_CONTENT_SUCCESS,
      payload: data,
    });
    Swal({
      title: "Success !!!",
      text: "Content Updated Successfully.",
      icon: "success",
      timer: 2000,
      button: false,
    });
  } catch (error) {
    // If content update fails, dispatch failure action and display error message
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    
    dispatch({
      type: UPDATE_CONTENT_FAILURE,
      payload: message,
    });
    Swal({
      title: "Error !!!",
      text: message || "Failed to update content.",
      icon: "error",
      timer: 2000,
      button: false,
    });
  }
};

import axios from 'axios';
import { storage } from '../../firebaseConfig';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';
import { API_ENDPOINT } from "../../config";
import { 
    ADD_CONTENT_REQUEST, ADD_CONTENT_SUCCESS, ADD_CONTENT_FAILURE
 } from '../../constants/courseConstants/contentConstants';

export const addContent = (formData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_CONTENT_REQUEST,
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

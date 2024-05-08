import axios from 'axios';
import swal from 'sweetalert';
import { API_ENDPOINT } from '../../config';
import {  
    INSTRUCTOR_LIST_REQUEST, INSTRUCTOR_LIST_SUCCESS, INSTRUCTOR_LIST_FAIL,
    LEARNER_LIST_REQUEST, LEARNER_LIST_SUCCESS, LEARNER_LIST_FAIL,
    UPDATE_USER_BY_ID_REQUEST, UPDATE_USER_BY_ID_SUCCESS, UPDATE_USER_BY_ID_FAIL,
	DELETE_USER_BY_ID_REQUEST, DELETE_USER_BY_ID_SUCCESS, DELETE_USER_BY_ID_FAIL
 } from '../../constants/authConstants/adminConstants';


// Action creator for fetching instructor list
export const instructorList = () => async (dispatch, getState) => {
	try {
		// Dispatch an action to indicate the start of the request
		dispatch({
			type: INSTRUCTOR_LIST_REQUEST,
		});

		// Get user info from the state
		const {
			user_Login: { userInfo },
		} = getState();

		// Set up request headers with authorization token
		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		// Make GET request to the backend route to fetch instructors
		const { data } = await axios.get(`${API_ENDPOINT}/academify/admin/allinstructors`, config);
		
		// Log fetched data for debugging
		console.log("instructorsAction", data);
		
		// Dispatch action with fetched data on successful request
		dispatch({
			type: INSTRUCTOR_LIST_SUCCESS,
			payload: data,
		});

	} catch (error) {
		// Handle errors and dispatch appropriate action
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: INSTRUCTOR_LIST_FAIL,
			payload: message,
		});
	}
}; 

// Action creator to get the list of learners for admin action
export const learnerList = () => async (dispatch, getState) => {
    try {
        // Dispatching action to indicate the start of the request
        dispatch({
            type: LEARNER_LIST_REQUEST,
        });

        // Getting user information from the application state
        const {
            user_Login: { userInfo },
        } = getState();

        // Setting up the authorization header with JWT token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Making a GET request to the backend API endpoint to fetch learner list
        const { data } = await axios.get(`${API_ENDPOINT}/academify/admin/alllearners`, config);

        // Logging the fetched data
        console.log("learnersAction", data);

        // Dispatching action with the fetched data to indicate success
        dispatch({
            type: LEARNER_LIST_SUCCESS,
            payload: data,
        });
    } catch (error) {
        // Handling errors and dispatching action with error message
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({
            type: LEARNER_LIST_FAIL,
            payload: message,
        });
    }
};


// Action creator to update the user by ID for admin action 
export const updateUserById = (id, role, name, email, password) => async (dispatch, getState) => {
    try {
        // Dispatch action to indicate the request has started
        dispatch({
            type: UPDATE_USER_BY_ID_REQUEST,
        });

        // Get user info from the state
        const {
            user_Login: { userInfo },
        } = getState();

        // Prepare request headers with authorization token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send PUT request to update user profile
        const { data } = await axios.put(
            `${API_ENDPOINT}/academify/admin/update/${id}`,
            {
                role,
                name,
                email,
                password
            },
            config
        );

        // Dispatch action to indicate successful update
        dispatch({
            type: UPDATE_USER_BY_ID_SUCCESS,
            payload: data,
        });

        // Display success message using swal
        swal({
            title: "Success",
            text: "User profile updated successfully.",
            icon: "success",
            timer: 2000, // Automatically close after 2 seconds
            button: false, // No need for a button
        });

        // Redirect to user dashboard after a short delay
        setTimeout(function () {
            window.location.href = "/user-dashboard";
        }, 500);


    } catch (error) {
        // Extract error message from response or provide a generic one
        const message = error.response && error.response.data.message
            ? error.response.data.message
            : 'User profile update failed. Please try again.';
        
        // Dispatch action to indicate update failure
        dispatch({
            type: UPDATE_USER_BY_ID_FAIL,
            payload: message,
        });

        // Display error message using swal
        swal({
            title: "Error",
            text: message,
            icon: "error",
            button: "OK", // Display an OK button to close the dialog
        });
    }
};


// Action creator to delete the user by ID for admin action 
export const deleteUserById = (id) => async (dispatch, getState) => {
    try {
        // Dispatch action to indicate the request has started
        dispatch({
            type: DELETE_USER_BY_ID_REQUEST,
        });

        // Get user info from the state
        const {
            user_Login: { userInfo },
        } = getState();

        // Prepare request headers with authorization token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send DELETE request to delete user profile
        const { data } = await axios.delete(`${API_ENDPOINT}/academify/admin/delete/${id}`, config);

        // Dispatch action to indicate successful deletion
        dispatch({
            type: DELETE_USER_BY_ID_SUCCESS,
            payload: data,
        });

        // Display success message using swal
        swal({
            title: "Success",
            text: "User profile deleted successfully.",
            icon: "success",
            timer: 2000, // Automatically close after 2 seconds
            button: false, // No need for a button
        });

        // Redirect to user dashboard after a short delay
        setTimeout(function () {
            window.location.href = "/user-dashboard";
        }, 500);

    } catch (error) {
        // Provide a generic error message
        const message = "User profile deletion failed. Please try again.";

        // Dispatch action to indicate deletion failure
        dispatch({
            type: DELETE_USER_BY_ID_FAIL,
            payload: message,
        });

        // No need to display error message using swal since it's handled generically
    }
};

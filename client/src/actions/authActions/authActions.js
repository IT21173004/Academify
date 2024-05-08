import axios from 'axios';
import swal from 'sweetalert';
import { API_ENDPOINT } from '../../config';
import {
	LOGIN_LOADING, LOGIN_SUCCESS, LOGIN_FAILURE, USER_LOGOUT, REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE, 
	USER_VIEW_REQUEST, USER_VIEW_SUCCESS, USER_VIEW_FAIL, 
	UPDATE_REQUEST, UPDATE_SUCCESS, UPDATE_FAIL} 
from '../../constants/authConstants/authConstants';



// user login action
export const login = (email, password) => async (dispatch) => {
    try {
        // Dispatch action to indicate the login request is loading
        dispatch ({ type: LOGIN_LOADING });

        // Prepare request headers
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        // Send POST request to login user
        const { data } = await axios.post(`${API_ENDPOINT}/academify/user/login`, { email, password }, config);

        // Dispatch action to indicate successful login
        dispatch({ type: LOGIN_SUCCESS, payload: data });

        // Display success message using swal
        swal({
            title: "Logged In",
            text: "User log in successful.",
            icon: "success",
            timer: 2000, // Automatically close after 2 seconds
            button: false, // No need for a button
        });

        // Redirect to home page after a short delay
        setTimeout(function () {
            window.location.href = "/";
        }, 2000);

        // Store user info in localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        // Provide a generic error message
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;

        // Dispatch action to indicate login failure
        dispatch ({
            type: LOGIN_FAILURE,
            payload: errorMessage,
        });
    }
};



// user register action
export const userRegister = (role, name, email, password) => async (dispatch) => {
    try {
        // Dispatch action to indicate the registration request has started
        dispatch({ type: REGISTER_REQUEST });

        // Prepare request headers
        const config = {
            headers: {
                "Content-type": "application/json",
            },
        };

        // Send POST request to register user
        const { data } = await axios.post(
            `${API_ENDPOINT}/academify/user/register`,
            {
                role,
                name,
                email,
                password
            },
            config
        );

        // Dispatch action to indicate successful registration
        dispatch({ type: REGISTER_SUCCESS, payload: data });
        
        // Display success message using swal
        swal({
            title: "Registered",
            text: "User registration successful.",
            icon: "success",
            timer: 2000, // Automatically close after 2 seconds
            button: false, // No need for a button
        });

        // Redirect to home page after a short delay
        setTimeout(function () {
            window.location.href = "/";
        }, 2000);
        
    } catch (error) {
        // Provide a generic error message
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;

        // Dispatch action to indicate registration failure
        dispatch({
            type: REGISTER_FAILURE,
            payload: errorMessage,
        });
    }
};



// user profile view action
export const userViewProfile = (user) => async (dispatch, getState) => {
    try {
        // Dispatch action to indicate the view request has started
        dispatch({ type: USER_VIEW_REQUEST });

        // Get user info from the state
        const { user_Login: { userInfo }, } = getState();

        // Prepare request headers with authorization token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send GET request to retrieve user profile
        const { data } = await axios.get(`${API_ENDPOINT}/academify/user/view`, config);

        // Dispatch action to indicate successful view
        dispatch({ type: USER_VIEW_SUCCESS, payload: data });

        // Update user info in the state
        dispatch({ type: LOGIN_SUCCESS, payload: data });

        // Store user info in localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        // Provide a generic error message
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;

        // Dispatch action to indicate view failure
        dispatch({
            type: USER_VIEW_FAIL,
            payload: errorMessage,
        });
    }
};



// user profile update action
export const userUpdateProfile = (user) => async (dispatch, getState) => {
    try {
        // Dispatch action to indicate the update request has started
        dispatch({ type: UPDATE_REQUEST });

        // Get user info from the state
        const { user_Login: { userInfo } } = getState();

        // Prepare request headers with authorization token
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        };

        // Send PUT request to update user profile
        const { data } = await axios.put(`${API_ENDPOINT}/academify/user/edit/${userInfo._id}`, user, config);

        // Dispatch action to indicate successful update
        dispatch({ type: UPDATE_SUCCESS, payload: data });

        // Display success message using swal
        swal({
            title: "Updated",
            text: "User account updated successfully.",
            icon: "success",
            timer: 2000, // Automatically close after 2 seconds
            button: false, // No need for a button
        });

        // Update user info in the state
        dispatch({ type: LOGIN_SUCCESS, payload: data });

        // Redirect to user profile after a short delay
        setTimeout(function () {
            window.location.href = "/user-profile";
        }, 2000);

        // Store updated user info in localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
        // Provide a generic error message
        const errorMessage = error.response && error.response.data.message ? error.response.data.message : error.message;

        // Dispatch action to indicate update failure
        dispatch({
            type: UPDATE_FAIL,
            payload: errorMessage,
        });
    }
};



// user log out action
export const userLogout = () => async (dispatch) => {
	localStorage.removeItem("userInfo");
	dispatch({ type: USER_LOGOUT });

	setTimeout(function () {
		window.location.href = "/";
	}, 2000);
};

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
    dispatch ({ type: LOGIN_LOADING});

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };

    const {data} = await axios.post(`${API_ENDPOINT}/academify/user/login`, { email, password }, config);
    console.log(data);

    console.log('Dispatching action:', { type: LOGIN_SUCCESS, payload: data });
    dispatch({type: LOGIN_SUCCESS, payload: data});

    swal({
        title: "Logged In!",
		text: "User Log In Successful.",
		icon: "success",
		timer: 2000,
		button: false,
    });
    setTimeout(function () {
        window.location.href = "/";

    }, 2000);

    localStorage.setItem("userInfo", JSON.stringify(data));
    

  } catch (error) {
    dispatch ({
        type : LOGIN_FAILURE,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// user register action
export const userRegister = (role, name, email, password) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_REQUEST });

		const config = {
			headers: {
				"Content-type": "application/json",
			},
		};

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

		dispatch({ type: REGISTER_SUCCESS, payload: data });
		
		swal({
			title: "Registered!",
			text: "User Registration Successful.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		setTimeout(function () {
			window.location.href = "/";
		}, 2000);
		
	} catch (error) {

		dispatch({
			type: REGISTER_FAILURE,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

// user profile view action
export const userViewProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: USER_VIEW_REQUEST });

		const { user_Login: { userInfo }, } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`${API_ENDPOINT}/academify/user/view`, user, config);
        console.log(data);

		dispatch({ type: USER_VIEW_SUCCESS, payload: data });
		dispatch({ type: LOGIN_SUCCESS, payload: data });

		localStorage.setItem("userInfo", JSON.stringify(data));

	} catch (error) {
		dispatch({

			type: USER_VIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
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

// user profile update action
export const userUpdateProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({ type: UPDATE_REQUEST });

		const { user_Login: { userInfo } } = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`${API_ENDPOINT}/academify/user/edit/${userInfo._id}`, user, config);

		dispatch({ type: UPDATE_SUCCESS, payload: data });
		swal({
			title: "Updated!",
			text: "User Account Update Successfully.",
			icon: "success",
			timer: 2000,
			button: false,
		});

		dispatch({ type: LOGIN_SUCCESS, payload: data });

		setTimeout(function () {
			window.location.href = "/user-profile";
			
		}, 2000);
		localStorage.setItem("userInfo", JSON.stringify(data));


	} catch (error) {

		dispatch({
			type: UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message,
		});
	}
};

import axios from 'axios';
import swal from 'sweetalert';
import { LEARNER_LIST_REQUEST, LEARNER_LIST_SUCCESS, LEARNER_LIST_FAIL } from '../../constants/authConstants/learnerConstants';
import { API_ENDPOINT } from '../../config';

//get all of customer list for  admin action
export const learnerList = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: LEARNER_LIST_REQUEST,
		});

		const {
			user_Login: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		//call the backend route
		const { data } = await axios.get(`${API_ENDPOINT}/academify/admin/alllearners`, config);
		
		console.log("learnersAction", data);
		
		dispatch({
			type: LEARNER_LIST_SUCCESS,
			payload: data,
		});

	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: LEARNER_LIST_FAIL,
			payload: message,
		});
	}
};
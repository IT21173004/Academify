import { 
    LEARNER_LIST_REQUEST, 
    LEARNER_LIST_SUCCESS, 
    LEARNER_LIST_FAIL
 } from "../constants/authConstants/learnerConstants";

export const learnerListReducer = (state = { learners: [] }, action) => {
	switch (action.type) {
		case LEARNER_LIST_REQUEST:
			return { ...state, loading: true };
		case LEARNER_LIST_SUCCESS:
			return {...state, loading: false, learners: action.payload };
		case LEARNER_LIST_FAIL:
			return { ...state, loading: false, error: action.payload };
		default:
			return state;
	}
};

import { createStore, combineReducers, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

import { userLoginReducer, userRegisterReducer, userViewReducer, userUpdateReducer } from "./reducers/authReducers";
import { updateUserByIdReducer, instructorListReducer, learnerListReducer, deleteUserByIdReducer } from "./reducers/adminReducers";

const reducer = combineReducers({
    user_Login: userLoginReducer,
    user_Register: userRegisterReducer,
    user_View: userViewReducer,
    user_Update: userUpdateReducer,
    learner_List: learnerListReducer,
    instructor_List: instructorListReducer,
    updateUserById : updateUserByIdReducer,
    deleteUserById : deleteUserByIdReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

const initialState = {
    user_Login : { userInfo : userInfoFromStorage}
};

const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
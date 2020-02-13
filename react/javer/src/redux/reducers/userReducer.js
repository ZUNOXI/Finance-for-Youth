import {userConstants} from '../constants/userConstants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = {
    userAuth : false,
    user
}

export default (state = initialState, action) => {
    switch(action.type){
        case userConstants.LOGIN_REQ:
            return {
                userAuth: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCC:
            return{
                userAuth: true,
                user: action.user
            };
        case userConstants.LOGIN_FAIL:
            return{
            };
        case userConstants.LOGOUT:
            return{
            };
        default:
            return state
    }
}


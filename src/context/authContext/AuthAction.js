import User from "../../pages/user/User";

export const loginStart=()=>({
    type:"LOGIN_START"
});

export const loginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:User,
});

export const loginFailure=()=>({
    type:"LOGIN_FAILURE",
    
});
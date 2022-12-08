
export const getMoviesStart=()=>({
    type:"GET_MOVIES_START"
});
export const getMoviesSuccess=()=>({
    type:"GET_MOVIES_SUCCESS",
    payload:movies,
});
export const getMoviesFailure=()=>({
    type:"GET_MOVIES_FAILURE"
});
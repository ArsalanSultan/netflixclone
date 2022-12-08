import { createContext,  useReducer } from "react";
import MovieReducer from "./MovieReducer";

const INITIAL_STATE={
// user: JSON.parse(localStorage.getItem("user") || null),
movies: [],
isFetching:false,
error:false,
}
export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider =({children})=>{
    const [state,dispatch] = useReducer(MovieReducer,INITIAL_STATE);

    // useEffect(()=>{
    //       localStorage.setItem("user",JSON.stringify(state.user))
    // },[state.user])

    return (
        <MovieContext.Provider
        value={{
            movies:state.movies,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}
        >{children}</MovieContext.Provider>
    )
}
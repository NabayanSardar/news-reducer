import Cookies from "js-cookie";
import type { AuthState } from "../types/interface/auth.interface";
import type { AuthAction } from "../types/type/auth.type";

const token = Cookies.get("token") ?? null;
const user = Cookies.get("user") ? JSON.parse(Cookies.get("user") as string) : null
export const AuthInitialState: AuthState = {
isLoading:false,
isError: null,
token:token,
user: user
}


export const authReducer = (state:AuthState, action:AuthAction):AuthState =>{
switch(action.type){
    case "START_REGISTER":
    case "START_LOGIN":
        return {
            ...state,
            isLoading:true,
            isError:null
        }
    case "COMPLETE_REGISTER":
        return {
            ...state,
            isLoading: false,
            isError:null
        }
    case "COMPLETE_LOGIN":
        return {
            ...state,
             isLoading: false,
            isError:null,
            token: action.payload.accessToken,
            user: action.payload.user
        }
    case "FAILD_REGISTER":
    case "FAILD_LOGIN":
        return {
            ...state,
            isLoading:false,
            isError:action.payload
        }
    default:
        return state
}
}
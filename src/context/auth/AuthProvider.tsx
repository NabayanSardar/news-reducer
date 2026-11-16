import React, { useReducer, type ReactNode } from "react";
import AuthContext from "./CreateAuthContext";
import { AuthInitialState, authReducer } from "../../reducer/auth.reducer";
import type {
  LoginPayload,
  SignupPayload,
} from "../../types/interface/auth.interface";
import API from "../../api/api.instance";
import { Endpoint } from "../../services/helper/endpoint";
import Cookies from "js-cookie";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authstate, dispatchAuthState] = useReducer(
    authReducer,
    AuthInitialState,
  );

  const registerUser = async (data: SignupPayload) => {
    dispatchAuthState({ type: "START_REGISTER" });
    try {
      // const response = await axios.post("https://news-blog-api.onrender.com/api/auth/register", data);
      const response = await API.post(`${Endpoint.auth.signup}`, data);
      console.log("response", response);
      dispatchAuthState({ type: "COMPLETE_REGISTER", payload: response.data });
      return response.data;
    } catch (error: any) {
      // console.log("error",error.response);
      const errMessage: string =
        error?.response?.data?.message || "Failed Register";
      console.log("error---", errMessage);
      dispatchAuthState({ type: "FAILD_REGISTER", payload: errMessage });
      return errMessage;
    }
  };
  const loginUser = async (payload: LoginPayload) => {
    dispatchAuthState({ type: "START_LOGIN" });
    try {
      const response = await API.post(`${Endpoint.auth.login}`, payload);
    //   console.log("response", response);
      if (response.status === 200) {
        Cookies.set("token", response?.data?.accessToken);
        Cookies.set("user", JSON.stringify(response?.data?.user));
      }
      dispatchAuthState({ type: "COMPLETE_LOGIN", payload: response.data });
      return response.data;
    } catch (error: any) {
      // console.log("error",error.response);
      const errMessage: string =
        error?.response?.data?.message || "Login Failed";
      dispatchAuthState({ type: "FAILD_LOGIN", payload: errMessage });
      return errMessage;
    }
  };

  const logoutUser = () => {};
  return (
    <AuthContext value={{ authstate, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext>
  );
};

export default AuthProvider;

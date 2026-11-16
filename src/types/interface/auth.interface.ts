export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload extends LoginPayload {
    name: string;
}

export interface User {
    _id:string;
    name: string;
    email: string;
    role: string;
}

export interface SingupResponse {
    message: string,
    user: User
}

export interface LoginResponse extends SingupResponse {
    accessToken: string;
}

export interface AuthState {
     isLoading: boolean;
    isError: string | null;
    token: string | null;
    user: User | null;
}
export interface AuthContext {
   authstate:AuthState;
    loginUser: (payload: LoginPayload) => Promise<LoginResponse>;
    registerUser: (payload: SignupPayload)=>Promise<SingupResponse>;
    logoutUser: ()=>void;
}
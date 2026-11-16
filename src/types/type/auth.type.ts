import type { LoginResponse } from "../interface/auth.interface";

export type AuthAction =
  | { type: "START_REGISTER" }
  | { type: "COMPLETE_REGISTER"; payload: any }
  | { type: "FAILD_REGISTER"; payload: string | null }
  | { type: "START_LOGIN" }
  | { type: "COMPLETE_LOGIN"; payload: LoginResponse }
  | { type: "FAILD_LOGIN"; payload: string | null };

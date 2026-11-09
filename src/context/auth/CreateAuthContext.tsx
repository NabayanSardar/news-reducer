import { createContext } from "react";
import type { AuthContext } from "../../types/interface/auth.interface";

const AuthContext = createContext<AuthContext | null>(null);

export default AuthContext;
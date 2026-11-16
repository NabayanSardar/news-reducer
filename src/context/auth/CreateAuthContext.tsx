import { createContext } from "react";
import type { AuthContext as AuthContextType } from "../../types/interface/auth.interface";

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

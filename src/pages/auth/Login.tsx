import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { LoginPayload } from "../../types/interface/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../services/validation/login.validation";
import { LoginInputField } from "../../services/json/input-fileds/login.inputs";
import DynamicInput from "../../components/DynamicInput";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/CreateAuthContext";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Authcontext new provider");
  }
  console.log("authcontext", authContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginPayload) => {
    const response = await authContext.loginUser(data);
    console.log("response in login page", response);
    if (response.user) {
      toast.success(response.message);
      if (response.user.role === "admin") {
        navigate("/admin/dashbaord");
      } else {
        navigate("/");
      }
      reset();
    }
  };

  useEffect(()=>{
    if(authContext.authstate.token){
      if(authContext.authstate.user?.role === "admin"){
        navigate("/admin/dashbaord")
      }else{
        navigate("/")
      }
    }
  },[authContext.authstate.token, authContext?.authstate?.user]);
  
  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ maxWidth: "500px" }}>
        <CardContent>
          <Typography variant="h1">Login </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {LoginInputField?.map((field: any) => (
              <div key={field.label}>
                <DynamicInput
                  label={field.label}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  register={register}
                  errors={errors}
                />
              </div>
            ))}
            <Button
              variant="contained"
              type="submit"
              disabled={authContext?.authstate?.isLoading}
            >
              {authContext?.authstate?.isLoading ? (
                <CircularProgress />
              ) : (
                "Login"
              )}
            </Button>
          </Box>
          {authContext?.authstate?.isError && (
            <Typography sx={{ fontSize: "10px", color: "red", mb: 2, mt: 2 }}>
              {authContext?.authstate?.isError}
            </Typography>
          )}
          <Typography
            onClick={() => navigate("/signup")}
            sx={{ display: "flex", color: "blue" }}
          >
            Create and Account? <span>Signup</span>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;

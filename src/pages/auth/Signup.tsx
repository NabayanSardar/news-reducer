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
import type { SignupPayload } from "../../types/interface/auth.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../../services/validation/signup.validation";
import { SingupInputField } from "../../services/json/input-fileds/signup.inputs";
import DynamicInput from "../../components/DynamicInput";
import { useContext } from "react";
import AuthContext from "../../context/auth/CreateAuthContext";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if(!authContext) {
    throw new Error("Authcontext new provider")
  }
  console.log("authcontext", authContext)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupPayload>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignupPayload) => {
    // console.log("data", data);
   const response = await authContext.registerUser(data);
   console.log("response in singup page", response);
   if(response.user){
    toast.success(response.message);
    navigate("/login");
    reset();
   }
  };
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
          <Typography variant="h1">Create Account</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}
          >
            {SingupInputField?.map((field: any) => (
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
            <Button variant="contained" type="submit" disabled={authContext?.authstate?.isLoading}>
              {authContext?.authstate?.isLoading ? <CircularProgress /> : "Singup"}
            </Button>
          </Box>
          {authContext?.authstate?.isError && <Typography sx={{fontSize:"10px", color:"red", mb:2, mt:2}}>{authContext?.authstate?.isError}</Typography>}
          <Typography
            onClick={() => navigate("/")}
            sx={{ display: "flex", color: "blue" }}
          >
            Already have an Account? <span>Login</span>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import  { useContext } from "react";
import { useForm } from "react-hook-form";

import DynamicInput from "./DynamicInput";
import type { CategoryPayload } from "../types/interface/category.interface";
import { categorySchema } from "../services/validation/category.validation";
import { CategoryInputField } from "../services/json/input-fileds/category.inputs";
import CategoryContext from "../context/category/CreateCategoryContext";
import { toast } from "sonner";

const CategoryDialog = () => {
  const categoryContext = useContext(CategoryContext);
  if (!categoryContext) {
    throw new Error("Ctageory Context is not provided!!");
  }
  console.log("categoryContext", categoryContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CategoryPayload>({
    resolver: yupResolver(categorySchema),
  });

  const onSubmit = async (data: CategoryPayload) => {
   const response = await categoryContext.createCategory(data);
   console.log("response in category dialog", response);
   if(response.data){
    toast.success(response.message);
    reset();
   }else{
    toast.error(response.message)
   }
  };

  return (
    <Dialog
      open={categoryContext?.categoryState?.openAddCategoryDialog}
      onClose={() => categoryContext.closeDailog()}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Category</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 1,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {CategoryInputField.map((field) => (
            <DynamicInput
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type}
              required={field.required}
              register={register}
              errors={errors}
            />
          ))}
          {categoryContext?.categoryState?.isAllError && (
            <Typography>
              {categoryContext?.categoryState?.isAllError}
            </Typography>
          )}
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                reset();
                categoryContext.closeDailog();
              }}
            >
              Close
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={categoryContext?.categoryState?.isAllLoading}
            >
              {categoryContext?.categoryState?.isAllLoading ? "Adding" : "Add"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryDialog;

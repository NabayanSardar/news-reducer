import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { articleSchema } from "../services/validation/article.validation";
import { ArticleInputField } from "../services/json/input-fileds/article.inputs";
import DynamicInput from "./DynamicInput";
import type { ArticlePaylod } from "../types/interface/news.interface";

type NewsDialogprops = {
  open: boolean;
  onClose: () => void;
};
const NewsDialog: React.FC<NewsDialogprops> = ({ open, onClose }) => {
    const {register, formState: {errors}, handleSubmit, reset, setValue} = useForm<ArticlePaylod>({
        resolver: yupResolver(articleSchema)
    })

    const onSubmit = (data: ArticlePaylod)=>{
console.log("data", data);
reset()
    }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle>Add Article</DialogTitle>
      <DialogContent>
        <Box onSubmit={handleSubmit(onSubmit)} component="form" sx={{width: "400px", display: "flex", flexDirection: "column", gap:1}}>
             {ArticleInputField?.map((field: any) => (
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
            
            <Box>

            </Box>
          <DialogActions sx={{ display: "flex", gap: 1 }}>
            <Button variant="outlined" onClick={onClose}>close</Button>
            <Button type="submit" variant="contained" sx={{ bgcolor: "green" }}>
              Add
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewsDialog;



// class Emp {
//   name: string;
//   email: string;
//   constructor(name:string, email: string){
// this.name = name;
// this.email = email
//   }
// }

// const emp1 = new Emp("xyz", "xyz@gmail.com");
// console.log("emp1", emp1);
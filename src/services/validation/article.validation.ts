import * as yup from "yup";

export const articleSchema  = yup.object({
     title: yup.string().required("Title is Required"),
    content: yup.string().required("content is Required"),
    category: yup.string().required("category is Required")
})
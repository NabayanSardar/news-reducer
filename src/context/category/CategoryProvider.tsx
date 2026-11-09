import { useEffect, useReducer, type ReactNode } from "react";
import CategoryContext from "./CreateCategoryContext";
import {
  categoryIntitalState,
  categoryReducer,
} from "../../reducer/category.reducer";
import { Endpoint } from "../../services/helper/endpoint";
import API from "../../api/api.instance";
import type { CategoryPayload } from "../../types/interface/category.interface";
import { toast } from "sonner";

const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categoryState, dispatchCategory] = useReducer(
    categoryReducer,
    categoryIntitalState,
  );

  const fetchCategories = async () => {
    dispatchCategory({ type: "START_FETCHING" });
    try {
      const response = await API.get(`${Endpoint.admin.category.global}`);
      console.log("response categories", response);
      dispatchCategory({
        type: "COMPLETE_FETCHING",
        payload: response.data.data,
      });
    } catch (error) {
      const errMessage: string = error?.response?.data?.message as string;
      dispatchCategory({ type: "FAILED_FETCHING", payload: errMessage });
    }
  };

  const handleDailogOpen = () => {
    dispatchCategory({ type: "OPEN_DIALOG" });
  };

  const closeDailog = () => {
    dispatchCategory({ type: "CLOSE_DIALOG" });
  };

  const createCategory = async (data: CategoryPayload) => {
    dispatchCategory({ type: "STATRT_ADDING" });
    try {
      const response = await API.post(
        `${Endpoint.admin.category.global}`,
        data,
      );
      console.log("category added success", response);
      dispatchCategory({ type: "COMPLETE_ADDING", payload: response.data.data });
      return response.data;
    } catch (error) {
      const errMessage: string = error?.response?.data?.message;
      dispatchCategory({ type: "FAILD_ADDING", payload: errMessage });
    }
  };
  const updateCategory = async (data: CategoryPayload) => {};

  const deleCategory = async (id: string) => {
    try {
      const response = await API.delete(
        `${Endpoint.admin.category.global}/${id}`,
      );
      console.log("response delete", response);
      dispatchCategory({type: "COMPLETE_DELETING", payload:id})
      return response;
    } catch (error) {
      const errMessage: string = error?.response?.data?.message;
      dispatchCategory({type: "FAILD_DELETING", payload:errMessage})
      toast.error(errMessage);
    }
  };

  return (
    <CategoryContext
      value={{
        categoryState,
        fetchCategories,
        handleDailogOpen,
        closeDailog,
        createCategory,
        updateCategory,
        deleCategory,
      }}
    >
      {children}
    </CategoryContext>
  );
};

export default CategoryProvider;

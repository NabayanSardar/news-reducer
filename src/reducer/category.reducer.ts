import type { CategoryState } from "../types/interface/category.interface";
import type { CategoryActionType } from "../types/type/category.type";

export const categoryIntitalState: CategoryState = {
  isLoading: false,
  isError: null,
  categories: [],
  openAddCategoryDialog: false,
  isAllLoading: false,
  isAllError: null,
};

export const categoryReducer = (
  state: CategoryState,
  action: CategoryActionType,
): CategoryState => {
  switch (action.type) {
    case "START_FETCHING":
      return {
        ...state,
        isLoading: true,
        isError: null,
      };
    case "COMPLETE_FETCHING":
      return {
        ...state,
        isLoading: false,
        isError: null,
        categories: action.payload,
      };
    case "FAILED_FETCHING":
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    case "OPEN_DIALOG":
      return {
        ...state,
        openAddCategoryDialog: true,
      };
    case "CLOSE_DIALOG":
      return {
        ...state,
        openAddCategoryDialog: false,
      };
    case "STATRT_ADDING":
    case "STATRT_DELETING":
    case "STATRT_UPDATING":
      return {
        ...state,
        isAllLoading: true,
        isAllError: null,
      };
    case "COMPLETE_ADDING":
      return {
        ...state,
        isAllLoading: false,
        categories: [action.payload, ...state.categories],
        openAddCategoryDialog: false,
      };

    case "COMPLETE_UPDATING":

    case "COMPLETE_DELETING":
      const newCategoryList = state.categories.filter(
        (category) => category._id !== action.payload,
      );
      return {
        ...state,
        isLoading: false,
        categories: newCategoryList,
      };

    case "FAILD_ADDING":
    case "FAILD_DELETING":
    case "FAILD_UPDATING":
      return {
        ...state,
        isAllLoading: false,
        isAllError: action.payload,
      };
    default:
      return state;
  }
};

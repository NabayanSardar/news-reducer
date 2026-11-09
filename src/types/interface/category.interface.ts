export interface CategoryPayload {
  name: string;
  description: string;
}

export interface Category extends CategoryPayload {
  _id: string;
}

export interface CategoryState {
  isLoading: boolean;
  isError: string | null;
  categories: Category[];
  openAddCategoryDialog: boolean;
  isAllLoading: boolean;
  isAllError: string | null;
}

export interface CategoryContextType {
  categoryState: CategoryState;
  fetchCategories: () => void;
  handleDailogOpen: () => void;
  closeDailog: () => void;
  createCategory: (data: CategoryPayload) => Promise<any>;
  updateCategory: (data: CategoryPayload) => Promise<any>;
  deleCategory: (id: string) => Promise<any>;
}

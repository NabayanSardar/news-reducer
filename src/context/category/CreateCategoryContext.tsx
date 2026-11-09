import { createContext } from "react";
import type{ CategoryContextType } from "../../types/interface/category.interface";

const CategoryContext = createContext<CategoryContextType|null>(null);

export default CategoryContext;
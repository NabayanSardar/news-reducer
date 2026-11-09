import type { Category } from "../interface/category.interface";

export type CategoryActionType =
  | { type: "START_FETCHING" }
  | { type: "COMPLETE_FETCHING"; payload: Category[] }
  | { type: "FAILED_FETCHING"; payload: string | null }
  | { type: "OPEN_DIALOG" }
  | { type: "CLOSE_DIALOG" }
  | { type: "STATRT_ADDING" }
  | { type: "COMPLETE_ADDING"; payload: Category }
  | { type: "FAILD_ADDING"; payload: string | null }
  | { type: "STATRT_UPDATING" }
  | { type: "COMPLETE_UPDATING"; payload: Category }
  | { type: "FAILD_UPDATING"; payload: string | null }
  | { type: "STATRT_DELETING" }
  | { type: "COMPLETE_DELETING"; payload: string }
  | { type: "FAILD_DELETING"; payload: string | null };

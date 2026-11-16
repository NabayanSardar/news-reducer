import type { DynamicInputProps } from "../../../components/DynamicInput";
import type { ArticlePaylod } from "../../../types/interface/news.interface";


export const ArticleInputField: Array<
  Omit<DynamicInputProps<ArticlePaylod>, "register" | "errors">
> = [
    {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
  },
  {
    name: "content",
    label: "content",
    type: "textarea",
    required: true,
  },
];



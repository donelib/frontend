import { MutableRefObject } from "react";

export interface TagFormProps {
  formRef: MutableRefObject<TagFormData>;
}

export interface TagFormData {
  name: string;
  color: string;
}

export const defaultTagFormData = {
  name: "",
  color: "#f44336",
};

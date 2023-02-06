import { MutableRefObject } from "react";

export interface DoneFormData {
  name: string;
  tags: Array<number>;
  doneAt: Date;
}

export const defaultDoneFormData = {
  name: "",
  tags: [],
  doneAt: new Date(),
};

export interface DoneFormProps {
  formRef: MutableRefObject<DoneFormData>;
}

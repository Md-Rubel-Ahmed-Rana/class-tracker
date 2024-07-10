import { IStudent } from "./student.type";

export type IBatch = {
  endingDate: string | null;
  _id: string;
  name: string;
  batchNo: string;
  startingDate: string;
  students: IStudent[];
  createdAt: string;
  updatedAt: string;
  id: string;
};

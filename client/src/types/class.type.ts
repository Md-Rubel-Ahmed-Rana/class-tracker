import { IStudent } from "./student.type";

export type IClass = {
  _id: string;
  title: string;
  description: string;
  classNo: number;
  batchNo: string;
  absenceStudents: IStudent[];
  presentStudents: IStudent[];
  createdAt: string;
  updatedAt: string;
  id: string;
};

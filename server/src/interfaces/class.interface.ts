import { Types } from "mongoose";

export type INewClass = {
  title: string;
  description: string;
  date: string;
  batchNo: string;
  classNo: number;
  presentStudents: IStudent[];
  absenceStudents: IStudent[];
};

export type IStudent = {
  id: Types.ObjectId;
  studentId: string;
  name: string;
};

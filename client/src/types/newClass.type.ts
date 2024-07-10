export type INewClass = {
  title: string;
  description: string;
  date: string;
  batchNo: string;
  classNo: number;
  presentStudents: { name: string }[];
  absenceStudents: { name: string }[];
};

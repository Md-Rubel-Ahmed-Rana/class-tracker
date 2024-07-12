export type INewClass = {
  title: string;
  description: string;
  date: string;
  batchNo: string;
  classNo: number;
  presentStudents: { studentId: string; id: string; name: string }[];
  absenceStudents: { studentId: string; id: string; name: string }[];
};

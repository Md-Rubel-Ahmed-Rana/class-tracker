import { IClass } from "@/types/class.type";

export const handleSearchClasses = (classes: IClass[], searchQuery: string) => {
  const filteredClasses = classes?.filter((classItem) => {
    return (
      classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.classNo.toString().includes(searchQuery) ||
      classItem.batchNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.presentStudents.some((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      classItem.presentStudents.some((student) =>
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      classItem.absenceStudents.some((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      classItem.absenceStudents.some((student) =>
        student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return filteredClasses;
};

import { getApi } from "@/apis";
import { IStudent } from "@/types/student.type";
import React, { useEffect, useState } from "react";
import DeleteStudentButton from "../reusables/DeleteStudentButton";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";

const StudentsPage = () => {
  const [students, setStudents] = useState<IStudent[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredClasses = students?.filter((student) => {
    return (
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.batchNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toString().includes(searchQuery) ||
      student.batchNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      new Date(student.createdAt)
        .toLocaleDateString()
        .includes(searchQuery.toLowerCase())
    );
  });

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await getApi("student");
      setStudents(data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-5 lg:p-10">
      <div className="mb-4">
        <input
          className="border-2 w-full p-2 focus:outline-blue-300 rounded-md"
          type="text"
          name="search"
          placeholder="Search student"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-5">
          <h3 className="text-lg lg:text-2xl font-serif font-semibold">
            Loading students...
          </h3>
        </div>
      ) : (
        <>
          {filteredClasses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pb-20">
              {filteredClasses.map((student) => (
                <div
                  key={student.id}
                  className="border rounded-lg p-4 shadow-lg"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xl font-bold">{student.name}</span>
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/students/student/edit/${student.id}?studentId=${student.studentId}&batchNo=${student.batchNo}&name=${student.name}`}
                        title="Edit student info"
                      >
                        <FaEdit className="text-xl text-sky-400" />
                      </Link>
                      <DeleteStudentButton studentObjectId={student.id} />
                    </div>
                  </div>
                  <p className="text-sm">
                    <span className="font-semibold">Student ID: </span>
                    {student.studentId}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Batch No: </span>
                    {student.batchNo}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold">Enrollment Date: </span>
                    {new Date(student.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center mt-5">
              <h3 className="text-lg lg:text-2xl font-serif font-semibold">
                No students found!
              </h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentsPage;

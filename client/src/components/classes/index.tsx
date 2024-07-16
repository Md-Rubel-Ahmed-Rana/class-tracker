import React, { useEffect, useState } from "react";
import { IClass } from "@/types/class.type";
import { getApi } from "@/apis";

const ClassesPage = () => {
  const [classData, setClassData] = useState<IClass[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getApi("class");
      setClassData(data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const filteredClasses = classData?.filter((classItem) => {
    return (
      classItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.classNo.toString().includes(searchQuery) ||
      classItem.batchNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      classItem.presentStudents.some((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      classItem.absenceStudents.some((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-5 lg:p-10">
      <div className="mb-4">
        <input
          className="border-2 w-full p-2 focus:outline-blue-300 rounded-md"
          type="text"
          name="search"
          placeholder="Search class"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {!loading && (
        <div>
          {filteredClasses.length === 0 ? (
            <p className="text-lg lg:text-2xl font-semibold text-center">
              No classes available
            </p>
          ) : (
            filteredClasses.map((classItem) => (
              <div
                key={classItem._id}
                className="bg-white shadow-md border-2 rounded-lg p-2 lg:p-5 mb-5"
              >
                <h4 className="text-2xl font-semibold mb-2">
                  {getHighlightedText(classItem.title, searchQuery)}
                </h4>
                <p className="mb-2">
                  {getHighlightedText(classItem.description, searchQuery)}
                </p>
                <p className="mb-2">
                  <strong>Class No:</strong>{" "}
                  {getHighlightedText(
                    classItem.classNo.toString(),
                    searchQuery
                  )}
                </p>
                <p className="mb-2">
                  <strong>Batch No:</strong>{" "}
                  {getHighlightedText(classItem.batchNo, searchQuery)}
                </p>
                <p className="mb-2">
                  <strong>Date:</strong>{" "}
                  {getHighlightedText(
                    new Date(classItem.date).toLocaleDateString(),
                    searchQuery
                  )}
                </p>
                <div>
                  <h5 className="text-xl font-semibold mb-1">
                    Present Students:
                  </h5>
                  <ul className="list-disc pl-5 mb-2">
                    {classItem.presentStudents.map((student) => (
                      <li key={student.id}>
                        {getHighlightedText(
                          `${student.name} (${student.studentId})`,
                          searchQuery
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-xl font-semibold mb-1">
                    Absent Students:
                  </h5>
                  <ul className="list-disc pl-5">
                    {classItem.absenceStudents.map((student) => (
                      <li key={student.id}>
                        {getHighlightedText(
                          `${student.name} (${student.studentId})`,
                          searchQuery
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {loading && (
        <div className="mt-5 flex justify-center items-center">
          <h4 className="text-lg lg:text-3xl font-semibold font-serif">
            Loading classes...
          </h4>
        </div>
      )}
    </div>
  );
};

export default ClassesPage;

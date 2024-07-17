import useGetHighlightedText from "@/hooks/useGetHighlightedText";
import { IClass } from "@/types/class.type";
import { handleSearchClasses } from "@/utils/searchClasses";
import React, { useState } from "react";

type Props = {
  classes: IClass[];
  loading: boolean;
};

const ClassContainer = ({ classes, loading }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const getHighlightedText = useGetHighlightedText();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchedClasses = handleSearchClasses(classes, searchQuery);

  return (
    <div className="min-h-screen">
      <div className="mb-2">
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
          {searchedClasses.length === 0 ? (
            <p className="text-lg lg:text-2xl font-semibold text-center">
              No classes available
            </p>
          ) : (
            searchedClasses.map((classItem) => (
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

export default ClassContainer;

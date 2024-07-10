import { useState } from "react";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

const initialClasses = [
  {
    id: "1",
    title: "Quiz application development",
    description: "This is class description",
    date: "9-7-2024",
    batchNo: "001DA",
    presentStudents: [
      {
        id: "5464895",
        name: "Habibur Rahman",
      },
      {
        id: "5464895396345634",
        name: "Salman Ahmed Khan",
      },
      {
        id: "546445345895",
        name: "Rahman",
      },
      {
        id: "546489dfh dfgh5396345634",
        name: "Ahmed Khan",
      },
    ],
    absenceStudents: [
      {
        id: "5464834",
        name: "Keya Akter",
      },
      {
        id: "5464895396",
        name: "Salman Ahmed",
      },
    ],
  },
  {
    id: "2",
    title: "Todo application development",
    description: "This is class description",
    date: "7-7-2024",
    batchNo: "001DB",
    presentStudents: [
      {
        id: "5464895",
        name: "Habibur Rahman",
      },
      {
        id: "5464895396",
        name: "Salman Ahmed Khan",
      },
    ],
    absenceStudents: [
      {
        id: "5464834",
        name: "Keya Akter",
      },
      {
        id: "546489539436",
        name: "Salman Ahmed",
      },
    ],
  },
];

const batches = [
  {
    id: "3467896",
    name: "Cohod",
    batchNo: "ADC0001",
  },
  {
    id: "34678987t8g6",
    name: "Cohod",
    batchNo: "ADC0002",
  },
  {
    id: "3467896fghedrt",
    name: "Cohod",
    batchNo: "ADC0003",
  },
  {
    id: "3467896rutheio5uth",
    name: "Cohod",
    batchNo: "ADC0004",
  },
];

const Home = () => {
  const [classes, setClasses] = useState(initialClasses);
  const [filteredClasses, setFilteredClasses] = useState(initialClasses);
  const [seeStudentList, setSeeStudentList] = useState<null | number>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSeeStudentList = (index: number) => {
    if (seeStudentList === index) {
      setSeeStudentList(null);
      setSearchTerm("");
    } else {
      setSeeStudentList(index);
      setSearchTerm("");
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = initialClasses.filter((cls) =>
      cls.title.toLowerCase().includes(searchTerm)
    );
    setFilteredClasses(filtered);
  };

  const handleSelectClass = (cls: any) => {
    setFilteredClasses([cls]);
  };

  const handleChangeStudentStatus = (
    classId: string,
    studentId: string,
    studentStatus: string
  ) => {
    setClasses((prevClasses) =>
      prevClasses.map((cls) => {
        if (cls.id === classId) {
          if (studentStatus === "present") {
            const student = cls.presentStudents.find(
              (student) => student.id === studentId
            );
            return {
              ...cls,
              presentStudents: cls.presentStudents.filter(
                (student) => student.id !== studentId
              ),
              absenceStudents: student
                ? [...cls.absenceStudents, student]
                : cls.absenceStudents,
            };
          } else {
            const student = cls.absenceStudents.find(
              (student) => student.id === studentId
            );
            return {
              ...cls,
              absenceStudents: cls.absenceStudents.filter(
                (student) => student.id !== studentId
              ),
              presentStudents: student
                ? [...cls.presentStudents, student]
                : cls.presentStudents,
            };
          }
        }
        return cls;
      })
    );
  };

  const handleUpdateStudentStatus = (currentClass: any) => {
    console.log(currentClass);
  };

  return (
    <main className="lg:px-20 lg:py-10 p-4">
      <div className="flex justify-between flex-col lg:flex-row  font-semibold gap-4">
        <h1 className="text-lg lg:text-2xl">Web Design & Development Course</h1>
        <div className="flex gap-2 items-center">
          <select
            className="border bg-gray-300 px-3 rounded-md py-1"
            name="batch"
            id="batch"
          >
            <option value="">Select a batch</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>
                <span>{batch.batchNo}</span> | <span>{batch.name}</span>
              </option>
            ))}
          </select>
          <h4>Batch: 002</h4>
        </div>
      </div>
      <div className="my-5">
        <input
          className="w-full border-2 border-blue-200 p-2 focus:outline-blue-600 rounded-md"
          type="text"
          name="class"
          id="class"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search class"
        />
        {searchTerm && (
          <ul className="border border-blue-200 mt-2 rounded-md shadow-lg bg-white">
            {filteredClasses.map((cls) => (
              <li
                key={cls.id}
                className="p-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSelectClass(cls)}
              >
                {cls.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        {filteredClasses.map((cls, index) => (
          <div
            key={index}
            className="bg-white lg:shadow-lg border rounded-lg p-3 lg:p-6 mb-6"
          >
            <div className="flex justify-between flex-col lg:flex-row gap-3 items-start lg:items-center">
              <h2 className="text-md lg:text-xl font-bold mb-2">
                {index + 1}. {cls.title}
              </h2>
              <div className="relative mb-4">
                <div className="text-end">
                  <button
                    onClick={() => handleSeeStudentList(index + 1)}
                    className="bg-blue-600 px-4 py-2 rounded-md text-white"
                  >
                    See student list
                  </button>
                </div>
                {seeStudentList === index + 1 && (
                  <div className="flex flex-col gap-2 bg-gray-100 shadow-md border-2 p-2 rounded-md  absolute left-0  lg:left-auto right-auto lg:right-0 top-12 z-50">
                    <input
                      className="border focus:border-blue-600 focus:outline-blue-700 p-2 rounded-md"
                      type="text"
                      name="search"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Search student"
                    />
                    <hr />
                    <div>
                      <div
                        className={`${
                          cls.presentStudents.length +
                            cls.absenceStudents.length >
                          5
                            ? "hover:overflow-y-auto overflow-hidden h-60 flex flex-col gap-3"
                            : "flex flex-col gap-3"
                        }`}
                      >
                        {cls.presentStudents
                          .filter((student) =>
                            student.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((student) => (
                            <div
                              onClick={() =>
                                handleChangeStudentStatus(
                                  cls.id,
                                  student.id,
                                  "present"
                                )
                              }
                              className="bg-white p-2 rounded-md cursor-pointer"
                              key={student.id}
                            >
                              <h5 className="flex items-center gap-2">
                                <span>
                                  <FaRegCheckCircle className="text-blue-500" />
                                </span>
                                <span>{student.name}</span>
                              </h5>
                            </div>
                          ))}
                        {cls.absenceStudents
                          .filter((student) =>
                            student.name
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((student) => (
                            <div
                              onClick={() =>
                                handleChangeStudentStatus(
                                  cls.id,
                                  student.id,
                                  "absence"
                                )
                              }
                              className="bg-white p-2 rounded-md cursor-pointer"
                              key={student.id}
                            >
                              <h5 className="flex items-center gap-2">
                                <span>
                                  <FaRegCircle className="text-blue-500" />
                                </span>
                                <span>{student.name}</span>
                              </h5>
                            </div>
                          ))}
                      </div>
                      <div className="flex justify-between items-center gap-3 text-white">
                        <button
                          onClick={() => handleSeeStudentList(index + 1)}
                          className="bg-yellow-500 w-full rounded-md  py-1 text-center"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => handleUpdateStudentStatus(cls)}
                          className="bg-blue-500  w-full rounded-md py-1 text-center"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-700 mb-4">{cls.description}</p>
            <p className="text-gray-500 mb-2">Date: {cls.date}</p>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Present Students:</h3>
              <ul className="list-disc pl-5">
                {cls.presentStudents.map((student) => (
                  <li key={student.id} className="text-gray-700">
                    {student.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Absent Students:</h3>
              <ul className="list-disc pl-5">
                {cls.absenceStudents.map((student) => (
                  <li key={student.id} className="text-gray-700">
                    {student.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;

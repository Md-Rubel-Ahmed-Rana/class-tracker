import { useState } from "react";
import StaffLogin from "./StaffLogin";
import StudentLogin from "./StudentLogin";

const LoginPage = () => {
  const [userType, setUserType] = useState("student");
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-3">
      <div className="w-full max-w-md p-3 lg:p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Login as
        </h2>
        <div className="flex justify-between font-sans font-semibold items-center gap-2 lg:gap-4">
          <button
            onClick={() => setUserType("student")}
            className={`${
              userType === "student" ? "bg-sky-300" : "bg-gray-50"
            } py-2 w-full  text-sm lg:text-lg rounded-md border`}
          >
            Student
          </button>
          <button
            onClick={() => setUserType("staff")}
            className={`${
              userType === "staff" ? "bg-sky-300" : "bg-gray-50"
            } py-2 w-full text-sm lg:text-lg rounded-md border`}
          >
            The Power Room
          </button>
        </div>
        {userType === "student" ? <StudentLogin /> : <StaffLogin />}
      </div>
    </div>
  );
};

export default LoginPage;

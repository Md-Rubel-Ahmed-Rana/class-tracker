import { Student } from "../models/student.model";

class Service {
  async studentLogin(studentId: string) {
    const student = await Student.findOne({ studentId: studentId });
    if (!student) {
      return false;
    } else {
      return student;
    }
  }
}

export const AuthService = new Service();

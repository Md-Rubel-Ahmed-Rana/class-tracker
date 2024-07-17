import { LoginUser, PostUser } from "../interfaces/user.interface";
import { Student } from "../models/student.model";
import { User } from "../models/user.model";
import { generateToken } from "../utils/generateToken";
import bcrypt from "bcrypt";
import { StudentService } from "./student.service";
import { UserService } from "./user.service";

class Service {
  async register(user: PostUser): Promise<void> {
    const hashedPass = await bcrypt.hash(user.password, 12);
    user.password = hashedPass;
    await User.create(user);
  }

  async studentLogin(studentId: string) {
    const student = await Student.findOne({ studentId: studentId });
    if (!student) {
      return false;
    } else {
      const token = generateToken({ id: student.id, role: "student" });
      return token;
    }
  }

  async login(credentials: LoginUser): Promise<string | boolean> {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      return false;
    }

    const isMatched = await bcrypt.compare(credentials.password, user.password);
    if (!isMatched) {
      return false;
    }
    const token = generateToken({ id: user.id, role: user.role });

    return token;
  }

  async auth(id: string, role: string) {
    if (role === "student") {
      const getStudentInfo = await StudentService.getMyInfo(id);
      return getStudentInfo;
    } else {
      const getUserInfo = await UserService.findSingleUserById(id);
      return getUserInfo;
    }
  }
}

export const AuthService = new Service();

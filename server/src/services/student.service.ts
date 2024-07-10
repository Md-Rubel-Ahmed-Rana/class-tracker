import mongoose from "mongoose";
import { INewStudent } from "../interfaces/student.interface";
import { Batch } from "../models/batch.model";
import { Student } from "../models/student.model";
import { generateIncrementalNumber } from "../utils/generateIncrementalNumber";

class Service {
  async createStudent(data: INewStudent) {
    const latestStudent = await Student.find({}).sort({ createdAt: -1 });
    const nextStudentNumber = generateIncrementalNumber(
      (latestStudent[0]?.studentId as string) || "0000"
    );
    const incrementalId = `${data.batchNo}-${nextStudentNumber}`;
    data.studentId = incrementalId;
    const isBatchExist = await Batch.findOne({ batchNo: data.batchNo });
    if (!isBatchExist) {
      return false;
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      try {
        // database operation here
        const newStudent = await Student.create(data);
        isBatchExist.students.push({
          id: newStudent._id,
          name: newStudent.name,
          studentId: incrementalId,
        });
        await isBatchExist.save();
        await session.commitTransaction();
        session.endSession();
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.log(error);
        return false;
      }
    }
  }

  async getAllStudent() {
    return await Student.find({});
  }

  async getStudentByBatchNo(batchNo: string) {
    return await Student.find({ batchNo: batchNo });
  }

  async getSingleStudent(id: string) {
    return await Student.findById(id);
  }

  async deleteStudent(id: string) {
    return await Student.findByIdAndDelete(id);
  }

  async updateStudent(id: string, content: Partial<INewStudent>) {
    return await Student.findByIdAndUpdate(id, { $set: { ...content } });
  }
}

export const StudentService = new Service();

import mongoose from "mongoose";
import { INewStudent } from "../interfaces/student.interface";
import { Batch } from "../models/batch.model";
import { Student } from "../models/student.model";
import { generateIncrementalNumber } from "../utils/generateIncrementalNumber";
import { BatchService } from "./batch.service";
import { ClassService } from "./class.service";
import bcrypt from "bcrypt";

class Service {
  async createStudent(data: INewStudent) {
    const latestStudent = await Student.find({}).sort({ createdAt: -1 });
    const nextStudentNumber = generateIncrementalNumber(
      (latestStudent[0]?.studentId as string) || "0000"
    );
    const incrementalId = `${data.batchNo}-${nextStudentNumber}`;
    data.studentId = incrementalId;
    data.password = incrementalId;
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

  async getMyInfo(id: string) {
    const myInfo = await Student.findById(id);
    const myBatch = await BatchService.getSingleBatchByBatchNo(
      myInfo?.batchNo as string
    );
    const myClasses = await ClassService.getClassesByBatchNo(
      myInfo?.batchNo as string
    );
    return { student: myInfo, batch: myBatch, classes: myClasses };
  }

  async getStudentByBatchNo(batchNo: string) {
    return await Student.find({ batchNo: batchNo });
  }

  async getSingleStudent(id: string) {
    return await Student.findById(id);
  }

  async deleteStudent(id: string) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // Check if the student exists
      const student = await Student.findById(id).session(session);
      if (!student) {
        throw new Error("Student not found");
      }

      // Find the batch that contains the student
      const batch: any = await Batch.findOne({
        "students.studentId": student.studentId,
      }).session(session);
      if (!batch) {
        throw new Error("Batch not found");
      }

      // Delete the student
      await Student.findByIdAndDelete(id).session(session);

      // Remove the student from the batch's students array
      batch.students.pull({ studentId: student.studentId });
      await batch.save({ session });

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      return true;
    } catch (error) {
      // Abort the transaction
      await session.abortTransaction();
      session.endSession();
      console.error(error);
      return false;
    }
  }

  async updateStudent(id: string, content: Partial<INewStudent>) {
    return await Student.findByIdAndUpdate(id, { $set: { ...content } });
  }

  async updateStudentPassword(studentId: string, password: string) {
    const hashedPass = await bcrypt.hash(password, 12);
    return await Student.findOneAndUpdate(
      { studentId: studentId },
      {
        $set: { password: hashedPass },
      }
    );
  }
}

export const StudentService = new Service();

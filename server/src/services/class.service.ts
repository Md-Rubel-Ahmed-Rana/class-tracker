import { INewClass } from "../interfaces/class.interface";
import { Class } from "../models/class.model";

class Service {
  async createClass(data: INewClass) {
    return await Class.create(data);
  }

  async getAllClass() {
    return await Class.find({});
  }

  async getClassesByBatchNo(batchNo: string) {
    return await Class.find({ batchNo: batchNo });
  }

  async getSingleClass(id: string) {
    return await Class.findById(id);
  }

  async deleteClass(id: string) {
    return await Class.findByIdAndDelete(id);
  }

  async updateClass(id: string, content: Partial<INewClass>) {
    return await Class.findByIdAndUpdate(id, { $set: { ...content } });
  }

  async updateStudentAttendanceStatus(id: string, content: Partial<INewClass>) {
    const { presentStudents, absenceStudents } = content;
    await Class.findByIdAndUpdate(id, {
      $set: {
        presentStudents: presentStudents,
        absenceStudents: absenceStudents,
      },
    });
  }
}

export const ClassService = new Service();

import { INewBatch } from "../interfaces/batch.interface";
import { Batch } from "../models/batch.model";
import { Class } from "../models/class.model";
import { generateIncrementalNumber } from "../utils/generateIncrementalNumber";

class Service {
  async createBatch(data: INewBatch) {
    const latestBatch = await Batch.find({}).sort({ createdAt: -1 });
    const nextBatchNumber = generateIncrementalNumber(
      (latestBatch[0]?.batchNo as string) || "ADC-WD-0000"
    );
    const incrementalId = `ADC-WD-${nextBatchNumber}`;
    data.batchNo = incrementalId;
    return await Batch.create(data);
  }

  async getAllBatch() {
    return await Batch.find({});
  }

  async getSingleBatch(id: string) {
    return await Batch.findById(id);
  }

  async getSingleBatchByBatchNo(batchNo: string) {
    return await Batch.findOne({ batchNo: batchNo });
  }

  async getBatchDetails(id: string) {
    const batch: any = await Batch.findById(id);
    const batchData = {
      id: batch?._id,
      name: batch?.name,
      endingDate: batch?.endingDate,
      batchNo: batch?.batchNo,
      startingDate: batch?.startingDate,
      createdAt: batch?.createdAt,
      updatedAt: batch?.updatedAt,
    };
    const studentData = batch?.students.map((student: any) => ({
      id: student?.id,
      studentId: student?.studentId,
      name: student?.name,
    }));

    const classes = await Class.find({ batchNo: batch?.batchNo });
    return { batch: batchData, students: studentData, classes };
  }

  async deleteBatch(id: string) {
    return await Batch.findByIdAndDelete(id);
  }

  async updateBatch(id: string, content: Partial<INewBatch>) {
    return await Batch.findByIdAndUpdate(id, { $set: { ...content } });
  }
}

export const BatchService = new Service();

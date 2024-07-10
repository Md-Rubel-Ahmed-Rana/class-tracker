import { INewBatch } from "../interfaces/batch.interface";
import { Batch } from "../models/batch.model";
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

  async deleteBatch(id: string) {
    return await Batch.findByIdAndDelete(id);
  }

  async updateBatch(id: string, content: Partial<INewBatch>) {
    return await Batch.findByIdAndUpdate(id, { $set: { ...content } });
  }
}

export const BatchService = new Service();

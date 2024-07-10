import { model, Schema } from "mongoose";
import { INewBatch } from "../interfaces/batch.interface";
import { schemaForStudent } from "./student.model";

const batchSchema = new Schema<INewBatch>(
  {
    name: {
      type: String,
      required: true,
    },
    batchNo: {
      type: String,
    },
    students: {
      type: [schemaForStudent],
      default: [],
    },
    startingDate: {
      type: Date || String,
      required: true,
    },
    endingDate: {
      type: Date || String,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const Batch = model("Batch", batchSchema);

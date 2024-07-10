import { model, Schema } from "mongoose";
import { INewClass } from "../interfaces/class.interface";
import { schemaForStudent } from "./student.model";

const classSchema = new Schema<INewClass>(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    classNo: {
      type: Number,
    },
    batchNo: {
      type: Schema.Types.Mixed,
    },
    absenceStudents: {
      type: [schemaForStudent],
      default: [],
    },
    presentStudents: {
      type: [schemaForStudent],
      default: [],
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

export const Class = model("Class", classSchema);

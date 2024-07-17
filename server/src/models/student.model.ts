import { model, Schema } from "mongoose";
import { INewStudent } from "../interfaces/student.interface";
import { IStudent } from "../interfaces/class.interface";

const studentSchema = new Schema<INewStudent>(
  {
    name: {
      type: String,
    },
    studentId: {
      type: String,
    },
    password: {
      type: String,
    },
    batchNo: {
      type: String,
      required: true,
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

export const schemaForStudent = new Schema<IStudent>({
  id: {
    type: Schema.Types.ObjectId,
  },
  studentId: {
    type: String,
  },
  name: {
    type: String,
  },
});

export const Student = model("Student", studentSchema);

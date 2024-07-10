import { IStudent } from "./class.interface";

export type INewBatch = {
  name: string; // batch name should includes "ADC-WD-0001" and the 4  digit
  batchNo: number | string;
  startingDate: Date | string;
  students: IStudent[];
  endingDate: Date | string;
};

/*
1. There should includes batch starting and ending (Approximate) date
*/

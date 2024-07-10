"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateIncrementalNumber = void 0;
const generateIncrementalNumber = (str) => {
    const splitted = str.split("-");
    const getLastString = splitted[splitted.length - 1];
    const getNumber = parseInt(getLastString) + 1;
    const getNextString = getNumber.toString().padStart(4, "0");
    return getNextString;
};
exports.generateIncrementalNumber = generateIncrementalNumber;

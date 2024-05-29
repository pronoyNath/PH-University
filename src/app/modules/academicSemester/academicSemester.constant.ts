import {
  TAcademicSemesterCode,
  TAcademicSemesterCodeMapper,
  TAcademicSemesterName,
  TMonths,
} from "./academicSemester.interface";

// Define the valid values for the fields
export const MonthsSchema: TMonths[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const AcademicSemesterNameSchema: TAcademicSemesterName[] = [
  "Autum",
  "Summar",
  "Fall",
];

export const AcademicSemesterCodeSchema: TAcademicSemesterCode[] = [
  "01",
  "02",
  "03",
];


export const academicSemesterCodeMapper: TAcademicSemesterCodeMapper = {
  Autum: "01",
  Summar: "02",
  Fall: "03",
};

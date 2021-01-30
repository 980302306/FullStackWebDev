export interface DiagnoseEntry{
  code:string;
  name:string;
  latin?:string;
}


export enum Gender{
  Male='male',
  Female='female',
  Other='other'
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}
export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}


interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}


interface OccupationalHealthcareEntry extends BaseEntry{
  type:'OccupationalHealthcare';
  employerName: string;
  sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry{
  type: 'Hospital';
  discharge: Discharge;
}
export type Entry=
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;


export interface Patient{
  id:string;
  name:string;
  dateOfBirth:string;
  ssn:string;
  gender:Gender;
  occupation:string;
  entries: Entry[];
}


export type NonSensitivePatient= Omit<Patient,'ssn'>;

export type NewPatient= Omit<Patient,'id'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;
  
export type NewEntry= 
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;



import { NewPatient,Gender,Entry, Patient, NewEntry,DiagnoseEntry,HealthCheckRating,SickLeave,Discharge } from './types';
import diagnoseData from './data/diagnoses.json';
/* eslint-disable @typescript-eslint/no-explicit-any */
const isString=(text:any):text is string =>{
  return typeof text==='string' || text instanceof String;
};
const isDate=(date:string):boolean=>{
  return Boolean(Date.parse(date));
};

const isGender=(gender:any): gender is Gender =>{
  return Object.values(Gender).includes(gender);
};

const isCodes=(codes:any[]):  codes is Array<DiagnoseEntry['code']>=>{
  const diagnoses:DiagnoseEntry[]=diagnoseData as DiagnoseEntry[];
  const accpetedCodes=diagnoses.map(diagnosis=>diagnosis.code);
  let result='true';
  codes.forEach((code:string)=>{
    if(!accpetedCodes.includes(code)){
      result='false';
    }
  });
  return result==='true'?true:false;
};

const isEntry=(entries:any[]): entries is Entry[]=>{
  const acceptedTypes=['HealthCheck','OccupationalHealthcare','Hospital'];
  let result='true';
  entries.forEach((entry:Entry) => {
    if(!acceptedTypes.includes(entry.type)){
      result='false';
    }
  });
  
  return result==='true'?true:false;
};
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
const isSickLeave=(sick:any):sick is SickLeave=>{
  return isDate(sick.startDate)&&isDate(sick.endDate);
};

const isDischarge=(discharge:any):discharge is Discharge=>{
  return isDate(discharge.date) && isString(discharge.criteria);
};
const isHealthCheckRating=(rating:any):rating is HealthCheckRating =>{
  return Object.values(HealthCheckRating).includes(rating);
};


/* eslint-disable @typescript-eslint/restrict-plus-operands */
const parseString=(data:any):string=>{
  if(!data||!isString(data)){
    throw new Error('Incorrect or missing parameter: ' + data);
  }
  return data;
};

const parseDate=(date:any):string=>{
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
const parseGender=(gender:any):Gender=>{
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseDiagnoseCodes=(codes:any[]| undefined):Array<DiagnoseEntry['code']>|undefined=>{
  if (!codes) return undefined;
  if(codes && !isCodes(codes)){
    throw new Error('Incorrect diagnosisCodes: '+ codes);
  }
  return codes ;
};

const parseHealthCheckRating=(rating:any):HealthCheckRating=>{
  if(rating===undefined||rating===null||!isHealthCheckRating(rating)){
    throw new Error('Incorrect or missing HealthCheckRating: '+ rating);
  }
  return rating;
};

const parseSickLeave=(sick:any):SickLeave|undefined=>{
  if (!sick) return undefined;
  if(!isSickLeave(sick)){
    throw new Error('Incorrect or missing SickLeave: '+ sick);
  }
  return sick;
};

const parseDischarge=(discharge:any):Discharge=>{
  if(!discharge||!isDischarge(discharge)){
    throw new Error('Incorrect or missing discharge: '+ discharge);
  }
  return discharge;
};

const parseEntries=(entries: any): Entry[]=>{
  if(!entries || !isEntry(entries)){
    throw new Error('Incorrect or missing entries: '+ entries);
  }
  return entries;
};




const toNewPatient = (patient:Patient): NewPatient =>{
  const newPatient: NewPatient ={
    name:parseString(patient.name),
    dateOfBirth:parseDate(patient.dateOfBirth),
    ssn:parseString(patient.ssn),
    gender:parseGender(patient.gender),
    occupation:parseString(patient.occupation),
    entries:parseEntries(patient.entries)
  };
  return newPatient;
};


const toNewEntry = (entry: Entry) :  NewEntry =>{
  switch (entry.type){
    case "HealthCheck":
      return {
        date: parseDate(entry.date),
        description: parseString(entry.description),
        specialist: parseString(entry.specialist),
        type: "HealthCheck",
        diagnosisCodes: parseDiagnoseCodes(entry.diagnosisCodes),
        healthCheckRating:parseHealthCheckRating(entry.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        date: parseDate(entry.date),
        description: parseString(entry.description),
        specialist: parseString(entry.specialist),
        type: "OccupationalHealthcare",
        employerName: parseString(entry.employerName),
        sickLeave: parseSickLeave(entry.sickLeave)
      };
    case "Hospital":
      return {
        date: parseDate(entry.date),
        description: parseString(entry.description),
        specialist: parseString(entry.specialist),
        type: "Hospital",
        discharge:parseDischarge(entry.discharge),
      };
  }
};

export default {toNewPatient, toNewEntry};
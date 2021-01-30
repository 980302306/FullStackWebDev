import patientData from '../data/newPatients';
import {Patient,NewPatient,NonSensitivePatient,NewEntry} from '../types';
import Utils from '../utils';

const patients:Patient[]=patientData.map(patient=>{
  const newPatient=Utils.toNewPatient(patient) as Patient;
  newPatient.id=patient.id;
  return newPatient;
});

const getNonSensitivePatients=():NonSensitivePatient[]=>{
  return patients.map(({id,name,dateOfBirth,gender,occupation,entries})=>({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};
const getPatients=():Patient[]=>{
  return patients.map(({id,name,dateOfBirth,gender,ssn,occupation,entries})=>({
    id,
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
    entries
  }));
};

const getPatientById=(id:string):Patient|undefined=>{
  return patients.find(patient=>patient.id===id);
};

const addPatient=(entry:NewPatient): Patient=>{
  const current=new Date();
  const newPatient={
    id:current.toLocaleString(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry=(patient:Patient, entry:NewEntry):Patient=>{
  const current=new Date();
  const newPatient:Patient = {
    ...patient,
    entries: patient.entries.concat({
      id: current.toLocaleString(),
      ...entry
    })
  };
  const index=patients.indexOf(patient);
  patients[index]=newPatient;
  return newPatient;
};


export default {
  getPatients,
  addPatient,
  getPatientById,
  getNonSensitivePatients,
  addEntry
};
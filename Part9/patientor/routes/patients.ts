import express from 'express';
import  patientService from '../services/patientService';
import  Utils from '../utils';

const router=express.Router();

router.get('/',(_req,res)=>{
  res.send(patientService.getPatients());
});

router.get('/:id',(req,res)=>{
  const id=req.params.id;
  const patient=patientService.getPatientById(id);
  if(patient){
    res.json(patient);
  }else{
    res.status(404).end("not found");
  }
});

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
router.post('/',(req,res)=>{
  try{
    const newPatient=Utils.toNewPatient(req.body);
    const addedPatient=patientService.addPatient(newPatient);
    res.json(addedPatient);
  }catch(e){
    res.status(400).send(e.message);
  }
});


router.post('/:id/entries',(req,res)=>{
  try{
    const newEntry=Utils.toNewEntry(req.body);
    const id=req.params.id;
    const patient=patientService.getPatientById(id);
    if(patient){
      const addedEntry=patientService.addEntry(patient,newEntry);
      res.json(addedEntry);
    }
    else{
      res.json({Error:"cannot find this patient"});
    }
  }catch(e){
    res.status(400).send(e.message);
  }
});
export default router;
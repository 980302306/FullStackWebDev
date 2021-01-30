import React from 'react';
import {Patient, Entry, Diagnosis} from '../types';

type EntriesProps = {
  patient: Patient| undefined;
  diagnosis: Diagnosis[] | undefined;
};
const Entries=({patient,diagnosis}:EntriesProps)=>{
  if (!patient) return null;
  return (
    <div>
      {patient.entries.map((entry:Entry)=>{
        return (
          <div key={entry.id}> {entry.date} {entry.description} 
          <ul>
            {entry.diagnosisCodes?.map((code:string)=><li key={code}>{code}  {diagnosis?.find(diag=>diag.code===code)?.name} </li>)}
          </ul>
          </div>
        )
      })}
    </div>
  )

  
}


export default Entries
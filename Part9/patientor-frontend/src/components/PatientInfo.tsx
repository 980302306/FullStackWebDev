import React from 'react';
import {Header,Icon} from 'semantic-ui-react';
import {useRouteMatch} from 'react-router-dom';
import {useStateValue} from '../state';
import {Patient,Match,EntryForm} from '../types';
import Entries from './Entries';
import AddEntryForm from '../AddPatientModal/AddEntryForm';
import axios from "axios";
import { apiBaseUrl } from "../constants";
const PatientInfo=()=>{
  const match=useRouteMatch<Match>('/patients/:id');
  const [{ patients,diagnosis }, dispatch] = useStateValue();
  const patient=Object.values(patients).find((patient:Patient)=>patient.id===match!.params.id);
  let iconClass:string;
  if(patient?.gender==='male'){
    iconClass='mars';
  }else if(patient?.gender==='female'){
    iconClass='venus';
  }else{
    iconClass='venus mars'
  }


  const submitNewEntry = async (values: EntryForm) => {
    try {
      if(patient){
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${patient.id}/entries`,
          values
        );
        dispatch({ type: "ADD_PATIENT", payload: newPatient });
      }
    } catch (e) {
      console.error(e.response.data);
      // setError(e.response.data.error);
    }
  };

  return(
    <div>
      <Header as='h1'>{patient?.name} <Icon className={iconClass} size='mini'/> </Header> 
      <div>ssn: {patient?.ssn}</div>    
      <div>occupation: {patient?.occupation}</div>
      <Header as='h2'>entries</Header>
      <Entries patient={patient} diagnosis={Object.values(diagnosis)}/>
      <AddEntryForm onSubmit={submitNewEntry}/>
    </div>
  )
}

export default PatientInfo
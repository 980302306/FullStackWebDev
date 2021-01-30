import React from 'react';
import { useStateValue } from '../state';
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import {EntryForm, DiagnosisType,HealthCheckRating} from '../types';
import { TextField, SelectField, TypeOption, DiagnosisSelection, NumberField} from "./FormField";
interface Props {
  onSubmit: (values: EntryForm) => void;
  // onCancel: () => void;
}


const typeOptions: TypeOption[]=[
  {value: DiagnosisType.HealthCheck, label:"HealthCheck"},
  // {value:DiagnosisType.Hospital,label:"Hospital"},
  // {value:DiagnosisType.OccupationalHealthcare,label:"OccupationalHealthcare"}
];



export const AddEntryForm:React.FC<Props>=({onSubmit})=>{
  const [{diagnosis}]=useStateValue();
  return (
    <Formik
      initialValues={{
        date:'',
        type:DiagnosisType.HealthCheck as never,
        specialist:'',
        diagnosisCodes:[],
        description:'',
        // dischargeDate:"",
        // criteria:"",
        // employerName:"",
        // startDate:"",
        // endDate:"",
        healthCheckRating:HealthCheckRating["Healthy"]

      }}
      onSubmit={onSubmit}
      validate={values=>{
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if(Boolean(Date.parse(values.date))){
          errors.date = 'date should be YYYY-MM-DD'
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!Object.values(HealthCheckRating).includes(values.healthCheckRating)){
          errors.healthCheckRating= requiredError;
        }
        if (values.type!=="HealthCheck"){
          errors.type="type error";
        }
        return errors;
      }}
    >
      {({isValid, dirty, setFieldValue, setFieldTouched})=>{
        return(
          <Form className="form ui">
            <Field 
              label='Date'
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label='Specialist Name'
              placeholder="Name"
              name='specialist'
              component={TextField}
            />
            <Field
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />

            <SelectField
              name='type'
              label='Type'
              options={typeOptions}
            />

            {/* <Field
              label='Date of Discharge'
              placeholder='YYYY-MM-DD'
              name='dischargeDate'
              component={TextField}
            />

            <Field
              label='Criteria'
              placeholder='Critera'
              name='criteria'
              component={TextField}
            />

            <Field
              label='Name of Employer'
              placeholder='Name of Employer'
              name='employerName'
              component={TextField}
            />
            
            <Field
              label='Start date of sick leave'
              placeholder='YYYY-MM-DD'
              name='startDate'
              component={TextField}
            />

            <Field
              label='End date of sick leave'
              placeholder='YYYY-MM-DD'
              name='endDate'
            /> */}

            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              {/* <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column> */}
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>

          </Form>
        )
      }}


    </Formik>

  );
}

export default AddEntryForm;
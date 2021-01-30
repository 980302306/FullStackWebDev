import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises,{evaluation} from './exerciseCalculator';

const app=express();
app.use(express.json());

app.get('/hello',(_req,res)=>{
  res.send('Hello Full Stack');
});


app.get('/bmi',(req,res)=>{
  const height=Number(req.query.height);
  const weight=Number(req.query.weight);
  
  if(isNaN(height) || isNaN(weight)){
    res.send({
      error: "malformatted parameters"
    });
  }
  else{
    const bmi:string=calculateBmi(height,weight);
    res.send({
      weight,
      height,
      bmi
    });
  }
});


app.post('/exercises',(req,res)=>{
  // eslint-disable-next-line 
  const record:Array<number> =  req.body.daily_exercises.map((value:string)=>Number(value));
  // eslint-disable-next-line
  const target=Number(req.body.target); 

  if(isNaN(target) || record.includes(NaN)){
    res.send({
      error: "malformatted parameters"
    });
  }
  else{
    console.log(record);
    console.log(target);
    const result:evaluation=calculateExercises(record,target);
    // res.end(result);
    res.send(result);
  }
});


const PORT=3003;

app.listen(PORT,()=>{
  console.log(`Server running on port ${PORT}`);
});
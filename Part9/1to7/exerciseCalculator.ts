export interface evaluation{
periodLength:number;
  trainingDays:number;
  success:boolean;
  rating:number;
  ratingDescription: string;
  target: number;
  average:number;
}


const calculateExercises=(studyRecord:Array<number>, target:number):evaluation=>{
  const getSum = (arr:Array<number>):number => arr.reduce((accumulator:number,current:number)=>accumulator+current,0);
  const periodLength:number=studyRecord.length;
  const trainingDays:number=studyRecord.filter(record=>record>0).length;
  const average:number= getSum(studyRecord)/periodLength;
  const success:boolean= average>=target? true : false;
  let rating=0;
  let ratingDescription="";
  if (average>target) rating=3;
  else if (average>target-target/2) rating=2;
  else rating=1;

  switch(rating){
    case 3:
      ratingDescription='good job! keep on!';
      break;
    case 2:
      ratingDescription='not too bad but could be better';
      break;
    case 1:
      ratingDescription='come on! you can do it';
      break;
    default:
      throw new Error('wrong rating');
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const studyRecord:Array<number>=process.argv.slice(3).map(record=>Number(record));
const target=Number(process.argv[2]);
console.log(calculateExercises(studyRecord,target));

export default calculateExercises;
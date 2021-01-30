import React from "react";
import ReactDOM from "react-dom";

interface Header{
  courseName:string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase{
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

interface CourseParts{
  courseParts: CoursePart[];
}

const Header: React.FC<Header> = (props) =>{
  return <h1>{props.courseName}</h1>
}

const ContentPartOne: React.FC<CoursePartOne> =(props) => {
  return <div>
    <p>{props.name}:{props.exerciseCount}</p>
    <p>{props.description}</p>
  </div>
}
const ContentPartTwo: React.FC<CoursePartTwo> =(props) => {
  return <div>
    <p>{props.name}:{props.exerciseCount}</p>
    <p>{props.groupProjectCount}</p>
  </div>
}
const ContentPartThree: React.FC<CoursePartThree> =(props) => {
  return <div>
    <p>{props.name}:{props.exerciseCount}</p>
    <p>{props.description}</p>
    <p>{props.exerciseSubmissionLink}</p>
  </div>
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Content: React.FC<CourseParts>=(props)=>{
  return <div>
    {props.courseParts.map(part=>{
      switch(part.name){
        case "Fundamentals":
          return <ContentPartOne key={part.name} name={part.name} exerciseCount={part.exerciseCount} description={part.description} />
        case "Using props to pass data":
          return <ContentPartTwo key={part.name} name={part.name} exerciseCount={part.exerciseCount} groupProjectCount={part.groupProjectCount} />
        case "Deeper type usage":
          return <ContentPartThree key={part.name} name={part.name} exerciseCount={part.exerciseCount} 
                                   description={part.description} exerciseSubmissionLink={part.exerciseSubmissionLink} />
        default:
          return assertNever(part);
      }
    })}
  </div>

}

const Total: React.FC<CourseParts> = (props) =>{
  return <p>
    Number of exercises{" "}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
}


const App: React.FC = () => {
  const courseName = "Half Stack application development";
  // const courseParts = [
  //   {
  //     name: "Fundamentals",
  //     exerciseCount: 10
  //   },
  //   {
  //     name: "Using props to pass data",
  //     exerciseCount: 7
  //   },
  //   {
  //     name: "Deeper type usage",
  //     exerciseCount: 14
  //   }
  // ];
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header courseName={courseName}/>
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
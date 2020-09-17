import React from 'react';
import ReactDOM from 'react-dom';


const Header=(props)=>{
  return(
  <h1>{props.course.name}</h1>
  )
}

const Part=(props)=>{
  return(
    <p> {props.part.name} {props.part.exercise} </p>
  )
}
const Content=(props)=>{
  return(
    <div>
    <Part part={props.course.parts[0]}/>
    <Part part={props.course.parts[1]}/>
    <Part part={props.course.parts[2]}/>
    </div>
  )
}
const Total=(props)=>{
  return(
    <p>
      Number of exercise {props.course.parts[0].exercise+props.course.parts[1].exercise+props.course.parts[2].exercise}
    </p>
  )
}

const App=()=>{
  // parts array contains three objects
  const course={
    name:'Half Stack application development',
    parts:[
    {
      name:'Fundamentals of React',
      exercise:10
    },
    {
      name:'Using props to pass data',
      exercise:7
    },
    {
      name:'State of a component',
      exercise:14
    }
  ]
}
  return(
  <div>
    <Header course={course}/>
    <Content course={course} />
    <Total course={course}/>
  </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'))





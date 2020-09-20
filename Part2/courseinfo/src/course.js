import React from 'react';

const Course=({courses})=>{
    return(
      courses.map(course=>{
        return(
          <div key={course.id}>
            <H2Header course={course}/>
            <Content course={course} />
            <Total course={course}/>
          </div>
        )}))
}
  
const H1Header=({course})=><h1>{course}</h1>

const H2Header=({course})=><h2>{course.name}</h2>

const Content=({course})=><div>{course.parts.map(part=><Part key={part.id} part={part}/>)}</div>

const Part=({part})=><p> {part.name} {part.exercises} </p>

const Total=({course})=>{
    const total=course.parts.reduce((s,p)=>{
        // s={...s, exercise:s.exercise+p.exercise}
        s["exercises"]=s.exercises+p.exercises
        return(s)
    })
    return(<p><b>Total of {total.exercises} exercises</b> </p>)
}

export default Course
export {H1Header,H2Header}

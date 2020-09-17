import React,{useState} from 'react';
import ReactDOM from 'react-dom';


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Header=({text})=>{
  return(<h1>
    {text}
  </h1>)
}
const Button=({handleEvent,text})=>{
  return(<button onClick={handleEvent}>
    {text}
  </button>)
}
const MaxVotes=({points})=>{

  let maxVotesIndex=points.indexOf(Math.max(...points))
  return(<div>
          <p>{anecdotes[maxVotesIndex]}</p>
          <p>has {points[maxVotesIndex]} votes </p>
        </div>)

}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.apply(null,new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const randomIndex=()=>setSelected(Math.floor(Math.random()*Math.floor(anecdotes.length)))
  const addVote=()=>{
    let copy=[...points]
    copy[selected]+=1
    setPoints(copy)
    console.log(copy)
  }
  return (
    <div>
      <Header text="Anecdote of the day"/>
      <div>{props.anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <Button handleEvent={addVote} text={'vote'}/>
      <Button handleEvent={randomIndex} text={'nextAnecodotes'}/> 
      <Header text="Anecdote with most votes"/>
      <MaxVotes points={points}/>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)



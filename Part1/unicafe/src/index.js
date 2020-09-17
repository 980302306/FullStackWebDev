import React,{useState} from 'react';
import ReactDOM from 'react-dom';

const Header=({title})=> <h1>{title}</h1>;

const Button=({handleEvent,text}) => <button onClick={handleEvent}> {text}</button>

// const DisplayData=({type,data})=> <div>{type} {data}</div>

const SumFeedback=function(feedback){
  return feedback.good+feedback.neutral+feedback.bad
}
const AvgFeedback=function(feedback){
  if(SumFeedback(feedback)===0) return 0
  return (feedback.good-feedback.bad)/SumFeedback(feedback)
}
const PercentageFeedback=function(feedback){
  if(SumFeedback(feedback)===0) return "0%"
  return (feedback.good/SumFeedback(feedback)*100).toString()+"%"
}
const Statistics=({feedback,feedbackType})=>{
  const staticsType={
    first:'all',
    second:'average',
    third:'positive'
  }
  if(SumFeedback(feedback)===0) return <div>No feedback given</div>
  return(
    <table>
      <tbody>
      <tr>
        <td>{feedbackType.first}</td>
        <td>{feedback.good}</td>
      </tr>
      <tr>
        <td>{feedbackType.second}</td>
        <td>{feedback.neutral}</td>
      </tr>
      <tr>
        <td>{feedbackType.third}</td>
        <td>{feedback.bad}</td>
      </tr>
      <tr>
        <td>{staticsType.first}</td>
        <td>{SumFeedback(feedback)}</td>
      </tr>
      <tr>
        <td>{staticsType.second}</td>
        <td>{AvgFeedback(feedback)}</td>
      </tr>
      <tr>
        <td>{staticsType.third}</td>
        <td>{PercentageFeedback(feedback)}</td>
      </tr>
      </tbody>
    </table>)
}


const App=()=>{
  const header={
    first: 'give feedback',
    second:'statistics'
  }
  const feedbackType={
    first:'good',
    second:'neutral',
    third:'bad'
  }
  const [feedback, setFeedback]=useState({good:0,neutral:0,bad:0})
  const clickGood=()=> setFeedback({...feedback, good: feedback.good+1})
  const clickNeutral=()=> setFeedback({...feedback, neutral:feedback.neutral+1})
  const clickBad=()=> setFeedback({...feedback, bad: feedback.bad+1})

  return(
    <div>
    <Header title={header.first}/>
    <Button handleEvent={clickGood} text={feedbackType.first} />
    <Button handleEvent={clickNeutral} text={feedbackType.second} />
    <Button handleEvent={clickBad} text={feedbackType.third} />
    <Header title={header.second}/>
    <Statistics feedback={feedback} feedbackType={feedbackType}/>
    </div>
  
  )
}
ReactDOM.render(<App />,document.getElementById('root'))



import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import personService from './service/persons'

const Persons=({persons,targetPerson, handleDelete})=>{
  const possibleTargets=persons.filter(person=>person.name.match(new RegExp(targetPerson,'i')))
    return possibleTargets.map(possibleTarget=>
    <div key={possibleTarget.id}>
      {possibleTarget.name}: {possibleTarget.number}
      <button onClick={()=>handleDelete(possibleTarget.id,possibleTarget.name)}>delete</button>
    </div>)
}

const Filter=({filterPerson})=><form><div>filter shown with<input onChange={filterPerson}></input></div></form>


const Notification=({message})=>{
  if(message===null) return null
  const style={
    color: message.type==='success'? 'green':'red',
    background:'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  return <div style={style}>{message.text}</div>
}
const PersonForm=({addPerson,handleNameChange,handleNumberChange,newPerson})=>{
  return(
  <form onSubmit={addPerson}>
    <div>name: <input value={newPerson.name} onChange={handleNameChange}/></div>
    <div>number: <input value={newPerson.number} onChange={handleNumberChange}></input></div>
    <div><button type="submit">add</button></div>
  </form>
  )

}

const App = () => {

  const [ persons, setPersons ] = useState([]) 
  const emptyPerson={name:'',number:''}
  const [ newPerson, setNewPerson ] = useState(emptyPerson)
  const [ targetPerson, setTargePerson] = useState('')
  const [message,setMessage] =useState(null)
  useEffect(()=>{
    personService
    .getAll()
    .then(initialPersons=>setPersons(initialPersons))
  },[])

  const addPerson=(event)=>{
    event.preventDefault()
    
    const personObject={
      name: newPerson.name,
      number: newPerson.number
    }
    
    const selectedPerson=persons.find(person=>person.name===newPerson.name)
    if(selectedPerson){
      if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)){
        const updatedPerson={...selectedPerson,number:newPerson.number}
        personService
        .update(selectedPerson.id,updatedPerson)
        .then(returnedPerson=>{
          setPersons(persons.map(person=>person.id===selectedPerson.id ? returnedPerson: person))
          setNewPerson(emptyPerson)
          setMessage({text:`updated ${selectedPerson.name}'s phone number`,type:'success'})
          setTimeout(()=>setMessage(null),5000)
        })
        .catch(error=>{
          console.log(error)
          setMessage({text:`Information of ${selectedPerson.name} has already been removed from server`,type:'error'})
          setPersons(persons.filter(person=>person.id!==selectedPerson.id))
        })
      }
    }
    else{
      personService.create(personObject)
      .then(returnedPerson=>{
        setPersons(persons.concat(returnedPerson))
        setNewPerson(emptyPerson)
        setMessage({text:`added ${returnedPerson.name}`,type:'success'})
        setTimeout(()=>setMessage(null),5000)
      })
    }
    

    
  }
  const handleNameChange=(event)=>setNewPerson({...newPerson,name:event.target.value})

  const handleNumberChange=(event)=>setNewPerson({...newPerson,number:event.target.value})

  
  const filterPerson=(event)=>{
    event.preventDefault()
    setTargePerson(event.target.value)
  }
  
  const handleDelete=(id,name)=>{

    if(window.confirm(`Delete ${name} ?`)){
      personService
      .deletePerson(id)
      .then(returnedPerson=>{
        setPersons(persons.filter(person=>person.id!==id))
        setMessage({text:`Deleted ${name}`,type:'success'})
        setTimeout(()=>setMessage(null),5000)
      })
      .catch(error=>{
        console.log(error)
        setMessage({text:`Information of ${name} has already been removed from server`,type:'error'})
        setPersons(persons.filter(person=>person.id!==id))
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter filterPerson={filterPerson}/>
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} 
      handleNameChange={handleNameChange}
      handleNumberChange={handleNumberChange}
      newPerson={newPerson}/>
      <h3>Numbers</h3>
      <Persons persons={persons} targetPerson={targetPerson} handleDelete={handleDelete} /> 
    </div>
  )
}

ReactDOM.render(<App />,document.getElementById('root'))

export default App
import React from 'react'
import {setFilter} from '../reducers/filterReducer'
// import {useDispatch} from 'react-redux'
import {connect} from 'react-redux'

const Filter = (props) => {
  // const dispatch=useDispatch()
  const handleChange = (event) => {
    // dispatch(setFilter(event.target.value))
  props.setFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps=dispatch=>{
  return({
    setFilter:(filterKeyword)=>{
      dispatch(setFilter(filterKeyword))
    }
  })
}

const ConnectedFilter=connect(null,mapDispatchToProps)(Filter)

export default ConnectedFilter
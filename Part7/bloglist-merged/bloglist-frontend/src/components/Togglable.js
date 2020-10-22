import React,{ useState,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
const Togglable= React.forwardRef((props,ref) => {
  const [visible, setVisible]=useState(false)
  const hideWhenVisible={ display: visible ? 'none' : '' }
  const showWhenVisible={ display: visible ? '' : 'none' }
  const toggleVisibility = () => setVisible(!visible)
  // useImperativeHandle(ref,()=>toggleVisibility)
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  return(
    <div>
      <div style={hideWhenVisible}>
        <button className='button is-info' onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <h2 className='title is-2'>create new</h2>
        {props.children}
        <button className='button is-warning is-small' onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})
Togglable.displayName='Togglable'
Togglable.propTypes={
  buttonLabel:PropTypes.string.isRequired
}
export default Togglable
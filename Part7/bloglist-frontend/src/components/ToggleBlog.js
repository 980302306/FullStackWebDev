
import React,{ useState } from 'react'
import PropTypes from 'prop-types'
const ToggleBlog =(props) => {
  const [visible, setVisible] =useState(false)
  const [buttonLabel, setButtonLabel]=useState('view')
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    visible? setButtonLabel('view') : setButtonLabel('hide')
    setVisible(!visible)
  }
  return(
    <div >
      {props.title} {props.author}<button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible} className='ToggleBlogContent'>
        {props.children}
      </div>
    </div>

  )

}
ToggleBlog.displayName='ToggleBlog'
ToggleBlog.propTypes={
  title:PropTypes.string.isRequired,
  author:PropTypes.string.isRequired
}
export default ToggleBlog
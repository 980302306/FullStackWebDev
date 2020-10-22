import React,{useEffect} from 'react'
import {allUsers} from '../reducers/usersReducer'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'


const Users= ()=>{
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(allUsers())
  },[dispatch])
  const users=useSelector(state=>state.users)
  if(!users)return null

  return(
    <div>
      <h2 className='title is-2'>Users</h2>
      <table className='table is-striped'>
        <thead>
          <tr>
            <th>{' '}</th>
            <th><b>blogs created</b></th>
          </tr>
        </thead>
        <tbody>
          {users.map(user=>{
            return(
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

}

export default Users
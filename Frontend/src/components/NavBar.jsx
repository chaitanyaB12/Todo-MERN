import React, { useEffect, useState } from 'react'
import {Link, Navigate, useNavigate} from "react-router-dom"


function NavBar() {

  const [login, setLogin] = useState(localStorage.getItem('login'));
  const navigate = useNavigate();

  const logout = ()=>{
    console.log('test');
    localStorage.removeItem('login');
    setLogin(null);
    setTimeout(()=>{
        navigate('/login')
    },0)
  }

useEffect(()=>{
  const handleStorage = ()=>{
    setLogin(localStorage.getItem('login'))
  }
  window.addEventListener('localStorage-change', handleStorage)
  return ()=>{
    window.removeEventListener('localStorage-change', handleStorage)
  }
},[])

  return (
    <nav className='bg-gray-800 flex justify-between'>
        <div className="text-zinc-100 text-3xl px-2"><Link to='/'>To Do App</Link></div>
        <ul className='flex gap-3 py-2 px-2 text-2xl '>
         
           {
             login ?
            <>
              <li className='text-zinc-100 hover:text-cyan-400'> <Link to="/">List</Link> </li>
              <li className='text-zinc-100 hover:text-cyan-400'> <Link to="/add">Add Task</Link> </li>
              <li className='text-zinc-100 hover:text-cyan-400'> <Link to="/" onClick={logout}>Logout</Link></li>
            </>:null
            }
           
        </ul>
    </nav>
  )
}
export default NavBar;
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function Login() {

    const [userData, setUserData] = useState()
    const Navigate = useNavigate();

    useEffect(()=>{
      if(localStorage.getItem('login')){
        Navigate('/');
      }
    })

    const handleLogin = async()=>{
      console.log(userData);
      let result =  await fetch('http://localhost:8000/login',
            {
                method:"Post",
                body : JSON.stringify(userData),
                headers:{
                    'Content-Type':'Application/Json'
                }

            });
            result = await result.json();
            if(result.success){
                document.cookie="token="+result.token;
                localStorage.setItem('login', userData.email)
                window.dispatchEvent(new Event('localStorage-change'))
                Navigate("/");
            }else{
              alert("invalid user")
            }
    }

    
  return (
         <div className='flex justify-center  items-center min-h-screen bg-gray-50'>
        <div className='border-1 shadow-lg rounded-xl p-8 space-y-4 w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-6 text-center '>Login</h1>
      
            <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input type="text" onChange={(e)=>setUserData({...userData, email:e.target.value})} name='email'  className='border w-full rounded-lg px-3 py-2 ' placeholder='Enter Your Email'/>
            </div>
            <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input type="password" onChange={(e)=>setUserData({...userData, password:e.target.value})} name='password' className='border w-full rounded-lg px-3 py-2 ' placeholder='Enter Your Password'/>
            </div>
            <button onClick={handleLogin}  className='w-full cursor-pointer bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-900 transition'>Login</button>
           <div>
            <hr className='m-2'/>
             <p className='text-center mt-3'>Don't have an account?</p>
             <Link className='flex justify-center text-blue-800' to='/signup'>Sign Up</Link>
           </div>
          
        
      
    </div>
    </div>
  )
}

export default Login
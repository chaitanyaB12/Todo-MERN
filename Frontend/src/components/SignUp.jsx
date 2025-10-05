import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {

    const [userData, setUserData] = useState();
    const Navigate = useNavigate();

     useEffect(()=>{
          if(localStorage.getItem('login')){
            Navigate('/');
          }
        })
    

    const handleSignUp = async()=>{
      console.log(userData);
      let result =  await fetch('http://localhost:8000/signup',
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
                Navigate('/');
            }
            else{
             console.log('Invalid User');
            }
    }

  return (
     <div className='flex justify-center  items-center min-h-screen bg-gray-50'>
        <div className='border-1 shadow-lg rounded-xl p-8 space-y-4 w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-6 text-center '>Sign Up</h1>
      
          <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
            <input type="text" onChange={(e)=>setUserData({...userData, name:e.target.value})} name='name'  className='border w-full rounded-lg px-3 py-2 ' placeholder='Enter your name'/>
            </div>
            <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input type="text" onChange={(e)=>setUserData({...userData, email:e.target.value})} name='email'  className='border w-full rounded-lg px-3 py-2 ' placeholder='Enter your email'/>
            </div>
            <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
            <input type="text" onChange={(e)=>setUserData({...userData, password:e.target.value})} name='password' className='border w-full rounded-lg px-3 py-2 ' placeholder='Enter your password'/>
            </div>
            <button onClick={handleSignUp} className='w-full cursor-pointer bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-900 transition'>Sign Up</button>

            <div>
            <hr className='m-2'/>
             <p className='text-center mt-3'>Already have an account?</p>
             <Link className='flex justify-center text-blue-800' to='/login'>Login</Link>
           </div>
    </div>
    </div>
  )
}

export default SignUp;
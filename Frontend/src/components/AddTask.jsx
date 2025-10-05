import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddTask() {
    const [taskData, setTaskData] = useState();
    const navigate = useNavigate();

    const handleAddTask = async()=>{
         
          let result = await fetch("http://localhost:8000/add-task",{
                      method: "Post",
                      body: JSON.stringify(taskData),
                      credentials:'include',
                      headers:{
                        "Content-Type" : "Application/Json"
                      }
          });
          result =await result.json();
          if(result.success){
            navigate("/")
            console.log("Data Added...");
          }else{
            alert("Please Try after some time");
          }


    }
  return (
    <div className='flex justify-center  items-center min-h-screen bg-gray-50'>
        <div className='border-1 shadow-lg rounded-xl p-8 space-y-4 w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-6 text-center '>Add New Task</h1>
      
          <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input type="text" onChange={(e)=>setTaskData({...taskData, title:e.target.value})} name='title' id='title' className='border w-full rounded-lg px-3 py-2 ' placeholder='Enter Task Title'/>
            </div>
          <div className=''>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea className='border w-full rounded-lg px-3 py-2' rows={4} onChange={(e)=>setTaskData({...taskData, description:e.target.value})} name="description" placeholder='Enter Task Description' id=""></textarea>
            </div>
            <button onClick={handleAddTask} className='w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition'>Add New Task</button>
      
    </div>
    </div>
  )
}

export default AddTask
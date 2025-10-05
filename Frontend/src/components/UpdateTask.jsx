import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTask() {
    const [taskData, setTaskData] = useState({title: '', description: ''});
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getTask(id)
    },[id])

    const getTask= async(id)=>{
        let task = await fetch(`http://localhost:8000/task/`+id,{
          method:"get",
          credentials:'include'
        });
            task =await task.json();
            if(task.result){
                setTaskData(task.result);
            }
    }

    const updateTask = async()=>{
     
      let task = await fetch(`http://localhost:8000/update-task`,{
        method:'put',
        body: JSON.stringify(taskData),
        headers:{
          'Content-Type':'application/json'
        },
        credentials:'include'
      
      });
      task = await task.json();
      if(task.success){
          navigate('/');
      }else{
        console.error(task.message || "Update Failed")
      }
    }

  return (
    <div className='flex justify-center  items-center min-h-screen bg-gray-50'>
        <div className='border-1 shadow-lg rounded-xl p-8 space-y-4 w-full max-w-md'>
            <h1 className='text-2xl font-bold mb-6 text-center '>Update Task</h1>
      
          <div>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Title</label>
            <input type="text" value={taskData?.title} onChange={(e)=>setTaskData({...taskData, title:e.target.value})} name='title' id='title' className='border w-full rounded-lg px-3 py-2 ' placeholder='Enter Task Title'/>
            </div>
          <div className=''>
            <label htmlFor="" className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
            <textarea value={taskData?.description} className='border w-full rounded-lg px-3 py-2' rows={4} onChange={(e)=>setTaskData({...taskData, description:e.target.value})} name="description" placeholder='Enter Task Description' id=""></textarea>
            </div>
            <button onClick={updateTask} className='w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition'>Update Task</button>
      
    </div>
    </div>
  )
}

export default UpdateTask
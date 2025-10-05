import {  useEffect, useState } from "react"
import { Link } from "react-router-dom";


function List() {

    const [taskData, setTaskData] = useState();
    const [selectedTask, setSelectedTask] = useState([]);

    useEffect(()=>{
        getListData();
    },[])

    const getListData = async ()=>{
        let list = await fetch('http://localhost:8000/tasks',{
            credentials:"include"
        });
            list = await list.json()
            if(list.success){
                setTaskData(list.result)
            }else{
                alert("try after some time");
            }
    }

    const deleteTask = async(id)=>{
            let item = await fetch('http://localhost:8000/delete/'+id ,{method:"delete", credentials:'include'});
                item = await item.json();
                if(item.success){
                    console.log("item deleted");
                    getListData();
                }else{
                alert("try after some time");
            }
    }

    const selectAll =(e)=>{
            console.log(e.target.checked)
            if(e.target.checked){
                let lists = taskData.map((item)=>item._id)
                    setSelectedTask(lists);
            }else{
                setSelectedTask([]);
            }
    }

    const selectSingleItem = (id) =>{
          
            if(selectedTask.includes(id)){
                let items = selectedTask.filter((item)=>item !== id);
                setSelectedTask(items);
            }else{
                setSelectedTask([id, ...selectedTask])
            }
    }

    const deleteMultiple = async()=>{
        let item = await fetch('http://localhost:8000/delete-multiple/',
            {
                credentials:'include',
                method:"delete",
                body : JSON.stringify(selectedTask),
                headers:{
                    'Content-Type':'Application/Json'
                }

            });
            item = await item.json();
            if(item.success){
                getListData()
            }else{
                alert("try after some time");
            }

    }

  return (
   
    <div className="w-[90%] mx-auto bg-white min-h-[70vh] py-10">
        <h1 className="text-center text-3xl font-bold mb-8 tracking-wider">Task List</h1>
        <table className="w-full border-collapse">
            <thead >
            <tr>
                <th><button className="px-3 py-1 mb-2 rounded-sm cursor-pointer hover:bg-indigo-600 bg-gray-600 text-white" onClick={deleteMultiple}>Delete</button></th>   
            </tr>     
            <tr>
                <th className="border-2 px-4 py-3 border-gray-200 font-bold bg-gray-100 text-left"><input  onChange={selectAll} type="checkbox" /></th>
                <th className="border-2 px-4 py-3 border-gray-200 font-bold bg-gray-100 text-left">S.No</th>
                <th className="border-2 px-4 py-3 border-gray-200 font-bold bg-gray-100 text-left">Title</th>
                <th className="border-2 px-4 py-3 border-gray-200 font-bold bg-gray-100 text-left">Description</th>
                <th className="border-2 px-4 py-3 border-gray-200 font-bold bg-gray-100">Action</th>
            </tr>
            </thead>

            <tbody>

        {
            taskData && taskData.map((item, index)=>(
              
                <tr key={index} className="bg-red-300 ">
                    <td  className="border-2 border-gray-200 px-4 py-3"><input onChange={()=>selectSingleItem(item._id)} checked={selectedTask.includes(item._id)} type="checkbox" /></td>
                    <td  className="border-2 border-gray-200 px-4 py-3">{index+1}</td>
                    <td  className="border-2 border-gray-200 px-4 py-3">{item.title}</td>
                    <td  className="border-2 border-gray-200 px-4 py-3">{item.description}</td>
                    <td  className="border-2 text-center  border-gray-200 px-4 py-3"><button className="p-1 rounded-sm cursor-pointer hover:bg-indigo-600 bg-gray-600 text-white" onClick={()=>deleteTask(item._id)}>Delete</button>
                     <Link className="p-1 m-3 rounded-sm cursor-pointer hover:bg-blue-600 bg-gray-600 text-white" to={"update/"+item._id}>Update</Link>
                     </td>
                </tr> 
                
                        
            ))    
        }
        </tbody>
        </table>
      
    </div>



  )
}

export default List
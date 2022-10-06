import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [name,setName] = useState('')
  const [nameList,setNameList] = useState([])

  useEffect(()=>{
    axios.get(`https://name-demo-server.herokuapp.com/demo`).then(res=>setNameList(res.data)).catch(err=>console.log(err))
  },[])

  const addTask=(AddName)=>{
    const newList = [...nameList,AddName]
    setNameList(newList)

  }

  const handleSubmit= async ()=>{
    await axios.post(`https://name-demo-server.herokuapp.com/demo`,{
      name : name
    }).then(res=>addTask(res.data)).catch(err=>console.log(err))
  }
  const nameListmap = nameList.map((name,index)=>{
    return (
      <tr key={index}>
        <td>{name.name}</td>
      </tr>
    )
  })

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type={'text'} placeholder='Your Name...' onChange={(e)=>setName(e.target.value)}/>
      <input type={'submit'} value='Add'/>
      </form>
      <br></br>
      <table>
        <thead>
          <tr>
          <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {nameListmap}
        </tbody>
      </table>
    </div>
  )
}

export default App

import axios from 'axios'
// @ts-ignore
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'
const Listauteurs = () => {
  const[categories,setCategories]=useState([])
  const[isLoading,setIsLoading]=useState(true)

  const fetchCategories=async()=>{
    try{
      const res=await axios.get("https://gb-6l4oo.vercel.app/api/api/auteurs")
      setCategories(res.data)//5ter res fiha plusieurs information w a7na 7chetna kn b data 
      setIsLoading(false)
    }catch(error){
      console.log(error)
    }
  }

  //useEffect c'est une hoox
  useEffect(()=>{
    fetchCategories()
  },[])// nzid l [] bech n9ololo emchi w ija mara bark 5tr m 3andench app temps reelle

  if(isLoading){
    return (
      <div>
        <center>
          <ReactLoading type="spinningBubbles" color="red" height={400} width={175} />
        </center>
      </div>
    )
  }
  const handleDelete=async(id)=>{
    if (window.confirm("voulez-vous supprimer cet auteurs ?")){
      await axios.delete(`https://gb-6l4oo.vercel.app/api/api/auteurs/${id}`)
      // @ts-ignore
      .then(res=>{
        setCategories(categories.filter(cat=>cat.id!=id))
      })
    }
  }
  return (
    <div>
      <Link to="/auteurs/add">
        <button className='btn btn-success'><i 
// @ts-ignore
        class="fa-regular fa-square-plus"></i> Ajouter</button>
      </Link>
      <h1>Liste des auteurs</h1>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>nomAuteur</th>
            <th>imageAuteur</th> 
            <th>descriptionAuteur</th> 
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map((cat,index)=>
              <tr key={index}>
                <td>{cat.nomAuteur}</td>
                <td><img src={cat.imageAuteur} width={100} height={100}/></td>
                <td>{cat.descriptionAuteur}</td>
                <td>
                <Link to={`/auteurs/edit/${cat.id}`}>
                  <button className='btn btn-warning btn-sm'><i 
// @ts-ignore
                class="fa-solid fa-pen-to-square"></i> Update</button>
                 </Link>
                </td>
                <td><button className='btn btn-danger btn-sm' onClick={()=>handleDelete(cat.id)}><i 
// @ts-ignore
                class="fa-solid fa-trash"></i> Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  )
}

export default Listauteurs

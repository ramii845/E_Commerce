import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import Card from './Card';
import Pagination from './Pagination';

const Listcard = () => {
  const[articles,setArticles]=useState([])
  const[totalPages,setTotalPages]=useState(0)
  const[isLoading,setIsLoading]=useState(true)
  const[currentpage,setCurrentpage]=useState(1)
  const[pagesize,setPagesize]=useState(6)
  const loadarticles=async(pagesize,page)=>{
    try{
      const res=await axios.get(`https://gb-6sq3.vercel.app/api/api/livres/liv/articlespaginate?pageSize=10&page=1`)
      setArticles(res.data.products)//5ter res fiha plusieurs information w a7na 7chetna kn b data 
      setTotalPages(res.data.totalPages)
      console.log(res.data.products)
      setIsLoading(false)
    }catch(error){
      console.log(error)
    }
  }
//
  //useEffect c'est une hoox
  useEffect(()=>{
    loadarticles(pagesize,currentpage)
  },[currentpage,pagesize])// nzid l [] bech n9ololo emchi w ija mara bark 5tr m 3andench app temps reelle
  //currentpage,pagesize yetsamew des dependences 

    const handlePrevPage = () => {
        if (currentpage > 1) {
            setCurrentpage(currentpage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentpage < totalPages) {
            setCurrentpage(currentpage + 1);
        }
    };
    const handlePageChange = (page) => {
        setCurrentpage(page);
    };

  if(isLoading){
    return (
      <div>
        <center>
          <ReactLoading type="spinningBubbles" color="red" height={400} width={175} />
        </center>
      </div>
    )
  }
  return (
    <div>
      <div className="card-container">
        {articles.map((art,index)=>
            <Card key={index} article={art}/>
        )}
      </div>
      <Pagination handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        currentPage ={currentpage }
        />
       
    </div>
  )
}

export default Listcard


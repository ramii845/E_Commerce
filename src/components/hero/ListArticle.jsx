import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './slyder.css';
import './style.css';
import { Navigation } from 'swiper/modules';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { color } from 'framer-motion';
import { ColorPickerAreaBackground } from '@chakra-ui/react';
import { Box, Container, Icon, Typography,Grid  } from '@mui/material';



import { Stack, } from '@mui/material';

import { Pagination } from 'swiper/modules';
import { ArrowForward } from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';
import './Footer';
import Footer from './Footer';
import Hero from './Hero';
import Feature from './Feature';
import Quickviews from '../client/Quickviews';
import { Link } from 'react-router-dom';



function ListArticle() {
   // État pour stocker les catégories
  const [categories, setCategories] = useState([]);
  const [Livres, setLivres] = useState([]);
  


  // Fonction pour récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    try {
      const resx = await axios.get("https://gb-6l4oo.vercel.app/api/api/categories");
      const resy = await axios.get("https://gb-6l4oo.vercel.app/api/api/livres");
      // Mise à jour de l'état avec les données
      setCategories(resx.data);
      setLivres(resy.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  // useEffect pour appeler fetchCategories une fois que le composant est monté
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div>
         <Hero/>
        
    <Container sx={{ mt: 5 }}>
      {/* Titre et lien vers la page des livres */}
      <Grid
      className='yessine'
        container
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap:10
        }}
      >

        <h2 className='yessine'>Collection</h2>
        <a href="http://localhost:3000/livres">View All</a>
      </Grid>

      {/* Swiper pour afficher les catégories */}
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
        spaceBetween={10} // Espacement entre les slides
        slidesPerView={5} // Nombre de slides visibles
      >
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <div className="category-slide">
                <img src={cat.imagecategorie} alt={cat.nomcategorie} width={100} height={100} />
                <h3>{cat.nomcategorie}</h3>
              </div>
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p>Aucune catégorie disponible.</p>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Grid Wrapper */}
      <div className="wrapper">
    
        <div className="box1">We have all popular books for you
        <Button type="button" className="btn btn-info">Let's Go!</Button>
        </div>
        
        <div className="box2">View the latest book pricing trends
        <Button type="button" className="btn btn-info">View Them</Button>
        </div>
        <div className='box3'>
        
        
        <div className='box33'>
        We have books listing for all kinds of categories!
        
        <img
             src="images\book-earth.png"
              alt="Books"
              style={{
                width: '100PX',
                height: '100PX',
              
                objectFit: 'cover', // Garde l'image proportionnée
              }}
            />
            </div>
            <Button type="button" className="btn btn-info"style={{ color: "rgb(255, 255, 255)" }}>Let's Go!</Button>


        </div>
        <div className='box4'>

          <img
             src="images\book-background.jpg"
              alt="Books"
              style={{
                width: '100%',
                height: '100%',
              
                objectFit: 'cover', // Garde l'image proportionnée
              }}
              
            />
            
            <div className="text-overlay">
            Let us guide you to your new book
            <Button type="button" className="btn btn-info">get Started</Button>

            </div>
            

         
        </div>
       
      </div>
     
      
     
    </Container>

     <Container sx={{mt:20, backgroundColor:"#eceff1", pt:10, paddingBottom:10, paddingLeft:10}}>

     <Grid
       container
       direction="row"
       sx={{
         justifyContent: "space-between",
         alignItems: "flex-start",
         
         
       }}
     >
       <h2>Featured Books</h2>
       <a href="http://localhost:3000/livres">View All</a>
     </Grid>

     <Swiper
     
     
       navigation={true}
       modules={[Navigation]}
       className="mySwiper"
       spaceBetween={10} // Espacement entre les slides
       slidesPerView={5} // Nombre de slides visibles
     >
         <div className="car-container">
          
       {Livres.length > 0 ? (
         
         Livres.map((Liv, index) => (
           <SwiperSlide key={index}>

             <div className="car">
             <Link to = "/view">
     {Liv.imagelivre && <img src={Liv.imagelivre} alt={Liv.titre}/>}
       <div className="car-content">
           <h1 className="car-title">{Liv.titre}</h1>
        
         
           
           <h1 className="car-description">Prix : {Liv.prix} TND</h1>
           <button
              
              className="card-button">
             
              Add to cart
            </button>
           
       </div>
       </Link>
        </div>
           </SwiperSlide>
         ))
        
       ) : (
         <SwiperSlide>
           <p>Aucune Livégorie disponible.</p>
         </SwiperSlide>
       )} </div>
       
     </Swiper>

     </Container>

    <Feature/> 
    <div>
          <div>
          
      
    
      
    
      </div>
        </div>
     
    <Footer/>
    


   
     </div>
     
    
  )
}

export default ListArticle

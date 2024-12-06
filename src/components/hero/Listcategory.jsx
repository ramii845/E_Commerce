
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import './slyder.css';
import { Navigation } from 'swiper/modules';
import axios from '@/Api/axios';
import { Container, Grid } from '@mui/material';
import { Button } from 'react-bootstrap';
import { color } from 'framer-motion';
const [open, setOpen] = useState(false);

const ListCategory = () => {
  // État pour stocker les catégories
  const [categories, setCategories] = useState([]);

  // Fonction pour récupérer les catégories depuis l'API
  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://gb-sable.vercel.app/api/api/categories");
      // Mise à jour de l'état avec les données
      setCategories(res.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error);
    }
  };

  // useEffect pour appeler fetchCategories une fois que le composant est monté
  useEffect(() => {
    fetchCategories();
  }, []);
  

  return (
    <Container sx={{ mt: 5 }}>
      {/* Titre et lien vers la page des livres */}
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <h2>Collection</h2>
        <a href="http://localhost:3000/client">View All</a>
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
    
    
  );
  
};

export default ListCategory;



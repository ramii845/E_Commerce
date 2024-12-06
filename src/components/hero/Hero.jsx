import React from 'react';
import { Box, Container, Stack, Typography, Link } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { ArrowForward } from '@mui/icons-material';
import 'swiper/css';
import 'swiper/css/pagination';


const Hero = () => {
  
  return (
    <div>
      <Container
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'flex-start', // Aligne les sections en haut
          gap: 0.5, // Espace entre le carrousel et la section droite
        }}
      >
        {/* Swiper Section */}
        <Swiper
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          style={{
            width: '100%',
            maxWidth: '850px', // Largeur maximale
            height: '440px', // Hauteur fixe pour tous les slides
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Ombre légère
           
          }}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <Box sx={{ width: '100%', height: '100%' }}>
              <img
                src="images\tpl-reading-challenge.png"
                alt="Slide 1"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <Box sx={{ width: '100%', height: '100%' }}>
              <img
                src="images\pngtree-an-open-book-on-a-blue-background-image_13334857.jpg"
                alt="Slide 2"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <Box sx={{ width: '100%', height: '100%' }}>
              <img
                src="images\surface-bleue-livre-jaune-espace-pour-messages_23-2147615015.avif"
                alt="Slide 3"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </SwiperSlide>
        </Swiper>

        {/* Right Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 0.5, // Espace entre les deux images
            width: '100%',
            maxWidth: '300px', // Largeur fixe pour la section droite
          }}
        >
          {/* Image 1 */}
          <Box
            sx={{
              width: '100%',
              height: '215px', // Hauteur fixe pour la première image
              position: 'relative',
              overflow: 'hidden', // Empêche le débordement de l'image
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Ombre légère
             
            }}
          >
            <img
              
               src="images\gettyimages-200464440-001-74d10ba537c0ca1be8d0cc48030579de0f699897.jpeg"
              alt="Discount"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Garde l'image proportionnée
              }}
            />
            {/* Texte superposé */}
            <Stack
              sx={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                color: 'white',
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Enjoy 30% Discount
              </Typography>
              <Typography variant="subtitle2">on All Purchases</Typography>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: '#D23F57',
                  fontSize: '14px',
                  mt: 1,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Shop Now
              </Link>
            </Stack>
          </Box>

          {/* Image 2 */}
          <Box
            sx={{
              width: '100%',
              height: '220px', // Hauteur fixe pour la deuxième image
              overflow: 'hidden', // Empêche le débordement de l'image
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Ombre légère
              
            }}
          >
            <img
             src="images\stock-photo-bright-colorful-books-blue-background.jpg"
              alt="Books"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Garde l'image proportionnée
              }}
            />
            <Typography variant="h6" fontWeight="bold">
                Enjoy 30% Discount
              </Typography>
              <Typography variant="subtitle2">on All Purchases</Typography>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: '#D23F57',
                  fontSize: '14px',
                  mt: 1,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Shop Now
              </Link>
          </Box>
        </Box>
      </Container>
    
    </div>
  );
};

export default Hero;

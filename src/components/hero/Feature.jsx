import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import AlarmIcon from '@mui/icons-material/Alarm';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BoltIcon from '@mui/icons-material/Bolt';

function Feature() {
  return (
    <div>
      <Container
      sx={{
       
        padding: '16px',
        borderRadius: '8px',
        display: 'flex',
        flexWrap: 'wrap', // Autorise le retour à la ligne
        justifyContent: 'center', // Centre les éléments
        gap: '50px',
        maxWidth: '100%',
      
         overflowX: 'hidden'
      }}
    >
      {/* Fast Delivery */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        
          border: '1px solid #e0e0e0',
          padding: '16px',
          borderRadius: '8px',
          width: '200px',
          backgroundColor: '#ffffff',
        //'ombre légère
        }}
      >
        <BoltIcon sx={{ fontSize: '40px', color: '#1976d2' }} />
        <Typography variant="subtitle1" fontWeight="500">
          Fast Delivery
        </Typography>
        <Typography variant="body2" fontWeight="300" color="#616161">
          Start from $7
        </Typography>
      </Box>

      {/* 7 Days Return */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
         
          border: '1px solid #e0e0e0',
          padding: '16px',
          borderRadius: '8px',
          width: '200px',
          backgroundColor: '#ffffff',
    
        }}
      >
        <WorkspacePremiumIcon sx={{ fontSize: '40px', color: '#1976d2' }} />
        <Typography variant="subtitle1" fontWeight="500">
          7 Days Return
        </Typography>
        <Typography variant="body2" fontWeight="300" color="#616161">
          Guaranteed
        </Typography>
      </Box>

      {/* 365 Days */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
       
          border: '1px solid #e0e0e0',
          padding: '16px',
          borderRadius: '8px',
          width: '200px',
          backgroundColor: '#ffffff',
         
        }}
      >
        <AlarmIcon sx={{ fontSize: '40px', color: '#1976d2' }} />
        <Typography variant="subtitle1" fontWeight="500">
          365 Days
        </Typography>
        <Typography variant="body2" fontWeight="300" color="#616161">
          Free Support
        </Typography>
      </Box>

      {/* Secure Payment */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        
          border: '1px solid #e0e0e0',
          padding: '16px',
          borderRadius: '8px',
          width: '200px',
          backgroundColor: '#ffffff',
         
        }}
      >
        <CreditScoreIcon sx={{ fontSize: '40px', color: '#1976d2' }} />
        <Typography variant="subtitle1" fontWeight="500">
          Secure Payment
        </Typography>
        <Typography variant="body2" fontWeight="300" color="#616161">
          Reliable System
        </Typography>
      </Box>
    </Container>
      
    </div>
  )
}

export default Feature

import React, { useState, useEffect } from 'react';
import { Container, IconButton, Stack, Typography, ListItemText } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { ExpandMore, ShoppingCartOutlined, WidthFull } from '@mui/icons-material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import axios from 'axios';
import "./hero/slyder.css"
import { Link } from 'react-router-dom';

// Barre de recherche stylisée
const Search = styled('div')(({ theme }) => ({
  flexGrow: 0.4,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: '2px solid #747bff',
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const MenuComponent = () => {
  const [anchorEl, setAnchorEl] = useState(null); // Gestion de l'ouverture du menu
  const [selectedIndex, setSelectedIndex] = useState(0); // Gestion de la sélection des options
  const open = Boolean(anchorEl);
  const [searchValue, setSearchValue] = useState(''); // État pour la recherche
  const [categories, setCategories] = useState([]); // Stockage des catégories

  // Fonction pour récupérer les catégories depuis l'API
  const getCategories = async () => {
    try {
      const res = await axios.get('https://gb-sable.vercel.app/api/api/categories');
      setCategories(res.data); // Mise à jour des catégories
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
    }
  };

  // Gestion de l'ouverture du menu
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Gestion de la sélection dans le menu
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null); // Fermeture du menu après la sélection
  };

  // Gestion de la fermeture du menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Mise à jour de la valeur de recherche
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  // Chargement des catégories au montage du composant
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <Container sx={{ my: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo et titre */}
        <Link to="/article">
  <Stack alignItems="center">
    {/* Utilisation d'une barre oblique correcte pour le chemin des fichiers */}
    <img src="images/book-store.png" alt="Logo du bookshop" className="logo" />

    {/* Ajout d'une balise h2 correctement fermée */}
    <h2 className="title-logo">Bookshop</h2>
  </Stack>
</Link>
        {/* Barre de recherche */}
        <Search sx={{ borderRadius: '22px', display: 'flex', justifyContent: 'space-between' }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Rechercher..."
            inputProps={{ 'aria-label': 'search' }}
            value={searchValue} // Liaison avec l'état
            onChange={handleSearchChange} // Gestion des changements
          />
          <div>
            <List component="nav" aria-label="Device settings" sx={{ bgcolor: '#F6F9FC', borderBottomRightRadius: 22, borderTopRightRadius: 22, p: 0 }}>
              <ListItem
                id="lock-button"
                aria-haspopup="listbox"
                aria-controls="lock-menu"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClickListItem}
                sx={{
                  cursor: 'pointer',
                  width: 200,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <ListItemText
                  sx={{ textAlign: 'center', color: '#333', fontSize: '14px' }}
                  primary={categories[selectedIndex]?.nomcategorie || 'All categories'}
                />
                <ExpandMore sx={{ fontSize: '16px', color: '#666' }} />
              </ListItem>

              {/* Menu déroulant */}
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                {categories.map((cat, index) => (
                  <MenuItem
                    sx={{ fontSize: '14px' }}
                    key={cat._id || index}
                    selected={index === selectedIndex}
                    onClick={(event) => handleMenuItemClick(event, index)}
                  >
                    {cat.nomcategorie}
                  </MenuItem>
                ))}
              </Menu>
            </List>
          </div>
        </Search>

        {/* Icônes utilisateur et panier */}
        <Stack direction={'row'} alignItems={'center'}>
          <IconButton>
            <Person2OutlinedIcon />
          </IconButton>
          <IconButton aria-label="cart">
            <StyledBadge badgeContent={4} color="secondary">
              <ShoppingCartIcon />
            </StyledBadge>
          </IconButton>
        </Stack>
      </Container>
    </div>
  );
};

export default MenuComponent;

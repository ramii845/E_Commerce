import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from 'use-shopping-cart'; // Import correct de CartProvider


import Menu from "./components/Menu";
import Hero from "./components/hero/Hero";

import Listcategories from "./components/categories/Listcategories";
import Insertlivres from "./components/livres/Insertlivre";
import Editlivre from "./components/livres/Editlivre";
import Viewlivre from "./components/livres/Viewlivre";
import Listauteurs from "./components/auteurs/Listauteurs";
import Insertcategorie from "./components/categories/Insertcategorie";
import Editcategorie from "./components/categories/Editcategorie";
import Viewcategories from "./components/categories/Viewcategorie";
import Insertauteur from "./components/auteurs/Insertauteur";
import Editauteur from "./components/auteurs/Editauteur";
import Viewauteur from "./components/auteurs/Viewauteur";
import Listlivres from "./components/livres/Listlivres";
import IconSection from "./components/hero/Footer";
import ListArticle from "./components/hero/ListArticle";

import Yessine from "./components/hero/Feature";
import Listarticlescard from "./components/client/Listarticlescard";
import Quickviews from "./components/client/Quickviews";

function App() {
  return (
    <>
      
      <CartProvider>
        <Router>
          <Menu />
        
          
        
          
          
          

          <Routes>
          <Route path="/" element={<Navigate to="/article"/>} />
          <Route path="/article" element={<ListArticle />} />
            <Route path="/client" element={<Listarticlescard/>} />
            <Route path="/view" element={<Quickviews/>} />
            <Route path="/livres" element={<Listlivres />} />
            <Route path="/livres/add" element={<Insertlivres />} />
            <Route path="/livre/edit/:id" element={<Editlivre />} />
            <Route path="/livre/view/:id" element={<Viewlivre />} />
            <Route path="/categories" element={<Listcategories />} />
            <Route path="/categories/add" element={<Insertcategorie />} />
            <Route path="/categories/edit/:id" element={<Editcategorie />} />
            <Route path="/categories/view/:id" element={<Viewcategories />} />
            <Route path="/auteurs" element={<Listauteurs />} />
            <Route path="/auteurs/add" element={<Insertauteur />} />
            <Route path="/auteurs/edit/:id" element={<Editauteur />} />
            <Route path="/auteurs/view/:id" element={<Viewauteur />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;

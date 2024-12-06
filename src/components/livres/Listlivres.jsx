import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { Link } from 'react-router-dom'

const Listarticles = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fonction pour récupérer les articles
  const fetchArticles = async () => {
    try {
      const res = await axios.get("https://gb-6l4oo.vercel.app/api/api/livres");
      setArticles(res.data); // Met à jour la liste des articles
      setIsLoading(false);   // Arrête le chargement
    } catch (error) {
      console.log("Erreur lors de la récupération des articles :", error);
    }
  };

  // Fonction pour supprimer un article
  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet article ?")) {
      try {
        await axios.delete(`https://gb-6l4oo.vercel.app/api/api/livres/${id}`);
        setArticles(articles.filter((article) => article.id !== id)); // Met à jour la liste localement
      } catch (error) {
        console.log("Erreur lors de la suppression de l'article :", error);
      }
    }
  };

  // Appels initiaux dans useEffect
  useEffect(() => {
    fetchArticles();
  }, []); // Exécuter seulement au montage du composant

  // Affichage pendant le chargement
  if (isLoading) {
    return (
      <div>
        <center>
          <ReactLoading type="spinningBubbles" color="red" height={400} width={175} />
        </center>
      </div>
    );
  }

  return (
    <div>
      <Link to="/livres/add">
        <button className="btn btn-success">
          <i className="fa-regular fa-square-plus"></i> Ajouter
        </button>
      </Link>
      <h1>Liste des articles</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Désignation</th>
            <th>Référence</th>
            <th>Qte Stock</th>
            <th>Prix</th>
            <th>Image Livre</th>
            <th>Catégorie</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((art, index) => (
            <tr key={index}>
              <td>{art.description || "N/A"}</td>
              <td>{art.titre || "N/A"}</td>
              <td>{art.reference || "N/A"}</td>
              <td>{art.qteStock || 0}</td>
              <td>{art.prix} DT</td>
              <td>
                <img src={art.imagelivre} alt="Livre" width={100} height={100} />
              </td>
              <td>{art.categorie?.nomcategorie || "Non classé"}</td>
              <td>
                <Link to={`/livre/edit/${art.id}`}>
                  <button className="btn btn-warning btn-sm">
                    <i className="fa-solid fa-pen-to-square"></i> Update
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(art.id)}
                >
                  <i className="fa-solid fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Listarticles;

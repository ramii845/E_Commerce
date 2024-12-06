// @ts-ignore
import React, { useEffect, useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Insertarticle = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  const [scategories, setScategorie] = useState([]);
  const [auteurs, setAuteurs] = useState([]);
  const [files, setFiles] = useState([]);

  const loadscategories = async () => {
    try {
      // Récupérer les catégories
      const resCategories = await axios.get("https://gb-6l4oo.vercel.app/api/api/categories");
      
      // Récupérer les auteurs
      const resAuteurs = await axios.get("https://gb-6l4oo.vercel.app/api/api/auteurs");
      
      // Mettre à jour l'état des catégories et auteurs
      setScategorie(resCategories.data);
      setAuteurs(resAuteurs.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadscategories();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    // Vérification des données avant l'envoi
    // @ts-ignore
    if (!article.titre || !article.description || !article.qteStock || !article.prix || !article.categorieID || !article.auteurID || !article.imageart) {
      alert('Certains champs sont manquants ou invalides.');
      return; // Empêche l'envoi si les données sont incomplètes
    }

    // Assure que les types de données sont corrects
    const articleToSave = {
      ...article,
      // @ts-ignore
      prix: parseFloat(article.prix), // Assure que prix est un nombre
      // @ts-ignore
      qteStock: parseInt(article.qteStock), // Assure que qteStock est un nombre
      // @ts-ignore
      imagelivre: article.imageart // Utilise le bon nom du champ pour l'image
    };

    try {
      // Envoi de l'article à l'API
      // @ts-ignore
      const response = await axios.post('https://gb-6l4oo.vercel.app/api/api/livres', articleToSave, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Si la requête est réussie
      alert('Article ajouté avec succès!');
      navigate('/livres');
    } catch (error) {
      // Affiche l'erreur complète pour débogage
      console.error('Erreur lors de l\'ajout de l\'article :', error.response || error.message);
      alert(`Erreur lors de l'ajout de l'article : ${error.response ? error.response.data : error.message}`);
    }
  };

  const serverOptions = () => {
    return {
      // @ts-ignore
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'Ecommerce');
        data.append('cloud_name', 'dxc5curxy');
        data.append('publicid', file.name);

        axios.post('https://api.cloudinary.com/v1_1/dxc5curxy/image/upload', data)
          .then((response) => response.data)
          .then((data) => {
            // Met à jour l'URL de l'image dans l'état de l'article
            setArticle({ ...article, imageart: data.url });
            load(data.url); // Charge l'URL de l'image
          })
          .catch((error) => {
            console.error('Error uploading file:', error);
            error('Upload failed');
            abort();
          });
      },
    };
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <center><h1>Ajouter Article</h1></center>
      <Form>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titre"
              // @ts-ignore
              value={article.titre}
              onChange={(e) => setArticle({ ...article, titre: e.target.value })}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              // @ts-ignore
              value={article.description}
              onChange={(e) => setArticle({ ...article, description: e.target.value })}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Stock"
              // @ts-ignore
              value={article.qteStock}
              onChange={(e) => setArticle({ ...article, qteStock: parseInt(e.target.value) })}
            />
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="number"
              placeholder="Prix"
              // @ts-ignore
              value={article.prix}
              onChange={(e) => setArticle({ ...article, prix: parseFloat(e.target.value) })}
            />
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>Image</Form.Label>
            <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
              <FilePond
                files={files}
                // @ts-ignore
                acceptedFileTypes="image/*"
                onupdatefiles={setFiles}
                allowMultiple={false}
                server={serverOptions()}
                name="file"
              />
            </div>
          </Form.Group>
        </Row>

        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Catégorie</Form.Label>
            <Form.Select
              // @ts-ignore
              value={article.categorieID}
              onChange={(e) => setArticle({ ...article, categorieID: e.target.value })}
            >
              <option value="">Sélectionnez une catégorie</option>
              {scategories.map((cat, index) => (
                <option key={index} value={cat.id}>
                  {cat.nomcategorie}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Auteur</Form.Label>
            <Form.Select
              // @ts-ignore
              value={article.auteurID}
              onChange={(e) => setArticle({ ...article, auteurID: e.target.value })}
            >
              <option value="">Sélectionnez un auteur</option>
              {auteurs.map((aut, index) => (
                <option key={index} value={aut.id}>
                  {aut.nomAuteur}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>

        <button className="btn btn-success" onClick={handleSave}>
          <i className="fa-solid fa-floppy-disk"></i> Enregistrer
        </button>&ensp;
        <Link to="/livres">
          <button className="btn btn-danger">
            <i className="fa-solid fa-arrow-right-from-bracket"></i> Annuler
          </button>
        </Link>
      </Form>
    </div>
  );
};

export default Insertarticle;

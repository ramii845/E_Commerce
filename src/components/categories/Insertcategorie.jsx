import React, { useState } from 'react';
import { Form, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

const Insertcategorie = () => {
  const navigate = useNavigate();

  // État pour gérer les données de la catégorie
  const [categorie, setCategorie] = useState({ nomcategorie: '', imagecategorie: '' });
  const [files, setFiles] = useState([]); // État pour FilePond

  // Fonction de sauvegarde
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Validation des champs
      if (!categorie.nomcategorie) {
        alert('Le nom de la catégorie est obligatoire.');
        return;
      }
      if (!categorie.imagecategorie) {
        alert("Veuillez téléverser une image avant de soumettre.");
        return;
      }

      // Requête pour enregistrer la catégorie
      await axios.post('https://gb-6l4oo.vercel.app/api/api/categories', categorie);
      alert('Catégorie ajoutée avec succès !');
      navigate('/categories');
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la catégorie :", error.response || error.message);
      alert("Une erreur est survenue lors de l'enregistrement. Veuillez réessayer.");
    }
  };

  // Configuration pour FilePond
  const serverOptions = () => ({
    process: (fieldName, file, metadata, load, error, progress, abort) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'Ecommerce');
      formData.append('cloud_name', 'dxc5curxy');

      axios
        .post('https://api.cloudinary.com/v1_1/dxc5curxy/image/upload', formData)
        .then((response) => {
          const imageUrl = response.data.url;
          setCategorie({ ...categorie, imagecategorie: imageUrl });
          load(response.data.url); // Signale la réussite à FilePond
        })
        .catch((err) => {
          console.error('Erreur lors du téléversement de l\'image :', err);
          error('Échec du téléversement');
          abort();
        });
    },
  });

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <h1 className="text-center">Ajouter une catégorie</h1>
      <Form>
        {/* Nom de la catégorie */}
        <Form.Group className="mb-3">
          <Form.Label>Nom de la catégorie</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le nom de la catégorie"
            value={categorie.nomcategorie}
            onChange={(e) => setCategorie({ ...categorie, nomcategorie: e.target.value })}
          />
        </Form.Group>

        {/* Téléversement de l'image */}
        <Form.Group as={Col} md="6">
          <Form.Label>Image</Form.Label>
          <div style={{ width: '80%', margin: 'auto', padding: '1%' }}>
            <FilePond
              files={files}
              acceptedFileTypes={['image/*']}
              onupdatefiles={setFiles}
              allowMultiple={false}
              server={serverOptions()}
              name="file"
            />
          </div>
        </Form.Group>

        {/* Boutons */}
        <div className="d-flex justify-content-between mt-3">
          <button className="btn btn-success" onClick={handleSave}>
            <i className="fa-solid fa-floppy-disk"></i> Enregistrer
          </button>
          <Link to="/categories">
            <button className="btn btn-danger">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Annuler
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Insertcategorie;

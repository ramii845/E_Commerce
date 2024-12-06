import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Editauteur = () => {
  const [article, setArticle] = useState({
    nomAuteur: "",
    imageAuteur: "",
    descriptionAuteur: "",
  
  });
  const [files, setFiles] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  // Charger l'article spécifique
  const loadArticle = async () => {
    try {
      const res = await axios.get(`https://gb-6l4oo.vercel.app/api/api/auteurs/${id}`);
      setArticle(res.data); // Met à jour l'article avec les données récupérées
      setFiles([
        {
          source: res.data.imageAuteur,
          options: { type: "local" },
        },
      ]);
    } catch (error) {
      console.error("Erreur lors de la récupération de auteur :", error);
    }
  };

  // Charger les catégories

  // Appels initiaux dans useEffect
  useEffect(() => {
    loadArticle();
  }, [id]); // Dépendance sur `id`

  // Options pour le serveur FilePond
  const serverOptions = () => {
    return {
      process: (fieldName, file, metadata, load, error, progress, abort) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "iit2025S1");
        data.append("cloud_name", "esps");
        data.append("publicid", file.name);

        axios
          .post("https://api.cloudinary.com/v1_1/esps/image/upload", data)
          .then((response) => response.data)
          .then((data) => {
            setArticle({ ...article, imageAuteur: data.url });
            load(data.url);
          })
          .catch((err) => {
            console.error("Erreur lors du téléchargement du fichier :", err);
            error("Échec du téléchargement");
            abort();
          });
      },
      load: (source, load, error, progress, abort, headers) => {
        fetch(source)
          .then((res) => res.blob())
          .then((blob) => load(blob))
          .catch((err) => {
            console.error("Erreur lors du chargement de l'image :", err);
            error(err.message);
          });
      },
    };
  };

  // Gestion de la sauvegarde
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://gb-6l4oo.vercel.app/api/api/auteurs/${id}`, article);
      navigate("/auteurs");
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  return (
    <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
      <center>
        <h2>Modifier un auteur</h2>
      </center>
      <Form>
        <Row className="mb-2">
          <Form.Group as={Col} md="6">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Titre"
              value={article.nomAuteur}
              onChange={(e) => setArticle({ ...article, nomAuteur: e.target.value })}
            />
          </Form.Group>

          <Form.Group as={Col} md="6">
            <Form.Label>Description Auteur</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              value={article.descriptionAuteur}
              onChange={(e) => setArticle({ ...article, descriptionAuteur: e.target.value })}
            />
          </Form.Group>
        </Row>
       
      
          <Form.Group as={Col} md="6">
            <Form.Label>Image</Form.Label>
            <div style={{ width: "80%", margin: "auto", padding: "1%" }}>
              {article && (
                <FilePond
                  files={files}
                  // @ts-ignore
                  acceptedFileTypes="image/*"
                  onupdatefiles={setFiles}
                  allowMultiple={false}
                  server={serverOptions()}
                  name="file"
                />
              )}
            </div>
          </Form.Group>
      
      
        <div className="d-flex justify-content-end">
          <button className="btn btn-success btn-sm" onClick={handleSave}>
            <i className="fa-solid fa-floppy-disk"></i> Enregistrer
          </button>
          &nbsp;
          <Link to="/auteurs">
            <button className="btn btn-danger btn-sm">
              <i className="fa-solid fa-person-walking-arrow-right"></i> Annuler
            </button>
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default Editauteur

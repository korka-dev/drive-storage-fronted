import React, { useState, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { createFolder, getToken } from "../api/storage.js";
import { SuccessMessage } from "./Message/SuccessMessage.jsx";
import { ErrorMessage } from "./Message/ErrorMessage.jsx";
// const token = getToken();

export function CreateFolderForm() {
  const [folderName, setFolderName] = useState("");
  const [open, setOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const modalRef = useRef();

  const handleCreateFolder = async () => {
    try {
      const response = await createFolder(folderName);
      const status = response.status;

      if (status === 201) {
        console.log("success");
        setSuccessMessage("Dossier créé avec succès");
        setTimeout(() => setSuccessMessage(null), 5000); 
        window.location.reload();
      } else if (status === 409) {
        console.log("already exists");
        setErrorMessage("Le dossier existe déjà");
        setTimeout(() => setErrorMessage(null), 5000); 
      } else {
        console.log("error creating folder");
        setErrorMessage("Erreur lors de la création du dossier");
        setTimeout(() => setErrorMessage(null), 5000); 
      }
      setOpen(false);
    } catch (error) {
      console.log("error connecting to api server");
      setErrorMessage("Erreur de connexion au serveur API");
      setTimeout(() => setErrorMessage(null), 5000); 
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {successMessage && <SuccessMessage message={successMessage} />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      <Button
        onClick={() => {
          setOpen(true);
          setFolderName("");
        }}
        style={{ marginBottom: "10px", marginTop: "10px" }}
      >
        <FaPlus style={{ marginRight: "5px" }} /> Nouveau dossier
      </Button>
      <Modal show={open} onHide={() => setOpen(false)} ref={modalRef}>
        <Modal.Header closeButton>
          <Modal.Title>Création d'un dossier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            placeholder="Nom du dossier"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleCreateFolder}>
            Créer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

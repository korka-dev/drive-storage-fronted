import React, { useState } from "react";
import { FiDownload, FiTrash, FiFile } from "react-icons/fi";
import { downloadFile, deleteFile, getToken } from "../api/storage";
import { Modal, Button } from "react-bootstrap";
import { SuccessMessage } from "./Message/SuccessMessage";


export function FileRow({ file }) {
  const [downloading, setDownloading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      const response = await downloadFile(file.parent.dir_name, file.file_name);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.file_name;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteFile(file.parent.dir_name, file.file_name);

      if (response.status === 204) {
        console.log("File deleted successfully !!!");
        setSuccessMessage("Fichier supprimé avec succès");
        window.location.reload();
      } else {
        console.log("Error deleting file");
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <tr>
      <td>
        <FiFile style={{ marginRight: '5px' }} />
        {file.file_name}
      </td>
      <td>{file.owner}</td>
      <td>{file.created_at}</td>
      <td>
        <FiDownload onClick={handleDownload} style={{ cursor: 'pointer' }} />
        <FiTrash onClick={handleDelete} style={{ cursor: 'pointer', marginLeft: '10px' }} />
      </td>

      <Modal show={showDeleteModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation de suppression</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Voulez-vous vraiment supprimer le fichier "{file.file_name}" ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Annuler
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Supprimer
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Afficher le message de succès */}
      {successMessage && <SuccessMessage message={successMessage} />}
    </tr>
  );
}

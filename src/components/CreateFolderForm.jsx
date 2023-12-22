import { useState } from "react";
import { createFolder } from "../api/storage.js";
import { ErrorMessage } from "./Message/ErrorMessage.jsx";
import { SuccessMessage } from "./Message/SuccessMessage.jsx";

export function CreateFolderForm({ onFolderCreated }) {
    const [folderName, setFolderName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleCreateFolder = async () => {
        try {
            const response = await createFolder({
                directory: folderName,
                access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE3MDI1MDQzMzd9.yaLsvUV3oPi9W3N1DOoOrEPWOVWQMq54PBM0UaK6LrY",
                token_type: "bearer"
            });

            if (response.ok) {
                setSuccessMessage("Dossier créé avec succès");
                setErrorMessage("");
                setFolderName("");
                if (onFolderCreated) {
                    onFolderCreated();
                }
            } else if (response.status === 409) {
                setErrorMessage('Le dossier existe déjà');
                setSuccessMessage("");
            } else {
                const data = await response.json();
                setErrorMessage(`Erreur ${response.status} : ${data.detail || "Une erreur s'est produite lors de la création du dossier."}`);
                setSuccessMessage("");
            }
        } catch (error) {
            console.error("Erreur lors de la création du dossier :", error);
            setErrorMessage("Une erreur s'est produite lors de la création du dossier.");
            setSuccessMessage("");
        }
    };

    return (
        <div>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && <SuccessMessage message={successMessage} />}

            <button className="btn btn-primary mt-5" data-bs-toggle="modal" data-bs-target="#createFolderModal">
                <i className="bi bi-plus-circle me-1"></i> Create Folder
            </button>

            {/* Modal */}
            <div className="modal fade" id="createFolderModal" tabIndex="-1" aria-labelledby="createFolderModalLabel"
                aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="createFolderModalLabel">Create Folder</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="folderName" className="form-label">Folder Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="folderName"
                                    value={folderName}
                                    onChange={(e) => setFolderName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleCreateFolder}>Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

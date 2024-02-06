import React, { useState, useRef } from "react";
import { UploadFile, getToken, getFiles } from "../api/storage";
import { SuccessMessage } from "./Message/SuccessMessage";
import { ErrorMessage } from "./Message/ErrorMessage";
import { useParams } from "react-router-dom";
import { BiUpload } from 'react-icons/bi';


const UploadForm = () => {
    const [file, setFile] = useState();
    const [filename, setFilename] = useState("");
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const fileInputRef = useRef(null);

    const { dir_path } = useParams();

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFilename(selectedFile.name);
        handleUpload(selectedFile);
    };

    const handleUpload = async (selectedFile) => {
        try {
            const response = await UploadFile(dir_path, selectedFile.name, selectedFile, true);

            if (response.status === 201) {
                console.log("file uploaded successfully !!!");
                setSuccessMessage("Fichier uploadé avec succès");
                setTimeout(() => setSuccessMessage(null), 5000);

                window.location.reload();

                const filesResponse = await getFiles(dir_path);
                const filesData = await filesResponse.json();
            } else {
                console.log("error uploading file");
                setErrorMessage("Erreur lors de l'upload du fichier");
                setTimeout(() => setErrorMessage(null), 5000);
            }
        } catch (error) {
            console.error("Erreur lors de l'upload du fichier: ", error);
            setErrorMessage("Erreur de connexion au serveur API");
            setTimeout(() => setErrorMessage(null), 5000);
        }
    };

    return (
        <div>
            {successMessage && <SuccessMessage message={successMessage} />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <button className="btn btn-primary" onClick={handleButtonClick}>
                <BiUpload /> Nouveau Fichier
            </button>
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            {filename && <div>{filename}</div>}
        </div>
    );
};

export default UploadForm;

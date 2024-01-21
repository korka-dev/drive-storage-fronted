import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadFile } from "../api/storage";
import { SuccessMessage } from "./Message/SuccessMessage";
import { ErrorMessage } from "./Message/ErrorMessage";
import { useParams } from "react-router-dom";


const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3MDgzODUyODZ9.t84-n2vUR87_KjQHBPSNHVsbR1P_mwQ8pUKHdJKNMpw"


const UploadForm = () => {
    const [file, setFile] = useState();
    const [filename, setFilename] = useState("");
    const [keep, setKeep] = useState(true);
    // const [successMessage, setSuccessMessage] = useState("");
    // const [errorMessage, setErrorMessage] = useState("");
    // const [showModal, setShowModal] = useState(false);
    // const navigate = useNavigate();
    // const [currentDirectory, setCurrentDirectory] = useState(directory)
    const { dir_path } = useParams();
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setFilename(selectedFile.name);
    };

    // const handleKeepChange = () => {
    //     setKeep(!keep);
    // };

    // const handleShow = () => {
    //     setCurrentDirectory(directory)
    //     setShowModal(true);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(directory);

        try {
            const response = await UploadFile(dir_path, filename, file, keep, token);

            if (response.status === 201) {
                console.log("file uploaded successfully !!!");

                window.location.reload()

            } else {
                // const data = await response.json();
                // setErrorMessage(`Erreur ${response.status} : ${data.detail || "Erreur lors de l'upload du fichier"}`);
                // setSuccessMessage("");

                console.log("error uplaoding file");
            }
        } catch (error) {
            console.error("Erreur lors de l'upload du fichier: ", error);
            // setErrorMessage("Une erreur s'est produite lors de l'upload du fichier.");
            // setSuccessMessage("");
        }
    };


    // const handleClose = () => setShowModal(false);

    // const handleModalConfirmation = () => {
    //     // navigate("/upload");
    //     handleClose();
    // };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label">Choisir le fichier</label>
                    <input type="file" className="form-control" id="fileInput" onChange={handleFileChange} />
                </div>
               
                
                <button type="submit" className="btn btn-primary" >Upload</button>
            </form>

            
        </div>
    );
};

export default UploadForm;

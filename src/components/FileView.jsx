import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileTable } from "./FileTable";
import { getFiles, getToken } from "../api/storage";
import { FileRow } from "./FileRow";
import UploadForm from "./UploadForm";
import { SearchBar } from "./SearchBar";
import ErrorBoundary from "./ErrorBoundary";

const FileView = () => {
    const { dir_path } = useParams();
    const [files, setFiles] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPath, setCurrentPath] = useState("/files");

    useEffect(() => {
        if (!isLoaded) {
            fetchFiles();
            setIsLoaded(true);
        }
    }, [isLoaded]);

    const fetchFiles = async () => {
        try {
            const response = await getFiles(dir_path);
            const filesData = await response.json();
            setFiles(filesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des Fichiers', error);
        }
    };

    const handleSearchChange = (value) => {
        setSearchTerm(value);
    };

    const filteredFiles = files
        .filter(file => file.file_name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map(file => <FileRow file={file} key={file.file_name} />);

    return (
        <ErrorBoundary errorMessage="Une erreur est survenue lors du rendu du composant FileView.">
            <div className="container my-3">
                <div className="row">
                    <div className="col-md-3">
                        <UploadForm />
                    </div>
                    <div className="col-md-9">
                        <div className="d-flex align-items-center justify-content-center mb-3">
                            <SearchBar value={searchTerm} onChange={handleSearchChange} placeholder="Rechercher un fichier..." />
                        </div>
                        <FileTable files={filteredFiles} />
                    </div>
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default FileView;

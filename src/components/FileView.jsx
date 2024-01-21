import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileTable } from "./FileTable";
import { getFiles } from "../api/storage";
import { FileRow } from "./FileRow";
import UploadForm from "./UploadForm";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3MDgzODUyODZ9.t84-n2vUR87_KjQHBPSNHVsbR1P_mwQ8pUKHdJKNMpw"



const FileView = () => {

    const { dir_path } = useParams();
    const [files, setFiles] = useState([])



    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            fetchFiles();
            setIsLoaded(true);
        }
    }, [isLoaded]);



    const fetchFiles = async () => {
        try {
            const response = await getFiles(token, dir_path);
            const filesData = await response.json();
            setFiles(filesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des Fichiers', error);
        }
    };

    const foundedFiles = files
        // .filter(directory => directory.name.toLocaleLowerCase().includes(folderName.toLowerCase()))
        .map(file => <FileRow file={file} key={file.file_name} />)


    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-3">
                    <UploadForm />
                </div>
                <div className="col">
                    {/* <SearchBar placeholder="Rechercher ..." directoryName={folderName} onChange={setFolderName} /> */}
                    <FileTable files={foundedFiles} />

                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
};




export default FileView;

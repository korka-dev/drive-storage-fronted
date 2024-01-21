import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFiles } from "../api/storage";
import { FileTable } from "./FileTable";

export function Fichiers() {
    const { dirPath } = useParams();
    const [files, setFiles] = useState([])

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await getFiles(token, dirPath)
                const filesData = await response.json()
                setFiles(filesData)
            } catch (error) {
                console.error("Erreur lors de la récupération des fichiers", error)
            }
        };
        fetchFiles();
    }, [dirPath])

    return (
        <div>
            <h2>Fichiers dans {dirPath}</h2>
            <FileTable files={files} />
        </div>
    )
}
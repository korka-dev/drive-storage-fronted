import React, { useState, useEffect } from "react";
import { getDires } from "../api/storage";
import { SearchBar } from "./SearchBar";
import { CreateFolderForm } from "./CreateFolderForm";
import { DirectoryRow } from "./DirectoryRow";
import { DirectoryTable } from "./DitrectoryTable";




const token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3MDgzODUyODZ9.t84-n2vUR87_KjQHBPSNHVsbR1P_mwQ8pUKHdJKNMpw"


const Home = () => {
    const [folderName, setFolderName] = useState("");
    const [directories, setDirectories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
   

    useEffect(() => {
        if (!isLoaded) {
            fetchDirectories();
            setIsLoaded(true);
        }
    }, [isLoaded]);

    const fetchDirectories = async () => {
        try {
            const response = await getDires(token);
            const directoriesData = await response.json();
            setDirectories(directoriesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des dossiers', error);
        }
    };

    

    const foundedDirectories = directories
        .filter(directory => directory.dir_name.toLocaleLowerCase().includes(folderName.toLowerCase()))
        .map(directory => <DirectoryRow directory={directory} key={directory.dir_name}/>)

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-3">
                    <CreateFolderForm />
                </div>
                <div className="col">
                    <SearchBar placeholder="Rechercher ..." directoryName={folderName} onChange={setFolderName} />
                    <DirectoryTable directories={foundedDirectories}>
                        <DirectoryRow />
                    </DirectoryTable>
                    
                </div>
                <div className="col-1"></div>
            </div>
        </div>
    );
};

export default Home;

import React, { useState, useEffect } from "react";
import { getDires, getToken } from "../api/storage";
import { DirectoryRow } from "./DirectoryRow";
import { DirectoryTable } from "./DitrectoryTable";
import { CreateFolderForm } from "./CreateFolderForm";

import { NavBar } from "./Navbar";


const Home = () => {
    const [folderName, setFolderName] = useState("");
    const [directories, setDirectories] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showSearchResults, setShowSearchResults] = useState(false);

    useEffect(() => {
        if (!isLoaded) {
            fetchDirectories();
            setIsLoaded(true);
        }
    }, [isLoaded]);

    const fetchDirectories = async () => {
        try {
            const response = await getDires();
            const directoriesData = await response.json();
            setDirectories(directoriesData);
        } catch (error) {
            console.error('Erreur lors de la récupération des dossiers', error);
        }
    };

    const handleSearchChange = (value) => {
        setFolderName(value);

        setShowSearchResults(true);
    };

    const foundedDirectories = directories
        .filter(directory => directory.dir_name.toLocaleLowerCase().includes(folderName.toLowerCase()))
        .map(directory => <DirectoryRow directory={directory} key={directory.dir_name} />);

    return (
        <div className="container-fluid">
            <NavBar
                onSearchChange={handleSearchChange}
                showSearchResults={showSearchResults}
                setShowSearchResults={setShowSearchResults}
                userName={window.localStorage.getItem('currentUser')}
            />
            <div className="row">
                <div className="col-md-3">
                    <CreateFolderForm />
                </div>
                <div className="col-md-9">
                    <DirectoryTable directories={foundedDirectories}>
                        {foundedDirectories}
                    </DirectoryTable>
                </div>
            </div>
        </div>
    );
};

export default Home;

import React, { useState } from "react";
import { getDires } from "./api/storage";
import { SearchBar } from "./components/SearchBar";
import { DirectoryTable } from "./components/DitrectoryTable";
import { DirectoryRow } from "./components/DirectoryRow";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { CreateFolderForm } from "./components/CreateFolderForm";

const token = {
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0LCJleHAiOjE3MDI1MDQzMzd9.yaLsvUV3oPi9W3N1DOoOrEPWOVWQMq54PBM0UaK6LrY",
  "token_type": "bearer"
};

const App = () => {
  const [folderName, setFolderName] = useState("");
  const [directories, setDirectories] = useState([]);

  const fetchDirectories = async () => {
    try {
      const response = await getDires(token);
      const directoriesData = await response.json();
      setDirectories(directoriesData);
    } catch (error) {
      console.error('Erreur lors de la récupération des dossiers', error);
    }
  };

  fetchDirectories();

  const foundedDirectories = directories
    .filter(directory => directory.dir_name.toLocaleLowerCase().includes(folderName.toLowerCase()))
    .map(directory => (
      <DirectoryRow
        key={directory.dir_name}
        directory={directory}
      />
    ));
  return (
    <div className="container my-3">
      <div className="row">
        <div className="col-3">
          <CreateFolderForm />
        </div>
        <div className="col">
          <SearchBar placeholder="Folder..." directoryName={folderName} onChange={setFolderName} />
          <DirectoryTable directories={foundedDirectories} />
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

export default App;

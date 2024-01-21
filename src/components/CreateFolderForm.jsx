import { useState } from "react";
import { createFolder } from "../api/storage.js";
import { useNavigate } from "react-router-dom";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJleHAiOjE3MDgzODUyODZ9.t84-n2vUR87_KjQHBPSNHVsbR1P_mwQ8pUKHdJKNMpw";


export function CreateFolderForm({ onFolderCreated }) {
    const [folderName, setFolderName] = useState("");
    const navigate = useNavigate()

  const handleCreateFolder = async () => {
    try {
      const response = await createFolder(folderName, token);
      const status = response.status;

      if (status === 201) {
        console.log("success");

        
        window.location.reload()
  
      } else if (status === 409) {
        console.log("already exists");
      } else {
        console.log("error creating folder");
      }
    } catch (error) {
      console.log("error connecting to api server");
    }
  };

  return (
    <div>
      <div className="form-group">
        <label htmlFor="folderName" className="form-label">Folder Name</label>
        <input
          type="text"
          className="form-control"
          id="folderName"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleCreateFolder}>
        Create Folder
      </button>
    </div>
  );
}

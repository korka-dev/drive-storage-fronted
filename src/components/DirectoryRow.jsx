import React from "react";
import { useNavigate } from "react-router-dom";

export function DirectoryRow({ directory }) {

  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate(`/files/${directory.dir_name}`);
  }
  return (
    <tr onClick={handleOnClick} >
      <td>{directory.dir_name}</td>
      <td>{directory.owner}</td>
      <td>{directory.created_at}</td>
    </tr>
  );
}


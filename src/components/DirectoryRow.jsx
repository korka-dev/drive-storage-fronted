import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFolder } from 'react-icons/fa';

export function DirectoryRow({ directory }) {

  const navigate = useNavigate()
  const handleOnClick = () => {
    navigate(`/files/${directory.dir_name}`);
  }
  return (
    <tr onClick={handleOnClick} >
      <td>
        <FaFolder style={{ marginRight: '5px' }} />
        {directory.dir_name}
      </td>
      <td>{directory.owner}</td>
      <td>{directory.created_at}</td>
    </tr>
  );
}

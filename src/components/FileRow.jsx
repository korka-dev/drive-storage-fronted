import React from "react";

export function FileRow({ file }) {
  return (
    <tr>
      <td>{file.file_name}</td>
      <td>{file.owner}</td>
      <td>{file.created_at}</td>
    </tr>
  );
}


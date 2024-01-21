import React from "react";
import { FileRow } from "./FileRow";

export function FileTable({ files }) {
    return (
        <table className="table table-hover ">
            <thead>
                <tr>
                    <th>Nom du fichier</th>
                    <th>Proprietaire</th>
                    <th>Date de creation</th>
                </tr>
            </thead>
            <tbody>
                {files}
            </tbody>
        </table>
    );
}

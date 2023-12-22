export function DirectoryTable({ directories }) {
    return <table className="table table-hover ">
        <thead>
            <tr>
                <th>Repertoire</th>
                <th>Auteur</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            {directories}
        </tbody>

    </table>
}

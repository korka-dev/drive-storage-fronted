export function DirectoryRow({ directory }) {
    return <tr>
        <td>{directory.dir_name}</td>
        <td>{directory.owner}</td>
        <td>{directory.created_at}</td>
    </tr>

}


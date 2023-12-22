export function SearchBar({directoryName, placeholder, onChange}) {

    return <input
        type="text"
        className="form-control mt-2 mb-3 "
        placeholder={placeholder}
        value={directoryName}
        onChange={(e) => onChange(e.target.value)}
    />

}


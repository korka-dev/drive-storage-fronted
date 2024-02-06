import React, { useState } from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { SearchBar } from "./SearchBar";
import { useNavigate } from "react-router-dom";

export function NavBar({ directoryName, onSearchChange, showSearchResults, setShowSearchResults, userName }) {
    const [showWorkspaceMenu, setShowWorkspaceMenu] = useState(false);
    const navigate = useNavigate()

    const handleSearchBarClick = () => {
        setShowSearchResults(true);
    };

    const handleWorkspaceIconClick = () => {
        setShowWorkspaceMenu(!showWorkspaceMenu);
    };

    const handleLogout = () => {
        console.log("User logged out");
        setShowWorkspaceMenu(false);
        window.localStorage.removeItem("access_token")
        window.localStorage.removeItem("currentUser")
        navigate("/")
    };



    return (
        <nav className="navbar  navbar-expand bg-primary ">
            <div className="container-fluid">
                <a className="navbar-brand">Drive Storage</a>
                <div className="mx-auto">
                    <form className="d-flex" onClick={handleSearchBarClick}>
                        <SearchBar
                            directoryName={directoryName}
                            placeholder="Rechercher..."
                            onChange={onSearchChange}
                            className="form-control"
                        />
                    </form>
                </div>
                <div className="ml-auto d-flex align-items-center">
                    <div className="workspace-icon-container">
                        <FaUser size="2em" onClick={handleWorkspaceIconClick} />
                    </div>
                    <span className="mr-2">{userName}</span>
                </div>
                {showSearchResults && (
                    <div className="search-results">
                        <p>{directoryName}</p>
                    </div>
                )}
            </div>

            {showWorkspaceMenu && (
                <div className="workspace-menu">
                    <button className="btn" onClick={handleLogout}>
                        <FaSignOutAlt /> Logout
                    </button>

                </div>
            )}
        </nav>
    );
}

import { useState } from "react"
import { Link } from "react-router-dom"
import { createUser } from "../api/users"
import { ErrorMessage } from "./Message/ErrorMessage"
import { SuccessMessage } from "./Message/SuccessMessage"
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from 'react-icons/fa';


export const RegisterForm = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (!email.match(emailPattern)) {
            setErrorMessage("L'adresse e-mail n'est pas valide.");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
            return;
        }

        try {

            const response = await createUser(name, email, password)

            if (response.status == 201) {

                setSuccessMessage("Utilisateur créé(e) avec succès")
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                
            } else if (response.status == 409) {

                setErrorMessage("L'utilisateur existe déjà");
                setTimeout(() => {
                    window.location.reload(); x
                }, 2000);

            } else {
                setErrorMessage("Vérifier les données saisies")
            }

        } catch (error) {
            console.error("Erreur lors de la création d'utilisateur")
        }
    }

    return (
        <div className="container mt-5">
            {successMessage && <SuccessMessage message={successMessage} />}
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <h2 className="text-center">Création de compte</h2>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} id="create-user-form">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><FaUser /></span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="create-name"
                                    name="create-name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nom"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><FaEnvelope /></span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="create-username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="utilisateur@example.com"
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><FaLock /></span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="create-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Mot de passe"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" id="create-user-submit">
                            <FaUserPlus /> Créer compte
                        </button>
                    </form>
                    <p className="text-center">
                        Déjà un compte ?{' '}
                        <Link to="/" id="show-login">
                            Se connecter
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

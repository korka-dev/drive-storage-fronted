import { useState } from "react"
import { loginUser } from "../api/auth"
import { useNavigate, Link } from "react-router-dom"
import { ErrorMessage } from "./Message/ErrorMessage"
import { AiOutlineUser, AiOutlineLock, AiOutlineLogin } from 'react-icons/ai';
import { getUserInfo } from "../api/users";


export const LoginForm = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            const response = await loginUser(username, password)

            if (response.status == 200) {

                const data = await response.json();
                window.localStorage.setItem('access_token', data.access_token)

                const currentUser =await (await getUserInfo(window.localStorage.getItem("access_token"))).json()

                window.localStorage.setItem('currentUser',currentUser.name)
                navigate("/files")

            } else {
                setErrorMessage("Email ou mot de passe incorrect")
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }

        } catch (error) {
            console.error("Une erreur s'est produit lors de la connexion")
        }
    }

    return (
        <div className="container mt-5">
            {errorMessage && <ErrorMessage message={errorMessage} />}
            <div className="text-center mb-4">
                <h2>Bienvenue sur votre site Drive Storage !</h2>
                <p>Explorez nos fonctionnalités incroyables et rejoignez notre communauté dès maintenant.</p>
                <AiOutlineUser size="2em" style={{ marginBottom: '10px' }} />
                <h2 className="text-center mb-4">Connexion</h2>
            </div>

            <div className="row justify-content-center">
                <div className="col-md-6">
                    <form onSubmit={handleLogin} className="rounded p-4 border shadow-sm">
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white border-right-0">
                                        <AiOutlineUser size="1.2em" />
                                    </span>
                                </div>
                                <input
                                    type="text"
                                    className="form-control border-left-0 border"
                                    id="login-username"
                                    placeholder="Nom d'utilisateur"
                                    style={{ height: '35px', padding: '6px' }}
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text bg-white border-right-0">
                                        <AiOutlineLock size="1.2em" />
                                    </span>
                                </div>
                                <input
                                    type="password"
                                    className="form-control border-left-0 border"
                                    id="login-password"
                                    placeholder="Mot de passe"
                                    style={{ height: '35px', padding: '6px' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block" id="login-submit">
                            <AiOutlineLogin size="1.5em" style={{ marginRight: '5px' }} />
                            Se connecter
                        </button>
                        <p className="mt-3">
                            Vous n'avez pas de compte ?{' '}
                            <Link to="/register" id="show-register">
                                Créer un compte
                            </Link>
                        </p>
                    </form>

                </div>
            </div>
        </div>
    );
};


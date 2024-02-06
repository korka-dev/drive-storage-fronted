export const loginUser = async (username, password) => {
    try {

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        return await fetch(`http://localhost:8000/auth/login`, {
            method: 'POST',
            body: formData,
        });

    } catch (error) {
        console.error("Erreur lors de la connexion", error);
        throw error;
    }
}



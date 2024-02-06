export const createUser = async (name, email, password) => {

    try {
        return await fetch('http://localhost:8000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
    } catch (error) {
        console.error("Erreur lors de creation de compte")
    }

}

export const getUserInfo = async (access_token) => {

    try {
        return await fetch('http://localhost:8000/users/infos', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },

        });
    } catch (error) {
        console.error("Erreur lors de la recuperation des données")
    }

}


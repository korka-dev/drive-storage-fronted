export const getDires = async ({ access_token, token_type }) => {

    const limit = 10
    const skip = 0

    return await fetch(`http://localhost:8000/files/directories?limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: {
            Authorization: `${token_type} ${access_token}`,
            'Content-Type': 'application/json',
        },
    });
}

export const createFolder = async ({ directory, access_token, token_type }) => {
    try {
        return await fetch(`http://localhost:8000/files/${directory}`, {
            method: 'POST',
            headers: {
                Authorization: `${token_type} ${access_token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ directory }),
        });
    } catch (error) {
        console.error('Erreur lors de la création du dossier:', error);
        throw error;
    }
};


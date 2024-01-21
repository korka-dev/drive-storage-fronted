export const getDires = async (access_token) => {

    const limit = 10
    const skip = 0

    return await fetch(`http://localhost:8000/files/directories?limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Accept': 'application/json',
        },
    });
}

export const createFolder = async (directory, access_token) => {
    try {
        return await fetch(`http://localhost:8000/files/${directory}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Accept': 'application/json',
            },

        });
    } catch (error) {
        console.error('Erreur lors de la création du dossier:', error);
        throw error;
    }
};

export const getFiles = async (access_token, dirPath) => {

    const limit = 10
    const skip = 0

    return await fetch(`http://localhost:8000/files?directory=${dirPath}&limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`,
            'Accept': 'application/json',
        },
    });
}

export const UploadFile = async (directory, filename, file, keep, access_token) => {
    try {
        const formData = new FormData();

        formData.append('file', file);



        return await fetch(`http://localhost:8000/files/upload/${directory}?filename=${filename}&keep=${keep}`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

    } catch (error) {
        console.error("Erreur lors de l'upload du fichier :", error);
        throw error;
    }

}


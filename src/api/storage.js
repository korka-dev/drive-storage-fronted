export const getDires = async () => {

    const limit = 10
    const skip = 0

    return await fetch(`http://localhost:8000/files/directories?limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Accept': 'application/json',
        },
    });
}

export const createFolder = async (directory) => {
    try {
        return await fetch(`http://localhost:8000/files/${directory}`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${getToken()}`,
                'Accept': 'application/json',
            },

        });
    } catch (error) {
        console.error('Erreur lors de la création du dossier:', error);
        throw error;
    }
};

export const getFiles = async ( dirPath) => {

    const limit = 10
    const skip = 0

    return await fetch(`http://localhost:8000/files?directory=${dirPath}&limit=${limit}&skip=${skip}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`,
            'Accept': 'application/json',
        },
    });
}

export const UploadFile = async (directory, filename, file, keep) => {
    try {
        const formData = new FormData();

        formData.append('file', file);



        return await fetch(`http://localhost:8000/files/upload/${directory}?filename=${filename}&keep=${keep}`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });

    } catch (error) {
        console.error("Erreur lors de l'upload du fichier :", error);
        throw error;
    }

}

export const downloadFile = async (dirPath, filename) => {



    return await fetch(`http://localhost:8000/files/download/${dirPath}/${filename}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${getToken()}`,

        },
    });
}

export const deleteFile = async ( dirPath, filename) => {



    return await fetch(`http://localhost:8000/files/${dirPath}/${filename}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`,

        },
    });
}



export function getToken() {

    return window.localStorage.getItem('access_token')
}




const API_URL = "http://localhost:8000";

export const getAllCategories = async () => {
    return await fetch(`${API_URL}/categories`,{
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' }
                    })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.log(error));
}

export const createCategory = async (data) => {
    return await fetch(`${API_URL}/category`,{
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.log(error));
}

export const updateCategory = async (id, data) => {
    return await fetch(`${API_URL}/category/${id}`,{
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data)
                    })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.log(error));
}

export const deleteCategory = async (category) => {
    return await fetch(`${API_URL}/category/${category}`,
                    {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' }
                    })
                    .then(response => response.json())
                    .then(data => data)
                    .catch(error => console.log(error));
}
const BASE_URL = 'http://localhost:5000/api/ducks';

const getDucks = async () => {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

    const data = await res.json();
    // console.log(data);

    return data;
};
const createDuck = async (formData) => {
    const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

    const data = await res.json();

    return data;
};

const deleteDuck = async (id) => {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

    const data = await res.json();

    return data;
};
const updateDuck = async (formData, id) => {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(formData),
    });
    if (!res.ok) throw new Error(`${res.status}. Something went wrong!`);

    const data = await res.json();

    return data;
};

export { getDucks, deleteDuck, updateDuck, createDuck };

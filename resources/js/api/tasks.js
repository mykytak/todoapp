// let baseURL = "http://todoapp.local:8000";

let baseURL = "";

const headers = {
  "Accept": "application/json",
  "Content-Type": "application/json; charset-UTF-8"
};

let csrf = "";

const setCsrf = (newCsrf) => csrf = newCsrf;
const getCsrf = () => csrf;


const getBaseURL = () => baseURL;
const getHeaders = () => headers;

const taskAPI = {
    all: async () => {
        const response = await fetch(`${getBaseURL()}/tasks`, { headers });
        return response.json();
    },
    get: async (id) => {
        const response = await fetch(`${getBaseURL()}/tasks/${id}`, { headers });
        return response.json();
    },
    post: async (data) => {
        const response = await fetch(`${getBaseURL()}/tasks`, {
            method: "POST",
            body: JSON.stringify({
                _token: getCsrf(),
                ...data
            }),
            headers
        });

        const res = await response.json();
        if (res.errors) {
            throw res.errors;
        }

        return res;
    },
    put: async (id, data) => {
        const response = await fetch(`${getBaseURL()}/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                _token: getCsrf(),
                ...data
            }),
            headers
        });

        const res = await response.json();
        if (res.errors) {
            throw res.errors;
        }

        return res;
    },
    delete: async (id) => {
        const response = await fetch(`${getBaseURL()}/tasks/${id}`, {
            method: "DELETE",
            body: JSON.stringify({
                _token: getCsrf(),
            }),
            headers
        });
        return response.ok;
    }
};

const setBaseURL = (newBase) => baseURL = newBase;

const useTaskAPI = () => taskAPI;
export { useTaskAPI, setBaseURL, getBaseURL, getHeaders, setCsrf };



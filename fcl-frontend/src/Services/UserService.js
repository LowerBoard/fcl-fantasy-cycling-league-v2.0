import api from "../api";

const UserService = {
    register(userData) {
        return api.post('/users/register', userData);
    },
    login(credentials) {
        return api.post('/users/login', credentials);
    }
};

export default UserService;

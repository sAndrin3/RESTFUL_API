import { getUsers, getUser, createUser, updateUser, deleteUser } from "../controllers/userController.js";
import { login, register, loginRequired} from '../controllers/userController.js';


export const userRoutes = (app) => {
    app.route('/users')
        .get(loginRequired, getUsers)
        .post(loginRequired, createUser);

    app.route('/user/:id')
        .put(loginRequired, updateUser)
        .get(loginRequired, getUser)
        .delete(loginRequired, deleteUser);

    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);
};


import { getComments, getComment, createComment, updateComment, deleteComment } from "../controllers/commentControllers.js";
import { login, register, loginRequired} from '../controllers/commentControllers.js';


export const commentRoutes = (app) => {
    app.route('/comments')
        .get(loginRequired, getComments)
        .post(loginRequired, createComment);

    app.route('/comment/:id')
        .put(loginRequired, updateComment)
        .get(loginRequired, getComment)
        .delete(loginRequired, deleteComment);

    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);
};


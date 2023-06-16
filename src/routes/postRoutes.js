import { getPosts, getPost, createPost, updatePost, deletePost } from "../controllers/postControllers.js";
import { login, register, loginRequired} from '../controllers/postController.js';


export const postRoutes = (app) => {
    app.route('/posts')
        .get(loginRequired, getPosts)
        .post(loginRequired, createPost);

    app.route('/post/:id')
        .put(loginRequired, updatePost)
        .get(loginRequired, getPost)
        .delete(loginRequired, deletePost);

    app.route('/auth/register')
        .post(register);

    app.route('/auth/login')
        .post(login);
};


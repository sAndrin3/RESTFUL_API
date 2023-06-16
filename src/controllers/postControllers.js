import sql from 'mssql';
import config from '../db/config.js';

// Get all Posts

export async function getPosts(req, res) {

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("select * from posts");
        !result.recordset[0] ? res.status(404).json({ message: 'Posts not found' }) : 
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close(); // close the SQL connection
    }
}

// get a single Post
export const getPost = async (req, res) => {
    try {
        const {id} = req.params;
        let pool = await sql.connect(config.sql);
        const result  = await pool.request()
            .input("post_id", sql.Int, id)
            .query("select * from postData where id = @post_id");
        !result.recordset[0] ? res.status(404).json({message: 'Post not found'}):
            res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({error: 'An error occured while retrieving user'});
    } finally {
        sql.close();
    }
};

    // create a new Post
    export const createUser = async (req, res) => {
        try {
            const { id, title } = req.body;
            let pool = await sql.connect(config.sql);
            let insertUser = await pool.request()
                .input("post_id", sql.Int, id)
                .input("title", sql.VarChar, title)
                .query("insert into posts (post_id, title) values (@post_id, @title)");
            res.status(201).json({message: 'post created successfully'})
        } catch (error) {
            res.status(500).json(error.message);
        } finally {
            sql.close();
        } 
 };

 // update a post
 export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {title} = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("post_id", sql.Int, id)
            .input("title", sql.VarChar, title)
            .query("UPDATE postData SET title = @title WHERE id = @post_id");
        res.status(200).json({message: 'post updated successfully'});
    } catch (error) {
        res.status(500).json({error: 'An error occured while updating the post'});
    }finally {
        sql.close();
    }
 };
 //Delete a post
 export const deletePost = async (req, res) => {
    try {
        const {id} = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM postData WHERE id = ${id}`;
        res.status(200).json({message: 'post deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'An error occurred while deleting the post'});  
    } finally {
        sql.close();
    }
 };

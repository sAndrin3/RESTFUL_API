import sql from 'mssql';
import config from '../db/config.js';

// Get all Comments

export async function getUsers(req, res) {

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("select * from comments");
        !result.recordset[0] ? res.status(404).json({ message: 'Comments not found' }) : 
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close(); // close the SQL connection
    }
}

// get a single Comment
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        let pool = await sql.connect(config.sql);
        const result  = await pool.request()
            .input("commentId", sql.Int, id)
            .query("select * from commentData where id = @commentId");
        !result.recordset[0] ? res.status(404).json({message: 'Comment not found'}):
            res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({error: 'An error occured while retrieving comment'});
    } finally {
        sql.close();
    }
};

    // create a new Comment
    export const createComment = async (req, res) => {
        try {
            const { id, content } = req.body;
            let pool = await sql.connect(config.sql);
            let insertComment = await pool.request()
                .input("CommentId", sql.Int, id)
                .input("content", sql.VarChar, content)
                .query("insert into Comment (comment_id, content) values (@comment_id, @content)");
            res.status(201).json({message: 'comment created successfully'})
        } catch (error) {
            res.status(500).json(error.message);
        } finally {
            sql.close();
        } 
 };

 // update a Comment
 export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const {content} = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("comment_id", sql.Int, id)
            .input("content", sql.VarChar, content)
            .query("UPDATE commentData SET content = @content WHERE id = @comment_id");
        res.status(200).json({message: 'comment updated successfully'});
    } catch (error) {
        res.status(500).json({error: 'An error occured while updating the comment'});
    }finally {
        sql.close();
    }
 };
 //Delete a Comment
 export const deleteComment = async (req, res) => {
    try {
        const {id} = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM commentData WHERE id = ${id}`;
        res.status(200).json({message: 'comment deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'An error occurred while deleting the comment'});  
    } finally {
        sql.close();
    }
 };

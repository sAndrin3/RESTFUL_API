import sql from 'mssql';
import config from '../db/config.js';

// Get all Users

export async function getUsers(req, res) {

    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("select * from users");
        !result.recordset[0] ? res.status(404).json({ message: 'Users not found' }) : 
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(201).json(error.message);
    } finally {
        sql.close(); // close the SQL connection
    }
}

// get a single user
export const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        let pool = await sql.connect(config.sql);
        const result  = await pool.request()
            .input("userId", sql.Int, id)
            .query("select * from userData where id = @userId");
        !result.recordset[0] ? res.status(404).json({message: 'User not found'}):
            res.status(200).json(result.recordset);
    } catch (error) {
        res.status(500).json({error: 'An error occured while retrieving user'});
    } finally {
        sql.close();
    }
};

    // create a new user
    export const createUser = async (req, res) => {
        try {
            const { id, username } = req.body;
            let pool = await sql.connect(config.sql);
            let insertUser = await pool.request()
                .input("UserId", sql.Int, id)
                .input("username", sql.VarChar, username)
                .query("insert into users (user_id, username) values (@user_id, @username)");
            res.status(201).json({message: 'user created successfully'})
        } catch (error) {
            res.status(500).json(error.message);
        } finally {
            sql.close();
        } 
 };

 // update a user
 export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const {username} = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("user_id", sql.Int, id)
            .input("username", sql.VarChar, username)
            .query("UPDATE userData SET username = @username WHERE id = @user_id");
        res.status(200).json({message: 'user updated successfully'});
    } catch (error) {
        res.status(500).json({error: 'An error occured while updating the user'});
    }finally {
        sql.close();
    }
 };
 //Delete a user
 export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM userData WHERE id = ${id}`;
        res.status(200).json({message: 'user deleted successfully'});
    } catch (error) {
        res.status(500).json({error: 'An error occurred while deleting the user'});  
    } finally {
        sql.close();
    }
 };

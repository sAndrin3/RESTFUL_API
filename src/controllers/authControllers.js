import sql from 'mssql';
import config from '../db/config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const loginRequired  = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({message: 'Unauthorized user!'});
    }
};

export const register = async (req, res) => {
    const {user_id, username, email, password} = req.body;
    console.log(password,email, username,)
    const hashedPassword = bcrypt.hashSync(password, 10);
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .input('email', sql.VarChar, email)
            .query('SELECT * FROM users WHERE username = @username OR email = @email');
        const user = result.recordset[0];
        if (user) {
            res.status(409).json({error: 'User already exists'});
        } else {
            await pool.request()
                .input('user_id', sql.VarChar, user_id)
                .input('username', sql.VarChar, username)
                .input('hashedpassword', sql.VarChar, hashedPassword)
                .input('email', sql.VarChar, email)
                .query('INSERT INTO users (user_id, username, password, email) VALUES (@user_id, @username, @hashedpassword, @email)');
            res.status(200).send({message: 'User created successfully'});
        }
        } catch (error) {
            res.status(500).json(error.message)
    } finally {
        sql.close();
    }
};

export const login = async(req, res) => {
    const { username , password} = req.body;
    let pool = await sql.connect(config.sql);
    const result = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT * FROM Users WHERE username = @username');
    const user = result.recordset[0];
    if (!user) {
        res.status(401).json({ error: 'Invalid Name or Password' });
    } else {
        if (!bcrypt.compareSync(password, user.hashedPassword)) {
            res.status(401).json(error.message);
        } else {
            const token = `JWT ${jwt.sign({ username: user.username, email: user.email}, config.jwt_secret)}`;
            res.status(200).json({email: user.email, username: user.username, id: user.id, token: token});
        }
    }
};
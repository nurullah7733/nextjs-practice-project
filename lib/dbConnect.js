import mongoose from 'mongoose';
import UserModel from '../models/userModel';

const DATABASE_URL = process.env.DATABASE_URL;
const option = { user: '', pass: '' };

/* ---------1st Method */
export default async function () {
    try {
        await mongoose.connect(DATABASE_URL, option);
        console.log('database connected');
    } catch (error) {
        console.log('Database connect fail');
    }
}

/* 2nd Method (Recommented) */

// const ConnectDB = (handler) => async (req, res) => {
//     if (mongoose.connections[0].readyState) {
//         // Use current db connection
//         return handler(req, res);
//     }
//     // Use new db connection
//     await mongoose.connect(DATABASE_URL, option);
//     return handler(req, res);
// };

// export default ConnectDB;

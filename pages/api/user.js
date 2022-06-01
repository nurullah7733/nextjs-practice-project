import ConnectDB from '../../lib/dbConnect';
import UserModel from '../../models/userModel';

export default async function UserApi(req, res) {
    const { method } = req;

    await ConnectDB();

    // if (method === 'GET') {
    //     try {
    //         const users = await UserModel.find({});
    //         res.status(200).json({ status: true, data: users });
    //     } catch (error) {
    //         res.status(400).json({ status: false });
    //     }
    // } else {
    //     try {
    //         const user = await UserModel.create(req.body);
    //         res.status(201).json({ status: true, data: user });
    //     } catch (error) {
    //         res.status(400).json({ status: false, error });
    //     }
    // }

    switch (method) {
        case 'GET':
            try {
                const users = await UserModel.find({});
                res.status(200).json({ status: true, data: users });
            } catch (error) {
                res.status(400).json({ status: false });
            }
            break;
        case 'POST':
            try {
                const user = await UserModel.create(req.body);
                res.status(201).json({ status: true, data: user });
            } catch (error) {
                res.status(400).json({ status: false, error: error });
            }

            break;
        default:
            res.status(400).json({ status: false });
            break;
    }
}

// errors": {
//             "name": {
//                 "name": "ValidatorError",
//                 "message

import mongoose from 'mongoose';

var UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: 'Name is Required',
        },
        email: {
            type: String,
            trim: true,
            required: 'Email is Required',
        },
        password: {
            type: String,
            required: 'Please Provide a Strong Password',
        },
        since: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

const UserModel = mongoose.models.users || mongoose.model('users', UserSchema);
export default UserModel;

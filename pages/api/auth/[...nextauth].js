import CredentialsProvider from 'next-auth/providers/credentials';
import UserModel from '../../../models/userModel';
import NextAuth from 'next-auth';
import ConnectDB from '../../../lib/dbConnect';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',

            async authorize(credentials, req) {
                try {
                    const { email, password } = credentials;
                    await ConnectDB();
                    const user = await UserModel.findOne({
                        email,
                        password,
                    }).exec();
                    delete user.password;

                    if (user) {
                        return user;
                    } else {
                        throw new Error('Invalid Email or Password');
                    }
                } catch (error) {
                    throw new Error('Something went Wrong');
                }
            },
        }),
    ],
    callbacks: {
        async session(session, user, token) {
            if (user && user._id) {
                session.user.id = user._id;
            }
            console.log('session', { token, user });
            return session;
        },
        async jwt(token, user, profile) {
            if (user && user._id) {
                token.id = user._id;
            }
            console.log('jwt', { token, user });
            return token;
        },
    },
});

import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment');
}

const config = {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 3000,
};

export default config;

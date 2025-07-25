import mongoose from 'mongoose';
import colors from 'colors';
import { exit } from 'node:process';

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.DATABASE_URL as string);
        const url = `${connection.host}:${connection.port}`
        console.log( colors.magenta.bold(`MongoDB conectado en: ${url}`) )
    } catch (error) {
        if (error instanceof Error) {
            console.log(colors.red.bold(`Error al conectar a MongoDB, error - ${error.message}`));
        } else {
            console.log(colors.red.bold('Error al conectar a MongoDB, error desconocido'));
        }
        exit(1);
    }
}
import * as dotenv from "dotenv";
dotenv.config();

export const connection = {
    connection: {
        host: process.env.HOST || '172.17.0.1',
        port: parseInt(<string>process.env.PORT ) || 6379
    }
};

import logger from "../logs/logger.js"
import bcrypt, { hash } from "bcrypt"
import 'dotenv/config';

export const encriptar=async(text)=>{
    try {
        const saltRound=+process.env.BCRIPT_SALT_ROUND;
        return await bcrypt.hash(text,saltRound);
    } catch (error) {
        logger.error(error.message)
        throw new Error('Error al encriptar');      
    }
};

export const comparar =async(text,hash)=>{
    try {
        return await bcrypt.compare(text,hash);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al ecriptar');
        
    }
}
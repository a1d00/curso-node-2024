
import {sequelize } from "../database/database.js";
import {Status} from '../constants/index.js'
import { DataTypes } from "sequelize";
import logger from "../logs/logger.js";
import { encriptar } from "../common/byscript.js";
import { Task } from "./task.js";

export const User= sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            notNull:{
                msg:'ingrese nombre de usuario',
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull:{
                msg:'ingrese password',
            },
        },
    },
    status: {
        type: DataTypes.STRING,
        defaultValue:Status.ACTIVE,
        validate: {
            isIn:{
                args:[[Status.ACTIVE,Status.INACTIVE]],
                msg:`debe ser ${Status.Active} o ${Status.INACTIVE}`,
            },
        },
    },
});

User.hasMany(Task)
Task.belongsTo(User)

User.beforeCreate(async (user)=>{
    try {
        user.password=await encriptar(user.password);
    } catch (error) {
        logger.error(error.message);
        throw new Error('Error al ecriptar')
    }
}) 
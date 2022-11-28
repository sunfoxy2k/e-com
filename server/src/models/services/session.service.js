import {db} from "../core/modelDB.js";
import mongooseModule from "mongoose";

export async function createNewSession(param_userID){
    const newSession = new db.sessions({
        userID: param_userID,
    })
    await newSession.save(newSession);
    return newSession;
}

export function deleteSession(sessionID){
    if (!mongooseModule.isValidObjectId(sessionID)) return;
    try{
        db.sessions.findByIdAndRemove(sessionID);
    }
    catch(e){
        console.log(e);
    }
}

export async function getUserBySessionID(sessionID){
    if (!mongooseModule.isValidObjectId(sessionID)) return null;
    const session = await db.sessions.findById(sessionID);
    if(session){
        const user = await db.users.findById(session.userID);
        if(user){
            return user;
        }
    }
    return null;
}

export async function isAdminSession(sessionID){
    if (!mongooseModule.isValidObjectId(sessionID)) return false;
    const user = await getUserBySessionID(sessionID);
    if(!user) return false;
    return user.Role === "Admin" ? true : false;
}
export async function isUserSession(sessionID){
    if (!mongooseModule.isValidObjectId(sessionID)) return false;
    const user = await getUserBySessionID(sessionID);
    if(!user) return false;
    return user.Role ? true : false;
}

import {axiosWithCookies} from './axiosInstances';

export default class AuthenticateService{
    /**
    * This api return an object {sessionId, Name, Role} 
    * and set the cookie 'sessionId' to a value equal to id of the session created in the database with epiration time 300s
    */
    static async login(username, password){
        const res = await axiosWithCookies.post('/auth/login', { username, password })
        return res.data;
    }

    /**
     * @returns "LOG OUT OK, sid:" <sessionId>
     * <sessionId> is the session of the client asked to be logout
     */
    static async logout(){
        return (await axiosWithCookies.get('/auth/logout')).data;
    }

    /**
     * @returns an object {Name, Role, CartContent} of the user with sessionId in cookie
     */
    static async getNameAndRoleFromSession(){
        return (await axiosWithCookies.get('/auth')).data;
    }
}
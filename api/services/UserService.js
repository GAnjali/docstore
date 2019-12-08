import database from "../../db/models/index"

class UserService {

    static async add(newUser) {
        try {
            return await database.user.create(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async getAUser(email) {
        try {
            const theUser = await database.user.findOne({
                where: { email: email }
            });
            return theUser.dataValues;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
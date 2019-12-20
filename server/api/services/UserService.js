import database from "../../db/models/index"

class UserService {

    static async add(user) {
        try {
            return await database.user.create(user);
        } catch (error) {
            throw error;
        }
    }

    static async getOneByEmail(email) {
        try {
            const user = await database.user.findOne({
                where: {email: email}
            });
            if (user)
                return user.dataValues;
            else return null;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
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

    static async update(updateUser) {
        try {
            const userToUpdate = await database.user.findOne({
                where: { email: updateUser.email }
            });
            if (userToUpdate) {
                await database.user.update(updateUser, { where: { email: updateUser.email } });
                return updateUser;
            }
            return null;
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
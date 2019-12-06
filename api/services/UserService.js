import database from "../../db/models/index"

class UserService {

    static async add(newUser) {
        try {
            return await database.user.create(newUser);
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;
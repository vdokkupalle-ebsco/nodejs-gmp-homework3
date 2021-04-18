import errors from '../../errors';
import User from '../../data-access/user';

export default class UserService {
    constructor() {}
    async createUser(userLogin, userPassword, userAge) {
        const user = await User.getUserByLogin(userLogin);
        if (!!user) {
            throw new Error(errors.loginAlreadyExisting(userLogin));
        }

        const createdUser = User.create(userLogin, userPassword, userAge);
        return createdUser.id;
    }

    async updateUser(userId, userLogin, userPassword, userAge) {
        const userObject = await User.getUserById(userId);
        if (!userObject || userObject.isDeleted) {
            throw new Error(errors.userCanNotBeFound(userId));
        }
        const updateObject = {};
        if (userLogin) {
            const userWithLogin = await User.getUserByLogin(userLogin);
            if (!!userWithLogin) {
                throw new Error(errors.loginAlreadyExisting(userLogin));
            }
            updateObject.login = userLogin;
        }
        if (userPassword) {
            updateObject.password = userPassword;
        }
        if (userAge) {
            updateObject.userAge = userAge;
        }
        await User.update(updateObject, userId);
    }

    async deleteUser(userId) {
        const userObject = await User.getUserById(userId);
        if (!userObject || userObject.isDeleted) {
            throw new Error(errors.userCanNotBeFound(userId));
        }
        await User.update({ isDeleted: true }, userId);
    }

    async getUsers(query, limit) {
        const users = User.getUsers(query, limit);
        return users;
    }
}

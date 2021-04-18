import { User } from '../../models';
import { Op } from 'sequelize';

export default class UserDataAccess {
    static async getUserByLogin(userLogin) {
        return await User.findOne({ where: { login: userLogin } });
    }

    static async getUserById(userId) {
        return await User.findOne({ where: { id: userId } });
    }

    static async update(updateObject, userId) {
        console.log(updateObject);
        return await User.update(updateObject, { where: { id: userId } });
    }

    static async create(login, password, age) {
        return await User.create({
            login,
            password,
            age
        });
    }

    static async getUsers(query, limit) {
        return await User.findAll({
            where: {
                [Op.and]: {
                    login: { [Op.iLike]: `%${query}%` },
                    isDeleted: { [Op.or]: [false, null] }
                }
            },
            limit
        });
    }
}

import { v4 as uuid } from 'uuid';

module.exports = {
    up: async (queryInterface) => {
        const usersJSON = require('../../data/users.json').users;
        const users = usersJSON.map((user) => ({
            id:uuid(),
            ...user,
            isDeleted:false,
            createdAt: new Date(),
            updatedAt: new Date()
        }));

        return await queryInterface.bulkInsert('Users', users);
    },

    down: async (queryInterface) => {
        return await queryInterface.bulkDelete('Users', null);
    }
};

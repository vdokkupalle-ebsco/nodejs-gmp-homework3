import UserService from '../../services/users';


export default class UserController {
    constructor() {
        this.service = new UserService();
    }
    async create(req, res) {
        const { login, password, age } = req.body;
        try {
            const userId = await this.service.createUser(login, password, age);
            res.json({
                id: userId,
                message: 'User successfully created'
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const { login, age, password } = req.body;
        try {
            const userId = await this.service.updateUser(id, login, age, password);
            res.json({
                id: userId,
                message: 'User is successfully updated'
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
    async delete(req, res) {
        const { id } = req.params;
        try {
            await this.service.deleteUser(id);
            res.json({
                message: 'User is successfully deleted'
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
    async get(req, res) {
        const { query = '', limit = 10 } = req.query;
        try {
            const users = await this.service.getUsers(query, limit);
            res.json({
                users
            });
        } catch (e) {
            res.status(400).send(e.message);
        }
    }
}

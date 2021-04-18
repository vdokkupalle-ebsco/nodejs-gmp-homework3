import express from 'express';
import UserController from '../../controllers/users';
import validator from '../../validator/joivalidator';
import {
    userGetQuerySchema,
    userCreateBodySchema,
    userUpdateBodySchema,
    userUpdateParamsSchema,
    userDeleteParamsSchema
} from '../../validator/schemas';

const router = express.Router();

const userController = new UserController();

router
    .get('/', validator.query(userGetQuerySchema), (req, res, next) =>
        userController.get(req, res, next)
    )
    .post('/', validator.body(userCreateBodySchema), (req, res, next) => userController.create(req, res, next))
    .put('/:id', validator.params(userUpdateParamsSchema),
        validator.body(userUpdateBodySchema), (req, res, next) => userController.update(req, res, next))
    .delete('/:id', validator.params(userDeleteParamsSchema), (req, res, next) => userController.delete(req, res, next));

export default router;

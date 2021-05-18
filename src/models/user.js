import { Model } from 'sequelize';
import { v4 as uuid4 } from 'uuid';

export default (sequelize, DataTypes) => {
    class User extends Model {
        toJSON() {
            // eslint-disable-next-line
      const { password, isDeleted, ...attributes } = this.get();
            return attributes;
        }

        /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
        static associate() {
            // define association here
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                allowNull: false,
                defaultValue: () => uuid4()
            },
            login: DataTypes.STRING,
            password: DataTypes.STRING,
            age: DataTypes.INTEGER,
            isDeleted: DataTypes.BOOLEAN
        },
        {
            sequelize,
            modelName: 'User'
        }
    );
    return User;
};

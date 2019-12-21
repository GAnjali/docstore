'use strict';
module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    });
    user.associate = function (models) {
        user.hasMany(models.folder, {
            foreignKey: 'userid'
        });
        user.hasMany(models.file, {
            foreignKey: 'userid'
        })
    };
    return user;
};
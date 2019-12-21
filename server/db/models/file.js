'use strict';
module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define('file', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'File name already in use!'
            }
        },
        userid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        parentfolderid: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    file.associate = function (models) {
        file.belongsTo(models.user, {
            foreignKey: 'id',
            as: 'author',
            onDelete: 'CASCADE'
        });
        file.belongsTo(models.folder, {
            foreignKey: 'id',
            as: 'parentfolder',
            onDelete: 'CASCADE'
        });
        file.hasMany(models.share, {
            foreignKey: 'fileid'
        })
    };
    return file;
};
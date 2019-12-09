'use strict';
module.exports = (sequelize, DataTypes) => {
    const share = sequelize.define('share', {
        fileid: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sharetype: {
            type: DataTypes.ENUM,
            values: ['View', 'Modify']
        },
        userid: {
            type: DataTypes.INTEGER,
        }
    });
    share.associate = function (models) {
        share.belongsTo(models.file, {
            foreignKey: 'id',
            as: 'sharingfile',
            onDelete: 'CASCADE'
        });
        share.belongsTo(models.user, {
            foreignKey: 'id',
            as: 'sharingwith',
            onDelete: 'CASCADE'
        });
    };
    return share;
};
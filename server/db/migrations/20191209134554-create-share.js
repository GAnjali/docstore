'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('shares', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fileid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'files',
                    key: 'id',
                },
                onDelete: 'CASCADE'
            },
            sharetype: {
                type: Sequelize.ENUM,
                values: [
                    'View',
                    'Modify',
                ],
                defaultValue: 'View'
            },
            userid: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE'
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('shares');
    }
};
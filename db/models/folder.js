'use strict';
module.exports = (sequelize, DataTypes) => {
  const folder = sequelize.define('folder', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentfolderid: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  folder.associate = function(models) {
    folder.belongsTo(models.user,{
      foreignKey: 'id',
      as: 'author',
      onDelete: 'CASCADE'
    });
    folder.hasOne(models.folder, {
      foreignKey: 'id',
      as: 'parentfolder',
      onDelete: 'CASCADE'
    })
  };
  return folder;
};
module.exports = (sequelize, DataTypes) => {
    const File = sequelize.define('File', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return File;
};
module.exports = (sequelize, DataTypes) => {
    const Gallery = sequelize.define('gallery', {
        file: {
            type: DataTypes.STRING
        },
        title: {
            type: DataTypes.STRING
        },
        caption: {
            type: DataTypes.STRING
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Gallery;
}
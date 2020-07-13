module.exports = (sequelize, DataTypes) => {
    const Memory = sequelize.define('memory', {
        file: {
            type: DataTypes.STRING
        },
        memory: {
            type: DataTypes.STRING
        },
        pet: {
            type: DataTypes.STRING
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return Memory;
}
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define("Category",
  {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
            isUUID: 4,
        }
        },

    name: {
        type: DataTypes.STRING,
        allowNull: false
        }

    },
    {
        timestamps: false,
        freezeTableName: true
    })
}
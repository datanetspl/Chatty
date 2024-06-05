module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define(
    "Conversation",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      type: {
        type: DataTypes.ENUM("single", "group"),
        allowNull: true,
        defaultValue: "single",
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    },
    {
      sequelize,
      timestamps: true,
      tableName: "conversations",
      schema: 'public'
    },
  );

  Conversation.associate = function (models) {
    Conversation.belongsToMany(models.User, {
      through: models.UserConversation,
      foreignKey: "userId",
    });
    Conversation.hasMany(models.Message, {
      foreignKey: "convId",
      as: "messages"
    });
  };

  return Conversation;
};
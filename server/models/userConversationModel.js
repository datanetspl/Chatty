module.exports = (sequelize, DataTypes) => {
  const UserConversation = sequelize.define(
    "UserConversation",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      }
    },
    {
      sequelize,
      timestamps: true,
      tableName: "user_conversation",
      schema: 'public'
    },
  );

  return UserConversation;
}
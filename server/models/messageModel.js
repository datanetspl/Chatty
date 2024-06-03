module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      receiverId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      }
    },
    {
      sequelize,
      timestamps: true,
      tableName: "messages",
      schema: 'public'
    },
  );

  Message.associate = function(models) {
		Message.belongsTo(models.User, {
			foreignKey: "senderId",
      as: "sender"
		});
    Message.belongsTo(models.User, {
			foreignKey: "receiverId",
      as: "receiver"
		});
	};

  return Message;
};
const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          max: {
            args: [20],
          },
          min: {
            args: [3],
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          max: {
            args: [50],
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: {
            args: [8],
          }
        }
      },
      isAvatarImageSet: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      avatarImage: {
        type: DataTypes.STRING(10485760),
        defaultValue: ""
      }
    },
    {
      sequelize,
      timestamps: true,
      tableName: "users",
      schema: 'public'
    },
  );

  User.associate = function (models) {
<<<<<<< HEAD
    User.belongsToMany(models.Conversation, {
      through: models.UserConversation,
      foreignKey: "userId",
    });
    User.hasMany(models.Message, {
      foreignKey: "senderId",
      as: "sendedMessages"
    });
  };
=======
    User.hasMany(models.Message, {
      foreignKey: "senderId",
      as: "sendedMessages"
    }),
      User.hasMany(models.Message, {
        foreignKey: "receiverId",
        as: "receivedMessages"
      })
  }
>>>>>>> master

  return User;
};

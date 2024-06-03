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
        type: DataTypes.STRING,
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

  User.associate = function(models) {
    User.hasMany(models.Message, {
      foreignKey: "senderId",
      as: "sendedMessages"
    }),
    User.hasMany(models.Message, {
      foreignKey: "receiverId",
      as: "receivedMessages"
    })
  }

  return User
};

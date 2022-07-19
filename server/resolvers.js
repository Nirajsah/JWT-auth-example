const { gql } = require("apollo-server-express");
const bcrypt = require("bcryptjs");
const { response } = require("express");
const User = require("./models/user.model");

const resolvers = {
  Query: {
    users: async () => await User.find(),
  },
  Mutation: {
    createUser: async (_, { id, username, email, password }) => {
      const userExist = await User.findOne({ email });
      if (userExist) {
        console.log("User already Exists");
      }
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
      const newUser = await User.create({
        id,
        username,
        email,
        password: hashPassword,
      });
      // await newUser.save();
      console.log(newUser);
      return newUser;
    },
    updateUser: async (_, { username, email, password }) => {
      const userExist = await User.findOne({ email });
      // console.log(userExist.id);
      if (!userExist) {
        console.log("User does not exist");
        return userExist;
      }
      if (userExist && (await bcrypt.compare(password, userExist.password))) {
        await User.findByIdAndUpdate(userExist, {
          username,
        });
        const updatedUser = await User.findOne({ email });
        console.log(updatedUser);
        return updatedUser;
      }
    },
    deleteUser: async (_, { email, password }) => {
      const userExist = await User.findOne({ email });
      if (!userExist) {
        console.log("User does not exist");
      }
      if (userExist && (await bcrypt.compare(password, userExist.password))) {
        const deletedUser = await User.findByIdAndDelete(userExist);
        console.log(deletedUser);
        return deletedUser;
      }
    },
  },
};

module.exports = resolvers;

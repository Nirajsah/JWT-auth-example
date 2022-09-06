const { compare, hash, genSalt } = require("bcryptjs");
const User = require("./models/user.model");
const Post = require("./models/posts.model");
const { sign } = require("jsonwebtoken");

const resolvers = {
  Query: {
    hello: () => "Hello from Resolvers",
    users: async () => await User.find(),
    posts: async () => await Post.find(),
  },
  Mutation: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not Found");
      }
      const valid = await compare(password, user.password);
      if (!valid) {
        throw new Error("Wrong Password");
      }

      return {
        // SecretKey should be hidden
        accessToken: sign({ userId: user.id }, "Secretkey", {
          expiresIn: "15m",
        }),
      };
    },
    createUser: async (_, { id, username, email, password }) => {
      const userExist = await User.findOne({ email });
      if (userExist) {
        console.log("User already Exists");
      }
      const salt = await genSalt(10);
      const hashPassword = await hash(password, salt);
      const newUser = await User.create({
        id,
        username,
        email,
        password: hashPassword,
      });
      console.log(newUser);
      return newUser;
    },
    updateUser: async (_, { username, email, password }) => {
      const userExist = await User.findOne({ email });
      if (!userExist) {
        console.log("User does not exist");
        return userExist;
      }
      if (userExist && (await compare(password, userExist.password))) {
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
      if (userExist && (await compare(password, userExist.password))) {
        const deletedUser = await User.findByIdAndDelete(userExist);
        console.log(deletedUser);
        return deletedUser;
      }
    },
  },
};

module.exports = resolvers;

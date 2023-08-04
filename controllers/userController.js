const { comparePassword } = require("../helpers/hashPassword");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models/index");
// const {OAuth2Client} = require('google-auth-library')

class UserController {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      // console.log(req.body);
      let role = "admin";
      const newUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      // console.log(userall);
      let obj = {
        id: newUser.id,
        email: newUser.email,
      };
      res.status(201).json({ msg: "user has been created", obj });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      const foundUser = await User.findOne({ where: { email } });

      if (!foundUser) {
        throw { name: "invalid_credentials" };
      }
      const comparePass = comparePassword(password, foundUser.password);
      if (!comparePass) {
        throw { name: "invalid_credentials" };
      }
      let payload = {
        id: foundUser.id,
        role: foundUser.role,
        username: foundUser.username,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        id: foundUser.id,
        role: foundUser.role,
        username: foundUser.username,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      // console.log(process.env.GOOGLE_ID);
      const { OAuth2Client } = require("google-auth-library");
      const client = new OAuth2Client(process.env.GOOGLE_ID);
      const { google_token } = req.body;

      // console.log(google_token);
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: google_token,
          audience: process.env.GOOGLE_ID,
        });
        console.log(ticket);
        const payload = ticket.getPayload();
        const userid = payload["sub"];
        // console.log(payload.family_name);
        const [newData, create] = await User.findOrCreate({
          where: {
            email: payload.email,
          },
          defaults: {
            username: `${payload.given_name} ${payload.family_name}`,
            email: payload.email,
            password: "google123",
            phoneNumber: "08199999",
            address: "tuban google",
            role: "staff",
          },
          hooks: false,
        });
        // console.log(newData);
        // console.log(create);
        let newPayload = {
          id: newData.id,
          role: newData.role,
          username: newData.username,
        };
        const access_token = createToken(newPayload);

        res.status(201).json({
          access_token,
          id: newData.id,
          role: newData.role,
          username: newData.username,
        });
      }
      verify().catch(console.error);
    } catch (error) {
      next(error);
    }
  }

  static async registerClient(req, res, next) {
    try {
      console.log("ihza");
      const { username, email, password, phoneNumber, address } = req.body;
      // console.log(req.body, "<<<<<=");
      // console.log(username, email, password, phoneNumber, address);
      let role = "client";
      const newUser = await User.create({
        username,
        email,
        password,
        role,
        phoneNumber,
        address,
      });
      // console.log(userall);
      let obj = {
        id: newUser.id,
        email: newUser.email,
      };
      res.status(201).json({ msg: "user has been created", obj });
    } catch (error) {
      next(error);
    }
  }
  static async loginGoogleClient(req, res, next) {
    try {
      // console.log(process.env.GOOGLE_ID);
      const { OAuth2Client } = require("google-auth-library");
      const client = new OAuth2Client(process.env.GOOGLE_ID);
      const { google_token } = req.body;

      // console.log(google_token);
      async function verify() {
        const ticket = await client.verifyIdToken({
          idToken: google_token,
          audience: process.env.GOOGLE_ID,
        });
        console.log(ticket);
        const payload = ticket.getPayload();
        const userid = payload["sub"];
        // console.log(payload.family_name);
        const [newData, create] = await User.findOrCreate({
          where: {
            email: payload.email,
          },
          defaults: {
            username: `${payload.given_name} ${payload.family_name}`,
            email: payload.email,
            password: "googleClient123",
            phoneNumber: "081888888",
            address: "tuban google client",
            role: "client",
          },
          hooks: false,
        });
        // console.log(newData);
        // console.log(create);
        let newPayload = {
          id: newData.id,
          role: newData.role,
          username: newData.username,
        };
        const access_token = createToken(newPayload);

        res.status(201).json({
          access_token,
          id: newData.id,
          role: newData.role,
          username: newData.username,
        });
      }
      verify().catch(console.error);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

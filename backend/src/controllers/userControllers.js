/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
require("dotenv").config();
const jwt = require("jsonwebtoken");
const argon2 = require("@node-rs/argon2");
const models = require("../models");

const { JWT_SECRET, JWT_EXPIRESIN, JWT_SECURE, JWT_COOKIE_MAXAGE } =
  process.env;

const createToken = (req, res) => {
  const { email } = req.body;
  // console.log("1");

  jwt.sign(
    { email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRESIN },
    (err, token) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        // console.log("2", JWT_SECURE, JWT_COOKIE_MAXAGE);
        res
          .cookie("jwtToken", token, {
            httpOnly: true,
            secure: JWT_SECURE === "true",
            maxAge: parseInt(JWT_COOKIE_MAXAGE, 10),
          })
          .json(req.body);
      }
    }
  );
};

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const browse = (req, res) => {
  models.user
    .findAllUsers()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then(([result]) => {
      res.status(201).json({
        id: result.insertId,
        ...user,
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const login = (req, res, next) => {
  const { email } = req.body;

  models.user
    .findByEmail(email)
    .then(([users]) => {
      if (users.length === 0) {
        res.sendStatus(404);
      } else {
        // eslint-disable-next-line prefer-destructuring
        req.user = users[0];
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const hashPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    res.sendStatus(400);
  } else {
    argon2
      .hash(password, hashingOptions)
      .then((hashedPassword) => {
        req.body.hashedPassword = hashedPassword;
        delete req.body.password;
        next();
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  }
};

const verifyPassword = (req, res, next) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const data = req.user;
        delete data.hashedPassword;
        req.body = req.user;
        res.status(200).json(req.body);
        next();
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const autoLogin = (req, res) => {
  const { id } = req.body;

  models.user
    .findOneUser(id)
    .then(([users]) => {
      if (users.length === 0) {
        res.sendStatus(404);
      } else {
        const user = { ...users[0] };
        res.json(user);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const autoVerifyToken = (req, res, next) => {
  const token = req.cookies.jwtToken;
  if (!token) {
    res.status(401).send("You're not logged in");
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        req.body = { ...req.body, ...decoded };

        next();
      }
    });
  }
};

module.exports = {
  browse,
  add,
  login,
  hashPassword,
  verifyPassword,
  createToken,
  autoLogin,
  autoVerifyToken,
};

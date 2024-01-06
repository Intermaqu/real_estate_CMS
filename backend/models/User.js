require("dotenv").config();
const db = require("../db/config");
const jwt = require("jsonwebtoken");

module.exports = {
  load: async (id) => {
    let user = await db.query('SELECT * FROM users WHERE "ID_USER" = $1', [id]);
    if (user.rowCount !== 1) {
      return false;
    } else {
      return user.rows[0];
    }
  },

  getUserByEmail: async (email) => {
    let user = await db.query('SELECT * FROM users WHERE "Email" = $1', [
      email,
    ]);
    if (user.rowCount !== 1) {
      return false;
    } else {
      return user.rows[0];
    }
  },

  addNewUser: async (
    name,
    surname,
    email,
    password,
    address,
    role,
    phoneNumber,
    nip,
    createdAt,
    active
  ) => {
    let user = await db.query(
      `INSERT INTO users ("Name", "Surname", "Email", "Password", "ID_ADDRESS", "Role", "phoneNumber", "Nip", "CreatedAt", "Active") VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        name,
        surname,
        email,
        password,
        address,
        role,
        phoneNumber,
        nip,
        createdAt,
        active,
      ]
    );
    return user;
  },

  generateJWTToken: (
    id,
    name,
    surname,
    email,
    password,
    address,
    role,
    phoneNumber,
    nip,
    createdAt,
    active
  ) => {
    const userData = {
      id,
      name,
      surname,
      email,
      password,
      address,
      role,
      phoneNumber,
      nip,
      createdAt,
      active,
    };
    return jwt.sign(userData, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400 * 30,
    });
  },
};

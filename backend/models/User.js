require("dotenv").config();
import { query } from "../db/config";
import { sign } from "jsonwebtoken";

export async function load(id) {
  let user = await query('SELECT * FROM users WHERE "ID_USER" = $1', [id]);
  if (user.rowCount !== 1) {
    return false;
  } else {
    return user.rows[0];
  }
}

export async function getUserByEmail(email) {
  let user = await query('SELECT * FROM users WHERE "Email" = $1', [email]);
  if (user.rowCount !== 1) {
    return false;
  } else {
    return user.rows[0];
  }
}

export async function addNewUser(
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
) {
  let user = await query(
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
}

export function generateJWTToken(
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
) {
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

  return sign(userData, process.env.JWT_SECRET_KEY, {
    expiresIn: 86400 * 30,
  });
}

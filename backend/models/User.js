require("dotenv").config();
const db = require("../db/config");
const jwt = require("jsonwebtoken");

module.exports = {
  load: async (id) => {
    let user = await db.query(`SELECT * FROM public."user" WHERE "id" = $1`, [id]);
    if (user.rowCount !== 1) {
      return false;
    } else {
      return user.rows[0];
    }
  },

  getAllUsers: async () => {
    const allUsers = await db.query(`SELECT * FROM public."user"`);
    return allUsers.rows;
  },

  getUserByEmail: async (email) => {
    let user = await db.query(
      `SELECT * FROM public."user" WHERE "email" = $1`,
      [email]
    );
    if (user.rowCount !== 1) {
      return false;
    } else {
      return user.rows[0];
    }
  },

  getUserById: async (id) => {
    let user = await db.query(`SELECT * FROM public."user" WHERE "id" = $1`, [
      id,
    ]);
    if (user.rowCount !== 1) {
      return false;
    } else {
      return user.rows[0];
    }
  },

  addNewUser: async (
    firstName,
    firstSurname,
    secondName,
    secondSurname,
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
      `INSERT INTO public."user" (
        "firstName",
        "firstSurname",
        "secondName",
        "secondSurname",
        "email",
        "password",
        "id_address",
        "role",
        "phone_number",
        "nip",
        "created_at",
        "active"
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
      [
        firstName,
        firstSurname,
        secondName,
        secondSurname,
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
    firstName,
    firstSurname,
    secondName,
    secondSurname,
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
      firstName,
      firstSurname,
      secondName,
      secondSurname,
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

  editUserById: async (
    id,
    firstName,
    firstSurname,
    secondName,
    secondSurname,
    email,
    password,
    country,
    city,
    street,
    apartmentNum,
    zipCode,
    role,
    phoneNumber,
    nip,
    createdAt,
    active
  ) => {
    try {
      // const user = User.getUserById(id);
      let user = await db.query(`SELECT * FROM public."user" WHERE "id" = $1`, [
        id,
      ]);

      if (user.rowCount !== 1) {
        console.log(`Nie znaleziono użytkownika.`);
        return null;
      }

      const addressUpdated = await db.query(
        `UPDATE address 
         SET 
           "address_country" = $1,
           "address_city" = $2,
           "address_street" = $3,
           "address_apartment" = $4,
           "address_zip_code" = $5
         WHERE 
         "address_country" = $6 AND 
         "address_city" = $7 AND 
         "address_street" = $8 AND 
         "address_apartment" = $9 AND 
         "address_zip_code" = $10`,
        [
          country,
          city,
          street,
          apartmentNum,
          zipCode,
          user.country,
          user.city,
          user.street,
          user.apartmentNum,
          user.zipCode,
        ]
      );

      if (addressUpdated.rowCount === 0) {
        console.log(`Nie udało się znaleźć adresu dla użytkownika.`);
      }

      const result = await db.query(
        `UPDATE user SET 
         "firstName" = $2,
         "firstSurname" = $3,
         "secondName" = $4,
         "secondSurname" = $5,
         "email" = $6,
         "password" = $7,
         "role" = $8,
         "phone_number" = $9,
         "nip" = $10,
         "created_at" = $11,
         "active" = $12
         WHERE "id" = $1`,
        [
          id,
          firstName,
          firstSurname,
          secondName,
          secondSurname,
          email,
          password,
          role,
          phoneNumber,
          nip,
          createdAt,
          active,
        ]
      );

      if (result.rowCount === 0) {
        console.log(`Nie znaleziono użytkownika o id: ${id}`);
        return null;
      }

      console.log(`Zaktualizowano użytkownika o id: ${id}`);

      let editedUser = await db.query(`SELECT * FROM user WHERE "id" = $1`, [
        id,
      ]);

      return editedUser.rows[0];
    } catch (error) {
      console.error("Błąd podczas edycji użytkownika:", error);
      throw error;
    }
  },

  deleteUserById: async (id) => {
    await db.query(`DELETE FROM public."user" WHERE "id" = $1`, [id]);

    console.log("Usunięto użytkownika o id:", id);
    return true;
  },
};

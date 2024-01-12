const Address = require("../models/Address");
const User = require("../models/User");

module.exports = {
  getAllUsers: async (req, res) => {
    const allUsers = await User.getAllUsers();
    res.status(200).send(allUsers);
  },

  getUserById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    try {
      const user = await User.getUserById(id);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send(`User with ID ${id} not found`);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania adresu:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  getUserByEmail: async (req, res) => {
    const { email } = req.params;

    if (!email) {
      res.status(400).send("Missing email");
      return;
    }

    try {
      const user = await User.getUserByEmail(email);

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send(`User with e-mail ${email} not found`);
      }
    } catch (error) {
      console.error("Błąd podczas pobierania użytkownika:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  registerNewUser: async (req, res) => {
    const {
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
      active,
    } = req.body;

    if (
      !firstName ||
      !firstSurname ||
      !email ||
      !password ||
      !role ||
      !phoneNumber ||
      !createdAt ||
      !active ||
      !country ||
      !city ||
      !street ||
      !apartmentNum ||
      !zipCode
    ) {
      res.status(400).send("Missing data!");
      return 0;
    }

    if (await User.getUserByEmail(email)) {
      res.status(401).send("Email exists");
      return 0;
    }

    let address = await Address.addNewAddress(
      country,
      city,
      street,
      apartmentNum,
      zipCode
    );

    await User.addNewUser(
      firstName,
      firstSurname,
      secondName,
      secondSurname,
      email,
      password,
      address.ID_ADDRESS,
      role,
      phoneNumber,
      nip,
      createdAt,
      active
    );
    res.status(200).send("User Created");
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send("Missing data");
      return 0;
    }

    let user = await User.getUserByEmail(email);

    if (!user) {
      res.status(401).send("User not found");
      return 0;
    }

    console.log(user);

    if (password !== user.password) {
      res.status(401).send("Wrong password");
      return 0;
    }

    let address = await Address.getAddressById(user.id_address);

    console.log(address);
    console.log(user);

    const token = User.generateJWTToken(
      user.id,
      user.firstName,
      user.firstSurname,
      user.secondName,
      user.secondSurname,
      user.email,
      "",
      user.address,
      user.role,
      user.phoneNumber,
      user.nip,
      user.createdAt,
      user.active
    );

    const newUser = { ...user, Password: "", ...address };

    res.status(200).send({
      userData: newUser,
      token: "Bearer " + token,
    });
  },

  editUserById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    const {
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
      active,
    } = req.body;

    if (
      !firstName ||
      !firstSurname ||
      !email ||
      !password ||
      !role ||
      !phoneNumber ||
      !createdAt ||
      !active ||
      !country ||
      !city ||
      !street ||
      !apartmentNum ||
      !zipCode
    ) {
      res.status(400).send("Missing data");
      return;
    }

    try {
      const editedUser = await User.editUserById(
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
        active,
      );

      if (editedUser) {
        res.status(200).json(editedUser);
      } else {
        res.status(404).send(`Edycja użytkownika ${id} nie powiodła się.`);
      }
    } catch (error) {
      console.error("Błąd podczas edycji użytkownika:", error);
      res.status(500).send("Internal Server Error");
    }
  },

  deleteUserById: async (req, res) => {
    const { id } = req.params;

    if (!id) {
      res.status(400).send("Missing ID");
      return;
    }

    const success = await User.deleteUserById(id).catch((e) => {
      console.log(e);
      return false;
    });

    if (success) {
      res.status(200).send("User deleted");
    } else {
      res.status(400).send("Error");
    }
  },
};

// {
//   "firstName": "John",
//   "secondName": "Doe",
//   "firstSurname": "Smith",
//   "secondSurname": "Johnson",
//   "email": "john.doe@example.com",
//   "password": "hashed_password",
//   "role": "BROKER",
//   "phone_number": "123456789",
//   "nip": "1234567890",
//   "created_at": "2022-01-11T12:34:56Z",
//   "active": true,
//   "country": "Polska",
//     "city": "Radom",
//     "street": "Wiśniowa",
//     "apartmentNum": "12",
//     "zipCode": "61-125"
// }


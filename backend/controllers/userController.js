const Address = require("../models/Address");
const User = require("../models/User");

module.exports = {
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
      postCode,
      role,
      phoneNumber,
      nip,
      createdAt,
      active,
    } = req.body;

    if (
      !firstName ||
      !firstSurname ||
      !secondName ||
      !secondSurname ||
      !email ||
      !password ||
      !country ||
      !city ||
      !street ||
      !apartmentNum ||
      !postCode ||
      !role ||
      !phoneNumber ||
      !nip ||
      !createdAt ||
      !active
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
      postCode
    );
    console.log(address);

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

    if (password !== user.Password) {
      res.status(401).send("Wrong password");
      return 0;
    }

    let address = await Address.getAddressById(user.ID_ADDRESS);

    console.log(address);
    console.log(user);

    const token = User.generateJWTToken(
      user.ID_USER,
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
};

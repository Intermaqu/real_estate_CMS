import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";
import { URL } from "../services/URL";
import {
  Box,
  Button,
  Container,
  Input,
  Stack,
  SvgIcon,
  Typography,
  TextField,
  MenuItem,
  Switch,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Head from "next/head";
import { translateRole } from "src/sections/users/users-utils";

const EmptyUserData = {
  firstName: "",
  firstSurname: "",
  secondName: "",
  secondSurname: "",
  email: "",
  password: "",
  passwordConfirm: "",
  country: "",
  city: "",
  street: "",
  apartmentNum: "",
  zipCode: "",
  role: "BROKER",
  phoneNumber: "",
  nip: "",
  createdAt: "",
  active: true,
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState();
  const [errors, setErrors] = useState({}); // { title: "Title is required" }
  //   const [backendError, setBackendError] = useState(""); // "Title is required" || "Server error" || [
  const [state, setState] = useState("loading");
  const roles = ["BROKER", "USER"];
  const optionalFields = ["secondName", "secondSurname", "nip"];
  const init = () => {
    const newState = id ? "edit" : "add";
    setState(newState);
    if (id) {
      // EDIT
      axios({
        method: "get",
        url: `${URL}/user/getById/${id}`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
        data: {
          id: id,
        },
      })
        .then((res) => {
          console.log(res.data);
          setUser({
            active: res.data.active,
            firstName: res.data.firstName,
            firstSurname: res.data.firstSurname,
            secondName: res.data.secondName,
            secondSurname: res.data.secondSurname,
            email: res.data.email,
            password: res.data.password,
            passwordConfirm: res.data.passwordConfirm,
            country: res.data.address_country,
            city: res.data.address_city,
            street: res.data.address_street,
            apartmentNum: res.data.address_apartmentNum,
            zipCode: res.data.address_zipCode,
            role: res.data.role,
            phoneNumber: res.data.phone_number,
            nip: res.data.nip,
            createdAt: res.data.createdAt,
          });
        })
        .catch((err) => {
          console.log("ERROR:", err.response.data.message);
          setBackendError(err.response.data.message);
        });

      setUser({ ...EmptyUserData, passwordConfirm: EmptyUserData.password });
    } else {
      // ADD
      setUser(EmptyUserData);
    }
  };

  const handleValidate = () => {
    const newErrors = {
      ...errors,
    };

    for (let key of Object.keys(user)) {
      if (user[key] === "") newErrors[key] = true;
    }

    for (let key of optionalFields) {
      newErrors[key] = false;
    }

    newErrors.createdAt = false;
    if (user.password !== user.passwordConfirm) newErrors.passwordConfirm = true;

    setErrors(newErrors);
    if (handleCheckErrors(newErrors)) return;

    if (state === "add") {
      console.log(user);
      axios({
        method: "post",
        url: `${URL}/user/register`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
        data: {
          ...user,
          createdAt: new Date(),
          active: true,
        },
      })
        .then((res) => {
          console.log(res);
          // TODO: komunikat o zapisaniu
          router.push(`/users`);
        })
        .catch((err) => {
          console.log(err);
          // TODO: dodać error na polu email, że konto z podanym mailem już istnieje
        });
      return;
    }

    // Edit Property
    // if (state === "edit") {
    //   axios({
    //     method: "post",
    //     url: `${URL}/real-estate/editById/${id}`,
    //     headers: {
    //       authorization: AuthenticationService.getToken(),
    //     },
    //     data: {
    //       image1: property.image1,
    //       image2: property.image2,
    //       image3: property.image3,
    //       image4: property.image4,
    //       id_category: 5,
    //       id_broker: 2,
    //       title: property.title,
    //       short_description: ``,
    //       description: property.description,
    //       price: property.price,
    //       status: `AVAILABLE`,
    //       total_rates: 0,
    //       no_of_reviews: 0,
    //       address_country: property.addressCountry,
    //       address_city: property.addressCity,
    //       address_street: property.addressStreet,
    //       address_zip_code: property.addressZipCode,
    //       address_apartment: property.addressAppartment,
    //       created_at: new Date(),
    //       no_of_rooms: property.numberOfRooms,
    //       no_of_floors: property.numberOfFloors,
    //       year_of_construction: property.yearOfConstruction,
    //       parking_space: property.parking,
    //       elevator: property.elevator,
    //       square_footage: property.squareFootage,
    //       best_seller: false,
    //     },
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       // TODO: komunikat o zapisaniu + redirect do /properties
    //       // setProperty(res.data.property);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    //   return;
    // }
  };

  const handleDeleteFromDB = () => {
    console.log("Delete user:", id);

    // axios({
    //   method: "delete",
    //   url: `${URL}/real-estate/deleteById/${id}`,
    //   headers: {
    //     authorization: AuthenticationService.getToken(),
    //   },
    // })
    //   .then((res) => {
  };

  const handleCheckErrors = (errorsToCheck) => {
    const numberOfErrors = Object.values(errorsToCheck).filter((error) => error === true).length;
    return numberOfErrors > 0;
  };

  const handleChangeInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "active") {
      setUser({ ...user, active: event.target.checked });
      return;
    }

    setErrors({ ...errors, [name]: value === "" });
    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    // console.log("user:", user);
  }, [user]);

  useEffect(() => {
    // console.log("state:", state);
  }, [state]);

  if (state === "loading") {
    return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  //   if (backendError !== "") {
  //     return (
  //       <Box
  //         component="main"
  //         sx={{
  //           flexGrow: 1,
  //           justifyContent: "center",
  //           alignItems: "center",
  //           display: "flex",
  //         }}
  //       >
  //         <Typography variant="h4">{backendError}</Typography>
  //       </Box>
  //     );
  //   }

  return (
    <>
      <Head>
        <title>User</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">
                  {state === "add" ? `Nowy Użytkownik` : `Edycja Użytkownika #${id}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              padding: "2rem",
            }}
          >
            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Dane Osobowe</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Imie"
                name="firstName"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={user.firstName}
                error={errors.firstName}
                helperText={errors.firstName && "First Name is required"}
              />
              <TextField
                {...inputStyle}
                label="Drugie Imie"
                name="secondName"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={user.secondName}
              />
              <TextField
                {...inputStyle}
                label="Nazwisko"
                name="firstSurname"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={user.firstSurname}
                error={errors.firstSurname}
                helperText={errors.firstSurname && "Surname is required"}
              />
              <TextField
                {...inputStyle}
                label="Drugie Nazwisko"
                name="secondSurname"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={user.secondSurname}
              />
            </Box>
            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Adres Zamieszkania</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Kraj"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.country}
                name="country"
                error={errors.country}
                helperText={errors.country && "Country is required"}
              />
              <TextField
                {...inputStyle}
                label="Miasto"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.city}
                name="city"
                error={errors.city}
                helperText={errors.city && "City is required"}
              />
            </Box>
            <Box sx={{ ...rowStyle, marginTop: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Ulica"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.street}
                name="street"
                error={errors.street}
                helperText={errors.street && "Street is required"}
              />
              <TextField
                {...inputStyle}
                label="Numer Mieszkania"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.apartmentNum}
                name="apartmentNum"
                error={errors.apartmentNum}
                helperText={errors.apartmentNum && "Appartment is required"}
              />
              <TextField
                {...inputStyle}
                label="Kod Pocztowy"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.zipCode}
                name="zipCode"
                error={errors.zipCode}
                helperText={errors.zipCode && "Zip Code is required"}
              />
            </Box>
            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Kontakt</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Email"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.email}
                name="email"
                error={errors.email}
                helperText={errors.email && "Email is required"}
                type="email"
              />
              <TextField
                {...inputStyle}
                label="Numer Telefonu"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.phoneNumber}
                name="phoneNumber"
                error={errors.phoneNumber}
                helperText={errors.phoneNumber && "Phone Number is required"}
                type="number"
              />
              <TextField
                {...inputStyle}
                label="NIP"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.nip}
                name="nip"
                type="number"
              />
            </Box>
            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Dane Logowania</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Hasło"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.password}
                name="password"
                error={errors.password}
                helperText={errors.password && "Password is required"}
                type="password"
              />
              <TextField
                {...inputStyle}
                label="Potwierdzenie Hasła"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={user.passwordConfirm}
                name="passwordConfirm"
                error={errors.passwordConfirm}
                helperText={
                  user.password !== user.passwordConfirm && errors.passwordConfirm
                    ? "Passwords must match"
                    : errors.passwordConfirm && "Password Confirmation is required"
                }
                type="password"
              />
            </Box>
            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Status</Typography>
            </Box>
            <Box sx={{ ...rowStyle, justifyContent: "space-between" }}>
              <TextField
                select
                label="Rola"
                variant="filled"
                name="role"
                onChange={(e) => handleChangeInput(e)}
                value={user.role}
                style={{ width: "10rem" }}
              >
                {roles.map((role) => (
                  <MenuItem
                    key={role}
                    value={role}
                    sx={{ cursor: "pointer", padding: "0.5rem 1rem " }}
                  >
                    {translateRole(role)}
                  </MenuItem>
                ))}
              </TextField>
              <FormControlLabel
                labelPlacement="top"
                name="active"
                control={<Switch label="Filled" variant="filled" />}
                label={<Typography variant="body2">Aktywny</Typography>}
                onChange={(e) => handleChangeInput(e)}
                checked={user.active}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: `${state === "add" ? "flex-end" : "space-between"}`,
              alignItems: "flex-end",
              width: "90%",
              padding: "2rem",
            }}
          >
            {state === "edit" && (
              <Button
                sx={{ padding: "1rem 2rem" }}
                onClick={() => handleDeleteFromDB()}
                variant="contained"
                color="error"
              >
                <Typography variant="h6">Usuń</Typography>
              </Button>
            )}
            <Button
              sx={{ padding: "1rem 2rem" }}
              onClick={() => handleValidate()}
              variant="contained"
            >
              <Typography variant="h6">
                {state === "add" ? "Dodaj Nowego Użytkownika" : "Zapisz zmiany"}
              </Typography>
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const inputStyle = { style: { flex: 1 } };
const rowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  gap: "1rem",
  width: "80%",
};

const rowTitleStyle = {
  width: "80%",
  padding: "2rem 0 0.5rem",
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

// {
//   id: string;
//   category: string;
//   title: string;
//   price: number;
//   description: string;

//   addressCountry: string;
//   addressCity: string;
//   addressStreet: string;
//   addressAppartment: string;
//   addressZipCode: string;

//   parking: string; (OPIS)
//   elevator: boolean;
//   squareFootage: number;
//   numberOfRooms: number;
//   numberOfFloors: number;
//   yearOfConstruction: number;

//   image1: string;
//   image2?: string;
//   image3?: string;
//   image4?: string;
// }

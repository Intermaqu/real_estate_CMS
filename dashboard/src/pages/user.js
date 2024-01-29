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

const DefaultUserData = {
  firstName: "Jan",
  firstSurname: "Kowalski",
  secondName: "Adam",
  secondSurname: "Nowak",
  email: "ldsvsc@example.com",
  password: "haslo12345vdsv",
  country: "Polska",
  city: "Warszawa",
  street: "Aleje Jerozolimskie",
  apartmentNum: "10",
  zipCode: "00-001",
  role: "BROKER",
  phoneNumber: "123-456-789",
  nip: "1234567890",
  createdAt: "2022-02-01T12:34:56Z",
  active: true,
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(DefaultUserData);
  const [errors, setErrors] = useState({}); // { title: "Title is required" }
  //   const [backendError, setBackendError] = useState(""); // "Title is required" || "Server error" || [
  const [state, setState] = useState("loading");

  const init = () => {
    const newState = id ? "edit" : "add";
    setState(newState);
    if (id) {
      // EDIT
      //   axios({
      //     method: "get",
      //     url: `${URL}/real-estate/getForDataInterfaceById/${id}`,
      //     headers: {
      //       authorization: AuthenticationService.getToken(),
      //     },
      //     data: {
      //       id: id,
      //     },
      //   })
      //     .then((res) => {
      //       console.log(res.data);
      //       setProperty({
      //         ...DefaultPropertyData,
      //         id: res.data.id,
      //         image1: res.data.image_1,
      //         image2: res.data.image_2,
      //         image3: res.data.image_3,
      //         image4: res.data.image_4,
      //         category: res.data.categoryName,
      //         title: res.data.title,
      //         price: res.data.price,
      //         description: res.data.description,
      //         addressCountry: res.data.address_country,
      //         addressCity: res.data.address_country,
      //         addressStreet: res.data.address_street,
      //         addressAppartment: res.data.address_apartment,
      //         addressZipCode: res.data.address_zip_code,
      //         parking: res.data.parking_space,
      //         elevator: res.data.elevator,
      //         squareFootage: res.data.square_footage,
      //         numberOfRooms: res.data.no_of_rooms,
      //         numberOfFloors: res.data.no_of_floors,
      //         yearOfConstruction: res.data.year_of_construction,
      //       });
      //     })
      //     .catch((err) => {
      //       console.log("ERROR:", err.response.data.message);
      //       setBackendError(err.response.data.message);
      //     });

      setUser(DefaultUserData);
    } else {
      // ADD

      setUser(DefaultUserData);
    }

    console.log(newState);
  };

  const handleValidate = () => {
    const newErrors = {
      ...errors,
    };

    newErrors.price = user.price === 0 || errors.price;
    newErrors.squareFootage = user.squareFootage === 0 || errors.squareFootage;
    newErrors.numberOfRooms = user.numberOfRooms === 0 || errors.numberOfRooms;
    newErrors.numberOfFloors = user.numberOfFloors === 0 || errors.numberOfFloors;
    newErrors.yearOfConstruction = user.yearOfConstruction === 0 || errors.yearOfConstruction;

    setErrors(newErrors);
    if (handleCheckErrors(newErrors)) return;

    // let now = new Date();

    // Add Property
    // if (state === "add") {
    //   axios({
    //     method: "post",
    //     url: `${URL}/real-estate/add`,
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

  const handleCheckErrors = (errorsToCheck) => {
    const numberOfErrors = Object.values(errorsToCheck).filter((error) => error === true).length;
    console.log(numberOfErrors);
    return numberOfErrors > 0;
  };

  const handleChangeInput = (event) => {
    console.log(event);

    const value = event.target.value;
    const name = event.target.name;

    setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log(state);
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
        <title>Property</title>
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
                  {state === "add" ? `Add New Property` : `Edit property #${id}`}
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
              <Typography variant="h6">Basic Informations</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Title"
                name="title"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={user.title}
                error={errors.title}
                helperText={errors.title && "Title is required"}
              />
              <TextField
                {...inputStyle}
                label="price"
                type="number"
                name="price"
                variant="filled"
                onChange={(event) => {
                  handleChangeInput(event);
                }}
                value={user.price}
                error={errors.price}
                helperText={
                  errors.price && (user.price === 0 ? "Price cannot be 0" : "Price is required")
                }
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "90%",
              padding: "2rem",
            }}
          >
            <Button
              sx={{ padding: "1rem 2rem" }}
              onClick={() => handleValidate()}
              variant="contained"
            >
              <Typography variant="h6">
                {state === "add" ? "Add New Property" : "Save changes"}
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

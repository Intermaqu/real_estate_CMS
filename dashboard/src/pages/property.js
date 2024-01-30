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

const DefaultPropertyData = {
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  category: "House",
  title: "",
  price: 0,
  shortDescription: "",
  description: "",
  addressCountry: "",
  addressCity: "",
  addressStreet: "",
  addressAppartment: "",
  addressZipCode: "",
  parking: "",
  elevator: false,
  squareFootage: 0,
  numberOfRooms: 0,
  numberOfFloors: 0,
  yearOfConstruction: 0,
  bestSeller: false,
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(DefaultPropertyData);
  const [errors, setErrors] = useState({}); // { title: "Title is required" }
  const [state, setState] = useState("loading");
  const [backendError, setBackendError] = useState("");
  const categories = ["House", "Apartment", "Office"];

  const init = () => {
    const newState = id ? "edit" : "add";
    setState(newState);
    if (id) {
      // EDIT
      axios({
        method: "get",
        url: `${URL}/real-estate/getForDataInterfaceById/${id}`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
        data: {
          id: id,
        },
      })
        .then((res) => {
          // console.log(res.data);
          setProperty({
            ...DefaultPropertyData,
            id: res.data.id,
            image1: res.data.image_1,
            image2: res.data.image_2,
            image3: res.data.image_3,
            image4: res.data.image_4,
            category: res.data.categoryName,
            title: res.data.title,
            price: res.data.price,
            description: res.data.description,
            addressCountry: res.data.address_country,
            addressCity: res.data.address_country,
            addressStreet: res.data.address_street,
            addressAppartment: res.data.address_apartment,
            addressZipCode: res.data.address_zip_code,
            parking: res.data.parking_space,
            elevator: res.data.elevator,
            squareFootage: res.data.square_footage,
            numberOfRooms: res.data.no_of_rooms,
            numberOfFloors: res.data.no_of_floors,
            yearOfConstruction: res.data.year_of_construction,
          });
        })
        .catch((err) => {
          console.log("ERROR:", err.response.data);
          setBackendError(err.response.data);
        });
    } else {
      // ADD

      setProperty(DefaultPropertyData);
    }

    // console.log(newState);
  };

  const handleValidate = () => {
    const newErrors = {
      ...errors,
    };

    newErrors.price = property.price === 0 || errors.price;
    newErrors.squareFootage = property.squareFootage === 0 || errors.squareFootage;
    newErrors.numberOfRooms = property.numberOfRooms === 0 || errors.numberOfRooms;
    newErrors.numberOfFloors = property.numberOfFloors === 0 || errors.numberOfFloors;
    newErrors.yearOfConstruction = property.yearOfConstruction === 0 || errors.yearOfConstruction;

    for (let key of Object.keys(property)) if (property[key] === "") newErrors[key] = true;

    setErrors(newErrors);
    if (handleCheckErrors(newErrors)) return;

    let now = new Date();

    // Add Property
    if (state === "add") {
      axios({
        method: "post",
        url: `${URL}/real-estate/add`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
        data: {
          image1: property.image1,
          image2: property.image2,
          image3: property.image3,
          image4: property.image4,
          id_category: 5,
          id_broker: 2,
          title: property.title,
          short_description: ``,
          description: property.description,
          price: property.price,
          status: `AVAILABLE`,
          total_rates: 0,
          no_of_reviews: 0,
          address_country: property.addressCountry,
          address_city: property.addressCity,
          address_street: property.addressStreet,
          address_zip_code: property.addressZipCode,
          address_apartment: property.addressAppartment,
          created_at: new Date(),
          no_of_rooms: property.numberOfRooms,
          no_of_floors: property.numberOfFloors,
          year_of_construction: property.yearOfConstruction,
          parking_space: property.parking,
          elevator: property.elevator,
          square_footage: property.squareFootage,
          best_seller: false,
        },
      })
        .then((res) => {
          // TODO: komunikat o zapisaniu
          // setProperty(res.data.property);
          router.push("/properties");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

    // Edit Property
    if (state === "edit") {
      axios({
        method: "post",
        url: `${URL}/real-estate/editById/${id}`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
        data: {
          image1: property.image1,
          image2: property.image2,
          image3: property.image3,
          image4: property.image4,
          id_category: 5,
          id_broker: 2,
          title: property.title,
          short_description: ``,
          description: property.description,
          price: property.price,
          status: `AVAILABLE`,
          total_rates: 0,
          no_of_reviews: 0,
          address_country: property.addressCountry,
          address_city: property.addressCity,
          address_street: property.addressStreet,
          address_zip_code: property.addressZipCode,
          address_apartment: property.addressAppartment,
          created_at: new Date(),
          no_of_rooms: property.numberOfRooms,
          no_of_floors: property.numberOfFloors,
          year_of_construction: property.yearOfConstruction,
          parking_space: property.parking,
          elevator: property.elevator,
          square_footage: property.squareFootage,
          best_seller: false,
        },
      })
        .then((res) => {
          // TODO: komunikat o zapisaniu
          // setProperty(res.data.property);
          router.push("/properties");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  };

  const handleCheckErrors = (errorsToCheck) => {
    const numberOfErrors = Object.values(errorsToCheck).filter((error) => error === true).length;
    // console.log(numberOfErrors);
    return numberOfErrors > 0;
  };

  const handleChangeCategory = (event) => {
    const category = event.target.value;
    // console.log(category);
    setProperty({ ...property, category: category });
  };

  const handleChangeInput = (event) => {
    // console.log(event);

    const value = event.target.value;
    const name = event.target.name;

    // BOOLEAN VALUES
    if (name === "elevator") {
      setProperty({ ...property, elevator: event.target.checked });
      return;
    }

    setErrors({
      ...errors,
      [name]: value === "",
    });

    // NEGATIVE VALUES
    if (
      name === "price" ||
      name === "squareFootage" ||
      name === "numberOfRooms" ||
      name === "numberOfFloors" ||
      name === "yearOfConstruction"
    ) {
      if (parseInt(value) < 0) return;
    }

    // INTEGER VALUES
    if (name === "numberOfRooms" || name === "numberOfFloors" || name === "yearOfConstruction") {
      setProperty({ ...property, [name]: parseInt(value) });
      return;
    }

    // STRING VALUES
    setProperty({ ...property, [name]: value });
  };

  const translateCategory = (category) => {
    switch (category) {
      case "House":
        return "Dom";
      case "Apartment":
        return "Mieszkanie";
      case "Office":
        return "Biuro";
      default:
        return "Dom";
    }
  };

  useEffect(() => {
    // console.log(property);
  }, [property]);

  useEffect(() => {
    init();
  }, []);

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

  // if (backendError !== "") {
  //   return (
  //     <Box
  //       component="main"
  //       sx={{
  //         flexGrow: 1,
  //         justifyContent: "center",
  //         alignItems: "center",
  //         display: "flex",
  //       }}
  //     >
  //       <Typography variant="h4">{backendError}</Typography>
  //     </Box>
  //   );
  // }

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
                  {state === "add" ? `Nowa posiadłość` : `Edycja posiadłości #${id}`}
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
              <Typography variant="h6">Informacje Podstawowe</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Tytuł"
                name="title"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={property.title}
                error={errors.title}
                helperText={errors.title && "Title is required"}
              />
              <TextField
                {...inputStyle}
                label="Cena"
                type="number"
                name="price"
                variant="filled"
                onChange={(event) => {
                  handleChangeInput(event);
                }}
                value={property.price}
                error={errors.price}
                helperText={
                  errors.price && (property.price === 0 ? "Price cannot be 0" : "Price is required")
                }
              />
              <TextField
                select
                label="Kategoria"
                variant="filled"
                onChange={handleChangeCategory}
                value={property.category}
                {...inputStyle}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    sx={{ cursor: "pointer", padding: "0.5rem 1rem " }}
                  >
                    {translateCategory(category)}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Opis</Typography>
            </Box>
            <Box sx={{ ...rowStyle, marginBottom: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Krótki opis"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.shortDescription}
                name="shortDescription"
                multiline
                rows={2}
                error={errors.shortDescription}
                helperText={errors.shortDescription && "Description is required"}
              />
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Długi opis"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.description}
                name="description"
                multiline
                rows={4}
                error={errors.description}
                helperText={errors.description && "Description is required"}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Adres</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Kraj"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressCountry}
                name="addressCountry"
                error={errors.addressCountry}
                helperText={errors.addressCountry && "Country is required"}
              />
              <TextField
                {...inputStyle}
                label="Miasto"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressCity}
                name="addressCity"
                error={errors.addressCity}
                helperText={errors.addressCity && "City is required"}
              />
            </Box>
            <Box sx={{ ...rowStyle, marginTop: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Ulica"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressStreet}
                name="addressStreet"
                error={errors.addressStreet}
                helperText={errors.addressStreet && "Street is required"}
              />
              <TextField
                {...inputStyle}
                label="Numer Mieszkania"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressAppartment}
                name="addressAppartment"
                error={errors.addressAppartment}
                helperText={errors.addressAppartment && "Appartment is required"}
              />
              <TextField
                {...inputStyle}
                label="Kod pocztowy"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressZipCode}
                name="addressZipCode"
                error={errors.addressZipCode}
                helperText={errors.addressZipCode && "Zip Code is required"}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Informacje dodatkowe</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                style={{
                  flex: 2,
                }}
                label="Parking"
                variant="filled"
                name="parking"
                onChange={(e) => handleChangeInput(e)}
                value={property.parking}
                error={errors.parking}
                helperText={errors.parking && "Parking is required"}
              />
              <FormControlLabel
                labelPlacement="top"
                name="Winda"
                control={<Switch {...inputStyle} label="Filled" variant="filled" />}
                label={<Typography variant="body2">Winda</Typography>}
                onChange={(e) => handleChangeInput(e)}
                value={property.elevator}
              />
              <TextField
                {...inputStyle}
                label="Metrarz"
                variant="filled"
                name="squareFootage"
                onChange={(e) => handleChangeInput(e)}
                value={property.squareFootage}
                type="number"
                error={errors.squareFootage}
                helperText={
                  errors.squareFootage &&
                  (property.squareFootage === 0
                    ? "Square footage cannot be 0"
                    : "Square footage is required")
                }
              />
              <TextField
                {...inputStyle}
                label="Ilość Pokoi"
                variant="filled"
                name="numberOfRooms"
                onChange={(e) => handleChangeInput(e)}
                value={property.numberOfRooms}
                type="number"
                error={errors.numberOfRooms}
                helperText={
                  errors.numberOfRooms &&
                  (property.numberOfRooms === 0 ? "Rooms cannot be 0" : "Rooms is required")
                }
              />
              <TextField
                {...inputStyle}
                label="Ilość Pieter"
                variant="filled"
                name="numberOfFloors"
                onChange={(e) => handleChangeInput(e)}
                value={property.numberOfFloors}
                type="number"
                error={errors.numberOfFloors}
                helperText={
                  errors.numberOfFloors &&
                  (property.numberOfFloors === 0 ? "Floors cannot be 0" : "Floors is required")
                }
              />
              <TextField
                {...inputStyle}
                label="Wybudowany w"
                variant="filled"
                name="yearOfConstruction"
                onChange={(e) => handleChangeInput(e)}
                value={property.yearOfConstruction}
                type="number"
                error={errors.yearOfConstruction}
                helperText={
                  errors.yearOfConstruction &&
                  (property.yearOfConstruction === 0
                    ? "Construction year cannot be 0"
                    : "Construction year is required")
                }
              />
              <FormControlLabel
                labelPlacement="top"
                name="bestSeller"
                control={<Switch {...inputStyle} label="Filled" variant="filled" />}
                label={<Typography variant="body2">Bestseller</Typography>}
                onChange={(e) => handleChangeInput(e)}
                value={property.bestSeller}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Zdjęcia</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                name="image1"
                label="Zdjęcie pierwsze"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.image1}
                error={errors.image1}
                helperText={errors.image1 && "First Image is required"}
              />
              <TextField
                {...inputStyle}
                label="Zdjęcie drugie"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.image2}
                name="image2"
              />
              <TextField
                {...inputStyle}
                label="Zdjęcie trzecie"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.image3}
                name="image3"
              />
              <TextField
                {...inputStyle}
                label="Zdjęcie czwarte"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.image4}
                name="image4"
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
                {state === "add" ? "Dodaj nową posiadłość" : "Zapisz zmiany"}
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

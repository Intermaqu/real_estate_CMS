import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
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
  id: "",
  image1: "",
  image2: "",
  image3: "",
  image4: "",
  category: "House",
  title: "",
  price: 0,
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
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(DefaultPropertyData);
  const [errors, setErrors] = useState({}); // { title: "Title is required" }
  const [state, setState] = useState("loading");
  const categories = ["House", "Apartment", "Office"];

  const init = () => {
    const newState = id ? "edit" : "add";
    setState(newState);
    //getAllCategories
    //getProperyById

    console.log(newState);
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

    setErrors(newErrors);
    if (handleCheckErrors(newErrors)) return;

    // Add Property
    if (state === "add") {
      //addProperty
      return;
    }

    // Edit Property
    if (state === "edit") {
      //editProperty
      return;
    }
  };

  const handleCheckErrors = (errorsToCheck) => {
    const numberOfErrors = Object.values(errorsToCheck).filter((error) => error === true).length;
    console.log(numberOfErrors);
    return numberOfErrors > 0;
  };

  const handleChangeCategory = (event) => {
    const category = event.target.value;
    console.log(category);
    setProperty({ ...property, category: category });
  };

  const handleChangeInput = (event) => {
    console.log(event);

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

  useEffect(() => {
    console.log(property);
  }, [property]);

  useEffect(() => {
    init();
  }, []);

  if (state === "loading")
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
                value={property.title}
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
                value={property.price}
                error={errors.price}
                helperText={
                  errors.price && (property.price === 0 ? "Price cannot be 0" : "Price is required")
                }
              />
              <TextField
                select
                label="Category"
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
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Description</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Description"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.description}
                name="description"
                multiline
                error={errors.description}
                helperText={errors.description && "Description is required"}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Address</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Country"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressCountry}
                name="addressCountry"
                error={errors.addressCountry}
                helperText={errors.addressCountry && "Country is required"}
              />
              <TextField
                {...inputStyle}
                label="City"
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
                label="Street"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressStreet}
                name="addressStreet"
                error={errors.addressStreet}
                helperText={errors.addressStreet && "Street is required"}
              />
              <TextField
                {...inputStyle}
                label="Appartment"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressAppartment}
                name="addressAppartment"
                error={errors.addressAppartment}
                helperText={errors.addressAppartment && "Appartment is required"}
              />
              <TextField
                {...inputStyle}
                label="Zip Code"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.addressZipCode}
                name="addressZipCode"
                error={errors.addressZipCode}
                helperText={errors.addressZipCode && "Zip Code is required"}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Additional Informations</Typography>
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
                name="elevator"
                control={<Switch {...inputStyle} label="Filled" variant="filled" />}
                label={<Typography variant="body2">Elevator</Typography>}
                onChange={(e) => handleChangeInput(e)}
                value={property.elevator}
              />
              <TextField
                {...inputStyle}
                label="Square Footage"
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
                label="Rooms"
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
                label="Floors"
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
                label="Constructed in"
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
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Images</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                name="image1"
                label="First Image"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.image1}
                error={errors.image1}
                helperText={errors.image1 && "First Image is required"}
              />
              <TextField
                {...inputStyle}
                label="Second Image"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.image2}
                name="image2"
              />
              <TextField
                {...inputStyle}
                label="Third Image"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={property.image3}
                name="image3"
              />
              <TextField
                {...inputStyle}
                label="Fourth Image"
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
              <Typography variant="h6">Validate</Typography>
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

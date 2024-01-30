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

const EmptyCompanyData = {
  email: "",
  phoneNumber: "",
  phoneNumber2: "",
  country: "",
  city: "",
  street: "",
  apartmentNum: "",
  zipCode: "",
  aboutUs: "",
  facebook: "",
  instagram: "",
  twitter: "",
  google: "",
  linkedin: "",
  employeesContent: "",
  guaranteedContent: "",
  consultationContent: "",
};

const Page = () => {
  const [company, setCompany] = useState();
  const [errors, setErrors] = useState({}); // { title: "Title is required" }
  //   const [backendError, setBackendError] = useState(""); // "Title is required" || "Server error" || [
  const [state, setState] = useState("loading");

  const init = () => {
    setState("edit");

    // AXIOS GET

    setCompany(EmptyCompanyData);
  };

  const handleValidate = () => {
    const newErrors = {
      ...errors,
    };

    for (let key of Object.keys(company)) {
      if (company[key] === "") newErrors[key] = true;
    }

    newErrors.createdAt = false;
    if (company.password !== company.passwordConfirm) newErrors.passwordConfirm = true;

    console.log("newErrors:", newErrors);
    setErrors(newErrors);
    if (handleCheckErrors(newErrors)) return;

    let now = new Date();

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
          console.log(res);
          // TODO: komunikat o zapisaniu + redirect do /properties
          // setProperty(res.data.property);
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }
  };

  const handleCheckErrors = (errorsToCheck) => {
    const numberOfErrors = Object.values(errorsToCheck).filter((error) => error === true).length;
    console.log(numberOfErrors);
    return numberOfErrors > 0;
  };

  const handleChangeInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "active") {
      setCompany({ ...company, active: event.target.checked });
      return;
    }

    setErrors({ ...errors, [name]: value === "" });
    setCompany({ ...company, [name]: value });
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    console.log("company:", company);
  }, [company]);

  useEffect(() => {
    console.log("state:", state);
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
        <Typography variant="h4">Ładowanie...</Typography>
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
        <title>Informacje o firmie</title>
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
                <Typography variant="h4">Informacje o firmie</Typography>
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
              <Typography variant="h6">Kontakt</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Email"
                name="email"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={company.email}
                error={errors.email}
                helperText={errors.email && "Email is required"}
              />
              <TextField
                {...inputStyle}
                label="Numer Telefonu"
                name="phoneNumber"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={company.phoneNumber}
                error={errors.phoneNumber}
                helperText={errors.phoneNumber && "phoneNumber is required"}
                type="number"
              />
              <TextField
                {...inputStyle}
                label="Numer Telefonu 2"
                name="phoneNumber2"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={company.phoneNumber2}
                error={errors.phoneNumber2}
                helperText={errors.phoneNumber2 && "phoneNumber2 is required"}
                type="number"
              />
            </Box>
            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Linki do Mediów Społecznościowych</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Facebook"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.facebook}
                name="facebook"
                error={errors.facebook}
                helperText={errors.facebook && "facebook is required"}
              />
              <TextField
                {...inputStyle}
                label="Instagram"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.instagram}
                name="instagram"
                error={errors.instagram}
                helperText={errors.instagram && "instagram is required"}
              />
            </Box>
            <Box sx={{ ...rowStyle, marginTop: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Twitter"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.twitter}
                name="twitter"
                error={errors.twitter}
                helperText={errors.twitter && "twitter is required"}
              />
              <TextField
                {...inputStyle}
                label="Google"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.google}
                name="google"
                error={errors.google}
                helperText={errors.google && "google is required"}
              />
              <TextField
                {...inputStyle}
                label="Linked In"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.linkedin}
                name="linkedin"
                error={errors.linkedin}
                helperText={errors.linkedin && "linkedin is required"}
              />
            </Box>
            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Treści</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Treści o pracownikach"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.employeesContent}
                name="employeesContent"
                error={errors.employeesContent}
                helperText={errors.employeesContent && "employeesContent is required"}
                multiline
                rows={4}
              />
            </Box>
            <Box sx={{ ...rowStyle, marginTop: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Treści gwarancyjne"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.guaranteedContent}
                name="guaranteedContent"
                error={errors.guaranteedContent}
                helperText={errors.guaranteedContent && "guaranteedContent is required"}
                multiline
                rows={4}
              />
            </Box>
            <Box sx={{ ...rowStyle, marginTop: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Treści konsultacyjne"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.consultationContent}
                name="consultationContent"
                error={errors.consultationContent}
                helperText={errors.consultationContent && "consultationContent is required"}
                multiline
                rows={4}
              />
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
                  {state === "add" ? "Dodaj Nowego Użytkownika" : "Zapisz zmiany"}
                </Typography>
              </Button>
            </Box>
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

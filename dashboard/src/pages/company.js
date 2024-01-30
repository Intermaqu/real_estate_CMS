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

    axios({
      method: "get",
      url: `${URL}/company-info/getOne`,
      headers: {
        authorization: AuthenticationService.getToken(),
      },
    })
      .then((res) => {
        setCompany(res.data);
        setState(newState);
      })
      .catch((err) => {
        console.log(err);
        // setBackendError(err.response);
      });

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
        url: `${URL}/company-info/edit/${company.id}`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
      })
        .then((res) => {
          setCompany(res.data);
          setState(newState);
        })
        .catch((err) => {
          console.log(err);
          // setBackendError(err.response);
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
                value={company.phone_number_1}
                error={errors.phone_number_1}
                helperText={errors.phone_number_1 && "phoneNumber is required"}
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
                value={company.phone_number_2}
                error={errors.phone_number_2}
                helperText={errors.phone_number_2 && "phoneNumber2 is required"}
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
                value={company.social_facebook_link}
                name="facebook"
                error={errors.social_facebook_link}
                helperText={errors.social_facebook_link && "facebook is required"}
              />
              <TextField
                {...inputStyle}
                label="Instagram"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.social_instagram_link}
                name="instagram"
                error={errors.social_instagram_link}
                helperText={errors.social_instagram_link && "instagram is required"}
              />
            </Box>
            <Box sx={{ ...rowStyle, marginTop: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Twitter"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.social_twitter_link}
                name="twitter"
                error={errors.social_twitter_link}
                helperText={errors.social_twitter_link && "twitter is required"}
              />
              <TextField
                {...inputStyle}
                label="Google"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.social_google_link}
                name="google"
                error={errors.social_google_link}
                helperText={errors.social_google_link && "google is required"}
              />
              <TextField
                {...inputStyle}
                label="Linked In"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={company.social_linked_in_link}
                name="linkedin"
                error={errors.social_linked_in_link}
                helperText={errors.social_linked_in_link && "linkedin is required"}
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
                value={company.employees_content}
                name="employeesContent"
                error={errors.employees_content}
                helperText={errors.employees_content && "employeesContent is required"}
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
                value={company.guaranteed_content}
                name="guaranteedContent"
                error={errors.guaranteed_content}
                helperText={errors.guaranteed_content && "guaranteedContent is required"}
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
                value={company.consultation_content}
                name="consultationContent"
                error={errors.consultation_content}
                helperText={errors.consultation_content && "consultationContent is required"}
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
                  {state === "add" ? "Dodaj Nowego Dane" : "Zapisz zmiany"}
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

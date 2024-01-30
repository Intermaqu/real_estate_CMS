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

const EmptyTestimonialData = {
  id: "",
  name: "",
  surname: "",
  position: "",
  comment: "",
  active: true,
};

const DefaultTestimonialData = {
  id: "",
  name: "XD",
  surname: "XD",
  position: "XD",
  comment: "XD",
  active: true,
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [testimonial, setTestimonial] = useState();
  const [errors, setErrors] = useState({}); // { title: "Title is required" }
  const [state, setState] = useState("loading");
  const [backendError, setBackendError] = useState("");

  const init = () => {
    const newState = id ? "edit" : "add";
    if (id) {
      axios({
        method: "get",
        url: `${URL}/real-estate/getById/${id}`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
      })
        .then((res) => {
          console.log(res.data);
          setTestimonial(res.data[0]);
          setState(newState);
        })
        .catch((err) => {
          console.log(err);
          // setBackendError(err.response);
        });
    } else {
      // ADD
      setTestimonial(EmptyTestimonialData);
    }
  };

  const handleValidate = () => {
    const newErrors = {
      ...errors,
    };

    for (let key of Object.keys(testimonial)) if (testimonial[key] === "") newErrors[key] = true;

    setErrors(newErrors);
    if (handleCheckErrors(newErrors)) return;

    // Add Property
    if (state === "add") {
      console.log("ADD");
    }

    // Edit Property
    if (state === "edit") {
      console.log("EDIT");
    }
  };

  const handleDeleteFromDB = () => {
    console.log("Delete property:", id);

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
    // console.log(numberOfErrors);
    return numberOfErrors > 0;
  };

  const handleChangeInput = (event) => {
    const value = event.target.value;
    const name = event.target.name;

    // BOOLEAN VALUES
    if (name === "active") {
      setTestimonial({ ...testimonial, elevator: event.target.checked });
      return;
    }

    setErrors({
      ...errors,
      [name]: value === "",
    });

    setTestimonial({ ...testimonial, [name]: value });
  };

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
        <title>Recenzja</title>
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
                  {state === "add" ? `Nowa Recenzja` : `Edycja Recenzji #${id}`}
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
              <Typography variant="h6">Autor</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Imie"
                name="name"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={testimonial.name}
                error={errors.name}
                helperText={errors.name && "name is required"}
              />
              <TextField
                {...inputStyle}
                label="Nazwisko"
                name="surname"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={testimonial.surname}
                error={errors.surname}
                helperText={errors.surname && "surname is required"}
              />
              <TextField
                {...inputStyle}
                label="Pozycja"
                name="position"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={testimonial.position}
                error={errors.position}
                helperText={errors.position && "position is required"}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Recenzja</Typography>
            </Box>
            <Box sx={{ ...rowStyle, marginBottom: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Opis"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={testimonial.comment}
                name="comment"
                multiline
                rows={2}
                error={errors.comment}
                helperText={errors.comment && "comment is required"}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Status</Typography>
            </Box>
            <Box sx={rowStyle}>
              <FormControlLabel
                labelPlacement="top"
                name="active"
                control={<Switch {...inputStyle} label="Filled" variant="filled" />}
                label={<Typography variant="body2">Czy Aktywna</Typography>}
                onChange={(e) => handleChangeInput(e)}
                checked={testimonial.active}
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
                <Typography variant="h6">Usuń recenzje</Typography>
              </Button>
            )}
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

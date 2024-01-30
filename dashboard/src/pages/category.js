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
import { set } from "nprogress";

const DefaultCategoryData = {
  name: "",
  description: "",
  active: true,
  image: "",
};

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [category, setCategory] = useState(DefaultCategoryData);
  const [errors, setErrors] = useState({}); // { title: "Title is required" }
  const [state, setState] = useState("loading");
  const [backendError, setBackendError] = useState("");

  const init = () => {
    const newState = id ? "edit" : "add";
    setState(newState);
    if (id) {
      // EDIT
      axios({
        method: "get",
        url: `${URL}/category/get/${id}`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
      })
        .then((res) => {
          setCategory(res.data);
          setState(newState);
        })
        .catch((err) => {
          console.log(err);
          // setBackendError(err.response);
        });
    } else {
      // ADD
      setCategory(DefaultCategoryData);
    }
  };

  const handleDeleteFromDB = () => {
    console.log("Delete category:", id);
    // axios({
    //   method: "delete",
    //   url: `${URL}/real-estate/deleteById/${id}`,
    //   headers: {
    //     authorization: AuthenticationService.getToken(),
    //   },
    // })
    //   .then((res) => {
  };

  const handleValidate = () => {
    const newErrors = {
      ...errors,
    };

    for (let key of Object.keys(category)) if (category[key] === "") newErrors[key] = true;

    setErrors(newErrors);
    if (handleCheckErrors(newErrors)) return;

    let now = new Date();

    // Add
    if (state === "add") {
      axios({
        method: "post",
        url: `${URL}/category/add`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
        data: {
          name: category.name,
          description: category.description,
          image: category.image,
          created_at: new Date(),
          active: category.active,
        },
      })
        .then((res) => {
          // TODO: komunikat o zapisaniu
          // setProperty(res.data.property);
          router.push("/categories");
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
        url: `${URL}/category/edit/${id}`,
        headers: {
          authorization: AuthenticationService.getToken(),
        },
        data: {
          name: category.name,
          description: category.description,
          image: category.image,
          created_at: new Date(),
          active: category.active,
        },
      })
        .then((res) => {
          // TODO: komunikat o zapisaniu
          // setProperty(res.data.property);
          router.push("/categories");
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

  const handleChangeInput = (event) => {
    // console.log(event);

    const value = event.target.value;
    const name = event.target.name;

    if (name === "active") {
      setCategory({ ...category, [name]: event.target.checked });
      return;
    }

    setErrors({ ...errors, [name]: value === "" });
    setCategory({ ...category, [name]: value });
  };

  useEffect(() => {
    console.log(category);
  }, [category]);

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
        <title>Kategoria</title>
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
                  {state === "add" ? `Nowa Kategoria` : `Edycja Kategorii #${id}`}
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
              <Typography variant="h6">Nazwa</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Nazwa"
                name="name"
                variant="filled"
                onChange={(e) => {
                  handleChangeInput(e);
                }}
                value={category.name}
                error={errors.name}
                helperText={errors.name && "Name is required"}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Opis</Typography>
            </Box>
            <Box sx={{ ...rowStyle, marginBottom: "1rem" }}>
              <TextField
                {...inputStyle}
                label="Opis"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={category.description}
                name="description"
                multiline
                rows={4}
                error={errors.description}
                helperText={errors.description && "Description is required"}
              />
            </Box>

            <Box sx={rowTitleStyle}>
              <Typography variant="h6">Zdjęcie</Typography>
            </Box>
            <Box sx={rowStyle}>
              <TextField
                {...inputStyle}
                label="Zdjęcie"
                variant="filled"
                onChange={(e) => handleChangeInput(e)}
                value={category.image}
                name="image"
                error={errors.image}
                helperText={errors.image && "Image is required"}
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
                label={<Typography variant="body2">Aktywna</Typography>}
                onChange={(e) => handleChangeInput(e)}
                checked={category.active}
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
                <Typography variant="h6">Usuń kategorię</Typography>
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

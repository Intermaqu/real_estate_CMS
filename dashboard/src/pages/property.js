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
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import Head from "next/head";

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState({});
  const [state, setState] = useState("loading");
  const [categories, setCategories] = useState(["House", "Apartment", "Office"]);

  const init = () => {
    const newState = id ? "edit" : "add";
    setState(newState);
    //getAllCategories

    console.log(newState);
  };

  const handleChangeCategory = (event) => {
    const category = event.target.value;
    console.log(category);
    setProperty({ ...property, category: category });
  };

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
              gap: "2rem",
            }}
          >
            <Box sx={rowStyle}>
              <TextField {...inputStyle} label="Title" variant="filled" />
              <TextField {...inputStyle} label="price" type="number" variant="filled" />
              <TextField
                select
                label="Category"
                variant="filled"
                onChange={handleChangeCategory}
                value={property.category || categories[0]}
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
            <Box sx={rowStyle}>
              <TextField {...inputStyle} label="Filled" variant="filled" />
              <TextField {...inputStyle} label="Filled" variant="filled" />
              <TextField {...inputStyle} label="Filled" variant="filled" />
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
  gap: "1rem",
  width: "80%",
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

// {
//   id: string;
//   image1: string;
//   image2?: string;
//   image3?: string;
//   image4?: string;
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
// }

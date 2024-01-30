import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PropertiesSearch } from "src/sections/properties/properties-search";
import { applyPagination } from "src/utils/apply-pagination";
// import propertiesDataJSON from "src/data/properties";
import { set } from "nprogress";
import { Link } from "next/link";
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";
import { URL } from "../services/URL";
import { CategoriesTable } from "src/sections/categories/categories-table";
import { CategoriesSearch } from "src/sections/categories/categories-search";

const data = [];

const STATUS = ["SOLD", "AVAILABLE", "BOOKED"];

const Page = () => {
  const [categoriesData, setCategoriesData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    ACTIVE: true,
    INACTIVE: true,
  });

  const init = () => {
    const data = [
      {
        id: 1,
        name: "Dom",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        status: "ACTIVE",
        image: "image",
      },
      {
        id: 2,
        name: "Mieszkanie",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        status: "ACTIVE",
        image: "image",
      },
      {
        id: 3,
        name: "Działka",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        status: "INACTIVE",
        image: "image",
      },
      {
        id: 4,
        name: "Penthause",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        status: "INACTIVE",
        image: "image",
      },
    ];

    // AXIOS GET CATEGORIES

    setCategoriesData(data);
    setFilteredData(data);
    setIsLoading(false);

    // axios({
    //   method: "get",
    //   url: `${URL}/real-estate`,
    //   headers: {
    //     authorization: AuthenticationService.getToken(),
    //   },
    // })
    //   .then((res) => {
    //     for (let realEstate of res.data) {
    //       data.push({
    //         id: realEstate.id,
    //         address: {
    //           city: realEstate.address_city + " " + realEstate.address_zip_code,
    //           country: realEstate.address_country,
    //           state: realEstate.address_street,
    //           street: realEstate.address_apartment,
    //         },
    //         avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    //         createdAt: realEstate.created_at,
    //         email: realEstate.broker_email,
    //         name: realEstate.title,
    //         phone: realEstate.broker_phone_number,
    //         status: realEstate.status,
    //         price: realEstate.price,
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // setIsLoading(false);
    // setPropertiesData(data);
    // setFilteredData(data);
  };

  const handlePageChange = useCallback((event, value) => {
    setPage(value);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    setRowsPerPage(event.target.value);
  }, []);

  const handlePagination = (data) => {
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const handleFilter = (status) => {
    const newFilter = filter;
    newFilter[status] = !newFilter[status];
    setFilter(newFilter);

    const newFilteredData = categoriesData.filter((property) => newFilter[property.status]);
    console.log(newFilteredData);
    setFilteredData(newFilteredData);
  };

  const handleClearFilter = () => {
    setFilter({
      SOLD: true,
      AVAILABLE: true,
      BOOKED: true,
    });
    setFilteredData(categoriesData);
  };

  useEffect(() => {
    setTimeout(() => {
      init();
    }, 100);
  }, []);

  useEffect(() => {
    console.log(filter);
  }, [filter]);

  if (isLoading) {
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

  return (
    <>
      <Head>
        <title>Kategorie</title>
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
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h4">Kategorie</Typography>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  sx={{
                    width: "fit-content",
                  }}
                  component={Link}
                  href={`/category`}
                >
                  + Nowa Kategoria
                </Button>
              </Box>
            </Stack>
            <CategoriesSearch
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
              filter={filter}
            />
            <CategoriesTable
              count={filteredData.length}
              items={handlePagination(filteredData)}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

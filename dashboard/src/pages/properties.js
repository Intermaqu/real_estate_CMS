import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { PropertiesTable } from "src/sections/properties/properties-table";
import { PropertiesSearch } from "src/sections/properties/properties-search";
import { applyPagination } from "src/utils/apply-pagination";
// import propertiesDataJSON from "src/data/properties";
import { set } from "nprogress";
import { Link } from "next/link";
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";
import { URL } from "../services/URL";

const data = [];

const STATUS = ["SOLD", "AVAILABLE", "BOOKED"];

const Page = () => {
  const [propertiesData, setPropertiesData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    SOLD: true,
    AVAILABLE: true,
    BOOKED: true,
  });

  const init = () => {
    const data = [];

    axios({
      method: "get",
      url: `${URL}/real-estate`,
      headers: {
        authorization: AuthenticationService.getToken(),
      },
    })
      .then((res) => {
        for (let realEstate of res.data) {
          data.push({
            id: realEstate.id,
            address: {
              city: realEstate.address_city + " " + realEstate.address_zip_code,
              country: realEstate.address_country,
              state: realEstate.address_street,
              street: realEstate.address_apartment,
            },
            avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
            createdAt: realEstate.created_at,
            email: realEstate.broker_email,
            name: realEstate.title,
            phone: realEstate.broker_phone_number,
            status: realEstate.status,
            price: realEstate.price,
          });
        }
        
        setIsLoading(false);
        setPropertiesData(data);
        setFilteredData(data);
      })
      .catch((err) => {
        console.log(err);
      });
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

    const newFilteredData = propertiesData.filter((property) => newFilter[property.status]);
    console.log(newFilteredData);
    setFilteredData(newFilteredData);
  };

  const handleClearFilter = () => {
    setFilter({
      SOLD: true,
      AVAILABLE: true,
      BOOKED: true,
    });
    setFilteredData(propertiesData);
  };

  useEffect(() => {
    setTimeout(() => {
      init();
    }, 100);
  }, []);

  useEffect(() => {
    console.log(filter);
    console.log(filteredData);
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
        <title>Posiadłości</title>
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
                <Typography variant="h4">Oferty nieruchomości</Typography>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  sx={{
                    width: "fit-content",
                  }}
                  component={Link}
                  href={`/property`}
                >
                  + Nowa Posiadłość
                </Button>
              </Box>
            </Stack>
            <PropertiesSearch
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
              filter={filter}
            />
            <PropertiesTable
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

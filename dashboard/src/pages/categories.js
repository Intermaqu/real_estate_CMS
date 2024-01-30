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
    const data = [];

    axios({
      method: "get",
      url: `${URL}/category`,
      headers: {
        authorization: AuthenticationService.getToken(),
      },
    })
      .then((res) => {
        console.log(res.data);
        for (let category of res.data) {
          console.log(category.active)
          data.push({
            id: category.id,
            name: category.name,
            description: category.description,
            status: category.active,
            image: category.image,
          });
        }

        setCategoriesData(data);
        setFilteredData(data);
        setIsLoading(false);
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

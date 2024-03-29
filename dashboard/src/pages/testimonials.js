import { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Box, Button, Container, Stack, SvgIcon, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { applyPagination } from "src/utils/apply-pagination";
// import propertiesDataJSON from "src/data/properties";
import { set } from "nprogress";
import { Link } from "next/link";
import axios from "axios";
import AuthenticationService from "../services/AuthenticationService";
import { URL } from "../services/URL";
import { TestimonialsSearch } from "src/sections/testimonial/testimonials-search";
import { TestimonialsTable } from "src/sections/testimonial/testimonials-table";

const STATUS = ["SOLD", "AVAILABLE", "BOOKED"];

const Page = () => {
  const [testimonialsData, setTestimonialsData] = useState();
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
      url: `${URL}/testimonial`,
      headers: {
        authorization: AuthenticationService.getToken(),
      },
    })
      .then((res) => {
        console.log(res.data);
        for (let testimonial of res.data) {
          data.push({
            id: testimonial.id,
            full_name: testimonial.full_name,
            position: testimonial.position,
            comment: testimonial.comment,
            active: testimonial.active,
          });
        }

        setIsLoading(false);
        setTestimonialsData(data);
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

    const newFilteredData = testimonialsData.filter((testimonial) => newFilter[testimonial.active]);
    console.log(newFilteredData);
    setFilteredData(newFilteredData);
  };

  const handleClearFilter = () => {
    setFilter({
      ACTIVE: true,
      INACTIVE: true,
    });
    setFilteredData(testimonialsData);
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
        <title>Recenzje</title>
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
                <Typography variant="h4">Recenzje</Typography>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  sx={{
                    width: "fit-content",
                  }}
                  component={Link}
                  href={`/testimonial`}
                >
                  + Nowa Recenzja
                </Button>
              </Box>
            </Stack>
            <TestimonialsSearch
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
              filter={filter}
            />
            <TestimonialsTable
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

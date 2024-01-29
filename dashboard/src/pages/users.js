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
import usersDataJSON from "src/data/users";
import { set } from "nprogress";
import { Link } from "next/link";
import { UsersSearch } from "src/sections/users/users-search";
import { UsersTable } from "src/sections/users/users-table";

const Page = () => {
  const [usersData, setUsersData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    USER: true,
    BROKER: true,
  });

  const init = () => {
    const data = usersDataJSON.data;
    //REQUEST TO API
    setIsLoading(false);
    setUsersData(data);
    setFilteredData(data);
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

  const handleFilter = (role) => {
    const newFilter = filter;
    console.log(newFilter);
    newFilter[role] = !newFilter[role];
    setFilter(newFilter);

    const newFilteredData = usersData.filter((user) => newFilter[user.role]);
    console.log(newFilteredData);
    setFilteredData(newFilteredData);
  };

  const handleClearFilter = () => {
    setFilter({
      SOLD: true,
      FREE: true,
      RESERVED: true,
    });
    setFilteredData(usersData);
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
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>Users</title>
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
                <Typography variant="h4">Users</Typography>
                <Button
                  color="primary"
                  startIcon={<PlusIcon fontSize="small" />}
                  variant="contained"
                  sx={{
                    width: "fit-content",
                  }}
                  component={Link}
                  href={`/user`}
                >
                  + New User
                </Button>
              </Box>
            </Stack>
            <UsersSearch
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
              filter={filter}
            />
            <UsersTable
              count={usersData.length}
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

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
import propertiesDataJSON from "src/data/properties";
import { set } from "nprogress";
import { Link } from "next/link";

const now = new Date();

const data = [
  {
    id: "1",
    address: {
      city: "Cleveland",
      country: "USA",
      state: "Ohio",
      street: "2849 Fulton Street",
    },
    avatar: "/assets/avatars/avatar-carson-darrin.png",
    createdAt: subDays(subHours(now, 7), 1).getTime(),
    email: "carson.darrin@devias.io",
    name: "Carson Darrin",
    phone: "304-428-3097",
  },
  {
    id: "2",
    address: {
      city: "Atlanta",
      country: "USA",
      state: "Georgia",
      street: "1865  Pleasant Hill Road",
    },
    avatar: "/assets/avatars/avatar-fran-perez.png",
    createdAt: subDays(subHours(now, 1), 2).getTime(),
    email: "fran.perez@devias.io",
    name: "Fran Perez",
    phone: "712-351-5711",
  },
  {
    id: "3",
    address: {
      city: "North Canton",
      country: "USA",
      state: "Ohio",
      street: "4894  Lakeland Park Drive",
    },
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subDays(subHours(now, 4), 2).getTime(),
    email: "jie.yan.song@devias.io",
    name: "Jie Yan Song",
    phone: "770-635-2682",
  },
  {
    id: "4",
    address: {
      city: "Madrid",
      country: "Spain",
      name: "Anika Visser",
      street: "4158  Hedge Street",
    },
    avatar: "/assets/avatars/avatar-anika-visser.png",
    createdAt: subDays(subHours(now, 11), 2).getTime(),
    email: "anika.visser@devias.io",
    name: "Anika Visser",
    phone: "908-691-3242",
  },
  {
    id: "5",
    address: {
      city: "San Diego",
      country: "USA",
      state: "California",
      street: "75247",
    },
    avatar: "/assets/avatars/avatar-miron-vitold.png",
    createdAt: subDays(subHours(now, 7), 3).getTime(),
    email: "miron.vitold@devias.io",
    name: "Miron Vitold",
    phone: "972-333-4106",
  },
  {
    id: "6",
    address: {
      city: "Berkeley",
      country: "USA",
      state: "California",
      street: "317 Angus Road",
    },
    avatar: "/assets/avatars/avatar-penjani-inyene.png",
    createdAt: subDays(subHours(now, 5), 4).getTime(),
    email: "penjani.inyene@devias.io",
    name: "Penjani Inyene",
    phone: "858-602-3409",
  },
  {
    id: "7",
    address: {
      city: "Carson City",
      country: "USA",
      state: "Nevada",
      street: "2188  Armbrester Drive",
    },
    avatar: "/assets/avatars/avatar-omar-darboe.png",
    createdAt: subDays(subHours(now, 15), 4).getTime(),
    email: "omar.darobe@devias.io",
    name: "Omar Darobe",
    phone: "415-907-2647",
  },
  {
    id: "8",
    address: {
      city: "Los Angeles",
      country: "USA",
      state: "California",
      street: "1798  Hickory Ridge Drive",
    },
    avatar: "/assets/avatars/avatar-siegbert-gottfried.png",
    createdAt: subDays(subHours(now, 2), 5).getTime(),
    email: "siegbert.gottfried@devias.io",
    name: "Siegbert Gottfried",
    phone: "702-661-1654",
  },
  {
    id: "9",
    address: {
      city: "Murray",
      country: "USA",
      state: "Utah",
      street: "3934  Wildrose Lane",
    },
    avatar: "/assets/avatars/avatar-iulia-albu.png",
    createdAt: subDays(subHours(now, 8), 6).getTime(),
    email: "iulia.albu@devias.io",
    name: "Iulia Albu",
    phone: "313-812-8947",
  },
  {
    id: "10",
    address: {
      city: "Salt Lake City",
      country: "USA",
      state: "Utah",
      street: "368 Lamberts Branch Road",
    },
    avatar: "/assets/avatars/avatar-nasimiyu-danai.png",
    createdAt: subDays(subHours(now, 1), 9).getTime(),
    email: "nasimiyu.danai@devias.io",
    name: "Nasimiyu Danai",
    phone: "801-301-7894",
  },
];

const STATUS = ["SOLD", "FREE", "RESERVED"];

const Page = () => {
  const [propertiesData, setPropertiesData] = useState();
  const [filteredData, setFilteredData] = useState();
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    SOLD: true,
    FREE: true,
    RESERVED: true,
  });

  const init = () => {
    const data = propertiesDataJSON.data;
    //REQUEST TO API
    setIsLoading(false);
    setPropertiesData(data);
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
      FREE: true,
      RESERVED: true,
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
                <Typography variant="h4">Properties</Typography>
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

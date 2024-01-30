import PropTypes from "prop-types";
import { format } from "date-fns";
import Link from "next/link";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  SvgIcon,
  ButtonBase,
} from "@mui/material";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";

export const CategoriesTable = (props) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const handleColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "green";

      case "INACTIVE":
        return "red";

      default:
        return "black";
    }
  };

  const translateStatus = (status) => {
    switch (status) {
      case "ACTIVE":
        return "Aktywna";

      case "INACTIVE":
        return "Nieaktywna";

      default:
        return "Nieznany";
    }
  };

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Nazwa Kategorii</TableCell>
                <TableCell>Opis</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edycja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((category) => {
                return (
                  <TableRow hover key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: "bold" }}>{category.name}</Typography>
                    </TableCell>
                    <TableCell>{category.description.slice(0, 50) + "..."}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: "bold", color: handleColor(category.status) }}>
                        {translateStatus(category.status)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <ButtonBase
                        sx={{
                          alignItems: "center",
                          display: "flex",
                          width: "5rem",
                          justifyContent: "center",
                          border: "1px solid",
                          borderColor: "primary.main",
                          borderRadius: "5px",
                          color: "primary.main",

                          "&:hover": {
                            color: "white",
                            backgroundColor: "primary.main",
                          },
                        }}
                        href={`/category?id=${category.id}`}
                        component={Link}
                      >
                        <Box
                          sx={{
                            alignItems: "center",
                            color: "neutral.400",
                            display: "inline-flex",
                            justifyContent: "center",
                            padding: "0.5rem",
                            color: "inherit",
                            fontSize: "1rem",
                            fontWeight: "bold",
                          }}
                        >
                          Edytuj
                        </Box>
                      </ButtonBase>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

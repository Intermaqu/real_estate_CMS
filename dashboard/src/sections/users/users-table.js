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
import { translateRole } from "./users-utils";

export const UsersTable = (props) => {
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
      case "USER":
        return "green";

      case "BROKER":
        return "orange";

      default:
        return "black";
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
                <TableCell>Imię</TableCell>
                <TableCell>Nazwisko</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Adres</TableCell>
                <TableCell>Rola</TableCell>
                <TableCell>Edytuj</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(
                ({
                  id,
                  firstName,
                  secondName,
                  firstSurname,
                  secondSurname,
                  email,
                  country,
                  city,
                  role,
                }) => {
                  return (
                    <TableRow hover key={id}>
                      <TableCell>{id}</TableCell>
                      <TableCell>
                        {firstName} {secondName ? secondName : ""}
                      </TableCell>
                      <TableCell>
                        {firstSurname} {secondSurname ? secondSurname : ""}
                      </TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>
                        {country}, {city}
                      </TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: "bold", color: handleColor(role) }}>
                          {translateRole(role)}
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
                          // href={`/editProperty/${property.id}`}
                          component={Link}
                          href={`/user?id=${id}`}
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
                }
              )}
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

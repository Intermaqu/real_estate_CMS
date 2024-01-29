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

export const PropertiesTable = (props) => {
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
      case "AVAILABLE":
        return "green";

      case "BOOKED":
        return "orange";

      case "SOLD":
        return "red";

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
                <TableCell>Lokalizacja</TableCell>
                <TableCell>Cena</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Data dodania</TableCell>
                <TableCell>Edytuj</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((property) => {
                return (
                  <TableRow hover key={property.id}>
                    <TableCell>{property.id}</TableCell>
                    <TableCell>
                      {property.address.city}, {property.address.state}, {property.address.country}
                    </TableCell>
                    <TableCell>
                      {property.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                        maximumFractionDigits: 0,
                        minimumFractionDigits: 0,
                      })}
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: "bold", color: handleColor(property.status) }}>
                        {property.status}
                      </Typography>
                    </TableCell>
                    <TableCell>{property.createdAt}</TableCell>
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
                        href={`/property?id=${property.id}`}
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

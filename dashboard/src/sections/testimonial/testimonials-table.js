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

export const TestimonialsTable = (props) => {
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
                <TableCell>Autor</TableCell>
                <TableCell>Stanowisko</TableCell>
                <TableCell>Komentarz</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Edycja</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((testimonial) => {
                return (
                  <TableRow hover key={testimonial.id}>
                    <TableCell>{testimonial.id}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: "bold" }}>{testimonial.full_name}</Typography>
                    </TableCell>
                    <TableCell>{testimonial.position}</TableCell>
                    <TableCell>
                      {testimonial.comment.slice(0, 40)}
                      {testimonial.comment.length > 40 ? "..." : ""}
                    </TableCell>
                    <TableCell>
                      <Typography
                        sx={{ fontWeight: "bold", color: handleColor(testimonial.active) }}
                      >
                        {translateStatus(testimonial.active)}
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
                        href={`/testimonial?id=${testimonial.id}`}
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

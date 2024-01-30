import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button, ButtonGroup } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { translateRole } from "./users-utils";

export const UsersSearch = ({ handleFilter, handleClearFilter, filter }) => (
  <Card sx={{ p: 2, justifyContent: "space-between", display: "flex", alignItems: "center" }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Szukaj Użytkownika"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 500 }}
    />
    <div>
      <Button
        variant="outlined"
        sx={{ marginRight: "1rem", color: "red", borderColor: "red" }}
        onClick={() => handleClearFilter()}
      >
        Wyczyść Filtry
      </Button>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          variant={filter["USER"] ? "contained" : "outlined"}
          sx={
            filter["USER"]
              ? { color: "white", background: "green" }
              : { color: "green", borderColor: "green" }
          }
          onClick={() => {
            handleFilter("USER");
          }}
        >
          {translateRole("USER").toUpperCase()}
        </Button>
        <Button
          variant={filter["BROKER"] ? "contained" : "outlined"}
          sx={
            filter["BROKER"]
              ? { color: "white", background: "orange" }
              : { color: "orange", borderColor: "orange" }
          }
          onClick={() => {
            handleFilter("BROKER");
          }}
        >
          {translateRole("BROKER").toUpperCase()}
        </Button>
      </ButtonGroup>
    </div>
  </Card>
);

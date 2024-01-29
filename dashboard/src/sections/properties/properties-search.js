import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button, ButtonGroup } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";

export const PropertiesSearch = ({ handleFilter, handleClearFilter, filter }) => (
  <Card sx={{ p: 2, justifyContent: "space-between", display: "flex", alignItems: "center" }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Szukaj"
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
        Wyczyść filtry
      </Button>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          variant={filter["AVAILABLE"] ? "contained" : "outlined"}
          sx={
            filter["AVAILABLE"]
              ? { color: "white", background: "green" }
              : { color: "green", borderColor: "green" }
          }
          onClick={() => {
            handleFilter("AVAILABLE");
          }}
        >
          AVAILABLE
        </Button>
        <Button
          variant={filter["BOOKED"] ? "contained" : "outlined"}
          sx={
            filter["BOOKED"]
              ? { color: "white", background: "orange" }
              : { color: "orange", borderColor: "orange" }
          }
          onClick={() => {
            handleFilter("BOOKED");
          }}
        >
          BOOKED
        </Button>
        <Button
          variant={filter["SOLD"] ? "contained" : "outlined"}
          sx={
            filter["SOLD"]
              ? { color: "white", background: "red" }
              : { color: "red", borderColor: "red" }
          }
          onClick={() => {
            handleFilter("SOLD");
          }}
        >
          SOLD
        </Button>
      </ButtonGroup>
    </div>
  </Card>
);

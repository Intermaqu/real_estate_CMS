import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button, ButtonGroup } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";
import { translateStatus } from "./properties-utils";

export const PropertiesSearch = ({ handleFilter, handleClearFilter, filter }) => (
  <Card sx={{ p: 2, justifyContent: "space-between", display: "flex", alignItems: "center" }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Szukaj Posiadłości"
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
          variant={filter["FREE"] ? "contained" : "outlined"}
          sx={
            filter["FREE"]
              ? { color: "white", background: "green" }
              : { color: "green", borderColor: "green" }
          }
          onClick={() => {
            handleFilter("FREE");
          }}
        >
          {translateStatus("FREE")}
        </Button>
        <Button
          variant={filter["RESERVED"] ? "contained" : "outlined"}
          sx={
            filter["RESERVED"]
              ? { color: "white", background: "orange" }
              : { color: "orange", borderColor: "orange" }
          }
          onClick={() => {
            handleFilter("RESERVED");
          }}
        >
          {translateStatus("RESERVED")}
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
          {translateStatus("SOLD")}
        </Button>
      </ButtonGroup>
    </div>
  </Card>
);

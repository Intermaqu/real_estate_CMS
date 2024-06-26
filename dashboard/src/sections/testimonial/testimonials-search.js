import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button, ButtonGroup } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";

export const TestimonialsSearch = ({ handleFilter, handleClearFilter, filter }) => (
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
        Wyczyść Filtry
      </Button>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        <Button
          variant={filter["ACTIVE"] ? "contained" : "outlined"}
          sx={
            filter["ACTIVE"]
              ? { color: "white", background: "green" }
              : { color: "green", borderColor: "green" }
          }
          onClick={() => {
            handleFilter("ACTIVE");
          }}
        >
          AKTYWNE
        </Button>
        <Button
          variant={filter["INACTIVE"] ? "contained" : "outlined"}
          sx={
            filter["INACTIVE"]
              ? { color: "white", background: "red" }
              : { color: "red", borderColor: "red" }
          }
          onClick={() => {
            handleFilter("INACTIVE");
          }}
        >
          NIEAKTYWNE
        </Button>
      </ButtonGroup>
    </div>
  </Card>
);

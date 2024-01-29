import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon, Button, ButtonGroup } from "@mui/material";
import { ClearIcon } from "@mui/x-date-pickers";

export const UsersSearch = ({ handleFilter, handleClearFilter, filter }) => (
  <Card sx={{ p: 2, justifyContent: "space-between", display: "flex", alignItems: "center" }}>
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search users"
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
        Clear Filters
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
          USER
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
          BROKER
        </Button>
      </ButtonGroup>
    </div>
  </Card>
);

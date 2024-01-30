export const translateStatus = (status) => {
  switch (status) {
    case "FREE":
      return "Wolne";

    case "RESERVED":
      return "Zarezerwowane";

    case "SOLD":
      return "Sprzedane";

    default:
      return "Nieznany";
  }
};

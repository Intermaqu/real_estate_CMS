export const translateStatus = (status) => {
  switch (status) {
    case "AVAILABLE":
      return "Wolne";

    case "BOOKED":
      return "Zarezerwowane";

    case "SOLD":
      return "Sprzedane";

    case "INACTIVE":
      return "Nieaktwne";

    default:
      return "Nieznany";
  }
};
